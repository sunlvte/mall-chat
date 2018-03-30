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
const debug = require('debug')('chat:app/io');


// 初始化房间
// 监听connection
// 监听disconnection
// 监听自定义事件
const generate = {

  // 初始化
  async init(io) {
    const paths = await chat.paths();
    debug('namespace:', paths);

    paths.forEach((path) => {
      const namespace = io.of(path);

      this.identify(namespace);
      namespace.on('connection', this.connection.bind(io));
    });
  },

  // 身份认证
  identify(namespace) {
    namespace.use(async (socket, next) => {
      const query = socket.handshake.query;
      const isValid = await users.identify(socket, query);

      if (isValid) {
        return next();
      }

      debug('Authentication error with query %j', query);
      next(new Error('权限不足'));
    });
  },

  // connection callback
  connection(socket) {
    debug('connection with socket.id: %s', socket.id);

    Object.keys(message).forEach((msg) => {
      socket.on(msg, (...args) => {
        message[msg].bind(this, socket, ...args)()
          .catch((e) => {
            console.error('errorCatched:', e);
            socket.emit('destory');
          });
      });
    });
  }

};

module.exports.use = function(server) {
  const io = socketIo(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    path: '/chat',
  });

  // auto rewrite socketId
  io.engine.generateId = function(req) {
    const reqUrl = url.parse(req.url);
    const query = querystring.parse(reqUrl.query);

    const id = query._id || query.id;

    return id || service.uniqueId('_sid_');
  };

  generate.init(io);
};
