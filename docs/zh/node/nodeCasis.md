# node 基础

## 文件读取

同步读取中，以错误为导向的回调。

```js
const fs = require('fs')
// 同步读取
const data = fs.readFileSync("xxx")
console.log(data)

fs.redFile('xxx', (err, data) => {
  if(err) throw err
  console.log('data', data.toString())
})

```

- promise处理异步

```js
(async () => {
  const fs = require('fs')
  const { promisify } = require('util')
  const readFile = promisify(fs.readFile)
  const data = await readFile('xxx')
})()
```

## buffer

缓冲区：开辟了一段内存的区域。
出现原因，因为前期设计中，无对二进制数据的处理。相当于在内存中开启了一块二进制的缓冲区。

```js
// 创建一块buffer
const buf1 = Buffer.alloc(10)

// 读取字符串
const buf2 = Buffer.from("a")
console.log(buf2)

// 读取中文
// 创建Buffer包含的语言
const buf3 = Buffer.from("中文")
console.log(buf3)

// buffer链接
const buf4 = Buffer.concat([buf2, buf3]);
```

## http

http的输入和输出都是流

```js
const http = require("http")
const server = http.createServer((req, res) => {
  console.log("this is a req");
  res.end("hello world")
}).listen(3000)
```

## stream流

```js
const fs = require("fs")
const rs = fs.createReadStream("xxx")
const ws = fs.createWriteStream("xxx")

// 管道拼接
rs.pipe(wx);
```
