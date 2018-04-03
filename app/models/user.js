/**
 * 客服/普通用户
 *
 * @author luoage@msn.cn
 */
const mongoose = require('./mongoose');
const _ = require('lodash');

const schema = mongoose.Schema({
  name: {
    type: String,
    requred: true
  },
  token: {
    type: String,
  },
  socket_id: {
    type: String,
    default: '',
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  type: {
    type: Number, // 1, 客服, 2，普通的咨询用户
  },
  status: {
    type: Number,
    default: 0, // 默认可用
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

/**
 * @reference http://mongoosejs.com/docs/api.html#Model
 */
schema.statics = {

  /**
   * 写入数据
   *
   * @param data
   */
  async insert(data) {
    return await this.create(data);
  },

  /**
   * 设置为激活状态
   *
   */
  async setSocket(_id, socketId) {
    return await this.findOneAndUpdate({_id}, {socket_id: socketId, is_active: true});
  },

  /**
   * 设置下线
   *
   * @param socket.id
   * @return object
   */
  async setOfflineBySocketId(socket_id) {
    return await this.findOneAndUpdate({socket_id}, {is_active: false});
  },

  /**
   * 获取正在活动的客服
   *
   * @return array
   */
  async getActiveServiceList() {
    return await this.find({socket_id: {$nin: ['']}, is_active: true, type: 1});
  }

};

module.exports = mongoose.model('users', schema);
