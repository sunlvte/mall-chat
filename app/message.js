/**
 * 消息定义
 *
 * @author luoage@msn.cn
 */
const users = require('./services/users');
const connection = require('./services/connection');
const connection = require('./services/connection');
const message = require('./services/message');

module.exports = {

  // 离线
  async ['disconnect'](socket) {
    await connection.disconnect(socket);
  },

  // 客服认证
  async ['service identification'](socket, data) {
    // console.log('identification', socket.id);

    await users.serviceIdentify(socket, data);
  },

  // 用户认证
  async ['identification'](socket, data) {
    // 匹配客服
    const user = await users.userIdentify(socket, data);

    // @TODO 认证成功后给客服增加一个消息提醒

    if (user && user.socket_id) {
      console.log(user, 'add side');

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

    /*
    // @TODO 存储消息
    //
    // 发送消息给客服
    const user = await connection.getServiceSocketId(socket.id);

    if (user && user.socket_id) {
      message.sendMessage(this.nsps, user.socket_id, data);
    }
    */
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
