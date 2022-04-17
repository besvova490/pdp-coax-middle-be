const { SOCKET_GAME_COMMAND } = require('../../helpers/constants');

function onGameAction({ io, socket }) {
  socket.on(SOCKET_GAME_COMMAND, ({ newPosition, to }) => {
    io.to([to]).emit(SOCKET_GAME_COMMAND, { newPosition });
  });
}

module.exports = {
  onGameAction,
};
