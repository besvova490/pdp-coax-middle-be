module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chats', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isMuted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    memberId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  });

  Chat.associate = (models) => {
    Chat.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
    });
    Chat.belongsTo(models.Users, {
      as: 'member',
      foreignKey: 'memberId',
    });
  };

  return Chat;
};
