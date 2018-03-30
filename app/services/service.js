/**
 * 基础服务
 * @author luoage@msn.cn
 */
const path = require('path');
const _ = require('lodash');

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
    const id = [];

    if (prefix) {
      id.push(prefix);
    }

    id.push(new Date().getTime());

    id.push(_.uniqueId());

    id.push(_.random(10000, 99999));

    return id.join('');
  }

};
