// Retrieve form data from localStorage
const formDataLocal = JSON.parse(localStorage.getItem('formData')) || { goals: [] };

// Function to display the formData on the page
function displayFormData(formData) {
    if (formData) {
        document.getElementById('monthlyIncome').textContent = `$${formData.income || 0}`;
        document.getElementById('housing').textContent = `$${formData.expenses?.rent || 0}`;
        document.getElementById('utilities').textContent = `$${formData.expenses?.utilities || 0}`;
        document.getElementById('groceries').textContent = `$${formData.expenses?.groceries || 0}`;
        document.getElementById('gasTransportation').textContent = `$${formData.expenses?.gas || 0}`;
        document.getElementById('health-insurance').textContent = `$${formData.expenses?.insurance?.healthInsurance || 0}`;
        document.getElementById('car-insurance').textContent = `$${formData.expenses?.insurance?.carInsurance || 0}`;
        document.getElementById('home-insurance').textContent = `$${formData.expenses?.insurance?.homeInsurance || 0}`;
        document.getElementById('life-insurance').textContent = `$${formData.expenses?.insurance?.lifeInsurance || 0}`;
        document.getElementById('subscriptions').textContent = `$${formData.expenses?.subscribe || 0}`;
        document.getElementById('other').textContent = `$${formData.expenses?.other || 0}`;
        displayGoals(formData); // Display goals on the page
    } else {
        console.log('No information submitted by user...');
    }
}

// Function to display goals on the page
function displayGoals(formData) {
    const goalList = document.getElementById('goalList');
    goalList.innerHTML = ''; // Clear any existing goals

    if (formData.goals) {
        formData.goals.forEach((goal, index) => {
            const goalElement = document.createElement('div');
            goalElement.innerHTML = `
                <p><strong>Goal ${index + 1}</strong></p>
                <p>Goal Name: ${goal.goalName}</p>
                <p>Goal Amount: $${goal.goalAmount}</p>
                <p>Months to Achieve: ${goal.months}</p>
                <p>Monthly Savings: $${(goal.goalAmount / goal.months).toFixed(2)}</p>
            `;
            goalList.appendChild(goalElement);
        });
    }
}

// Event listener for adding a new goal
document.getElementById('addGoalBtn').addEventListener('click', function() {
    const goalName = document.getElementById('newGoalName').value;
    const goalAmount = document.getElementById('newGoalAmount').value;
    const goalMonths = document.getElementById('newGoalMonths').value;

    if (goalName && goalAmount && goalMonths) {
        // Get the existing formData from localStorage, or create a new object if none exists
        let formDataLocal = JSON.parse(localStorage.getItem('formData')) || { goals: [] };

        // Add the new goal to the formData object
        formDataLocal.goals.push({
            goalName: goalName,
            goalAmount: parseFloat(goalAmount),
            months: parseInt(goalMonths)
        });

        // Save the updated formData back to localStorage
        localStorage.setItem('formData', JSON.stringify(formDataLocal));

        // Display the updated goals on the page
        displayGoals(formDataLocal);

        // Clear input fields after adding the goal
        document.getElementById('newGoalName').value = '';
        document.getElementById('newGoalAmount').value = '';
        document.getElementById('newGoalMonths').value = '';
    } else {
        alert("Please fill in all goal fields.");
    }
});

// Page initialization - Retrieving and displaying goals from localStorage on load
document.addEventListener('DOMContentLoaded', function() {
    const formData = JSON.parse(localStorage.getItem('formData')) || { goals: [] };
    displayFormData(formData);
});

// Calculate the total expenses
function calculateTotalExpenses(formData) {
    if (!formData || !formData.expenses) return 0;

    const rent = parseFloat(formData.expenses.rent) || 0;
    const utilities = parseFloat(formData.expenses.utilities) || 0;
    const groceries = parseFloat(formData.expenses.groceries) || 0;
    const gas = parseFloat(formData.expenses.gas) || 0;
    const carInsurance = parseFloat(formData.expenses.insurance?.carInsurance) || 0;
    const homeInsurance = parseFloat(formData.expenses.insurance?.homeInsurance) || 0;
    const lifeInsurance = parseFloat(formData.expenses.insurance?.lifeInsurance) || 0;
    const subscriptions = parseFloat(formData.expenses.subscribe) || 0;
    const other = parseFloat(formData.expenses.other) || 0;

    return rent + utilities + groceries + gas + carInsurance + homeInsurance + lifeInsurance + subscriptions + other;
}

// Calculate and display the working budget
function calculateWorkingBudget(formData) {
    const totalExpenses = calculateTotalExpenses(formData);
    const income = parseFloat(formData.income) || 0;
    const workingBudget = income - totalExpenses;

    document.getElementById('workingBudget').textContent = `$${workingBudget.toFixed(2)}`;
    return workingBudget;
}

// Display working budget when income changes
document.getElementById('editIncomeBtn').addEventListener('click', function() {
    const newIncome = prompt("Enter your new monthly income:");
    if (newIncome && !isNaN(newIncome)) {
        let formDataLocal = JSON.parse(localStorage.getItem('formData')) || {};
        formDataLocal.income = parseFloat(newIncome);
        localStorage.setItem('formData', JSON.stringify(formDataLocal));

        // Update displayed income and working budget
        document.getElementById('monthlyIncome').textContent = `$${newIncome}`;
        calculateWorkingBudget(formDataLocal);
    } else {
        alert("Please enter a valid number for income.");
    }
});
