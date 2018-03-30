/**
 * io操作基础类
 *
 * @author luoage@msn.cn
 */

module.exports = {

  async index(ctx, next) {
    await ctx.render('index');
  },

  async service(ctx, next) {
    await ctx.render('service');
  },

};
