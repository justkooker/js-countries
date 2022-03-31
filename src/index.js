// Поиск стран
// Создай небольшое приложение поиска данных о стране по ее частичному или полному имени. Используй Rest Countries API,
//  а именно вторую версию (v2)
//  и ендпоинт /name, возвращающий массив объектов стран попавших под критерий поиска.

// Достаточно чтобы приложение работало для большинства стран. Некоторые страны, такие как Sudan,
//  могут создавать проблемы, поскольку название страны является частью названия другой страны, South Sudan.
//  Не нужно беспокоиться об этих исключениях.

// Интерфейс очень простой. Название страны для поиска пользователь вводит в текстовое поле.

// ⚠️ ВНИМАНИЕ! HTTP-запросы на бекенд происходят не по сабмиту формы, формы нет, а при наборе имени страны в инпуте,
//  то есть по событию input. Но делать HTTP-запрос при каждом нажатии клавиши нельзя,
//   так как одновременно получится много HTTP-запросов которые будут выполняться в непредсказуемом порядке (race conditions).
//   Поэтому на обработчик события необходимо применить подход debounce и делать HTTP-запрос спустя 500мс после того, как пользователь перестал вводить текст.
//    Используй npm-пакет lodash.debounce.

// Если бекенд вернул больше чем 10 стран подошедших под критерий введенный пользователем, в интерфейсе отображается нотификация о том,
//  что необходимо сделать запрос более специфичным. Для оповещений используй плагин pnotify.

import fetchCountries from './fetchCountries';
import coutryListTemplate from './templates/country-list-template.hbs';
import countryInfoTemplate from './templates/country-info-template.hbs';
import './css/styles.css';
const debounce = require('lodash.debounce');
const input = document.querySelector('.input');
const cauntryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const notification = document.querySelector('.notification');

const inputVal = function (e) {
  if (e.target.value === '') {
    notification.classList.add('visible');
  }
  notification.classList.remove('visible');
  cleanInnerHTML()

  fetchCountries(e.target.value);
};
const cleanInnerHTML = function () {
  notification.innerHTML = '';
  countryInfo.innerHTML = '';
  cauntryList.innerHTML = '';
};
const Notify = function (data) {
  cleanInnerHTML();
  notification.textContent = data;
};
const creatingCountryInfo = function (data) {
  cleanInnerHTML();
 
  const markup = data.map(country => countryInfoTemplate(country));
  console.log(data);
  countryInfo.insertAdjacentHTML('beforeend', markup);
};
const creatingCountryList = function (data) {
  cleanInnerHTML();
  console.log(data)
  const markup = data.map(country => coutryListTemplate(country)).join('');
  cauntryList.insertAdjacentHTML('beforeend', markup);
};
input.addEventListener('input', debounce(inputVal, 500));

export { creatingCountryList, creatingCountryInfo, Notify };
