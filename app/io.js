/**
 * 初始化io
 *
 * @author luoage@msn.cn
 */

const socketIo = require('socket.io');
const chat = require('./controller/io');
const message = require('./message');
const users = require('./services/users');
const _ = require('lodash');
const url = require('url');
const querystring = require('querystring');
const service = require('./services/service');

// 初始化房间
// 监听connection
// 监听disconnection
// 监听自定义事件
const generate = {

  // 初始化
  async init(io) {
    const paths = await chat.paths();

    console.log('namespace:', paths);

    await this.identify(io);

    paths.forEach((path) => {
      io.of(path).on('connection', this.connection.bind(io));
    });
  },

  // 链接权限
  async identify(io) {
    io.use(async (socket, next) => {
      const query = socket.handshake.query;
      const isValid = await users.identify(socket, query);

      if (isValid) {
        return next();
      }

      // @TODO
      next(new Error('无权限 !'));
    });
  },

  // 事件
  connection(socket) {
    console.log('connection:', socket.id);

    Object.keys(message).forEach(msg => {
      socket.on(msg, message[msg].bind(this, socket));
    });
  }

};

module.exports.use = function(server) {
  const io = socketIo(server);

  io.engine.generateId = function(req) {
    const reqUrl = url.parse(req.url);
    const id = querystring.parse(reqUrl.query).id;

    return id || service.uniqueId('_sid_');
  };

  generate.init(io);
};
