const apiEndpoint = 'https://api.exchangerate-api.com/v4/latest/USD';
let exchangeRates = {};

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            exchangeRates = data.rates;
            populateCurrencyOptions();
        });
});

function populateCurrencyOptions() {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    for (const currency in exchangeRates) {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency;
        fromCurrencySelect.appendChild(option);
        toCurrencySelect.appendChild(option.cloneNode(true));
    }
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('result');

    if (isNaN(amount) || amount <= 0) {
        resultElement.textContent = 'Please enter a valid amount.';
        return;
    }

    if (fromCurrency === toCurrency) {
        resultElement.textContent = `Converted Amount: ${amount} ${toCurrency}`;
        return;
    }

    const rateFrom = exchangeRates[fromCurrency];
    const rateTo = exchangeRates[toCurrency];
    const convertedAmount = (amount / rateFrom) * rateTo;

    resultElement.textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
}

/*DarkMode*/ 
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleIcon = document.getElementById('toggle-icon');
    if (document.body.classList.contains('dark-mode')) {
        toggleIcon.classList.remove('fa-toggle-off');
        toggleIcon.classList.add('fa-toggle-on');
    } else {
        toggleIcon.classList.remove('fa-toggle-on');
        toggleIcon.classList.add('fa-toggle-off');
    }
}
  