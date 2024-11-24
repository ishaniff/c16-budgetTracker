// Declaring arrays with a value of 0 so on html update there are no undefined or nulls
let totalBudget = [0];
let grossIncome = [0];
let grossExpense = [0];

// Creating my class, with a constructor that accepts two properties(they will be passed in as arguments when creating new objects in this class)
class Budget {
  constructor(income, reason) {
    totalBudget.push(parseInt(income));
    this.income = income;
    this.reason = reason;
  }
}

// Math calculating functions
function currentBal() {
  return eval(totalBudget.join("+"));
}
function incomeTotal() {
  return eval(grossIncome.join("+"));
}
function expenseTotal() {
  return eval(grossExpense.join("+"));
}

// Declaring HTML for DOM Manipulation
const inputAmount = document.getElementById("inputAmount");
const inputReason = document.getElementById("inputReason");
const buttonSubmit = document.getElementById("buttonSubmit");
const buttonReset = document.getElementById("buttonReset");
const currentBalance = document.getElementById("currentBalance");
const totalIncome = document.getElementById("grossIncome");
const totalExpense = document.getElementById("grossExpense");
const table = document.getElementById("table");

// Function that checks if the number input form is valid
function validation() {
  if (isNaN(inputAmount.value) || inputAmount.value.trim() === "") {
    alert(
      "Please check your number input, only numbers and negative sign are allowed."
    );
    return false;
  } else {
    return true;
  }
}

// Function that keeps gross for both income and expense
function totalTracker() {
  let selectedRecurrence = document.querySelector(
    `input[name="recurrance"]:checked`
  );
  recurringAmount = selectedRecurrence.value * inputAmount.value;
  if (inputAmount.value > 0) {
    grossIncome.push(recurringAmount);
    incomeTotal();
  } else {
    grossExpense.push(recurringAmount);
    expenseTotal();
  }
}

// Declaring array where new Budget objects will live
let transactions = [];

// The constructor being used and creating a new object with the  key value pair of amount and reason, also is multiplying the amount by whichever selection the user makes with the radio buttons.
function userTransaction() {
  let selectedRecurrence = document.querySelector(
    `input[name="recurrance"]:checked`
  );
  recurringAmount = selectedRecurrence.value * inputAmount.value;
  transactions.push(new Budget(recurringAmount, inputReason.value));
}

// Updating the text content on the page with these functions that calculate respectively and return their values.
function updateUI() {
  currentBalance.textContent = `Current Balance : $${currentBal()}`;
  totalIncome.textContent = `Gross Income : $${incomeTotal()}`;
  totalExpense.textContent = `Gross Expense : $${expenseTotal()}`;
}

// Button that on click chains all the functions together, pending that the valdiation returns true.
buttonSubmit.addEventListener("click", function () {
  if (validation() === true) {
    totalTracker();
    userTransaction();
    updateUI();
    buildTable();
  }
});

buttonReset.addEventListener("click", function () {
  transactions = [];
  i = 0;
  totalBudget = [0];
  grossIncome = [0];
  grossExpense = [0];
  updateUI();
  table.innerHTML = "";
  inputAmount.value = "";
  inputReason.value = "";
});

// Dynamic table adding, without need of a loop or reprocessing of whole arrays and tables, also done with text content.
let i = 0;
function buildTable() {
  const row = table.insertRow(-1);
  const tableReason = row.insertCell(0);
  const tableAmount = row.insertCell(1);
  const recurrance = row.insertCell(2);
  tableReason.textContent = transactions[i].reason;
  tableAmount.textContent = transactions[i].income;
  recurrance.textContent = recurringRate();
  i++;
}

// Radio button checker to get current value, switch statement grabs the value and whichever is chosen it is returned above to be used to update the text content.
function recurringRate() {
  const selectedRecurrence = document.querySelector(
    `input[name="recurrance"]:checked`
  );
  switch (selectedRecurrence.value) {
    case "1":
      return "One Time";
    case "52":
      return "Once a Week";
    case "12":
      return "Once a Month";
  }
}
