# JSBridge

JSBridge应用在混合开发中，他所实现的是H5和Native的双向通信。就是JavaScript(H5)与Native通信的桥梁。一般分为 JS 调用 Native 和 Native 主动调用 JS 两种形式。

## JSBridge与Native间通信原理

在H5中JavaScript调用Native的方式主要用两种：

- 注入API，注入Native对象或方法到JavaScript的window对象中（可以类比于RPC调用）。
- 拦截URL Schema，客户端拦截WebView的请求并做相应的操作（可以类比于JSONP）。

## URL Scheme

URL Scheme 是一种特殊的 URL，一般用于在 Web 端唤醒 App，甚至跳转到 App 的某个页面，比如在某个手机网站上付款的时候，可以直接拉起支付宝支付页面。你可以在浏览器里面直接输入 weixin://，系统就会提示你是否要打开微信。输入 mqq:// 就会帮你唤起手机 QQ。可以理解为代理模式（也不完全是代理模式）

## JS 调用 Native

JS 调用 Native 通信大致有三种方法：

- 拦截 Scheme
- 注入 JS 上下文

### 拦截 Scheme

仔细思考一下，如果是 JS 和 Java 之间传递数据，我们该怎么做呢？
对于前端开发来说，调 Ajax 请求接口是最常见的需求了。不管对方是 Java 还是 Python，我们都可以通过 http/https 接口来获取数据。实际上这个流程和 JSONP 更加类似。

#### JS

iframe 跳转：

1. 使用 a 标签跳转 `<a href="taobao://">点击我打开淘宝</a>`
2. 重定向 `location.href = "taobao://"`
3. iframe 跳转

### 注入上下文

iOS 中内置了 JavaScriptCore 这个框架，可以实现执行 JS 以及注入 Native 对象等功能。
这种方式不依赖拦截，主要是通过 WebView 向 JS 的上下文注入对象和方法，可以让 JS 直接调用原生。

#### iOS UIWebView

```objc
// 获取 JS 上下文
JSContext *context = [webview valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
// 注入 Block
context[@"callHandler"] = ^(JSValue * data) {
    // 处理调用方法和参数
    // 调用 Native 功能
    // 回调 JS Callback
}
```

```js
window.callHandler({
    type: "scan",
    data: "",
    callback: function(data) {
    }
});
```

#### iOS WKWebView

WKWebView 里面通过 addScriptMessageHandler 来注入对象到 JS 上下文，可以在 WebView 销毁的时候调用 removeScriptMessageHandler 来销毁这个对象。
前端调用注入的原生方法之后，可以通过 didReceiveScriptMessage 来接收前端传过来的参数。

```objc
WKWebView *wkWebView = [[WKWebView alloc] init];
WKWebViewConfiguration *configuration = wkWebView.configuration;
WKUserContentController *userCC = configuration.userContentController;

// 注入对象
[userCC addScriptMessageHandler:self name:@"nativeObj"];
// 清除对象
[userCC removeScriptMessageHandler:self name:@"nativeObj"];

// 客户端处理前端调用
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message
{
    // 获取前端传来的参数
    NSDictionary *msgBody = message.body;
    // 如果是 nativeObj 就进行相应处理
    if (![message.name isEqualToString:@"nativeObj"]) {
        // 
        return;
    }
}
```

使用 addScriptMessageHandler 注入的对象实际上只有一个 postMessage 方法，无法调用更多自定义方法。前端的调用方式如下：

```js
window.webkit.messageHandlers.nativeObj.postMessage(data);
```

## Native 调用 JS

`Native` 调用 `JS` 一般就是直接 `JS` 代码字符串，有些类似我们调用 JS 中的 `eval` 去执行一串代码。一般有 `loadUrl`、`evaluateJavascript` 等几种方法，客户端都只能拿到挂载到 window 对象上面的属性和方法。
