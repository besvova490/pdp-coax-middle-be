const { Router } = require('express');

//  controllers
const chatController = require('../controller/chatController');

const chatsRouter = Router();

chatsRouter.get('/', chatController.getChatsList);
chatsRouter.get('/:chatId', chatController.getSingleChat);
chatsRouter.post('/', chatController.create);
chatsRouter.delete('/:chatId', chatController.delete);

module.exports = chatsRouter;
