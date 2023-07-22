function add(...args) {
    return args.reduce((prev, curr) => prev + curr);
}

function subtract(...args) {
    return args.reduce((prev, curr) => prev - curr);
}

function multiply(...args) {
    return args.reduce((prev, curr) => prev * curr);
}

function divide(...args) {
    return args.reduce((prev, curr) => prev / curr);
}

function operate(operator, ...args) {
    switch(operator) {
        case '+':
            return add(...args);
        case '-':
            return subtract(...args);
        case '*':
            return multiply(...args);
        case '/':
            return divide(...args);
    }
}