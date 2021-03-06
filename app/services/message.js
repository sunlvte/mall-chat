/**
 * 链接
 *
 * @author luoage@msn.cn
 */
const connection = require('./connection');
const _ = require('lodash');
const service = require('./service');
const chat = require('./chat');
const config = service.config;
const debug = service.debug(__filename);

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
   * @param socket
   * @param data
   * @return 返回客服数据
   */
  async sendAskFromUserToService(socket, data, cb) {
    const user = await connection.getServiceSocketId(socket.id);

    if (!user) {
      service.reply('code.noSerivces', data, cb);
      return;
    }

    // 保存信息
    const chats = await chat.insertAskMessage(socket, _.extend({}, data, {
      to: user.socket_id
    }));

    this.sendAskMessage(user.socket_id, data);

    service.reply('code.success', data, cb);

    return chats;
  },

  /**
   * 客服发送信息给用户
   *
   * @param socket
   * @param data
   * @param function cb
   * @return void
   */
  async sendAnswerFromServiceToUser(socket, data, cb) {
    if (!data.to) {
      service.reply('code.invalidCustomerId', data, cb);
      return;
    }

    const chats = chat.insertAnswerMessage(socket, data);

    service.reply('code.success', data, cb);

    this.sendAnswerMessage(data.to, data);
  },

  /**
   * 发送公共信息
   *
   * @param socket
   * @param data
   * @return void
   */
  send(socket, data) {
    socket.emit('messages', data);
  },

  /**
   * 发送最近聊天记录
   *
   * @return void
   */
  async sendRecentMessage(socket, list) {
    const [room] = socket.id.split('#');

    debug('%s of socket.id %s', config('message.getRecentMessage'), socket.id);
    this.io.nsps[room].to(socket.id).emit(config('message.getRecentMessage'), list);
  },

};
