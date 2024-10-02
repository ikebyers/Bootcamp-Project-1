const formDataLocal = JSON.parse(localStorage.getItem('formData'));

function displayFormData(formData) {
    if (formData) {

        // Populate the HTML elements with the retrieved data
        document.getElementById('monthlyIncome').textContent = `$${formData.income}`;
        document.getElementById('housing').textContent = `$${formData.expenses.rent}`;
        document.getElementById('utilities').textContent = `$${formData.expenses.utilities}`;
        document.getElementById('groceries').textContent = `$${formData.expenses.groceries}`;
        document.getElementById('gasTransportation').textContent = `$${formData.expenses.gas}`;
        document.getElementById('health-insurance').textContent = `$${formData.expenses.insurance.healthInsurance}`;
        document.getElementById('car-insurance').textContent = `$${formData.expenses.insurance.carInsurance}`;
        document.getElementById('home-insurance').textContent = `$${formData.expenses.insurance.homeInsurance}`;
        document.getElementById('life-insurance').textContent = `$${formData.expenses.insurance.lifeInsurance}`;
        document.getElementById('subscriptions').textContent = `$${formData.expenses.subscribe}`;
        document.getElementById('other').textContent = `$${formData.expenses.other}`;
        document.getElementById('goalOne').textContent = `${formData.goals.goalName}`;
        document.getElementById('goal-amount').textContent = `$${formData.goals.goalAmount}`;
        document.getElementById('goal-months').textContent = `${formData.goals.months}`;
    } else {
        console.log('No information submitted by user...');
    }
};

if (formDataLocal) {
    displayFormData(formDataLocal);
}

// Function to calculate remaining income
function workingIncome(formData) {
    // Ensure formData and required properties exist
    if (!formData || !formData.income || !formData.expenses) {
        console.log('Insufficient data to calculate working income.');
        return;
        // TODO: create alert for insufficient data in HTML and JS!
    }

    // Parse the income and all expenses
    const income = parseFloat(formData.income) || 0;
    const rent = parseFloat(formData.expenses.rent) || 0;
    const utilities = parseFloat(formData.expenses.utilities) || 0;
    const groceries = parseFloat(formData.expenses.groceries) || 0;
    const gas = parseFloat(formData.expenses.gas) || 0;
    const carInsurance = parseFloat(formData.expenses.insurance.carInsurance) || 0;
    const homeInsurance = parseFloat(formData.expenses.insurance.homeInsurance) || 0;
    const lifeInsurance = parseFloat(formData.expenses.insurance.lifeInsurance) || 0;
    const subscriptions = parseFloat(formData.expenses.subscribe) || 0;
    const other = parseFloat(formData.expenses.other) || 0;

    // TODO: add event listener for user input "other," that will prompt to enter new expense plus monthly cost
    // TODO: add any "others" by appending them onto the formData in localStorage and can be retreived from local storage upon next visit

    const totalExpenses = rent + utilities + groceries + gas + carInsurance + homeInsurance + lifeInsurance + subscriptions + other;
    // TODO: add any others not listed by appending?

    // Calculate remaining income
    const remainingIncome = income - totalExpenses;

    // Log or return the remaining income
    console.log(`Remaining Income: $${remainingIncome.toFixed(2)}`);
    return remainingIncome;
}

// Example usage with formDataLocal
if (formDataLocal) {
    const remaining = workingIncome(formDataLocal);

    // You can now display the remaining income on the page, e.g.
    document.getElementById('remainingIncome').textContent = `$${remaining.toFixed(2)}`;
}
