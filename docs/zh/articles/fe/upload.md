# 文件上传

做公司组件库时，有文件上传的需求，一开始认为非常简单，仔细做了之后发现，需要考虑的点还是很多，于是整理了一下整体思路。

## 简单实现

拿到需求的时候感觉这可不要太简单啊，三下五除二就解决了。一开始的核心代码如下

```vue
<template>
  <input ref="fileSelect" class="imgSelect" type="file" accept="image/*" @change="imgChange">
</template>
<script>
export default {
  methods: {
    imgChange(e) {
      const files = e.target.files
      if (!files.length) return
      if (files[0].size > this.maxSize * 1024 * 1024) {
        // 超出文件大小
        return
      }
      let self = this
      // 压缩包
      new Compressor(files[0], {
        quality: 0.8,
        success(file) {
          const fileNameSplit = file.name.split('.')
          const fileExt = fileNameSplit[fileNameSplit.length - 1]
          const index = self.previewFile(file)
          let data = new FormData()
          data.append('file', file, file.name)
          if (self.customUpload) return
          self.uploadFiles(data, index, fileExt)
        }
      })
    },
    uploadFiles(formData, index, ext) {
      const xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatechange', (e) => {
        const { currentTarget } = e
        if (currentTarget.readyState === 4) {
          if (currentTarget.status != 200) {
            // 上传失败
          } else {
            // 上传成功 
          }
        }
      })
      const url = 'xxx'
      xhr.open('POST', url)
      xhr.send(formData)
    },
  }
}
</script>
```

上面的文件上传面对简单的上传场景还可以，但是遇到到了复杂场景之后，是绝对不够健壮的。如大文件上传和断点续传。

## 大文件上传

### 实现思路

- 前端

前端大文件上传网上的大部分文章已经给出了解决方案，核心是利用 `Blob.prototype.slice` 方法，和数组的 `slice` 方法相似，调用的 `slice` 方法可以返回原文件的某个切片。可以根据预先设置好的切片最大数量将文件切分为一个个切片，然后借助 http 的可并发性，同时上传多个切片，这样从原本传一个大文件，变成了同时传多个小的文件切片，可以大大减少上传时间。

另外由于是并发，传输到服务端的顺序可能会发生变化，所以我们还需要给每个切片记录顺序。

- 服务端

服务端需要负责接受这些切片，并在接收到所有切片后合并切片。
要点：前端通过一个额外请求或者每个切片都携带切片最大数量的信息，也可以额外发送一个请求主动通知服务端进行切片的合并。
如何合并切片，可以使用 nodejs 的 读写流（readStream/writeStream），将所有切片的流传输到最终文件的流里。

```vue
<template>
   <div>
    <input type="file" @change="fileChange" />
    <button @click="handleUpload">上传</button>
  </div>
</template>

<script>
const size = 10 * 1024 * 1024;
export default {
  data() {
    return {
      container: {
        file: null
      },
      data: []
    }
  },
  methods: {
    fileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      this.container.file = file;
    },
    request() {

    },
    async handleUpload() {
      if (!this.container.file) return;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.data = fileChunkList.map(({ file }，index) => ({
        chunk: file,
        hash: this.container.file.name + "-" + index // 文件名 + 数组下标
      }));
      await this.uploadChunks();
    }
  }
};
</script>

```
