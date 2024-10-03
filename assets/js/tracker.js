const formDataLocal = JSON.parse(localStorage.getItem('formData'));

function displayFormData(formData) {
    if (formData) {
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

        // append and display elements onto the HTML
        const expensesDetail = document.getElementById('expensesDetail');
        if (formData.expenses.additional) {
            formData.expenses.additional.forEach(expense => {
                let expenseLabel = document.createElement('label');
                expenseLabel.textContent = `${expense.name}:`;
                let expenseValue = document.createElement('p');
                expenseValue.textContent = `$${expense.amount}`;
                expensesDetail.appendChild(expenseLabel);
                expensesDetail.appendChild(expenseValue);
            });
        }        
    } else {
        console.log('No information submitted by user...');
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const goalList = document.getElementById('goalList');
    
    // Retrieve stored goals from localStorage and display them
    function displayGoalsFromLocalStorage() {
        const storedFormData = JSON.parse(localStorage.getItem('formData')) || { goals: [] };
        
        // Clear the goalList before adding goals from localStorage
        goalList.innerHTML = '';

        // storedFormData.goals.forEach(goal => {
        //     appendGoalToDOM(goal);
        // });
        for (let i = 0; i <= storedFormData.goals.length; i++) {
            appendGoalToDOM(storedFormData.goals[i]);
        }
    }

    // Function to append a goal to the DOM
    function appendGoalToDOM(goal) {
        const goalElement = document.createElement('div');
        goalElement.innerHTML = `
            <p><strong>Goal:</strong> ${goal.goalName}</p>
            <p><strong>Amount:</strong> $${goal.goalAmount}</p>
            <p><strong>Time (months):</strong> ${goal.months}</p>
            <hr>
        `;
        goalList.appendChild(goalElement);
    }

    // Event listener for the addGoalBtn
    document.getElementById('addGoalBtn').addEventListener('click', function () {
        const goalName = prompt('Enter the goal name:');
        const goalAmount = parseFloat(prompt('Enter the goal amount:'));
        const goalMonths = parseInt(prompt('Enter the number of months to achieve this goal:'), 10);

        // Ensure valid inputs
        if (goalName && !isNaN(goalAmount) && !isNaN(goalMonths)) {
            const newGoal = { goalName, goalAmount, months: goalMonths };

            // Retrieve form data from localStorage or initialize if null
            let formDataLocal = JSON.parse(localStorage.getItem('formData')) || { goals: [] };

            if (!Array.isArray(formDataLocal.goals)) {
                formDataLocal.goals = [];
            }

            // Add new goal to formDataLocal and save it to localStorage
            formDataLocal.goals.push(newGoal);
            localStorage.setItem('formData', JSON.stringify(formDataLocal));

            // Append the new goal to the DOM
            appendGoalToDOM(newGoal);
        } else {
            alert('Please enter valid values for all fields.');
        }
    });

    // Display any stored goals when the page loads
    displayGoalsFromLocalStorage();
});


// Event listener/button for editing the income
document.getElementById('editIncomeBtn').addEventListener('click', function() {
    let newIncome = prompt("Enter your new monthly income:");
    if (newIncome && !isNaN(newIncome)) {
        let formDataLocal = JSON.parse(localStorage.getItem('formData')) || {};
        formDataLocal.income = parseFloat(newIncome);
        localStorage.setItem('formData', JSON.stringify(formDataLocal));

        // Update the displayed income in the webpage
        document.getElementById('monthlyIncome').textContent = `$${newIncome}`;
        const totalExpenses = calculateTotalExpenses(formDataLocal); 
        calculateWorkingBudget(formDataLocal, totalExpenses); 
    } else {
        alert("Please enter a valid number for income.");
    }
});

// Event listener/button for adding new expenses
document.getElementById('addExpenseBtn').addEventListener('click', function() {
    let expenseName = prompt("Enter the name of the expense:");
    let expenseAmount = prompt("Enter the amount of the expense:");

    if (expenseName && expenseAmount && !isNaN(expenseAmount)) {
        let formDataLocal = JSON.parse(localStorage.getItem('formData')) || { expenses: { additional: [] } };
        if (!formDataLocal.expenses.additional) {
            formDataLocal.expenses.additional = [];
        }

        formDataLocal.expenses.additional.push({
            name: expenseName,
            amount: parseFloat(expenseAmount)
        });

        localStorage.setItem('formData', JSON.stringify(formDataLocal));

        // Update the page to display the new expense
        let expenseLabel = document.createElement('label');
        expenseLabel.textContent = `${expenseName}:`;
        let expenseValue = document.createElement('p');
        expenseValue.textContent = `$${parseFloat(expenseAmount).toFixed(2)}`;

        const expensesDetail = document.getElementById('expensesDetail');
        expensesDetail.appendChild(expenseLabel);
        expensesDetail.appendChild(expenseValue);

        const totalExpenses = calculateTotalExpenses(formDataLocal);
        calculateWorkingBudget(formDataLocal, totalExpenses);
    } else {
        alert("Please enter valid values for expense name and amount.");
    }
});

// Function to calculate total expenses
function calculateTotalExpenses(formData) {
    if (!formData || !formData.expenses) {
        console.log('No expense data found to calculate.');
        return 0;
    }

    // Sum all the predefined expenses
    const rent = parseFloat(formData.expenses.rent) || 0;
    const utilities = parseFloat(formData.expenses.utilities) || 0;
    const groceries = parseFloat(formData.expenses.groceries) || 0;
    const gas = parseFloat(formData.expenses.gas) || 0;
    const carInsurance = parseFloat(formData.expenses.insurance?.carInsurance) || 0;
    const homeInsurance = parseFloat(formData.expenses.insurance?.homeInsurance) || 0;
    const lifeInsurance = parseFloat(formData.expenses.insurance?.lifeInsurance) || 0;
    const subscriptions = parseFloat(formData.expenses.subscribe) || 0;
    const other = parseFloat(formData.expenses.other) || 0;

    // Sum all added expenses via the event listener
    const additionalExpenses = formData.expenses.additional?.reduce((sum, expense) => sum + parseFloat(expense.amount), 0) || 0;
    const totalExpenses = rent + utilities + groceries + gas + carInsurance + homeInsurance + lifeInsurance + subscriptions + other + additionalExpenses;

    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    return totalExpenses;
}

function calculateWorkingBudget(formData, totalExpenses) {
    if (!formData || !formData.income) {
        console.log('No income data found to calculate working budget.');
        return 0;
    }
    const income = parseFloat(formData.income) || 0;
    const workingBudget = income - totalExpenses;
    document.getElementById('workingBudget').textContent = `$${workingBudget.toFixed(2)}`;
    return workingBudget;
}

// Page Initialization
document.addEventListener('DOMContentLoaded', function () {
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        displayFormData(formData);
        const totalExpenses = calculateTotalExpenses(formData);
        calculateWorkingBudget(formData, totalExpenses);
        calculateSavePerMonth(formData);
    } else {
        console.log('No form data found.');
    }
});

// Function to calculate and display save per month
function calculateSavePerMonth(formData) {
    if (!formData || !formData.goals) {
        console.log('No goal data found.');
        return;
    }

    const goalAmount = parseFloat(formData.goals.goalAmount) || 0;
    const months = Number(formData.goals.months) || 1;
    console.log('Goal amount:', goalAmount);
    console.log('Months:', months);
    const savePerMonth = goalAmount / months;
    console.log('Save Per Month:', savePerMonth);
    document.getElementById('goal-cost').textContent = `$${savePerMonth.toFixed(2)}`;
    
}

// Page Initialization #2
document.addEventListener('DOMContentLoaded', function () {
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (formData) {
        displayFormData(formData);
        const totalExpenses = calculateTotalExpenses(formData);
        calculateWorkingBudget(formData, totalExpenses);
        calculateSavePerMonth(formData);
    } else {
        console.log('No form data found.');
    }
});