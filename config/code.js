/**
 * 定义返回码
 *
 */

module.exports = {

  success: {
    code: 0,
    value: 'success',
  },

  // 客服不存在
  noSerivces: {
    code: 100,
    value: 'no services',
  },

  // 无效的客户id
  invalidCustomerId: {
    code: 1000,
    msg: 'invalid customer id',
  },

};
