const router = require('express').Router();
const { Workdays } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const workData = await Workdays.create(req.body);

        req.body.date = workData.date;
        req.body.revenue = workData.revenue;
        req.body.expenses = workData.expenses;
        req.body.hours = workData.hours;
        req.body.miles = workData.miles;
        req.body.rain = workData.rain;
        req.body.temperature = workData.temperature;
        req.body.user = workData.user;

        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;