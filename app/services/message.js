/**
 * 链接
 *
 * @author luoage@msn.cn
 */

const Service = require('./service');
const _ = require('lodash');

module.exports = new class extends Service
{

  /**
   * 发送新消息
   *
   * @param 发消息程序
   * @param array 身份ids
   * @param 发送数据
   */
  sendMessage(nsps, socketId, data) {
    const [room] = socketId.split('#');

    nsps[room].to(socketId).emit('new message', data);
  }

  /**
   * 新用户过来了
   *
   * @param 发消息程序
   * @param array 身份ids
   * @param 发送数据
   */
  addSide(nsps, socketId, data) {
    const [room] = socketId.split('#');

    nsps[room].to(socketId).emit('add side', data);
  }

}
