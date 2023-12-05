const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Workdays = sequelize.define('Workdays', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    revenue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    expenses: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    hours: {
        type: DataTypes.INTEGER, 
        allowNull: true
    },
    miles: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rain: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    temperature: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    }
});

module.exports = Workdays;
