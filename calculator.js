class Calculator {
    constructor(config) {
        this.config = config;
        this.container = document.getElementById('calculator');
        this.currentOperation = null;
    }

    renderDisplay() {
        const display = document.createElement('div');
        display.classList.add('display');
        display.id = 'calc-display';

        this.container.appendChild(display);
        this.display = display;
    }

    renderButtons() {
        this.config.buttons.forEach(button => {
            const calc_button = document.createElement('div');
            calc_button.classList.add('calc-button');
            calc_button.dataset.operator = button.value;
            
            if (button.icon) {
                const icon = document.createElement('i');
                icon.classList = button.class;
                calc_button.appendChild(icon);
            } else {
                calc_button.textContent = button.value;
            }
        
            calc_button.addEventListener('click', (event) => {
                if (button.function) {
                    this[button.function]();
                } else {
                    this.buttonClick(event.target.closest('.calc-button'));
                }
            });

            this.container.appendChild(calc_button);
        });
    }

    init() {
        this.renderDisplay();
        this.renderButtons();
    }

    add(x) {
        return y => x + y;
    }

    subtract(x) {
        return y => x - y;
    }

    multiply(x) {
        return y => x * y;
    }

    divide(x) {
        return y => x / y;
    }

    backspace() {
        this.display.textContent = this.display.textContent.slice(0, -1);
    }

    posNeg() {
        this.display.textContent = parseFloat(this.display.textContent) * -1;
    }

    percent() {
        this.display.textContent = parseFloat(this.display.textContent) / 100;
    }

    clear() {
        this.display.textContent = '';
        this.currentOperation = null;
    }

    operate(operator, num) {
        switch(operator) {
            case '+':
                return this.add(num);
            case '-':
                return this.subtract(num);
            case '*':
                return this.multiply(num);
            case '/':
                return this.divide(num);
            default:
                return num;        
        }
    }

    updateDisplay(value) {
        if (!['+', '-', '*', '/', '='].includes(value)) {

            this.display.textContent = typeof this.currentOperation === 'function' ? value : this.display.textContent += value;
            
        } else {
            if (typeof this.currentOperation === 'function') {
                this.display.textContent = this.currentOperation(parseFloat(this.display.textContent));

                if (value === '=') {
                    this.currentOperation = null;
                } else {
                    this.currentOperation = this.operate(value, parseFloat(this.display.textContent));
                }

            } else {
                this.currentOperation = this.operate(value, parseFloat(this.display.textContent));
                this.display.textContent = '';
            }
        }
    }

    buttonClick(button) {
        const buttonValue = button.dataset.operator;
        this.updateDisplay(buttonValue);
    }

}