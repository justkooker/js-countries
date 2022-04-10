import filmTemplate from "../templates/filmTemplate.hbs";
import fetchId from "../utils/fetchId";
const gallery = document.querySelector(".gallery-container");
const film = document.querySelector(".film");
const getFilmDescription = function (e) {
  if (e.target.parentNode.nodeName === "LI") {
    const id = e.target.parentNode.getAttribute("id");
    fetchId(id);
  }
};
const createFilmDescription = function (data) {
  const markup = filmTemplate(data);
  film.insertAdjacentHTML("beforeend", markup);
  gallery.classList.add("inactive");
  film.classList.remove("inactive");
};

const unmountFilm = function () {
  film.classList.add("inactive");
  gallery.classList.remove("inactive");
  document.querySelector('.film_item').remove()
};
const closeFilmDescriptionEsc = function (e) {
  if (e.code === "Escape") {
    unmountFilm();
  }
};
const closeFilmDescriptionBtn = function (e) {
  if (e.target.nodeName === "BUTTON") {
    unmountFilm();
  }
};
window.addEventListener("keydown", closeFilmDescriptionEsc);
film.addEventListener("click", closeFilmDescriptionBtn);
export { getFilmDescription, createFilmDescription };
