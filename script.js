// script.js
document.addEventListener("DOMContentLoaded", function () {

    const billTotalInput = document.getElementById("billTotal");
    const tipPercentageInput = document.getElementById("tipPercentage");
    const tipValueSpan = document.getElementById("tipValue");
    const currencySelect = document.getElementById("currency");
    const convertedTipAmountInput = document.getElementById("convertedTipAmount");
    const totalWithTipInput = document.getElementById("totalWithTip");
    
    const errorMessage = document.getElementById("error-message");
 
    // Conversion rates
    const conversionRates = {
        usd: 1,
        jpy: 149.34,
        inr: 84.07
    };
 
    // Function to validate bill total input
    function validateBillTotal() {
        const billTotalValue = billTotalInput.value;
 
        // Regular expression to allow only numbers and a single decimal point
        const validNumberRegex = /^\d*\.?\d*$/;
 
        if (!validNumberRegex.test(billTotalValue)) {
            errorMessage.textContent = "Please enter a valid number.";
            return false;
        } else if (parseFloat(billTotalValue) <= 0) {
            errorMessage.textContent = "Bill total must be greater than zero.";
            return false;
        } else {
            errorMessage.textContent = ""; // Clear error message
            return true;
        }
    }
 
    // Function to update calculations
    function updateCalculations() {
 
        if (!validateBillTotal()) return; // If validation fails, stop calculations
 
        let billTotal = parseFloat(billTotalInput.value);
        let tipPercentage = parseFloat(tipPercentageInput.value);
        let selectedCurrency = currencySelect.value;
 
        // Calculate tip and total in USD
        let tipAmountUSD = (billTotal * tipPercentage) / 100;
        let totalWithTipUSD = billTotal + tipAmountUSD;
 
        // Convert to selected currency
        let conversionRate = conversionRates[selectedCurrency];
        let convertedTipAmount = (tipAmountUSD * conversionRate).toFixed(2);
        let convertedTotalWithTip = (totalWithTipUSD * conversionRate).toFixed(2);
 
        // Update UI
        tipValueSpan.textContent = `${tipPercentage}%`;
        convertedTipAmountInput.value = convertedTipAmount;
        totalWithTipInput.value = convertedTotalWithTip;
    }
 
    // Event listeners
    billTotalInput.addEventListener("input", updateCalculations);
    tipPercentageInput.addEventListener("input", updateCalculations);
    currencySelect.addEventListener("change", updateCalculations);
 });