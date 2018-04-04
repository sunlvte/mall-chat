/**
 * 路由配置
 */
const Router = require('koa-router');
const {action} = require('./services/service');
const router = new Router();


// index
router.get('/', action('app/controller/chat@index'));
// service
router.get('/service', action('app/controller/chat@service'));

// API
// 企业数据写入
router.post('/api/industry/insert', action('app/controller/api/industry@insert'));


module.exports = router;
