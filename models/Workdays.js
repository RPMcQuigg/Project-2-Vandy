const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workdays extends Model {}

const Workdays = sequelize.define('Workdays', {
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    revenue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    expenses: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    hours: {
        type: Sequelize.INTEGER, 
        allowNull: true
    },
    miles: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    rain: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    temp: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

module.exports = Workdays;
