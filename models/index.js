const User = require('./User');
const Workdays = require('./Workdays');

// Write Table relationships here

Workdays.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Workdays, {
    foreignKey: 'user_id',
});

module.exports = { User, Workdays };
