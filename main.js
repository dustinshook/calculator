// dom content loaded

document.addEventListener('DOMContentLoaded', () => {
    const calc_container = document.getElementById('calculator');

    for (let i = 0; i <= 9; i++) {
        const calc_button = document.createElement('button');
        calc_button.classList.add('calc-button');
        calc_button.textContent = i;
        calc_container.appendChild(calc_button);
    }
});