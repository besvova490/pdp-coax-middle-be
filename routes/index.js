const router = require('express').Router();

// routes
const auth = require('./auth');
const users = require('./users');
const chatsRouter = require('./chat');

//  middleware
const authMiddleware = require('../middleware/protect');

router.use('/users', authMiddleware, users);
router.use('/chats', authMiddleware, chatsRouter);
router.use('/auth', auth);
router.use('*', (_, res) => res.sendStatus(404));

module.exports = router;
