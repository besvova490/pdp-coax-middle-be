module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  });

  User.associate = (models) => {
    User.hasMany(models.Chats, {
      as: 'chats',
      foreignKey: 'userId',
    });
  };

  return User;
};
