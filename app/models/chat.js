/**
 * 聊天记录表
 *
 * @author luoage@msn.cn
 */
const mongoose = require('./mongoose');
const _ = require('lodash');

const schema = mongoose.Schema({
  from_socket_id: {
    type: String,
    required: true,
  },
  to_socket_id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  status: {
    type: Number, //1, 未读
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

schema.statics = {

  /**
   * 获取最近记录
   * @param socket
   *
   * @return Object
   */
  async getRecentMessage(socket) {
    const query = socket.handshake.query;
    const fields = {msg: 1, _id: false, from_socket_id: 1, to_socket_id: 1};

    return await this.find({
        $or: [
          {from_socket_id: socket.id},
          {to_socket_id: socket.id},
        ],
        status: 1,
        token: query.token,
      }, fields).limit(30).sort({created_at: 1});
  }

};

module.exports =  mongoose.model('chats', schema);
