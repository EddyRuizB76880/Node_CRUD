const Sequelize = require('sequelize');

const sequelize = require('../database');

const Blog = sequelize.define('blog', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  content: Sequelize.STRING,
  imgUrl: Sequelize.STRING  
});

module.exports = Blog;
