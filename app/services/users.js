/**
 *
 */

const userModel = require('../models/user');
const Service = require('./service');
const _ = require('lodash');

module.exports = new class extends Service
{

  /**
   * 连接认证
   * 所有用户必须走这一步
   *
   * @TODO
   */
  async identify(socket, query) {
    const where = _.pick(query, ['_id', 'token']);
    const auth = await userModel.findOne(where);

    return auth;
  }

  /**
   * 用户匹配客服
   * @TODO
   * @param socket
   * @param data
   */
  async userIdentify(socket, data) {
    const query = socket.handshake.query;

    return  await userModel.getActiveSocket(socket);
  }

  /**
   * 客服认证
   * @TODO
   * @param socket
   * @param data
   */
  async serviceIdentify(socket, data) {
    const query = socket.handshake.query;

    await userModel.setSocket(query._id, socket.id);

    return true;
  }

  /**
   * 客服下线
   */
  async disconnect(socketId) {
  }
};
