import { loadCard } from "./criaCard.js";

const $fieldSearch = document.querySelector("[data-fieldSearch]");
const $btnSearch = document.querySelector("[data-btnSearch]");

async function conectApiSearchFilm(foundMovies) {
  $btnSearch.addEventListener("click", async function searchByTypedTitle() {
    let teste = getInputText();

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWMxNmYwNmVlYTQxYWU5OTAwYzZmMzQ4NGI1MWVjYyIsInN1YiI6IjY0ZTYyMDE1NTk0Yzk0MDBmZmU0Zjk5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yWLSBE7tNM4T2xE3RtYirCgBU44_Xx_VeRBlcLJsSjo",
      },
    };

    const sectionApiSearch = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${teste}&include_adult=false&language=pt-BR&page=1`,
      options
    );
    const sectionApiSearchConvertida = await sectionApiSearch.json();

    foundMovies = sectionApiSearchConvertida.results;
    console.log(foundMovies)   
    return foundMovies
  });

}

async function listWantedMovie() {
    const listMoviesFound = await conectApiSearchFilm();
}

function getInputText(titleTyped) {
  titleTyped = $fieldSearch.value;
  return titleTyped;
}

listWantedMovie();

