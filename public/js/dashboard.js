const revenueExpensesElement = document.getElementById("revenueExpensesChart").getContext("2d");
const switchChartButtonElement = document.getElementById("switchChartButton");

const lifetimeRevenueValueElement = document.getElementById("lifetimeRevenueValue");
const lifetimeExpensesValueElement = document.getElementById("lifetimeExpensesValue");
const lifetimeNetIncomeValueElement = document.getElementById("lifetimeNetIncomeValue");
const lifetimeMilesDrivenValueElement = document.getElementById("lifetimeMilesDrivenValue");
const lifetimeHoursWorkedValueElement = document.getElementById("lifetimeHoursWorkedValue");
const lifetimeAverageTemperatureValueElement = document.getElementById("lifetimeAverageTemperatureValue");

const dailyRevenueValueElement = document.getElementById("dailyRevenueValue");
const dailyExpensesValueElement = document.getElementById("dailyExpensesValue");
const dailyNetIncomeValueElement = document.getElementById("dailyNetIncomeValue");
const dailyMilesDrivenValueElement = document.getElementById("dailyMilesDrivenValue");
const dailyHoursWorkedValueElement = document.getElementById("dailyHoursWorkedValue");
const dailyAverageTemperatureValueElement = document.getElementById("dailyAverageTemperatureValue");

let revenueExpensesChart;
let displayingMonthly;

document.addEventListener("DOMContentLoaded", function () {

    getMonthlyWorkdays();
    getLifetimeStatistics();
    getDailyStatistics();

});

const getLifetimeStatistics = async () => {
    try {
        const response = await fetch('/api/workdays/lifetime-statistics', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) return;

        let stats = await response.json();

        lifetimeRevenueValueElement.innerText = `$${stats.revenue.toLocaleString('en-US')}`;
        lifetimeExpensesValueElement.innerText = `$${stats.expenses.toLocaleString('en-US')}`;
        lifetimeNetIncomeValueElement.innerText = `$${stats.netIncome.toLocaleString('en-US')}`;
        lifetimeHoursWorkedValueElement.innerText = stats.hours;
        lifetimeMilesDrivenValueElement.innerText = stats.miles;
        lifetimeAverageTemperatureValueElement.innerText = `${stats.averageTemperature}\u00B0F`;;

    } catch (err) {
        console.log(err);
    }
};

const getDailyStatistics = async () => {
    try {
        const response = await fetch('/api/workdays/daily-statistics', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) return;

        let stats = await response.json();

        dailyRevenueValueElement.innerText = `$${stats.revenue.toLocaleString('en-US')}`;
        dailyExpensesValueElement.innerText = `$${stats.expenses.toLocaleString('en-US')}`;
        dailyNetIncomeValueElement.innerText = `$${stats.netIncome.toLocaleString('en-US')}`;
        dailyHoursWorkedValueElement.innerText = stats.hours;
        dailyMilesDrivenValueElement.innerText = stats.miles;
        dailyAverageTemperatureValueElement.innerText = `${stats.averageTemperature}\u00B0F`;;

    } catch (err) {
        console.log(err);
    }
};

const getMonthlyWorkdays = async () => {
    try {
        const response = await fetch('/api/workdays/monthly', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) return;

        let monthlyWorkdayData = await response.json();
        createMonthlyWorkdayChart(monthlyWorkdayData);

    } catch (err) {
        console.log(err);
    }
}

const createMonthlyWorkdayChart = (monthlyWorkdayData) => {

    const xAxisLabels = monthlyWorkdayData.map(row => row.date);
    const inDollars = true;

    const datasets = [
        {
            label: "Revenue by Month",
            borderColor: "rgb(75, 192, 192)",
            data: monthlyWorkdayData.map(row => row.revenueSum),
            fill: false,
        },
        {
            label: "Expenses by Month",
            borderColor: "rgb(255, 99, 132)",
            data: monthlyWorkdayData.map(row => row.expensesSum),
            fill: false,
        },
        {
            label: "Net Income by Month",
            borderColor: "rgb(0, 100, 0)",
            data: monthlyWorkdayData.map(row => row.netIncome),
            fill: false,
        }
    ];

    if (!revenueExpensesChart) {
        revenueExpensesChart = createLineChart(revenueExpensesElement, xAxisLabels, datasets, inDollars);
    } else {
        revenueExpensesChart.data = {
            labels: xAxisLabels,
            datasets: datasets
        };
        revenueExpensesChart.update();
    }

    displayingMonthly = true;
    switchChartButtonElement.innerText = "Switch to Yearly";
};

const getYearlyWorkdays = async () => {
    try {
        const response = await fetch('/api/workdays/yearly', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) return;

        let yearlyWorkdayData = await response.json();
        createYearlyWorkdayChart(yearlyWorkdayData);

    } catch (err) {
        console.log(err);
    }
}

const createYearlyWorkdayChart = (yearlyWorkdayData) => {

    const xAxisLabels = yearlyWorkdayData.map(row => row.date);
    const inDollars = true;

    const datasets = [
        {
            label: "Revenue by Year",
            borderColor: "rgb(255, 99, 132)",
            data: yearlyWorkdayData.map(row => row.revenueSum),
            fill: false,
        },
        {
            label: "Expenses by Year",
            borderColor: "rgb(75, 192, 192)",
            data: yearlyWorkdayData.map(row => row.expensesSum),
            fill: false,
        },
        {
            label: "Net Income by Year",
            borderColor: "rgb(0, 100, 0)",
            data: yearlyWorkdayData.map(row => row.netIncome),
            fill: false,
        }
    ];

    if (!revenueExpensesChart) {
        revenueExpensesChart = createLineChart(revenueExpensesElement, xAxisLabels, datasets, inDollars);
    } else {
        revenueExpensesChart.data = {
            labels: xAxisLabels,
            datasets: datasets
        };
        revenueExpensesChart.update();
    }

    displayingMonthly = false;
    switchChartButtonElement.innerText = "Switch to Monthly";
};

const createLineChart = (docElement, xAxisLabels, datasets, inDollars) => {

    return new Chart(docElement, {
        type: 'line',
        data: {
            labels: xAxisLabels,
            datasets: datasets,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        callback: function (value, index, ticks) {
                            if (inDollars) return '$' + value;
                            return value;
                        }
                    }
                }
            }
        },
    });

};

const switchRevenueExpensesChart = async () => {
    if (displayingMonthly) {
        getYearlyWorkdays();
    } else {
        getMonthlyWorkdays();
    }
}

const addWorkday = async (event) => {
    event.preventDefault();

    const newData = {
        date: document.querySelector('#date-input').value.trim(),
        revenue: document.querySelector('#revenue-input').value.trim(),
        expenses: document.querySelector('#expenses-input').value.trim(),
        miles: document.querySelector('#miles-input').value.trim(),
        hours: document.querySelector('#hours-input').value.trim(),
        rain: document.querySelector('#rain-input').value.trim(),
        temperature: document.querySelector('#temperature-input').value.trim()
    }

    if (newData.rain == "on") {
        newData.rain = 1
    } else {
        newData.rain = 0
    }

    try {
        const response = await fetch('/api/workdays', {
            method: 'POST',
            body: JSON.stringify(newData),
            headers: { 'Content-Type': 'application/json' },
        });

        const res = await response.json();

        if (!response.ok) {
            return;
        }

        if (displayingMonthly) {
            getMonthlyWorkdays();
        } else {
            getYearlyWorkdays();
        }

    } catch (err) {
        console.log(err);
    }
};