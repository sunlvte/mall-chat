/**
 * 对话存储
 *
 * @author luoage@msn.cn
 */
const chatModel = require('../models/chat');
const message = require('./message');
const service = require('./service');
const config = service.config;
const debug = service.debug(__filename);

module.exports.__proto__ = {

  /**
   * 写入客服对话内容
   *
   * @param socket
   * @param object data
   * @return
   */
  async insertAnswerMessage(socket, data) {
    const query = socket.handshake.query;

    return await chatModel.create({
      msg: data.msg,
      from_socket_id: socket.id,
      to_socket_id: data.to,
      token: query.token,
    });
  },

  /**
   * 写入用户对话内容
   *
   * @param socket
   * @param object data
   */
  async insertAskMessage(socket, data) {
    const query = socket.handshake.query;

    return await chatModel.create({
      msg: data.msg,
      from_socket_id: socket.id,
      to_socket_id: data.to,
      token: query.token,
    });
  },

  /**
   * 获取最近的聊天记录
   * 非陌生人, 匹配成功后获取最近聊天记录
   *
   * @TODO 未使用分页，不支持过多的聊天记录
   * @param socket
   * @return void
   */
  async getRecentMessage(socket, data, cb) {
    if ( socket.id.match(/\|_chat_\|/) || !socket.handshake.query.token) {
      return;
    }

    const list = await chatModel.getRecentMessage(socket);

    service.reply('code.success', {list}, cb);
  },

}
