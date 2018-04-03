/**
 * 基础服务
 *
 * @author luoage@msn.cn
 */
const path = require('path');
const _ = require('lodash');
const userModel = require('../models/user');
const base64id = require('base64id');
const debug = require('debug');

module.exports.__proto__ = {

  /**
   * 加载方法
   *
   * @param string name
   * @example
   * filename@function
   *
   * @return Promise
   */
  action(name) {
    const [file, func] = name.split('@');

    return (...args) => {
      return new Promise(resolve => {
        resolve(require(path.resolve(process.cwd(), file + '.js'))[func](...args));
      }).catch(e => {
        this.debug()('action errors');
        console.error(e);
      });
    }
  },

  /**
   * 增加随机数
   *
   * @param string prefix
   * @return string
   */
  uniqueId(prefix) {
    return (prefix || '') + base64id.generateId();
  },

  /**
   * 判断是否为客服
   *
   * @param socke
   * @param Boolean force 强制数据库检查
   * @return Boolean
   */
  async isService(socket, force = false) {
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
  },

  /**
   * 获取config目录配置文件
   *
   * @param string key
   * @return mixed
   */
  config(key) {
    const [filename] = key.split('.');
    const config = {};

    if (!config[filename]) {
      config[filename] = require(path.resolve(process.cwd(), 'config', filename));
    }

    return _.get(config, key);
  },

  /**
   * debug
   * @param string file
   * @return function
   */
  debug(file) {
    return debug('chat:' + path.relative(process.cwd(), file));
  },

  /**
   * 回复
   *
   * @param string key code.key
   * @param mixed data
   *
   * return
   */
  reply(key, data, cb) {
    const result = _.extend({}, this.config(key));

    result.data = data;
    typeof cb === 'function' && cb(result);

    return result;
  },

};
