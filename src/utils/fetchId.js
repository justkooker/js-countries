import { createFilmDescription } from "../modules/film";
const options = {
  URL: "http://www.omdbapi.com/",
  KEY: "9eb9d26e",
};
const fetchId = function (id) {
  fetch(`${options.URL}?apikey=${options.KEY}&i=${id}`)
    .then((response) => response.json())
    .then((data) => createFilmDescription(data));
};

export default fetchId;
