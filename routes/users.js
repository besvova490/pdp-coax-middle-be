const { Router } = require('express');

//  controllers
const userController = require('../controller/userController');

const usersRouter = Router();

usersRouter.get('/', userController.getUsersList);

module.exports = usersRouter;
