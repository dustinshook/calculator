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

        const displayText = document.createElement('span');
        displayText.classList.add('display-text');
        displayText.id = 'calc-display-text';

        display.appendChild(displayText);

        const displaySubText = document.createElement('span');
        displaySubText.classList.add('display-subtext');
        displaySubText.id = 'calc-display-subtext';

        display.appendChild(displaySubText);

        this.container.appendChild(display);
        this.display = display;
        this.displayText = displayText;
        this.displaySubText = displaySubText;
    }

    renderButtons() {
        this.config.buttons.forEach(button => {
            const calc_button = document.createElement('div');
            calc_button.classList.add('calc-button');
            calc_button.classList.add(button.type);
            calc_button.dataset.operator = button.value;
            calc_button.dataset.key = button.keycode;
            calc_button.dataset.function = button.function;
            
            if (button.icon) {
                const icon = document.createElement('i');
                icon.classList = button.class;
                calc_button.appendChild(icon);
            } else {
                calc_button.textContent = button.value;
            }

            if (button['grid-column']) calc_button.style.gridColumn = button['grid-column'];

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

    toggleTheme() {
        const body = document.querySelector('body');
        body.classList.toggle('light-mode');
    }

    init() {
        this.renderDisplay();
        this.renderButtons();
        this.initKeyPress();
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

    round(num, places) {
        const floatVal = parseFloat(num);
        return Math.round(floatVal * Math.pow(10, places)) / Math.pow(10, places);
    }

    backspace() {
        this.displayText.textContent = (this.lastClicked === "operator") ? this.displayText.textContent : this.displayText.textContent.slice(0, -1);
    }

    posNeg() {
        this.displayText.textContent = parseFloat(this.displayText.textContent) * -1;
    }

    percent() {
        this.displayText.textContent = parseFloat(this.displayText.textContent) / 100;
    }

    clear() {
        this.displayText.textContent = '';
        this.displaySubText.textContent = '';
        this.currentOperation = null;
    }

    operate(operator, num) {
        this.displaySubText.textContent = `${num} ${operator}`;

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
            if (this.lastClicked === "operator") {
                this.displayText.textContent = value;
                this.displaySubText.textContent.includes('=') ? this.displaySubText.textContent = '' : this.displaySubText.textContent;
            } else {
                this.displayText.textContent += value;
            }

            this.lastClicked = "number";
        } else {
            
            if (typeof this.currentOperation === 'function' && this.displayText.textContent && this.lastClicked === "number") {

                if (value === '=') {
                    this.displaySubText.textContent = `${this.displaySubText.textContent} ${this.displayText.textContent} ${value}`
                }

                this.displayText.textContent = this.round(this.currentOperation(parseFloat(this.displayText.textContent)), 4);
                this.currentOperation = (value === '=') ? null : this.operate(value, parseFloat(this.displayText.textContent));

            } else if (this.displayText.textContent) {
                this.currentOperation = this.operate(value, parseFloat(this.displayText.textContent));
            } else {
                this.currentOperation = null;
            }

            this.lastClicked = "operator";
        }
    }

    buttonClick(button) {
        const buttonValue = button.dataset.operator;
        this.updateDisplay(buttonValue);
    }

    initKeyPress() {
        document.addEventListener('keydown', (event) => {
            const button = document.querySelector(`[data-key="${event.code}"]`);
            if (button.dataset.function == "false") {
                this.buttonClick(button);
            } else {
                this[button.dataset.function]();
            }
        });
    }

}