/**
 * @author luaoge@msn.cn
 */
const dotenv = require('dotenv').config();
const Koa = require('koa');
const render = require('koa-art-template');
const path = require('path');
const router = require('./app/router');
const io = require('./app/io');
const debug = require('debug')('chat:index');
const app = new Koa();

if (process.cwd() !== __dirname) {
  throw new Error('launch server error.');
}

if (dotenv.error) {
  throw dotenv.error;
}

// setting
const server = app.listen(3000, () =>  {
  debug('listen on port 3000');
});

// socket io
io.use(server);

app.use(async (ctx, next) => {
  const time = +new Date();

  await next();
  debug('time using: %d ms', +new Date() - time);
});

app.use(require('koa-static')('./dist'));

// 配置
render(app, {
  root: path.join(process.cwd(), 'view'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
app.use(router.routes()).use(router.allowedMethods());
