document.getElementById('add-expense-btn').addEventListener('click', function() {

    const expenseName = prompt('Enter the name of the new expense:');
    
    if (expenseName) {
        // Create a new label element for the new expense
        const newLabel = document.createElement('label');
        newLabel.setAttribute('for', expenseName.toLowerCase().replace(/\s+/g, '-'));
        newLabel.textContent = expenseName;


        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'number');
        newInput.setAttribute('id', expenseName.toLowerCase().replace(/\s+/g, '-'));
        newInput.setAttribute('placeholder', `Enter amount for ${expenseName}`);


        const additionalExpensesContainer = document.getElementById('additional-expenses');
        additionalExpensesContainer.appendChild(newLabel);
        additionalExpensesContainer.appendChild(newInput);
        console.log('Added new expense.');


    } else {
        alert("No expense name entered. Please try again.");
    }
});


document.addEventListener('DOMContentLoaded', function() {

    const submitBtn = document.getElementById('submit-all-btn');

    if (submitBtn) {
        submitBtn.addEventListener('click', function() {

            // alert('Button has been clicked')

            let isValid = true;

            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.textContent = '');

            console.log('Starting form validation...');

            const income = getNumericInput('monthly-income', 'monthly income');
            const rent = getNumericInput('rent', 'rent');
            const utilities = getNumericInput('util', 'utilities');
            const groceries = getNumericInput('food', 'groceries');
            const gas = getNumericInput('gas', 'gas');
            const carInsurance = getNumericInput('car-insurance', 'car insurance');
            const homeInsurance = getNumericInput('home-insurance', 'home insurance');
            const lifeInsurance = getNumericInput('life-insurance', 'life insurance');
            const subscribe = getNumericInput('subscribe', 'subscriptions');
            const other = getNumericInput('other', 'other expenses');
            const goalAmount = getNumericInput('goal-amount', 'goal amount');
            const months = getNumericInput('months', 'months');


            const goalInput = document.getElementById('goal');
            let goals = [];

            if (goalInput) {
                // goalName = document.getElementById('goal').value.trim();
                let goalName = goalInput.value.trim();
                if (goalName === "") {
                    document.getElementById('goal-error').textContent = "Please enter a goal name.";
                    isValid = false;
                } else {
                    // console.log('Goal name:', goalName);
                    goals.push({
                        goalName,
                        goalAmount,
                        months
                    });

                    console.log('Goal added:', {goalName, goalAmount, months });
                }

            }

            if (months <= 0) {
                document.getElementById('months-error').textContent = "Please enter a positive number.";
                isValid = false;
            }

            

            const additionalExpensesContainer = document.getElementById('additional-expenses');
            const additionalExpenses = [];
            const expenseInputs = additionalExpensesContainer.querySelectorAll('input[type="number"]');

            expenseInputs.forEach(input => {
                const expenseName = input.id.replace(/-/g, ' ');
                const expenseValue = parseFloat(input.value) || 0;
                additionalExpenses.push({ name: expenseName, amount: expenseValue });
            });

            // debugging
            // alert('Form is being validated')

            console.log('is the form valid:', isValid);

            if (isValid) {
                const formData = buildFormData({
                    income, rent, utilities, groceries, gas, carInsurance, homeInsurance, lifeInsurance, subscribe, other, goals, additionalExpenses
                });

                // alert("Form is valid")

                localStorage.setItem('formData', JSON.stringify(formData));
                console.log('Form submitted and data saved!');

                window.location.href = 'tracker.html'
            } else {
                console.log('Form is not valid, not submitting.');
                alert('Please correct the errors in the form.');
            }
        });
    }
});


// Modal button and modal elements
const modalButton = document.getElementById('modal-button');
const modal = document.getElementById('info-modal');
const closeButton = modal.querySelector('.modal-close');

// Open the modal when the button is clicked
modalButton.addEventListener('click', () => {
    modal.classList.add('is-active');
});

// Close the modal when the close button or background is clicked
closeButton.addEventListener('click', () => {
    modal.classList.remove('is-active');
});

modal.querySelector('.modal-background').addEventListener('click', () => {
    modal.classList.remove('is-active');
});

