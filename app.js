/* eslint-disable global-require */
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http');
const { Server } = require('socket.io');
const methodOverride = require('method-override');

const server = http.createServer(app);

// service
const { connectionCheck } = require('./services/db');
const redisClient = require('./services/redis');

// routes
const router = require('./routes');

// controller
const errorHandler = require('./controller/errorHandler');
const sessionController = require('./controller/socketControllers/sessionController');
const { messagesController, onUserTyping } = require('./controller/socketControllers/messagesController');
const { usersController, onUserConnection, userDisconnectController } = require('./controller/socketControllers/usersController');
const { onGameAction } = require('./controller/socketControllers/gameController');
const { InMemorySessionStore } = require('./controller/socketControllers/sessionStore');
const { InMemoryMessageStore } = require('./controller/socketControllers/messagesStore');

// helpers
const { SOCKET_CONNECTION, SOCKET_DISCONNECT } = require('./helpers/constants');

const messageStore = new InMemoryMessageStore(redisClient);
const sessionStore = new InMemorySessionStore(redisClient);

// socket
const io = new Server(server, {
  cors: {
    origin: process.env.EXPRESS_APP_FE_HOST,
  },
  adapter: require('socket.io-redis')({
    pubClient: redisClient,
    subClient: redisClient.duplicate(),
  }),
});

io.use(async (socket, next) => {
  const { sessionId } = socket.handshake.auth;
  if (sessionId) {
    const session = await sessionStore.findSession(sessionId);
    if (session) {
      socket.sessionId = sessionId;
      socket.userId = +session.userId;
      socket.name = session.name;
      return next();
    }
  }

  const { name } = socket.handshake.auth;
  const { userId } = socket.handshake.auth;

  if (!name || !userId) return next(new Error('invalid username'));

  socket.sessionId = +userId;
  socket.userId = +userId;
  socket.name = name;
  next();
});

io.on(SOCKET_CONNECTION, (socket) => {
  usersController({ io, socket, sessionStore });
  onUserConnection({ io, socket });
  sessionController({
    io,
    socket,
    sessionStore,
    messageStore,
  });
  messagesController({ io, socket, messageStore });
  onGameAction({ io, socket });
  onUserTyping({ io, socket });

  socket.on(SOCKET_DISCONNECT, async () => {
    userDisconnectController({ io, socket, sessionStore });
  });
});

io.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

// api
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(methodOverride());
app.use(router);

// errors handlers
app.use(errorHandler);

connectionCheck().then(() => {
  server.listen(process.env.EXPRESS_APP_PORT, () => {
    console.log(`listening on *:${process.env.EXPRESS_APP_PORT}`);
  });
});
