// Needs a form for user input with fields [Date, Revenue, Expenses, Hours Worked, Miles Driven, Rain, Temperature] with submit at the end

// Workdays User Input Submit 

const workdaysInput = async (event) => {
    event.preventDefault();
    removeAllErrors();
    
    const date = document.querySelector('#date-input').value.trim();
    const revenue = document.querySelector('#revenue-input').value.trim();
    const expenses = document.querySelector('#expenses-input').value.trim();
    const hoursWorked = document.querySelector('#hoursWorked-input').value.trim();
    const milesDriven = document.querySelector('#milesDriven-input').value.trim();
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
        hoursWorked,
        milesDriven,
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