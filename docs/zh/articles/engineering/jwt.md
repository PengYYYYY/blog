# jwt与session-cookie

基于session和基于jwt的方式的主要区别就是用户的状态保存的位置，session是保存在服务端的，而jwt是保存在客户端的。

## JWT的原理

简单来说，JWT只是一个具有以下格式的字符串,它由三部分组成：

```js
header.payload.signature
```

```js
// header
{
 "typ": "JWT",
  "alg": "HS256" //算法
}
// payload
{
  "userId": "xxx" //存一个用户信息
}
// signature
{
  iss (issuer)：签发人
  exp (expiration time)：过期时间
  sub (subject)：主题
  aud (audience)：受众
  nbf (Not Before)：生效时间
  iat (Issued At)：签发时间
  jti (JWT ID)：编号
}
```

签名使用以下伪代码计算：

```js
data = base64urlEncode( header ) + “.” + base64urlEncode( payload )
hashedData = hash( data, secret ) // 密钥很重要
signature = base64urlEncode( hashedData )
```

### JWT 如何保护我们的数据

JWT 内的数据是经过编码和签名的，而不是加密的。编码数据的目的是转换数据的结构。签名数据允许数据接收器验证数据源的真实性。
因为服务器是知道密钥的，通过上面的三步就可以得到一个哈希值，然后进行比较后做匹配。

## JWT的优点

1. 可扩展性好 应用程序分布式部署的情况下，session需要做多机数据共享，通常可以存在数据库或者redis里面。而jwt不需要。
2. 无状态 jwt不在服务端存储任何状态。RESTful API的原则之一是无状态，发出请求时，总会返回带有参数的响应，不会产生附加影响。用户的认证状态引入这种附加影响，这破坏了这一原则。另外jwt的载荷中可以存储一些常用信息，用于交换信息，有效地使用 JWT，可以降低服务器查询数据库的次数。

## JWT的缺点

- 安全性

由于jwt的payload是使用base64编码的，并没有加密，因此jwt中不能存储敏感数据。而session的信息是存在服务端的，相对来说更安全。

- 性能

jwt太长。由于是无状态使用JWT，所有的数据都被放到JWT里，如果还要进行一些数据交换，那载荷会更大，经过编码之后导致jwt非常长，cookie的限制大小一般是4k，cookie很可能放不下，所以jwt一般放在local storage里面。并且用户在系统中的每一次http请求都会把jwt携带在Header里面，http请求的Header可能比Body还要大。而sessionId只是很短的一个字符串，因此使用jwt的http请求比使用session的开销大得多。

- 一次性

无状态是jwt的特点，但也导致了这个问题，jwt是一次性的。想修改里面的内容，就必须签发一个新的jwt。无法废弃通过上面jwt的验证机制可以看出来，一旦签发一个jwt，在到期之前就会始终有效，无法中途废弃。

- 续签

要改变jwt的有效时间，就要签发新的jwt。最简单的一种方式是每次请求刷新jwt，即每个http请求都返回一个新的jwt。这个方法不仅暴力不优雅，而且每次请求都要做jwt的加密解密，会带来性能问题。

## auth2.0

OAuth协议，是一种授权协议，常用于用户权限的授权。

### 授权码流程

采用Authorization Code获取Access Token的授权验证流程又被称为Web Server Flow，适用于所有有Server端的应用。有以下的几个步骤：

1. 通过client_id请求授权服务端，获取Authorization Code。
2. 通过Authorization Code、client_id、client_secret（保存在服务端）请求授权服务端，在验证完Authorization Code是否失效以及接入的客户端信息是否有效。授权服务端生成Access Token和Refresh Token并返回给客户端。
3. 客户端通过得到的Access Token请求资源服务应用，获取需要的且在申请的Access Token权限范围内的资源信息。
