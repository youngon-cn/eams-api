const jwt = require('jwt-simple');
const authTJCU = require('auth-tjcu');

exports.create = async (ctx) => {
  const { username, password } = ctx.request.body;
  const service = 'http://j.tjcu.edu.cn/caslogin.jsp';
  const result = await authTJCU(service, {
    username,
    password
  });
  if (result.state === 0) {
    ctx.status = 400;
    ctx.body = result.msg;
    return;
  }
  ctx.body = jwt.encode({
    cookies: result.cookies
  }, 'youngon');
}