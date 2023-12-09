const router = require('express').Router();
const { Workdays } = require('../../models');
const _ = require('underscore');
const datejs = require('datejs');

router.get('/', async (req, res) => {
    try {
        const workData = await Workdays.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(workData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        req.body.user_id = req.session.user_id;
        const workData = await Workdays.create(req.body);

        req.body.date = workData.date;
        req.body.revenue = workData.revenue;
        req.body.expenses = workData.expenses;
        req.body.hours = workData.hours;
        req.body.miles = workData.miles;
        req.body.rain = workData.rain;
        req.body.temperature = workData.temperature;

        res.status(200).json(workData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


router.get('/monthly', async (req, res) => {
    try {
        let workdayData = await Workdays.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['date', 'revenue', 'expenses'],
            order: [['date', 'ASC']],
            raw: true,
        });

        let groupedWorkdaysByMonth = _.groupBy(workdayData, function (workday) {
            const date = new Date(workday.date);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            return `${month} ${year}`;
        });

        let monthlyWorkdayTotals = [];

        _.keys(groupedWorkdaysByMonth).forEach((date) => {
            let revenueSum = 0.0;
            let expensesSum = 0.0;

            groupedWorkdaysByMonth[date].forEach((workDay) => {
                revenueSum += parseFloat(workDay.revenue);
                expensesSum += parseFloat(workDay.expenses);
            });

            let netIncome = revenueSum - expensesSum;

            monthlyWorkdayTotals.push({ date, revenueSum, expensesSum, netIncome });
        });

        res.status(200).json(monthlyWorkdayTotals);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/yearly', async (req, res) => {
    try {
        let workdayData = await Workdays.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['date', 'revenue', 'expenses'],
            order: [['date', 'ASC']],
            raw: true,
        });

        let groupedWorkdaysByYear = _.groupBy(workdayData, function (workday) {
            const date = new Date(workday.date);
            return date.getFullYear();
        });

        let yearlyWorkdayTotals = [];

        _.keys(groupedWorkdaysByYear).forEach((date) => {
            let revenueSum = 0.0;
            let expensesSum = 0.0;

            groupedWorkdaysByYear[date].forEach((workDay) => {
                revenueSum += parseFloat(workDay.revenue);
                expensesSum += parseFloat(workDay.expenses);
            });

            let netIncome = revenueSum - expensesSum;

            yearlyWorkdayTotals.push({ date, revenueSum, expensesSum, netIncome });
            console.log(yearlyWorkdayTotals);
        });

        res.status(200).json(yearlyWorkdayTotals);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/daily-statistics', async (req, res) => {
    try {

        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0);

        let workdayData = await Workdays.findAll({
            where: {
                user_id: req.session.user_id,
                date: todayStart
            },
            attributes: ['date', 'revenue', 'expenses', 'hours', 'miles', 'temperature'],
            raw: true,
        });

        let stats = {
            revenue: 0.00,
            expenses: 0.00,
            netIncome: 0.00,
            hours: 0,
            miles: 0,
            averageTemperature: 0
        }

        workdayData.forEach((workday) => {
            stats.revenue += parseFloat(workday.revenue);
            stats.expenses += parseFloat(workday.expenses);
            stats.hours += workday.hours;
            stats.miles += workday.miles;
            stats.averageTemperature += workday.temperature;
        });

        stats.netIncome = stats.revenue - stats.expenses;
        stats.averageTemperature = stats.averageTemperature / workdayData.length;

        res.status(200).json(stats);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/lifetime-statistics', async (req, res) => {
    try {
        let workdayData = await Workdays.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['date', 'revenue', 'expenses', 'hours', 'miles', 'temperature'],
            raw: true,
        });

        let stats = {
            revenue: 0.00,
            expenses: 0.00,
            netIncome: 0.00,
            hours: 0,
            miles: 0,
            averageTemperature: 0
        }

        workdayData.forEach((workday) => {
            stats.revenue += parseFloat(workday.revenue);
            stats.expenses += parseFloat(workday.expenses);
            stats.hours += workday.hours;
            stats.miles += workday.miles;
            stats.averageTemperature += workday.temperature;
        });

        stats.netIncome = stats.revenue - stats.expenses;
        stats.averageTemperature = stats.averageTemperature / workdayData.length;

        res.status(200).json(stats);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;