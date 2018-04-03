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
   */
  async [config('message.answerMessage')](socket, data) {
    await message.sendAnswerFromServiceToUser(socket, data);
  },

  /**
   * 用户发送新消息
   */
  async [config('message.askMessage')](socket, data) {
    await message.sendAskFromUserToService(socket, data);
  },

  /**
   * 获取最近聊天记录
   */
  async[config('message.getRecentMessage')](socket, data) {
    await chat.getRecentMessage(socket, data);
  },
};
