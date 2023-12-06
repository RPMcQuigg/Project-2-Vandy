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

        res.status(200).json(workData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const workData = await Workdays.findAll({
            where: {
                user_id: req.user.id
            }
        });
        res.status(200).json(workData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Lifetime
router.get('/revenue', async (req, res) => {
    try {
        const totalRevenue = await Workdays.sum('revenue', {
            where: {
                user_id: req.user.id,
            },
        });

        res.status(200).json({ totalRevenue });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/expenses', async (req, res) => {
    try {
        const totalRevenue = await Workdays.sum('expenses', {
            where: {
                user_id: req.user.id,
            },
        });

        res.status(200).json({ totalRevenue });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/net-income', async (req, res) => {
    try {
        const totalRevenue = await Workdays.sum('revenue', {
            where: {
                user_id: req.user.id,
            },
        });

        const totalExpenses = await Workdays.sum('expenses', {
            where: {
                user_id: req.user.id,
            },
        });

        const netIncome = totalRevenue - totalExpenses;

        res.status(200).json(netIncome);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/miles', async (req, res) => {
    try {
        const totalMiles = await Workdays.sum('miles', {
            where: {
                user_id: req.user.id,
            },
        });

        res.status(200).json(totalMiles);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/hours', async (req, res) => {
    try {
        const totalHours = await Workdays.sum('hours', {
            where: {
                user_id: req.user.id,
            },
        });

        res.status(200).json(totalHours);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;