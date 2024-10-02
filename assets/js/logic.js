// checks for valid number, if blank defaults to 0
function getNumericInput(id, fieldName) {
    const inputElement = document.getElementById(id);

    if (!inputElement || inputElement.value === undefined) {
        console.log(`Element with id "${id}" not found.`);
        return 0; 
    }

    const value = inputElement.value.trim();
    if (value === '') {
        console.log(`${fieldName} is blank, defaulting to 0`);
        return 0;
    } else if (isNaN(value)) {
        document.getElementById(`${id}-error`).textContent = `Please enter a valid number for ${fieldName}.`;
        console.log(`${fieldName} contains invalid input`);
        return null;
    }
    
    return parseFloat(value);
}

// Function to combine form data into an object
function buildFormData({ income, rent, utilities, groceries, gas, carInsurance, homeInsurance, lifeInsurance, subscribe, other, goalName, goalAmount, months }) {
    return {
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
}
