/**
 * 链接
 *
 * @author luoage@msn.cn
 */

const connectionModel = require('../models/connection');
const userModel = require('../models/user');
const service = require('./service');
const _ = require('lodash');
const users = require('./users');
const debug = service.debug(__filename);

module.exports.__proto__ = {

  /**
   * 根据咨询socket.id 获取客户id
   *
   * @TODO 无客服时消息处理
   * @param string socketId
   * @return object
   */
  async getServiceSocketId(sideSocketId) {
    const con = await connectionModel.findOne({
      side_socket_id: sideSocketId,
      is_active: true,
    });

    if (!con) {
      return;
    }

    const user = await userModel.findOne({
      _id: con.service_id, 
      is_active: true,
    });

    if (!user) {
      return;
    }

    return user;
  },

  /**
   * 切断链接
   * @param socket
   * @return void
   */
  async disconnect(socket) {
    if (!await service.isService(socket)) {
      return await this.offlineSide(socket.id);
    }

    // 如果是客服需要下线
    debug('service offline with socket.id: %s', socket.id);

    return await this.offlineService(socket.id);
  },
  
  // 用户下线
  async offlineSide(socketId) {
    return await connectionModel.findOneAndUpdate({
        side_socket_id: socketId,
        is_active: true,
      }, {
        is_active: false,
        disconnect_at: Date.now(),
      }).sort({created_at: -1}).exec();
  },

  /**
   * 客服下线
   *
   * @param string socketId
   * @return Object
   */
  async offlineService(socketId) {
    const user = await users.disconnect(socketId);

    return await connectionModel.findOneAndUpdate({
        service_id: user._id,
        is_active: true,
      }, {
        is_active: false,
        disconnect_at: Date.now(),
        disconnect_by: 'service',
      }).sort({created_at: -1}).exec();
  },

};
