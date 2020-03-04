/*
  Buffer用来存储二进制数据的容器
    1. 创建Buffer
      Buffer.alloc(size)  里面数据全是0
      Buffer.allocUnsafe(size) 里面可能包含敏感数据
      Buffer.from(string) 将字符串转换成Buffer数据
    2. 使用Buffer

    Buffer位于global上，所以不需要引入，直接使用

    00000000 - 11111111
    00 - ff
    
    英文一个字节、中文三个字节

    1 byte / b = 8 bit
    1 kb = 1024 byte
    1 mb = 1024 kb 
    1 gb = 1024 mb
    1 tb = 1024 gb
*/

// const buf1 = Buffer.alloc(10);
// console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>
// const buf2 = Buffer.allocUnsafe(10);
// console.log(buf2); // <Buffer c9 dd 43 08 00 00 00 00 00 00>
const buf3 = Buffer.from('hello atguigu');
console.log(buf3); // <Buffer 68 65 6c 6c 6f 20 61 74 67 75 69 67 75>
// const buf4 = Buffer.from('尚硅谷');
// console.log(buf4); // <Buffer e5 b0 9a e7 a1 85 e8 b0 b7>

/* buf3.forEach((item, index) => {
  console.log(item); // 打印时会自动转换成10进制显示
}) */

// buf3.fill(0); // 将数据全部填充0
// console.log(buf3); // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00>

console.log(buf3.toString()); // hello atguigu
