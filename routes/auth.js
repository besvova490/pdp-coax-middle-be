const { Router } = require('express');

// middleware
const authMiddleware = require('../middleware/protect');

//  controller
const userController = require('../controller/userController');

// helpers
const { verifyToken } = require('../helpers/jwtTokensHelpers');

const authRouter = Router();

authRouter.get('/profile', authMiddleware, userController.getProfile);
authRouter.post('/', userController.login);
authRouter.post('/register', userController.create);

authRouter.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ detail: 'No refresh token has been provided' });

    verifyToken(
      refreshToken,
      ({
        accessToken,
        refreshToken: refreshTokenNew,
      }) => res.status(200).json({ accessToken, refreshToken: refreshTokenNew }),
      (e) => res.status(401).json({ detail: e }),
    );
  } catch (e) {
    next(new Error(e.message));
  }
});

module.exports = authRouter;
