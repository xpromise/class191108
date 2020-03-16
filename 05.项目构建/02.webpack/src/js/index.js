import sum from "./sum";

// webpack中需要手动引入参与打包的资源
// 如果不引入，就不会打包
import '../less/a.less';
import '../less/b.less';

console.log(sum(1, 2, 3, 4));
