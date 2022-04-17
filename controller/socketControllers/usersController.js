const { SOCKET_USER_DISCONNECTED, SOCKET_NEW_USER_CONNECTED, SOCKET_USERS } = require('../../helpers/constants');

async function usersController({ socket, sessionStore }) {
  const users = [];

  const sessions = await sessionStore.findAllSessions();

  sessions.forEach((session) => {
    users.push({
      userId: session.userId,
      name: session.name,
      connected: session.connected,
    });
  });

  socket.emit(SOCKET_USERS, users);
}

function onUserConnection({ socket }) {
  socket.broadcast.emit(SOCKET_NEW_USER_CONNECTED, {
    connected: true,
    userId: socket.userId,
    name: socket.name,
  });
}

async function userDisconnectController({ io, socket, sessionStore }) {
  const matchingSockets = await io.in(socket.userId).allSockets();
  const isDisconnected = matchingSockets.size === 0;
  if (isDisconnected) {
    socket.broadcast.emit(SOCKET_USER_DISCONNECTED, socket.userId);
    sessionStore.saveSession(socket.sessionId, {
      userID: socket.userId,
      name: socket.name,
      connected: false,
    });
  }
}

module.exports = {
  usersController,
  onUserConnection,
  userDisconnectController,
};
