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


module.exports = router;
