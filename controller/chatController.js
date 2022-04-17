//  services
const redisClient = require('../services/redis');

//  models
const DB = require('../models');

const { Chats, Users } = DB;

module.exports = {
  create: async (req, res, next) => {
    try {
      const { email } = req.user;
      const { newMemberId } = req.body;
      const user = await Users.findOne({ where: { email } });
      const newMember = await Users.findByPk(newMemberId);

      if (!newMember) return res.status(400).json({ detail: 'User not found' });

      const newChat = await Chats.create(
        {
          userId: user.id,
          memberId: newMemberId,
        },
      );

      await Chats.create({
        userId: newMemberId,
        memberId: user.id,
      });

      res.status(201).json(newChat);
    } catch (e) {
      next(new Error(e.message));
    }
  },

  getSingleChat: async (req, res, next) => {
    try {
      const { chatId } = req.params;
      const { email } = req.user;

      const user = await Users.findOne({ where: { email } });

      const [chat] = await user.getChats({
        where: { memberId: chatId },
        include: [{
          model: Users,
          as: 'member',
          attributes: ['name', 'email', 'id'],
        }],
      });

      if (!chat) return res.status(404).json({ detail: 'Chat not found' });

      const results = await redisClient
        .lrange(`messages:${chatId}`, 0, -1);

      return res.status(200).json({ chat, messages: results.map((item) => JSON.parse(item)) });
    } catch (e) {
      next(new Error(e.message));
    }
  },

  getChatsList: async (req, res, next) => {
    try {
      const { email } = req.user;
      const user = await Users.findOne({ where: { email } });

      const chatsList = await user.getChats({
        include: [
          { model: Users, as: 'member', attributes: ['name', 'email', 'id'] },
        ],
      });

      res.status(200).json(chatsList);
    } catch (e) {
      next(new Error(e.message));
    }
  },

  delete: async (req, res, next) => {
    try {
      const { chatId } = req.params;
      const { email } = req.user;

      const user = await Users.findOne({ where: { email } });

      const chat = await Chats.findOne({ where: { memberId: chatId, userId: user.id } });

      if (!chat) return res.status(404).json({ detail: 'Chat not found' });

      chat.destroy();

      res.sendStatus(204);
    } catch (e) {
      next(new Error(e.message));
    }
  },
};
