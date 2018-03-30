/**
 * 消息定义
 *
 * @author luoage@msn.cn
 */
const users = require('./services/users');
const connection = require('./services/connection');
const message = require('./services/message');
const service = require('./services/service');
const debug = require('debug')('chat:app/message');

module.exports = {

  // 离线
  async ['disconnect'](socket) {
    await connection.disconnect(socket);

    debug('disconnect with socket.id: %s', socket.id);
  },

  // 设置客服状态
  async ['service identification'](socket, data) {
    await users.serviceIdentify(socket, data);

    debug('service online with query: %o', socket.handshake.query);
  },

  // 用户认证
  async ['identification'](socket, data) {
    // 匹配客服
    const user = await users.userIdentify(socket, data);

    if (!user) {
      socket.emit('destory');
      debug('all services offline');
      return;
    }

    // @TODO 认证成功后给客服增加一个消息提醒

    if (user && user.socket_id) {
      message.addSide(this.nsps, user.socket_id, {
        to: socket.id,
      });
    }
  },

  // 客服回复消息
  async ['replay message'](socket, data) {
    if (!data.to) {
      return;
    }

    message.sendMessage(this.nsps, socket.id, data);
    message.sendMessage(this.nsps, data.to, data);

    // @TODO 存储消息
  },

  // 用户发送消息
  async ['new message'](socket, data) {
    message.sendMessage(this.nsps, socket.id, data);

    // @TODO 存储消息
    //
    // 发送消息给客服
    const user = await connection.getServiceSocketId(socket.id);

    if (user && user.socket_id) {
      message.sendMessage(this.nsps, user.socket_id, data);
    }
  },

};
