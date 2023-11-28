const sequelize = require('../02p-starter-code/project-2-starter-code/config/connection');
const { User } = require('../02p-starter-code/project-2-starter-code/models');

const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
