/**
 * 企业
 *
 * @author luoage@msn.cn
 */
const mongoose = require('./mongoose');

const collection = 'chat';

const schema = mongoose.Schema({
  name: {
    type: String,
    requred: true
  },
  industry_name: {
    type: String,
  },
  token: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

const Model = mongoose.model(collection, schema);

const model = {

  async insert(data) {
    return await new Model(data).save();
  },

  async findAll() {
    return await Model.find({}).exec();
  },

};

module.exports = model;
