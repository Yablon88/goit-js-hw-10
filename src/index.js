import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const cardContainer = document.querySelector('.country-info');
const searchForm = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(elem) {
  elem.preventDefault();

  const inputName = elem.target.value.trim();

  if (!inputName) {
    countryList.innerHTML = '';
    cardContainer.innerHTML = '';
    return;
  }
  fetchCountries(inputName)
    .then(result => {
      if (result.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      selectedCountry(result);
    })
    .catch(onFetchError);
}

// -------------------------------------------   Функції    ---------------------------------------------

function selectedCountry(result) {
  if (result.length === 1) {
    countryCard(result);
  }
  if (result.length > 1 && result.length <= 10) {
    countryListMarking(result);
  }
}

function countryListMarking(result) {
  cardContainer.innerHTML = '';
  console.log(result);

  const counryArrey = result
    .map(item => {
      return `<li><img src = ${item.flags.svg} alt = 'flag' width =36px > <span> ${item.name.official} </span></li>`;
    })
    .join('');

  console.log(counryArrey);
  countryList.innerHTML = counryArrey;
}

function countryCard(result) {
  countryList.innerHTML = '';
  const countryMarcup = `<h2> <img src = ${
    result[0].flags.svg
  } alt = 'flag' width =36px >    ${result[0].name.official} </h2>
  <p>capital:  ${result[0].capital}</p>
    <p>population:   ${result[0].population}   </p>
  <p>languages:    ${Object.values(result[0].languages)} </p>`;

  cardContainer.innerHTML = countryMarcup;
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}
