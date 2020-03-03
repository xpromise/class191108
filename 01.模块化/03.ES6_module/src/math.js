function mul(x, y) {
  return x * y;
}

function count(x, y) {
  return x - y;
}

// 统一暴露 --> 暴露多项内容（后面跟对象）
export { mul, count };
