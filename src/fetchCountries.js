import { creatingCountryList, creatingCountryInfo, Notify } from './index';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';


const fetchCountries = function (searchQuery) {
  if (searchQuery === '') {
    return;
  }
  fetch(`https://restcountries.com/v2/name/${searchQuery}`)
    .then(response => response.json())
    .then(data => funcChoose(data));
};
const funcChoose = function (data) {
  if (data.length > 1 && data.length <= 10) {
    return creatingCountryList(data);
  } else if (data.length === 1) {
    return creatingCountryInfo(data);
  }
  else if(data.length > 10) {
    alert({
      text: 'To many matches founf. Please enter a more specific query.'
    });
  }
  if (data.length === 0) {
    return Notify('The country you requested does not exist ');
  }
};

export default fetchCountries;
