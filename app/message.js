/**
 * 消息定义
 *
 * @author luoage@msn.cn
 */
const connection = require('./services/connection');
const message = require('./services/message');
const service = require('./services/service');
const debug = require('debug')('chat:app/message');
const config = service.config;

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
    if (!data.to) {
      return;
    }

    message.sendAnswerMessage(socket.id, data);
    message.sendAnswerMessage(data.to, data);

    // @TODO 存储消息
  },

  /**
   * 用户发送新消息
   */
  async [config('message.askMessage')](socket, data) {
    message.sendAskMessage(socket.id, data);

    await message.sendAskFromUserToService(socket, data);
  },

};
