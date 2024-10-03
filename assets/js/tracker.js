const formDataLocal = JSON.parse(localStorage.getItem('formData'));

function displayFormData(formData) {
    if (formData) {

        // Populate the HTML elements with the retrieved data
        document.getElementById('monthlyIncome').textContent = `$${formData.income || 0}`;
        document.getElementById('housing').textContent = `$${formData.expenses.rent || 0}`;
        document.getElementById('utilities').textContent = `$${formData.expenses.utilities || 0}`;
        document.getElementById('groceries').textContent = `$${formData.expenses.groceries || 0}`;
        document.getElementById('gasTransportation').textContent = `$${formData.expenses.gas || 0}`;
        document.getElementById('health-insurance').textContent = `$${formData.expenses.insurance.healthInsurance || 0}`;
        document.getElementById('car-insurance').textContent = `$${formData.expenses.insurance.carInsurance || 0}`;
        document.getElementById('home-insurance').textContent = `$${formData.expenses.insurance.homeInsurance || 0}`;
        document.getElementById('life-insurance').textContent = `$${formData.expenses.insurance.lifeInsurance || 0}`;
        document.getElementById('subscriptions').textContent = `$${formData.expenses.subscribe || 0}`;
        document.getElementById('other').textContent = `$${formData.expenses.other || 0}`;
        document.getElementById('goalOne').textContent = `${formData.goals.goalName || 0}`;
        document.getElementById('goal-amount').textContent = `$${formData.goals.goalAmount || 0}`;
        document.getElementById('goal-months').textContent = `${formData.goals.months || 0}`;
    } else {
        console.log('No information submitted by user...');
    }
};





// Function to calculate total expenses
function calculateTotalExpenses(formData) {
    if (!formData || !formData.expenses) {
        console.log('No expense data found to calculate.');
        return 0;
    }

    // Sum all the expenses
    const rent = parseFloat(formData.expenses.rent) || 0;
    const utilities = parseFloat(formData.expenses.utilities) || 0;
    const groceries = parseFloat(formData.expenses.groceries) || 0;
    const gas = parseFloat(formData.expenses.gas) || 0;
    const carInsurance = parseFloat(formData.expenses.insurance.carInsurance) || 0;
    const homeInsurance = parseFloat(formData.expenses.insurance.homeInsurance) || 0;
    const lifeInsurance = parseFloat(formData.expenses.insurance.lifeInsurance) || 0;
    const subscriptions = parseFloat(formData.expenses.subscribe) || 0;
    const other = parseFloat(formData.expenses.other) || 0;

    const totalExpenses = rent + utilities + groceries + gas + carInsurance + homeInsurance + lifeInsurance + subscriptions + other;

    // Display the total expenses on the page
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;

    return totalExpenses;
}

// Function to calculate the working budget
function calculateWorkingBudget(formData, totalExpenses) {
    if (!formData || !formData.income) {
        console.log('No income data found to calculate working budget.');
        return 0;
    }

    const income = parseFloat(formData.income) || 0;

    // Calculate remaining income after expenses
    const workingBudget = income - totalExpenses;

    // Display the working budget on the page
    document.getElementById('workingBudget').textContent = `$${workingBudget.toFixed(2)}`;

    return workingBudget;
}

// Function to calculate and display save per month
function calculateSavePerMonth(formData) {
    if (!formData || !formData.goals) {
        console.log('No goal data found.');
        return;
    }

    const goalAmount = parseFloat(formData.goals.goalAmount) || 0;
    const months = parseInt(formData.goals.months) || 1;  // Avoid division by zero by setting default to 1

    console.log('Goal amount:', goalAmount);
    console.log('Months:', months);

    // Calculate save per month
    const savePerMonth = goalAmount / months;

    console.log('Save Per Month:', savePerMonth);

    // Display the save per month on the page
    document.getElementById('goal-cost').textContent = `$${savePerMonth.toFixed(2)}`;
}

// Page Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the form data from localStorage
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        // Display the stored form data
        displayFormData(formData);

        // Calculate total expenses
        const totalExpenses = calculateTotalExpenses(formData);

        // Calculate the working budget
        calculateWorkingBudget(formData, totalExpenses);

        calculateSavePerMonth(formData);
    } else {
        console.log('No form data found.');
    }
});



