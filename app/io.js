/**
 * 初始化io
 *
 * @author luoage@msn.cn
 */

const socketIo = require('socket.io');
const chat = require('./controller/io');
const messageService = require('./services/message');
const users = require('./services/users');
const _ = require('lodash');
const url = require('url');
const querystring = require('querystring');
const service = require('./services/service');
const messages = require('./message');
const debug = service.debug(__filename);


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
      if (await users.identify(socket)) {
        return next();
      }

      debug('authentication error with query %j', socket.handshake.query);
      next(new Error('权限不足'));
    });
  },

  // connection callback
  connection(socket) {
    debug('connection with socket.id: %s', socket.id);

    Object.keys(messages).forEach((msg) => {
      socket.on(msg, (...args) => {
        messages[msg].bind(this, socket, ...args)()
          .catch((e) => {
            socket.emit('destory');
            debug('messages errors, destory the socket .');
            console.error(e);
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

  messageService.io = io;

  // auto rewrite socketId
  io.engine.generateId = function(req) {
    const reqUrl = url.parse(req.url);
    const query = querystring.parse(reqUrl.query);
    const id = query._id || query.id;

    return id || service.uniqueId('_sid_');
  };

  generate.init(io);
};
