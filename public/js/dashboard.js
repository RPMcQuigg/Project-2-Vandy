import Chart from 'chart.js/auto';

// Needs a form for user input with fields [Date, Revenue, Expenses, Hours Worked, Miles Driven, Rain, Temperature] with submit at the end

// Workdays User Input Submit 
document.addEventListener("DOMContentLoaded", function () {
    let chartData = {
        labels: [],
        datasets: [
            {
                label: "revenue",
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
            },
            {
                label: "expenses",
                borderColor: 'rgb(75, 192, 192)',
                data: [],
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category',
                labels: chartData.labels,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const ctx = document.getElementById("lineChart").getContext("2d");
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: options,
    });

    window.addData = function (dataType) {
        const inputElement = document.getElementById(dataType);
        const formData = {
            label: new Date().toLocaleDateString(),
            data: Number(inputElement.value),
        };

        chartData.labels.push(formData.label);
        chartData.datasets.find(ds => ds.label === dataType).data.push(formData.data);

        lineChart.update();

        inputElement.value = "";
    };

    window.filterData = function () {
    };
});

const workdaysInput = async (event) => {
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
)