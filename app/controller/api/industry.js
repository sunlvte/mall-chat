/**
 * 企业操作
 *
 * @author luoage@msn.cn
 */
const Controller = require('../controller');
const industry = require('../../services/industry');

module.exports = new class extends Controller {

  async insert(ctx) {
    console.log(ctx.request.body);
    // ctx.body = await industry.insert();
  }

};
