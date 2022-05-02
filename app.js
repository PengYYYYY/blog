/* eslint-disable */

const express = require('express')
const path = require('path')
const app = express()
const PORT = 8083

app.use(express.static(path.resolve(__dirname, './docs/.vuepress/dist')))

app.use(`/blog`, express.static(path.resolve('./.vitepress/dist')))

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
