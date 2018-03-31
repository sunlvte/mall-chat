/**
 * 企业
 *
 * @author luoage@msn.cn
 */
const mongoose = require('./mongoose');

const schema = mongoose.Schema({
  mobile: {
    type: String,
    requred: true
  },
  token: {
    type: String,
    unique: true,
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
};

module.exports = mongoose.model('industries', schema);
