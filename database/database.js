const Sequelize = require('sequelize');

const connection = new Sequelize('rest', 'root', 'your_password', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;