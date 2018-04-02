/**
 * collect mongodb
 *
 * @author luoage@msn.cn
 */

const mongoose = require('mongoose');
const debug = require('debug')('chat:models/mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION, {
  autoIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  debug('mongodb connect successfully');
});

module.exports = mongoose;
