const Sequelize = require('sequelize');
const connection = require('../database/database');

const Dish = connection.define('dishes', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    ingredients: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    
    price: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
});

Dish.sync({force: false});

module.exports = Dish;