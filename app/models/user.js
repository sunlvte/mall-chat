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

  // 获取在线客服
  async getActiveSocket(socket) {
    const list = await Model.find({socket_id: {$nin: ['']}, is_active: true});

    if (!list.length) {
      return false;
    }

    const index = _.random(0, list.length - 1);
    const user = list[index];

    // 写入关系表
    await connection.insert({
      service_name: user.name,
      service_id: user._id,
      side_socket_id: socket.id,
      is_active: true,
    });
    return user;
  },

};
