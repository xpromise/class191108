import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
import {message as msg} from 'antd';
import {AJAX_TIMEOUT,AJAX_BASE_URL} from '../config'
import store from '../redux/store'
import {createDeleteUserAction} from '../redux/actions/login'
import {createSaveTitleAction} from '../redux/actions/title'
import 'nprogress/nprogress.css'

axios.defaults.timeout = AJAX_TIMEOUT //配置超时时间
axios.defaults.baseURL = AJAX_BASE_URL //请求基本路径

//使用axios请求拦截器
axios.interceptors.request.use((config)=>{
	NProgress.start();//进度条开始走
	//config是包含本次请求所有的配置项(请求地址，请参数，请求方式等等)
	const {method,data} = config //获取请求方式、参数
	//如果你发送的是post请求，而且你携带的还是json编码的数据，就要将json编码改为urlencoded编码
	if(method.toLowerCase() === 'post' && data instanceof Object){
		config.data = qs.stringify(data) 
		//JSON.stringify是用于将一个对象转为JSON字符串
		//qs.stringify是用于将一个对象转为urlencoded编码的字符串
	}
	//从redux中获取token
	const {token} = store.getState().userInfo
	if(token) config.headers.Authorization = 'atguigu_'+token
	return config
})

//使用功能axios响应拦截器
axios.interceptors.response.use(
	//响应成功的回调--状态为2开头
	response => {
		NProgress.done();//进度条停下来
		return response.data
	},
	//响应失败的回调--1.服务器返回的状态码非2开头 2.服务器根本就没有任何响应。
	err => {
		NProgress.done();//进度条停下来
		//console.log('###',err);
		let errmsg = '未知错误，请联系管理员' //定义一个错误信息
		const {message} = err
		if(message.indexOf('401') !== -1) {
			//通知redux删除该用户的所有信息，从而触发当前页面的判断，从而跳转到了login
			store.dispatch(createDeleteUserAction())
			store.dispatch(createSaveTitleAction(''))
			errmsg = '身份校验失败，请重新登录！'
		}
		else if(message.indexOf('Network Error') !== -1) errmsg = '请检查网络连接！'
		else if(message.indexOf('timeout') !== -1) errmsg = '网络不稳定，连接超时！'
		msg.error(errmsg,1)
		return new Promise(()=>{})
	}
)

export default axios