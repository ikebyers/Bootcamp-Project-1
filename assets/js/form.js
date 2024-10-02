document.getElementById('add-expense-btn').addEventListener('click', function() {
    // Ask the user for the name of the new expense
    const expenseName = prompt('Enter the name of the new expense:');
    
    if (expenseName) {
        // Create a new label element for the new expense
        const newLabel = document.createElement('label');
        newLabel.setAttribute('for', expenseName.toLowerCase().replace(/\s+/g, '-'));
        newLabel.textContent = expenseName;

        // Create a new input element for the new expense
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'number');
        newInput.setAttribute('id', expenseName.toLowerCase().replace(/\s+/g, '-'));
        newInput.setAttribute('placeholder', `Enter amount for ${expenseName}`);

        // Append the new label and input to the additional expenses container
        const additionalExpensesContainer = document.getElementById('additional-expenses');
        additionalExpensesContainer.appendChild(newLabel);
        additionalExpensesContainer.appendChild(newInput);
        console.log('added new expense.')
    } else {
        alert("No expense name entered. Please try again.");
    }
});


document.addEventListener('DOMContentLoaded', function() {
   // alert('JavaScript is working!')

    const submitBtn = document.getElementById('submit-all-btn');

    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            // alert('submit button clicked!')
            let isValid = true;

            // Clear all error messages before validation
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.textContent = '');

            console.log('Starting form validation...');

            // Helper function to get numeric input or default to 0 if blank, also checks for valid numbers
            function getNumericInput(id, fieldName) {
                const inputElement = document.getElementById(id);

                // Check if the input element exists
                if (!inputElement || inputElement.value === undefined) {
                    console.log(`Element with id "${id}" not found.`);
                    return 0; // Default to 0 if the element is not found
                }

                const value = inputElement.value.trim();
                if (value === '') {
                    console.log(`${fieldName} is blank, defaulting to 0`);
                    return 0; // Default to 0 if the input is empty
                } else if (isNaN(value)) {
                    // If the value is not a valid number, show an error message
                    document.getElementById(`${id}-error`).textContent = `Please enter a valid number for ${fieldName}.`;
                    console.log(`${fieldName} contains invalid input`);
                    isValid = false;
                    return null; // Return null if invalid to prevent further processing
                }
                
                return parseFloat(value); // Return the valid number
            }

            // Get numeric inputs, defaulting to 0 if blank, or validating if incorrect input
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

            // Validate goal name (non-empty text field)
            const goalInput = document.getElementById('goal');
            // console.log('goalInput:', goalInput);
            let goalName = '';

            if (goalInput) {
                goalName = document.getElementById('goal').value.trim();
                if (goalName === "") {
                    document.getElementById('goal-error').textContent = "Please enter a goal name.";
                    isValid = false;
                } else {
                    console.log('Goal name:', goalName);
                }
            } else {
                console.log('Goal input element not found');
                isValid = false;
            }

            // Validate the number of months **SHOULD BE A POSITIVE NUMBER**
            if (months <= 0) {
                document.getElementById('months-error').textContent = "Please enter a positive number.";
                isValid = false;
            }
            

            // If all inputs are valid, process the form
            if (isValid) {
                console.log('Form is valid. preparing data...')
                // Combine all the form data into an object
                const formData = {
                    income,
                    expenses: {
                        rent,
                        utilities,
                        groceries,
                        gas,
                        insurance: {
                            carInsurance,
                            homeInsurance,
                            lifeInsurance
                        },
                        subscribe,
                        other
                    },
                    goals: {
                        goalName,
                        goalAmount,
                        months
                    }
                };

                // Store or process the form data (e.g., log it or save it to localStorage)
                console.log('Form Data:', formData);
                localStorage.setItem('formData', JSON.stringify(formData));

                console.log('Form submitted and data saved!');
            } else {
                console.log('Form is not valid, not submitting.')
                alert('Please correct the errors in the form.');
            }
        });
    }
});

