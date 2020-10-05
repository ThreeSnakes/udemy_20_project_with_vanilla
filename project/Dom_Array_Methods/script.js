const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// fetch random user and add money
const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser);
};

const addData = (obj) => {
  data.push(obj);

  updateDom();
};

const updateDom = (providedData = data) => {
  // Clear main Div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

const formatMoney= (number) => '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

const doubleMoney = () => {
 data = data.map((user) => {
   return { ...user, money: user.money * 2 };
 });

 updateDom();
}

const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDom();
}

const showMillionaires = () => {
  data = data.filter((item) => item.money > 1000000);

  updateDom();
}

const calculateWealth = () => {
  const wealth = data.reduce((acc, user) => (acc + user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: ${formatMoney(wealth)}</h3>`
  main.appendChild(wealthEl);
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
