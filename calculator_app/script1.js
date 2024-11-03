document.addEventListener("DOMContentLoaded", () => {
    const screen = document.querySelector(".screen");
    let currentInput = "0";
    let operator = null;
    let previousInput = null;
    let expression = "";  // Store the full expression

    // Update screen display
    function updateScreen() {
        screen.innerHTML = expression;
    }

    // Clear all input
    function clearAll() {
        currentInput = "0";
        operator = null;
        previousInput = null;
        expression = "";
        updateScreen();
    }

    // Handle backspace
    function backspace() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = "0";
        }
        expression = expression.slice(0, -1);
        updateScreen();
    }

    // Handle operator input
    function setOperator(newOperator) {
        if (operator) calculate();
        operator = newOperator;
        previousInput = currentInput;
        expression += ` ${operator}`;
        currentInput = "0";
        updateScreen();
    }

    // Perform calculation
    function calculate() {
        if (!operator || previousInput === null) return;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        let result;
        switch (operator) {
            case "+":
                result = prev + curr;
                break;
            case "-":
                result = prev - curr;
                break;
            case "×":
                result = prev * curr;
                break;
            case "÷":
                result = curr !== 0 ? prev / curr : "Error";
                break;
        }
        expression += ` ${currentInput} =<br>${result}`;
        currentInput = result.toString();
        operator = null;
        previousInput = null;
        updateScreen();
    }

    // Handle button clicks
    document.querySelectorAll(".calc-btn").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent.trim();
            if (!isNaN(value)) {
                // Handle number input
                if (currentInput === "0") {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
                expression += value;
                updateScreen();
            } else {
                switch (value) {
                    case "C":
                        clearAll();
                        break;
                    case "←":
                        backspace();
                        break;
                    case "=":
                        calculate();
                        break;
                    case "+":
                    case "-":
                    case "×":
                    case "÷":
                        setOperator(value);
                        break;
                    case ".":
                        if (!currentInput.includes(".")) {
                            currentInput += ".";
                            expression += ".";
                            updateScreen();
                        }
                        break;
                }
            }
        });
    });
});
