const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
/*
  code split 代码分割
    将输出一个JS文件 改成 输出多个JS文件

    entry: String | Object | Array
      String 单入口（从一个文件开始打包）
      Array  多入口（从多个文件开始打包，全部输出到一个文件中）
      Object 多入口（从多个文件开始打包，有多少入口就输出多少个文件）

    问题：输出的多个文件，还存在公共代码，需要将这个公共代码抽取成单独文件
    解决：
      optimization: {
        splitChunks: {
          chunks: "all"
        }
      }
    功能：
      1. 将入口JS文件中node_modules中大于30KB的打包到单独模块vendors
      2. 将一个大于30KB且至少在两个入口分别引入了一次的模块打包到单独模块defaults  
    问题：开发时一般都是单入口
      1. 将入口JS文件中node_modules中大于30KB的打包到单独模块vendors（没有问题）
      2. 将一个大于30KB且至少在两个入口分别引入了一次的模块打包到单独模块defaults  
       （问题就是只有单入口不可能被引入两次，这个配置就不可能生效）
      最终结果：只能打包node_modules代码到单独文件
      但是其他代码还是汇总到一个文件中，代码体积仍然很大  
    
    解决：
      如果你想代码一起打包到入口JS文件中，就正常引入就可以
      如果你想代码被单独打包成一个文件，将来单独加载，需要使用动态导入
      
      开发中什么样的文件需要被单独打包呢？
        node_modules可以通过optimization被打包到单独文件中
        路由组件需要被单独打包，使用动态导入

        在React中，可以使用Suspence + lazy来实现路由组件的动态导入
          const Foo = lazy(() => import('./Foo.jsx'));

          <Suspence fallback={<Loading />}>
            <Router>
              <Route path="/foo" component={Foo} />
            </Router>
          <Suspence>
        在Vue中，
          const Foo = () => import('./Foo.vue')
          const router = new VueRouter({
            routes: [
              { path: '/foo', component: Foo }
            ]
          })
*/

module.exports = {
  // entry: "./src/index.js",  // 等价于下面这种
  entry: {
    main: "./src/index.js",
  },
  optimization: {
    splitChunks: {
      chunks: "all", // 对所有模块进行处理
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // [name]会自动补充为文件名
    filename: "./js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader"],
        sideEffects: true, // 当前处理的文件都有副作用，不要进行tree shaking
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // 自动删除上一个打包的结果
    new CleanWebpackPlugin(),
  ],
  mode: "development",
};
