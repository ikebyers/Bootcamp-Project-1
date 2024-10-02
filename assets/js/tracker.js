const formDataLocal = JSON.parse(localStorage.getItem('formData'));

function displayFormData(formData) {
    if (formData) {
        // Log the form data to the console for each category
        // console.log('Income:', formData.income);
        // console.log('Rent:', formData.expenses.rent);
        // console.log('Utilities:', formData.expenses.utilities);
        // console.log('Groceries:', formData.expenses.groceries);
        // console.log('Gas/Transportation:', formData.expenses.gas);
        // console.log('Car Insurance:', formData.expenses.insurance.carInsurance);
        // console.log('Home Insurance:', formData.expenses.insurance.homeInsurance);
        // console.log('Life Insurance:', formData.expenses.insurance.lifeInsurance);
        // console.log('Subscriptions:', formData.expenses.subscribe);
        // console.log('Other Expenses:', formData.expenses.other);
        // console.log('Goal Name:', formData.goals.goalName);
        // console.log('Goal Amount:', formData.goals.goalAmount);
        // console.log('Goal Months:', formData.goals.months);

        // Populate the HTML elements with the retrieved data
        document.getElementById('monthlyIncome').textContent = `$${formData.income}`;
        document.getElementById('housing').textContent = `$${formData.expenses.rent}`;
        document.getElementById('utilities').textContent = `$${formData.expenses.utilities}`;
        document.getElementById('groceries').textContent = `$${formData.expenses.groceries}`;
        document.getElementById('gasTransportation').textContent = `$${formData.expenses.gas}`;
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

function workingIncome = 

// Call the displayFormData function with the data retrieved from localStorage
if (formDataLocal) {
    displayFormData(formDataLocal);
}
