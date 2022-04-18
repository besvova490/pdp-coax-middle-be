const { v4: uuidv4 } = require('uuid');
const {
  SOCKET_GAME_COMMAND,
  SOCKET_GAME_CREATE_NEW_GAME,
  SOCKET_GAME_NEW_GAME_CREATED,
  SOCKET_GAME_USER_CONNECTED,
  SOCKET_GAME_COMMAND_ENEMY,
} = require('../../helpers/constants');

function onGameAction({ io, socket }) {
  socket.on(SOCKET_GAME_COMMAND, ({
    ball, rocket, rocketEnemy, to, score,
  }) => {
    io.to([to]).emit(SOCKET_GAME_COMMAND, {
      rocket, rocketEnemy, ball, score,
    });
  });

  socket.on(SOCKET_GAME_CREATE_NEW_GAME, () => {
    const roomId = uuidv4().slice(0, 6);
    socket.join(roomId);

    io.to([roomId]).emit(SOCKET_GAME_NEW_GAME_CREATED, { hash: roomId });
  });

  socket.on(SOCKET_GAME_COMMAND_ENEMY, ({ rocket, to }) => {
    io.to([to]).emit(SOCKET_GAME_COMMAND_ENEMY, { rocket, to });
  });
}

function onUserConnect({ io, socket }) {
  socket.on(SOCKET_GAME_USER_CONNECTED, ({ game }) => {
    socket.join(game);

    io.to([game]).emit(SOCKET_GAME_USER_CONNECTED, 'New User connected');
  });
}

module.exports = {
  onGameAction,
  onUserConnect,
};
