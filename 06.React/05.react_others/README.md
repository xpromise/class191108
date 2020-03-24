## 1、状态提升

- 例子:将两个组件共用的状态数据提升到公共父组件中，父组件通过 props 方式传递给子组件使用，叫做状态提升（让两个组件共享同一份状态数据）

## 2、React.Fragment

- 作用：能作为多个虚拟 DOM 元素的根节点
- 优点：不会生成真实 DOM 元素

## 3、错误边界

- 错误边界是一种 React 组件，这种组件可以捕获错误，并且，它会渲染出备用 DOM 树，而不是渲染那些崩溃了的 DOM 树
- 注意，错误边界无法捕获以下场景中产生的错误(只能捕获子组件中生命周期函数的错误)：
  - 事件处理：onClick
  - 异步代码：setTimeout
  - 服务端渲染
  - 它自身抛出来的错误（并非它的子组件）
- 如果组件中定义以下两个专门处理错误的生命周期函数，就是错误边界
  - `static getDerivedStateFromError(error)`
  - `componentDidCatch(error, info)`

## 4、代码分割（code split）

- import 只能动态加载 js 代码
  - `import('./xxx').then((xxx) => {})`
- React.lazy 动态加载 React 组件
  - `const LazyComp = React.lazy(() => import('./xxx'))`
  - `<Suspense fallback={<div>Loading...</div>}><LazyComp /></Suspense>`
- react-loadable 动态加载 React 组件并支持服务端渲染
  - `Loadable({loader: () => import('./register'), loading() {return <div>Loading...</div>}})`

## 5、context

- 组件通信方式之一：用于祖孙组件通信
- 创建/初始化：`const MyContext = React.createContext(defaultValue);`
- 提供给子组件使用：`<MyContext.Provider value={/* 某个值 */}><子组件 /></MyContext.Provider>`
- 子组件内使用：
  - `static contextType = MyContext; this.context;`
  - `<MyContext.Consumer>{value => /* 基于 context 值进行渲染*/}</MyContext.Consumer>`

## 6、性能优化

- 减少 render 调用次数，从而减少 diff 比较和重新渲染次数
- shouldComponentUpdate
- PureComponent：组件内部实现了一种类似 shouldComponentUpdate 的比较
- React.memo

## 7、Ref

- forwardRef 用来将 ref 传给子组件，从而获取子组件的 DOM 元素的操作
- 用来获取工厂/纯函数组件的 ref

## 8、Portals

- Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。
- ReactDOM.createPortal(child, container)
- 一般用于定义 Modal 组件，将 Modal 插入到页面一个容器中

## 9、高阶组件

- 概念：高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件
- 目的: 能让其他组件复用相同的逻辑
- 当你发现两个组件有重复逻辑时，就使用 HOC 来解决。

## 10、render props

- React 组件之间使用一个值为函数的 prop 共享代码的简单技术
- 目的：复用组件之间的相同的逻辑
- 应用于：react-router

## 11、Hooks

- React Hooks 是什么?
  - 用来定义有状态和生命周期函数的纯函数组件（在过去纯函数组件是没有状态和生命周期函数的~）
  - Hooks 是 React v16.7.0-alpha 中加入的新特性，并向后兼容。
- 什么是钩子（Hook）
  - 本质就是函数，能让你使用 React 组件的状态和生命周期函数...
- 作用
  - 干死 class，让 function 一统江湖
  - 让代码更加可复用，不用在定义繁杂的 HOC
- 使用

  - useState(initValue)
    - const [ state, setState ] = React.useState(initValue);
    - 用来定义状态数据和操作状态数据的方法
  - useEffect(function)
    - useEffect(() => { do something })
    - 副作用函数（发请求获取数据、订阅事件、修改 DOM 等）
    - 本质上就是一个生命周期函数，相当于 componentDidMount 、 componentDidUpdate 和 componentWillUnmount
  - useContext(Context)
    - context 指的是 React.createContext 返回值

  ------ 以下 Hooks 只使用于特殊场景，需要时在用 -----
  useReducer

  - const [state, dispatch] = useReducer(reducer, initialState);
  - 一个 useState 替代方案，相当于 redux
    useCallback
  - useCallback(fn, inputs)
  - 相当于 shouldComponentUpdate，只有 inputs 的值发生变化才会调用 fn
    useMemo(create, inputs)
  - 相当于 useCallback

  更多详见官方文档：https://react.docschina.org/docs/hooks-reference.html

- 注意
  - 只能在顶层调用钩子。不要在循环，控制流和嵌套的函数中调用钩子。
  - 只能从 React 的函数式组件中调用钩子。不要在常规的 JavaScript 函数中调用钩子。
    （此外，你也可以在你的自定义钩子中调用钩子。）

## 12、服务器渲染

- React 使用 React-Router 开发的是单页面应用。整个应用只有一个完整的页面。
- 缺点：SEO 不友好
- 解决：服务器渲染

- ReactDOMServer.renderToString(element) 将 React 元素渲染 HTML 字符串
- next 框架 -- create-next-app

> 以上所有内容都可以去 [React 官网](https://reactjs.org/docs/getting-started.html "React官网") 查阅，
