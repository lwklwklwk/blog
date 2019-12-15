module.exports =function authMiddleware() {
  return async (ctx, next) => {
    if (ctx.headers.token) {
      await next();
    } else {
      ctx.status = 401
      ctx.body = {
        status:1,
        msg: '未登录'
      }
    }
  };
}
