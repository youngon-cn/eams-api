const jwt = require('jwt-simple');
const request = require('superagent');

exports.token = async (ctx, next) => {
  const { url, method } = ctx.request;
  if (url === '/api/token' && method === 'POST') {
    await next();
    return;
  }
  const token = String(ctx.headers.authorization);
  try {
    const user = jwt.decode(token.substring(7), 'youngon');
    if (!user || !user.cookies) {
      ctx.status = 403;
      ctx.body = '访问受限';
      return;
    }
    ctx.user = user;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = err.message;
  }
};