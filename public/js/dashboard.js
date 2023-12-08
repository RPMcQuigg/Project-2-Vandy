const submitBtnEl = getElementById('')

document.addEventListener("DOMContentLoaded", function () {
    let financialData = [];

    const initializeCharts = () => {
        createChart("monthlyRevenueChart", "Monthly Revenue", "rgb(255, 99, 132)");
        createChart("yearlyRevenueChart", "Yearly Revenue", "rgb(255, 99, 132)");
        createChart("monthlyExpensesChart", "Monthly Expenses", "rgb(75, 192, 192)");
        createChart("yearlyExpensesChart", "Yearly Expenses", "rgb(75, 192, 192)");
        createChart("monthlyTotalChart", "Monthly Total", "rgb(0, 0, 0)");
        createChart("yearlyTotalChart", "Yearly Total", "rgb(0, 0, 0)");
    };

    const createChart = (id, label, color) => {
        const ctx = document.getElementById(id).getContext("2d");
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: label,
                    borderColor: color,
                    data: [],
                    fill: false,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'category',
                        labels: [],
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    };

    const updateCharts = () => {
        const dateInput = document.getElementById("date-input").value.trim();
        const revenueInput = parseFloat(document.getElementById("revenue-input").value.trim());
        const expensesInput = parseFloat(document.getElementById("expenses-input").value.trim());

        if (!dateInput || isNaN(revenueInput) || isNaN(expensesInput)) {
            alert("Please provide valid inputs.");
            return;
        }

        const entry = {
            date: dateInput,
            revenue: revenueInput,
            expenses: expensesInput,
        };

        financialData.push(entry);

        updateChartData();
        updateChart("monthlyRevenueChart", getMonthlyData(financialData, "revenue"));
        updateChart("yearlyRevenueChart", getYearlyData(financialData, "revenue"));
        updateChart("monthlyExpensesChart", getMonthlyData(financialData, "expenses"));
        updateChart("yearlyExpensesChart", getYearlyData(financialData, "expenses"));

        const totalData = calculateTotalData(financialData);
        updateChart("monthlyTotalChart", getMonthlyData(totalData, "total"));
        updateChart("yearlyTotalChart", getYearlyData(totalData, "total"));
    };

    const updateChartData = () => {
        const currentDate = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        financialData = financialData.filter(entry => new Date(entry.date) >= thirtyDaysAgo);
    };

    const getMonthlyData = (data, dataType) => {
        const currentDate = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const filteredData = data.filter(entry => new Date(entry.date) >= lastMonth);
        return {
            labels: filteredData.map(entry => entry.date),
            data: filteredData.map(entry => entry[dataType]),
        };
    };

    const getYearlyData = (data, dataType) => {
        const currentYear = new Date().getFullYear();

        const filteredData = data.filter(entry => new Date(entry.date).getFullYear() === currentYear);
        return {
            labels: Array.from({ length: 12 }, (_, i) => (i + 1).toString()), // Labels for each month
            data: Array.from({ length: 12 }, (_, i) => {
                const monthData = filteredData.filter(entry => new Date(entry.date).getMonth() === i);
                return monthData.reduce((total, entry) => total + entry[dataType], 0);
            }),
        };
    };
});

// TODO: Finish this function. This will generate a chart for lifetime revenue.
const revChart = (id, label, color) => {

    // Fetch Data From WorkdaysRoutes


    const ctx = document.getElementById(id).getContext("2d");
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: label,
                borderColor: color,
                data: [],
                fill: false,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    labels: [],
                },
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
};

// New Data Submit Button
const postWorkday = async (event) => {
    event.preventDefault();
    removeAllErrors();

    const newData = {
        date: document.querySelector('#date-input').value.trim();
        revenue: document.querySelector('#revenue-input').value.trim();
        expenses: document.querySelector('#expenses-input').value.trim();
        miles: document.querySelector('#miles-input').value.trim();
        hours: document.querySelector('#hours-input').value.trim();
        rain: document.querySelector('#rain-input').value.trim();
        temperature: document.querySelector('#temperature-input').value.trim();
    }

    try {
        const newWorkday = await fetch('/api/workdays', {
            method: 'POST',
            body: JSON.stringify(newData),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) {
            const res = await response.json();
            console.log(res);
            return;
        }
    
        res.status(200).json(newWorkday);
    } catch (err) {
        console.log(err);
    }
};

submitBtnEl.addEventListener('click', postWorkday);

/*const workdaysInput = async (event) => {
    event.preventDefault();
    removeAllErrors();
    
    const date = document.querySelector('#date-input').value.trim();
    const revenue = document.querySelector('#revenue-input').value.trim();
    const expenses = document.querySelector('#expenses-input').value.trim();
    const hours = document.querySelector('#hours-input').value.trim();
    const miles = document.querySelector('#miles-input').value.trim();
    const rain = document.querySelector('#rain-input').value.trim();
    const temperature = document.querySelector('#temperature-input').value.trim();
    // TODO: session User = User

    
    if (!date) {
        showError(dateInputEl, "Please provide a date.")
        return;
    }
    
    const newLog = {
        date,
        revenue,
        expenses,
        hours,
        miles,
        rain,
        temperature
    }
    
    try {
        const response = await fetch('/api/workdays/', {
            method: 'POST',
            body: JSON.stringify(newLog),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (!response.ok) {
        const res = await response.json();
        console.log(res);
        return;
        }
        
    } catch (err) {
        console.log(err);
    }
};

// Not yet connected to db
new Chart(
    document.getElementById('dashboard-chart'),
    {
        type: 'line',
        data: {
            labels: data.map(row => row.date),
            datasets: [
                {
                    label: 'Daily Revenue',
                    data: data.map(row => row.revenue)
                }
            ]
        }
    }
)*/