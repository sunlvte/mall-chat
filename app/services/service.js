/**
 * 基础服务
 * @author luoage@msn.cn
 */
const path = require('path');
const _ = require('lodash');
const userModel = require('../models/user');
const base64id = require('base64id');

module.exports = class service
{

  /**
   * 加载方法
   *
   * @param string name
   * @example
   * filename@function
   *
   * @return Promise
   */
  static action(name) {
    const [file, func] = name.split('@');

    return function(...args) {
      return new Promise(resolve => {
        resolve(require(path.resolve(process.cwd(), file + '.js'))[func](...args));
      }).catch(e => {
        console.log(e);
      });
    }
  }

  /**
   * 柯里化
   * 使用function.bind(fn, ...)实现
   * @deprecated
   */
  static curry(fn, ...args) {
    return function(...args1) {
      return fn(...args, ...args1);
    };
  }

  /**
   * 增加随机数
   *
   * @param string prefix
   * @return string
   */
  static uniqueId(prefix) {
    return (prefix || '') + base64id.generateId();
  }

  /**
   * 判断是否为客服
   *
   * @param socke
   * @param Boolean force 强制数据库检查
   * @return Boolean
   */
  static async isService(socket, force = false) {
    if (!socket) {
      return false;
    }

    const query = socket.handshake.query;
    const where = _.pick(query, ['_id', 'token']);

    if (!where._id || !where.token) {
      return false;
    }

    if (force) {
      return !!await userModel.findOne(where);
    }

    return true;
  }

};
