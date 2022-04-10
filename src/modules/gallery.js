import fetchQuery from "../utils/fetchQuery";
import galleryItemTemplate from "../templates/galleryItemTemplate.hbs";
import { getFilmDescription } from "../modules/film";

import notifyUser from "./notification";
const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const galleryContainer = document.querySelector('.gallery-container')
const nitificationMesages = {
  tooManyMathes: "Too many matches. Specify your request!",
  emptyInput: "Enter your request!",
};
const sendData = function (e) {
  e.preventDefault();
  const data = new FormData(document.querySelector("form"));
  const inputValue = data.get("search");
  if (inputValue !== "") {
    fetchQuery(inputValue);
  } else {
    notifyUser(nitificationMesages.emptyInput);
  }
};

const createGallery = function (data) {
  
  if (data !== undefined) {
    gallery.innerHTML = "";
    const markup = data.map((el) => galleryItemTemplate(el)).join("");
    gallery.insertAdjacentHTML("beforeend", markup);
    galleryContainer.classList.remove('inactive')
  } else {
    notifyUser(nitificationMesages.tooManyMathes);
  }
};
form.addEventListener("submit", sendData);
gallery.addEventListener("click", getFilmDescription);
export { createGallery, sendData };
