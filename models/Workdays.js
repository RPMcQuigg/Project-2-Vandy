const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workdays extends Model {}

Workdays.init(
{
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },
    date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    },
    revenue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    },
    expenses: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    },
    hours: {
    type: DataTypes.INTEGER,
    allowNull: true,
    },
    miles: {
    type: DataTypes.INTEGER,
    allowNull: true,
    },
    rain: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    },
    temperature: {
    type: DataTypes.INTEGER,
    allowNull: true,
    },
    user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'user',
        key: 'id',
    },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'workdays',
}
);

module.exports = Workdays;
