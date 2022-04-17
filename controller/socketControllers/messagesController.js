const { SOCKET_PRIVATE_MESSAGE, SOCKET_USER_IS_TYPING } = require('../../helpers/constants');

function messagesController({ io, socket, messageStore }) {
  socket.on(SOCKET_PRIVATE_MESSAGE, ({ message, to }) => {
    const messageObj = {
      message,
      to,
      from: socket.userId,
    };

    io.to([to, socket.userId]).emit(SOCKET_PRIVATE_MESSAGE, messageObj);
    messageStore.saveMessage(messageObj);
  });
}

function onUserTyping({ io, socket }) {
  socket.on(SOCKET_USER_IS_TYPING, ({ isTyping, to }) => {
    io.to([to]).emit(SOCKET_USER_IS_TYPING, { isTyping });
  });
}

module.exports = {
  messagesController,
  onUserTyping,
};
