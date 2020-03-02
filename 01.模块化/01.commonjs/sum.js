/**
 * sum功能模块
 * @param  {...any} args
 */
function sum(...args) {
  // reduce一般用来统计、求和。。。
  const result = args.reduce((previous, current) => {
    /*
      previous 上一次返回值，默认值为 0
      current 当前数组遍历的值，item
    */
    return previous + current;
  }, 0);

  return result;
}

// 暴露出去~
module.exports = sum;
