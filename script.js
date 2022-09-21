'use strict';

app();

function app() {
  const $ = document.querySelector.bind(document);
  // When start, hide result & loader:
  const loader = $('#loader');
  const result = $('#result');

  loader.style.display = 'none';
  result.style.display = 'none';

  // Working with form:
  const loanForm = $('#loan-form');
  // Event Listener
  loanForm.addEventListener('submit', function (e) {
    loader.style.display = 'block';
    result.style.display = 'none';

    setTimeout(handleCalculate, 2000);

    e.preventDefault();
  });
  // Calculate result:
  function handleCalculate(e) {
    loader.style.display = 'none';

    const amount = $('#amount');
    const interest = $('#interest');
    const years = $('#years');

    const monthlyPayment = $('#monthly-payment');
    const totalPayment = $('#total-payment');
    const totalInterest = $('#total-interest');

    // Turn variable into number:
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedYears = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedYears);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      result.style.display = 'block';
      monthlyPayment.value = '$' + monthly.toFixed(2);
      totalPayment.value = '$' + (monthly * calculatedYears).toFixed(2);
      totalInterest.value =
        '$' + (monthly * calculatedYears - principal).toFixed(2);
    } else {
      showError('Please check your input data!');
    }
    // Show error function:
    function showError(error) {
      const div = document.createElement('div');
      div.className = 'alert alert-danger';
      div.appendChild(document.createTextNode(`${error}`));

      const card = $('.card');
      const heading = $('.heading');

      card.insertBefore(div, heading);

      setTimeout(removeError, 3000);
    }

    function removeError() {
      $('.alert').remove();
    }
    //
    e.preventDefault();
  }
}
