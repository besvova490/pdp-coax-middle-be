module.exports = (sequelize, DataTypes) => {
  const BlogPostTags = sequelize.define('BlogPostTags', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tagId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  });

  return BlogPostTags;
};
