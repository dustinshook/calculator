class Calculator {
    constructor(config) {
        this.config = config;
        this.container = document.getElementById('calculator');
        this.currentOperation = null;
        this.buttonMap = {
            'pct': {
                'innerHTML': '<i class="fas fa-percent"></i>',
                'id': 'calc-percent'
            },
            'pn': {
                'innerHTML': '<i class="fas fa-plus-minus"></i>',
                'id': 'calc-plus-minus'
            },
            'CE': {
                'innerHTML': '<i class="fas fa-backspace"></i>',
                'id': 'calc-backspace'
            },
            
            '*': {
                'innerHTML': '<i class="fas fa-xmark"></i>',
                'id': 'calc-multiply'
            },
            '-': {
                'innerHTML': '<i class="fas fa-minus"></i>',
                'id': 'calc-subtract'
            },
            '+': {
                'innerHTML': '<i class="fas fa-plus"></i>',
                'id': 'calc-add'
            },
            '/': {
                'innerHTML': '<i class="fas fa-divide"></i>',
                'id': 'calc-divide'
            },
            '=': {
                'innerHTML': '<i class="fas fa-equals"></i>',
                'id': 'calc-equals'
            }
        };
    }

    renderDisplay() {
        const display = document.createElement('div');
        display.classList.add('display');
        display.id = 'calc-display';

        this.container.appendChild(display);
        this.display = display;
    }

    renderButtons() {
        const buttons = [
            'C', 'pn', 'pct', 'CE', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '/', '='
        ];

        console.log(this.config.buttons);

        buttons.forEach(operator => {
            const calc_button = document.createElement('div');
            calc_button.classList.add('calc-button');
            calc_button.dataset.operator = operator;
            

            if (this.buttonMap[operator]) {
                calc_button.innerHTML = this.buttonMap[operator].innerHTML;
                calc_button.id = this.buttonMap[operator].id;
            } else {
                calc_button.textContent = operator;
            }
        
            calc_button.addEventListener('click', (event) => {
                const target = event.target.closest('.calc-button');
                this.buttonClick(target);
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
            if (value === 'C') {
                this.clear();
            } else if (value === 'CE') {
                this.backspace();
            } else if (value === 'pn') {
                this.posNeg();
            } else if (value === 'pct') {
                this.percent();
            } else {
                if (typeof this.currentOperation === 'function') {
                    this.display.textContent = value;
                } else {
                    this.display.textContent += value;
                }
            }
            
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