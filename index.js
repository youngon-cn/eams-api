const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./app/router');
const filter = require('./app/middlewares/filter');

const app = new Koa();

app.use(bodyParser());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    ctx.body = '服务端错误';
    console.error(err);
  }
});
app.use(filter.token);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
