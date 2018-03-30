/**
 * @author luaoge@msn.cn
 */
const Koa = require('koa');
const render = require('koa-art-template');
const path = require('path');
const app = new Koa();
const router = require('./router');
const io = require('./io');

// setting
const server = app.listen(3000, () =>  {
  console.log('listen on port 3000');
});

// socket io
io.use(server);

app.use((ctx, next) => {
  const time = +new Date();

  next();
  console.log('time:', ((+new Date() - time)/1000).toFixed(3), 's');
});

// 配置
render(app, {
  root: path.join(__dirname, '../view'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
app.use(router.routes()).use(router.allowedMethods());
