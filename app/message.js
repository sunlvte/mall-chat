/**
 * 消息定义
 *
 * @author luoage@msn.cn
 */
const connection = require('./services/connection');
const message = require('./services/message');
const service = require('./services/service');
const chat = require('./services/chat');
const config = service.config;
const debug = service.debug(__filename);

module.exports = {

  /**
   * 离线
   *
   */
  async ['disconnect'](socket) {
    await connection.disconnect(socket);

    debug('disconnect with socket.id: %s', socket.id);
  },

  /**
   * 客服回复消息
   *
   * @param socket
   * @param data
   * @param function cb
   * @return Promise
   */
  async [config('message.answerMessage')](socket, data, cb) {
    return await message.sendAnswerFromServiceToUser(socket, data, cb);
  },

  /**
   * 用户发送新消息
   *
   * @param socket
   * @param data
   * @param function cb
   * @return Promise
   */
  async [config('message.askMessage')](socket, data, cb) {
    return await message.sendAskFromUserToService(socket, data, cb);
  },

  /**
   * 获取最近聊天记录
   *
   * @param socket
   * @param data
   * @param function cb
   * @return Promise
   */
  async[config('message.getRecentMessage')](socket, data) {
    await chat.getRecentMessage(socket, data);
  },

};
