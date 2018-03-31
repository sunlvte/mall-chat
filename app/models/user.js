/**
 * 客服
 *
 * @author luoage@msn.cn
 */
const mongoose = require('./mongoose');
const _ = require('lodash');
const connection = require('./connection');

const collection = 'users';

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

const Model = mongoose.model(collection, schema);

module.exports = {

  async insert(data) {
    return await new Model(data).save();
  },

  async findAll() {
    return await Model.find({});
  },

  /**
   * 查询多条数据
   *
   * @return list
   */
  async find(query) {
    return await Model.find(query);
  },

  /**
   * 查询单条数据
   *
   * @return null|Object
   */
  async findOne(query) {
    return await Model.findOne(query);
  },

  // 设置为激活状态
  async setSocket(_id, socketId) {
    return await Model.findOneAndUpdate({_id}, {socket_id: socketId, is_active: true});
  },

  // 设置下线
  async setOfflineBySocketId(socket_id) {
    return await Model.findOneAndUpdate({socket_id}, {is_active: false});
  },

  async getActiveList() {
    return await Model.find({socket_id: {$nin: ['']}, is_active: true});
  }

};
