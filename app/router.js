const Router = require('koa-router');
const Token = require('./controllers/token');
const User = require('./controllers/user');
const Course = require('./controllers/course');

const router = new Router({
  prefix: '/api',
});

router.post('/token', Token.create);
router.get('/user', User.show);
router.get('/course', Course.show);

module.exports = router;