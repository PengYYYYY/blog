# Auth

基于 `session` 和基于 `JWT` 的方式的主要区别就是用户的状态保存的位置，`session` 是保存在服务端的，而 `JWT` 是保存在客户端的。

## JWT 的原理

简单来说，`JWT` 只是一个具有以下格式的字符串,它由三部分组成：

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

`JWT` 内的数据是经过编码和签名的，而不是加密的。编码数据的目的是转换数据的结构。签名数据允许数据接收器验证数据源的真实性。
因为服务器是知道密钥的，通过上面的三步就可以得到一个哈希值，然后进行比较后做匹配。

## JWT 的优点

1. 可扩展性好 应用程序分布式部署的情况下，`session` 需要做多机数据共享，通常可以存在数据库或者 `redis` 里面。而 `JWT` 不需要。
2. 无状态 `JWT` 不在服务端存储任何状态。`RESTfulAPI` 的原则之一是无状态，发出请求时，总会返回带有参数的响应，不会产生附加影响。用户的认证状态引入这种附加影响，这破坏了这一原则。另外 `JWT` 的载荷中可以存储一些常用信息，用于交换信息，有效地使用 `JWT`，可以降低服务器查询数据库的次数。

## JWT 的缺点

- 安全性

由于 `JWT` 的 `payload` 是使用 `base64` 编码的，并没有加密，因此 `JWT` 中不能存储敏感数据。而 `session` 的信息是存在服务端的，相对来说更安全。

- 性能

`JWT` 太长。由于是无状态使用 `JWT`，所有的数据都被放到 `JWT` 里，如果还要进行一些数据交换，那载荷会更大，经过编码之后导致 `JWT` 非常长，cookie 的限制大小一般是 4k，cookie 很可能放不下，所以 `JWT` 一般放在 `localStorage` 里面。并且用户在系统中的每一次 `http` 请求都会把 `JWT` 携带在 `Header` 里面，`http` 请求的 `Header` 可能比 `Body` 还要大。而 `sessionId` 只是很短的一个字符串，因此使用 `JWT` 的 `http` 请求比使用 `session` 的开销大得多。

- 一次性

无状态是 `JWT` 的特点，但也导致了这个问题，`JWT` 是一次性的。想修改里面的内容，就必须签发一个新的 `JWT`。无法废弃通过上面 `JWT` 的验证机制可以看出来，一旦签发一个 `JWT`，在到期之前就会始终有效，无法中途废弃。

- 续签

要改变 JWT 的有效时间，就要签发新的 `JWT`。最简单的一种方式是每次请求刷新 JWT，即每个 http 请求都返回一个新的 JWT。这个方法不仅暴力不优雅，而且每次请求都要做 JWT 的加密解密，会带来性能问题。

### JWT 的登出操作

在实现登出操作的时候，此时 `JWT` 并没过期，且 `JWT` 是无状态的，我们可以将这类 `key`，存在 `redis` 里面，然后在权鉴时做判断，`redis` 中 `key` 的实效时间，就是 `JWT` 的失效时间。

## Auth2.0

OAuth协议，是一种授权协议，常用于用户权限的授权。

### 授权码流程

采用 Authorization Code 获取 Access Token 的授权验证流程又被称为 Web Server Flow，适用于所有有 Server端的应用。有以下的几个步骤：

1. 通过 client_id 请求授权服务端，获取 Authorization Code。
2. 通过 Authorization Code、client_id、client_secret（保存在服务端）请求授权服务端，在验证完 Authorization Code 是否失效以及接入的客户端信息是否有效。授权服务端生成 Access Token 和 Refresh Token 并返回给客户端。
3. 客户端通过得到的 Access Token 请求资源服务应用，获取需要的且在申请的 Access Token 权限范围内的资源信息。
