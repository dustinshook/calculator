// dom content loaded

document.addEventListener('DOMContentLoaded', () => {
    const calc_container = document.getElementById('calculator');

    for (let i = 9; i >= 0; i--) {
        const calc_button = document.createElement('div');
        calc_button.classList.add('calc-button');
        calc_button.textContent = i;
        calc_container.appendChild(calc_button);
    }

    const operators = ['.', '+', '-', '*', '/', '='];

    operators.forEach(operator => {
        const calc_button = document.createElement('div');
        calc_button.classList.add('calc-button');
        calc_button.textContent = operator;
        calc_container.appendChild(calc_button);
    });
});