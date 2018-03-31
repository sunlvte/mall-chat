/**
 * @author luoage@msn.cn
 */

const userModel = require('../models/user');
const connectionModel = require('../models/connection');
const industryModel = require('../models/industry');
const service = require('./service');
const _ = require('lodash');
const debug = require('debug')('chat:app/service/users');
const message = require('./message');
const config = service.config;

module.exports.__proto__ = {

  /**
   * 连接认证, 所有用户必须走这一步
   * 1. 客服需要直接设置状态
   * 2. 咨询的用户需要判断是哪家公司
   *
   * @param socket
   * @return Boolean
   */
  async identify(socket) {
    const where = _.pick(socket.handshake.query, ['_id', 'token']);

    if (_.isEmpty(where)) {
      return false;
    }

    // 客服
    if (await service.isService(socket, true)) {
      return await this.serviceIdentify(socket);
    }

    // 用户
    return this.userIdentify(socket);
  },

  /**
   * 用户匹配客服
   *
   * @param socket
   * @return Boolean
   */
  async userIdentify(socket) {
    const where = _.pick(socket.handshake.query, ['token']);
    const industry = await industryModel.findOne(where);

    if (!industry) {
      return false;
    }

    const service = await this.getActiveSocket(socket);

    if (!service) {
      socket.emit(config('message.activeSerivceEmpty'));
    }

    return true;
  },

  /**
   * 获取在线客服，并把匹配的客服写入关系表
   *
   * @param socket
   * @return mixed
   */
  async getActiveSocket(socket) {
    const list = await userModel.getActiveList();

    if (!list.length) {
      return false;
    }

    const index = _.random(0, list.length - 1);
    const user = list[index];

    debug('get service %j', user);

    // 写入关系表
    await connectionModel.create({
      service_name: user.name,
      service_id: user._id,
      side_socket_id: socket.id,
      is_active: true,
    });

    // 给客服增加提醒
    message.newUserComes(user.socket_id, {to: socket.id});

    return user;
  },


  /**
   * 客服认证
   *
   * @param socket
   * @return Boolean
   */
  async serviceIdentify(socket) {
    const query = socket.handshake.query;

    await userModel.setSocket(query._id, socket.id);
    debug('service online with query: %o', socket.handshake.query);

    return true;
  },

  /**
   * 客服下线
   *
   * @param string socketId
   */
  async disconnect(socketId) {
    return await userModel.setOfflineBySocketId(socketId);
  },

};
