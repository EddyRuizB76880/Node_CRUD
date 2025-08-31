const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog-project', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
