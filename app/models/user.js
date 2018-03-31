/**
 * 客服
 *
 * @author luoage@msn.cn
 */
const mongoose = require('./mongoose');
const _ = require('lodash');
const connection = require('./connection');

const schema = mongoose.Schema({
  name: {
    type: String,
    requred: true
  },
  industry_id: {
    type: String,
  },
  token: {
    type: String,
  },
  type: {
    type: Number, // 1, 客服
  },
  socket_id: {
    type: String,
    default: '',
  },
  is_active: {
    type: Boolean,
    default: false,
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

  async insert(data) {
    return await this.create(data);
  },

  // 设置为激活状态
  async setSocket(_id, socketId) {
    return await this.findOneAndUpdate({_id}, {socket_id: socketId, is_active: true});
  },

  // 设置下线
  async setOfflineBySocketId(socket_id) {
    return await this.findOneAndUpdate({socket_id}, {is_active: false});
  },

  async getActiveList() {
    return await this.find({socket_id: {$nin: ['']}, is_active: true});
  }

};

module.exports = mongoose.model('users', schema);
