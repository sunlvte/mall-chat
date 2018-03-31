/**
 * 关系表
 *
 * @author luoage@msn.cn
 */
const mongoose = require('./mongoose');
const _ = require('lodash');

const schema = mongoose.Schema({
  // 客服名称
  service_name: {
    type: String,
    requred: true
  },
  // 客服id
  service_id: {
    required: true,
    type: String,
  },
  // 咨询人的socket_id
  side_socket_id: {
    type: String,
    default: '',
  },
  // 咨询人身份，用来确认身份
  side_identify: {
    type: String,
    default: '',
  },
  // 是否还在链接
  is_active: {
    type: Boolean,
    default: false,
  },
  disconnect_by: {
    type: String,
  },
  // 咨询人最后离开时间
  disconnect_at: {
    type: Date,
    default: null,
  },
  // 创建时间
  created_at: {
    type: Date,
    default: Date.now,
  }
});

/**
 * @reference http://mongoosejs.com/docs/api.html#Model
 */
schema.statics = {
};

module.exports = mongoose.model('connection', schema);
