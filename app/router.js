/**
 * 路由配置
 */
const Router = require('koa-router');
const {action} = require('./services/service');
const router = new Router();


// index
router.get('/customer', action('app/controller/chat@customer'));
// service
router.get('/index', action('app/controller/chat@index'));

// API
// 企业数据写入
router.post('/api/industry/insert', action('app/controller/api/industry@insert'));


module.exports = router;
