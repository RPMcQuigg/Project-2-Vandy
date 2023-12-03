const router = require('express').Router();
const userRoutes = require('./userRoutes');
const workdaysRoutes = require('./workdaysRoutes');

router.use('/users', userRoutes);
router.use('/workdays', workdaysRoutes);

module.exports = router;
