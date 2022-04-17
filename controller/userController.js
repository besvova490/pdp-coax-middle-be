const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

//  models
const DB = require('../models');

// helpers
const { generateTokens } = require('../helpers/jwtTokensHelpers');

const { Users, Chats } = DB;

module.exports = {
  create: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findAll({ where: { [Op.or]: [{ email }, { name }] } });

      if (user.length) return res.status(400).json({ details: 'User with such email || name already exist' });

      const newUser = await Users.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      });

      const { accessToken, refreshToken } = generateTokens({ id: newUser.id, email });

      res.status(201).json({ accessToken, refreshToken });
    } catch (e) {
      next(new Error(e.message));
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ where: { email } });

      if (!user) return res.status(404).json({ details: 'User not found' });
      if (!bcrypt.compareSync(password, user.password)) return res.status(403).json({ password: 'Invalid password' });

      const { accessToken, refreshToken } = generateTokens({ id: user.id, email });

      res.status(200).json({ accessToken, refreshToken });
    } catch (e) {
      next(new Error(e.message));
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const { email } = req.user;
      const user = await Users.findOne({ where: { email } });

      res.status(200).json({ name: user.name, email: user.email, id: user.id });
    } catch (e) {
      next(new Error(e.message));
    }
  },

  getUsersList: async (req, res, next) => {
    try {
      const { email } = req.user;

      const users = await Users.findAll({
        attributes: ['id', 'name', 'email'],
        where: { email: { [Op.ne]: email } },
        include: [{
          model: Chats,
          as: 'chats',
        }],
      });

      res.status(200).json({ users, count: users.length });
    } catch (e) {
      next(new Error(e.message));
    }
  },
};
