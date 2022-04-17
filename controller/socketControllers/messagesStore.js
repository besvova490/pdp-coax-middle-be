const CONVERSATION_TTL = 24 * 60 * 60;

class InMemoryMessageStore {
  constructor(redisClient) {
    this.redisClient = redisClient;
  }

  saveMessage(message) {
    const massageToString = JSON.stringify(message);
    this.redisClient
      .multi()
      .rpush(`messages:${message.from}`, massageToString)
      .rpush(`messages:${message.to}`, massageToString)
      .expire(`messages:${message.from}`, CONVERSATION_TTL)
      .expire(`messages:${message.to}`, CONVERSATION_TTL)
      .exec();
  }

  findMessagesForUser(userId) {
    return this.redisClient
      .lrange(`messages:${userId}`, 0, -1)
      .then((results) => results.map((result) => JSON.parse(result)));
  }
}

module.exports = {
  InMemoryMessageStore,
};
