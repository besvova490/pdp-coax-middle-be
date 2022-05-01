module.exports = (sequelize, DataTypes) => {
  const BlogCategories = sequelize.define('BlogCategories', {
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
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  });

  BlogCategories.associate = (models) => {
    BlogCategories.belongsToMany(models.BlogPosts, {
      through: models.BlogPostCategories,
      as: 'posts',
      foreignKey: 'categoryId',
    });
  };
  return BlogCategories;
};
