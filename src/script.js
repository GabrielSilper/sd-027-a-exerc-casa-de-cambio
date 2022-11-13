import './style.css';

async function baseData(coin) {
  const URL_API = `https://api.exchangerate.host/latest?base=${coin}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
}

const coinInput = document.querySelector('#coin-input');
const btnPesquisar = document.querySelector('#btn-pesquisar');
const coinList = document.querySelector('#coin-list');

async function handleclick() {
  const coin = coinInput.value;
  const data = await baseData(coin);
  const objRates = data.rates;
  const rates = Object.keys(objRates);
  rates.forEach((rate) => {
    const li = document.createElement('li');
    li.innerHTML = `${rate} <span>${objRates[rate]}</span>`;
    coinList.appendChild(li);
  });
}

btnPesquisar.addEventListener('click', handleclick);
