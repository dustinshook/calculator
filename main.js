// dom content loaded

document.addEventListener('DOMContentLoaded', () => {
    const calc_container = document.getElementById('calculator');
    const display = document.createElement('div');
    display.classList.add('display');
    calc_container.appendChild(display);

    const buttons = [7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '/', 'C'];

    buttons.forEach(operator => {
        const calc_button = document.createElement('div');
        calc_button.classList.add('calc-button');
        calc_button.textContent = operator;
        calc_container.appendChild(calc_button);

        calc_button.addEventListener('click', () => {
            display.textContent += operator;
        });
    });

});