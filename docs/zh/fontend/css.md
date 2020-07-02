# CSS

一些css常用的东西

## 省略号

- 超出一行，省略号

```css
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
word-break: break-all;
```

- 超出多行，省略号

```css
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
line-clamp: 2;
-webkit-box-orient: vertical;
```

## 三角形

- 正三角形

```css
/** 正三角 */
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 25px 40px 25px;
  border-color: transparent transparent rgb(245, 129, 127) transparent;
}
```

- 倒三角

```css
/** 倒三角 */
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 40px 25px 0 25px;
  border-color:  rgb(245, 129, 127) transparent transparent transparent;
}
```

## flex相关

- flex-shrink 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。设置为0时不缩小。

## scroll相关

scroll:auto 时，内容超出时滑动条会自动呈现。

### 隐藏滑动条

```css
-webkit-scrollbar { width: 0; height: 0;  }
```
