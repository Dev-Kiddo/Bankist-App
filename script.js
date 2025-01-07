"use strict";

//////////////////////////////////////////////////////////////////////
// BANKIST APP
//////////////////////////////////////////////////////////////////////

// Datas
// const account1 = {
//   owner: "Prasanth Shanmugam",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Kani mozhiV",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

const account1 = {
  owner: "Prasanth Shanmugam",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2025-01-05T17:01:17.194Z",
    "2025-01-04T16:36:17.929Z",
    "2025-01-06T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Kani mozhiV",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Jothiga Sathish",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Tamil Moni",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

///////////////////////////////////////////////////////////////

let currentAccount;
///////////////////////////////////////////////////////////////

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log("daysPassed:", daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const currentDate = `${date.getDate()}`.padStart(2, 0);
  // const currentMonth = `${date.getMonth() + 1}`.padStart(2, 0);
  // const currentYear = date.getFullYear();

  return `${currentDate}/${currentMonth}/${currentYear}`;
};

const displayMovements = function (currentAcc, sort = false) {
  containerMovements.innerHTML = "";

  // Sorting Implements
  const movs = sort ? currentAcc.movements.slice().sort((a, b) => a - b) : currentAcc.movements;

  movs.forEach(function (mov, i, arr) {
    // const displayDate = new Date(currentAcc.movementsDates[i]);
    // console.log(currentAcc.movementsDates[i]);
    // console.log(currentAcc.movementsDates);

    const date = new Date(currentAcc.movementsDates[i]);
    const displayDate = formatMovementDate(date);
    // console.log("displayDate:", displayDate);

    // const movDate = `${displayDate.getDate()}`.padStart(2, 0);
    // const movMonth = `${displayDate.getMonth()}`.padStart(2, 0);
    // const movYear = displayDate.getFullYear();

    formatMovementDate(displayDate);

    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    // The insertAdjacentHTML method in JavaScript allows you to insert HTML or XML into the DOM at a specified position relative to an existing element.
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, movs) => {
    return acc + movs;
  }, 0);

  acc.balance = balance;

  labelBalance.textContent = `${balance} €`;
};
// calcDisplayBalance(account1.movements);

// const createUserNames = function (user) {
//   const userName = user
//     .toLowerCase()
//     .split(" ")
//     .map((name) => name[0])
//     .join("");
//   return userName;
// };

// console.log(createUserNames(user));

const createUserNames = function (accounts) {
  accounts.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserNames(accounts);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance = movements.reduce((acc, mov) => {
//   return acc + mov;
// }, 0);

// console.log(balance);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const maximim = function () {
  const max = movements.reduce((acc, mov) => {
    // console.log("acc:", acc);
    // console.log("mov:", mov);
    if (acc > mov) {
      // console.log("accumulator", acc);
      return acc;
    } else return mov;
  }, movements[0]);
  // console.log(max);
};

maximim();

const calcDisplaySummary = function (movements) {
  const incomes = movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
  // console.log(incomes);
  labelSumIn.textContent = `${incomes.toFixed(2)} €`;

  const outcomes = Math.abs(movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0));
  // console.log(outcomes);
  labelSumOut.textContent = `${outcomes.toFixed(2)} €`;

  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};

// calcDisplaySummary(account1.movements);

// For - Date
const now = new Date();
const currentDate = `${now.getDate()}`.padStart(2, 0);
const currentMonth = `${now.getMonth() + 1}`.padStart(2, 0);
const currentYear = now.getFullYear();
const currentHour = now.getHours();
const currentMinute = `${now.getMinutes()}`.padStart(2, 0);
const currentSeconds = `${now.getSeconds()}`.padStart(2, 0);

let timer;

const setLogoutTimer = function () {
  let time = 120;
  timer = setInterval(() => {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);

    // const min = time / sec;
    labelTimer.textContent = `${min}: ${sec}`;
    time--;
    if (time === 0) {
      containerApp.style.opacity = "0";
      labelWelcome.textContent = "Log in to get started";
      clearInterval(timer);
    }
  }, 1000);
};

const displayUI = function (account) {
  const displayName = `Welcome back, ${account.owner.split(" ")[0]}`;
  labelWelcome.textContent = displayName;

  containerApp.style.opacity = "100";

  clearTimeout(timer);
  setLogoutTimer();

  // Clear Input Fields
  inputLoginUsername.value = inputLoginPin.value = "";

  // Show Date
  //day/month/year - format

  labelDate.textContent = `${currentDate}/${currentMonth}/${currentYear}, ${currentHour}: ${currentMinute}`;
};
// displayUI(account1);

function updateUI() {
  // Display UI and message
  displayUI(currentAccount);
  // Display Movements
  displayMovements(currentAccount);
  // Display balance
  calcDisplayBalance(currentAccount);
  // Display summery
  calcDisplaySummary(currentAccount.movements);
}

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  // Hiding Popup demo here!
  document.querySelector(".popup").style.display = "none";

  currentAccount = accounts.find((acc) => acc.userName === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // // Display UI and message
    // displayUI(currentAccount);
    // // Display Movements
    // displayMovements(currentAccount.movements);
    // // Display balance
    // calcDisplayBalance(currentAccount);
    // // Display summery
    // calcDisplaySummary(currentAccount.movements);
    updateUI();
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  // console.log(amount);
  const receiverAcc = accounts.find((acc) => acc.userName === inputTransferTo.value);

  if (amount > 0 && currentAccount.balance > amount && receiverAcc?.userName !== currentAccount.userName) {
    console.log("transfer valid");
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(amount);
    updateUI();
  } else {
    console.log("transfer not valid");
  }

  // Clearing inputs
  inputTransferTo.value = inputTransferAmount.value = "";
  console.log(receiverAcc);
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentAccount.userName === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex((acc) => acc.userName === inputCloseUsername.value);
    console.log(index);

    accounts.splice(index, 1);

    containerApp.style.opacity = "0";

    labelWelcome.textContent = "Log in to get started";
  }

  inputCloseUsername.value = inputClosePin.value = "";

  document.querySelector(".popup").style.display = "block";
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  const some = currentAccount.movements.some((mov) => mov >= loanAmount * 0.1);
  // const some = currentAccount.movements.some((mov) => console.log(mov));
  // console.log(some);

  if (loanAmount > 0 && some) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI();
    }, 10000);
  }

  inputLoanAmount.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// ------------------------------------
// Sorting ----------------------------
// return < 0 A,B (Keeps Order)
// return > 0 B,A (Switch Order)

// return the value in sort method < 0 ? keeps oprder
// return the value in sort method > 0 ? swithorder

/*
Accending Order;

movements = [400, -450]
imagine ----[a, b]

Accending order => [1,2,3,4,5] small num to large number

movements.sort((a,b) => {
  if(a > b) return 1;
  if(a < b) return -1;
  })
  
  Decending Order => [5,4,3,2,1]
  movements.sort((a,b) => {
    if(a > b) return -1;
    if(a < b) return 1;
    })
    */
// -------------------------------------

//Creating new Date
// -------------------
/*
const now = new Date();
console.log("now:", now);

console.log(new Date("july 8 1998"));

console.log(now.toISOString());

console.log(new Date(0));

console.log(new Date(3 * 24 * 60 * 60 * 1000)); 
*/

/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);

console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

console.log(future.toISOString());
console.log(future.getTime());

console.log(Date.now());
*/
