// dom content loaded

const loadConfig = async () => {
    const response = await fetch('calculator.config.json');
    const data = await response.json();
    return data;
};

document.addEventListener('DOMContentLoaded', () => {
    loadConfig().then(config => {
        const myCalculator = new Calculator(config);
        myCalculator.init();
    });

});