import './style.css';
import Swal from 'sweetalert2';

async function baseData(coin) {
  const URL_API = `https://api.exchangerate.host/latest?base=${coin}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
}

const coinInput = document.querySelector('#coin-input');
const btnPesquisar = document.querySelector('#btn-pesquisar');
const coinList = document.querySelector('#coin-list');
const h3 = document.querySelector('h3');

function voidAlert() {
  if (coinInput.value === '') {
    Swal.fire({
      title: 'Ops ...',
      text: 'Você precisa passar uma moeda',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
    throw new Error('Error - moeda não informada!');
  }
}

async function nonExistAlert(coin) {
  const data = await baseData(coin);
  const { rates } = data;
  if (rates[coin] === undefined) {
    Swal.fire({
      title: 'Ops ...',
      text: 'Moeda não existente!',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
    throw new Error('Error - moeda informada não existe!');
  }
}

async function handleclick() {
  try {
    voidAlert();
    const coin = coinInput.value.toUpperCase();
    await nonExistAlert(coin);
    const data = await baseData(coin);
    const objRates = data.rates;
    const rates = Object.keys(objRates);
    coinList.innerHTML = '';
    rates.forEach((rate) => {
      const li = document.createElement('li');
      li.innerHTML = `${rate} <span>${objRates[rate].toFixed(3)}</span>`;
      coinList.appendChild(li);
    });
    h3.innerText = `Valores referentes a 1 ${coin}`;
    coinInput.value = '';
  } catch (error) {
    return null;
  }
}

btnPesquisar.addEventListener('click', handleclick);
