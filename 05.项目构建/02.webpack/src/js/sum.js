function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

export default sum;
