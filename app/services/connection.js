/**
 * 链接
 *
 * @author luoage@msn.cn
 */

const connectionModel = require('../models/connection');
const userModel = require('../models/user');
const Service = require('./service');
const _ = require('lodash');

module.exports = new class extends Service
{

  /**
   * 根据咨询id获取客户id
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
  }

  // 切断链接
  async disconnect(socket) {
    await connectionModel.findOneAndUpdate({
      side_socket_id: socket.id,
    }, {
      is_active: false,
      disconnect_at: Date.now(),
    });

    // 如果是客服需要下线
  },

};
