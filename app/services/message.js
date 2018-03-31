/**
 * 链接
 *
 * @author luoage@msn.cn
 */
const connection = require('./connection');
const _ = require('lodash');
const service = require('./service');
const config = service.config;

module.exports.__proto__ = {

  /**
   * socket io, 发消息程序
   */
  io: {},

  /**
   * 发送新消息
   *
   * @param array 身份ids
   * @param 发送数据
   */
  sendAskMessage(socketId, data) {
    const [room] = socketId.split('#');

    this.io.nsps[room].to(socketId).emit(config('message.askMessage'), data);
  },

  /**
   * 发送新消息
   *
   * @param array 身份ids
   * @param 发送数据
   */
  sendAnswerMessage(socketId, data) {
    const [room] = socketId.split('#');

    this.io.nsps[room].to(socketId).emit(config('message.answerMessage'), data);
  },

  /**
   * 新用户过来了
   *
   * @param array 身份ids
   * @param 发送数据
   */
  newUserComes(socketId, data) {
    const [room] = socketId.split('#');

    this.io.nsps[room].to(socketId).emit(config('message.newUserComes'), data);
  },

  /**
   * 用户发送信息给客服
   *
   * @TODO 保存信息
   * @param socket
   * @param data 
   * @return void
   */
  async sendAskFromUserToService(socket, data) {
    // 发送消息给客服
    const service = await connection.getServiceSocketId(socket.id);

    if (!service) {
      return;
    }

    this.sendAskMessage(service.socket_id, data);
  }

};
