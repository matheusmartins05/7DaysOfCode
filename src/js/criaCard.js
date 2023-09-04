import { descobrirFilme, pesquisarFilmeDigitado } from "./conectaApi.js";
const listaFilmes = document.querySelector("[data-listaFilmes]");
const input = document.querySelector("[data-input]");
const btnBuscar = document.querySelector("[data-btnSearch]");
const favoritados = JSON.parse(localStorage.getItem("favoritados")) || [];


// esqueleto dos cards
function carregarCards(image, title, average, overview, idFilme) {
  const lista = document.createElement("div");
  lista.classList.add("card");
  lista.innerHTML = `
<figure>
    <img src="https://image.tmdb.org/t/p/w200/${image}">
</figure>

<div class="infosFilme" id="${idFilme}">
    <p class="nomeFilme"> ${title} </p>

    <div class="classificacao">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M10 0L13.09 6.26L20 7.27L15 12.14L16.18 19.02L10 15.77L3.82 19.02L5 12.14L0 7.27L6.91 6.26L10 0Z"
            fill="#D7A82F" />
        </svg>
        <p>${average}</p>
    </div>

 <div class="favoritar">
    <img src='./src/image/coracaoVazio.svg' data-favoritar>
    <p>Favoritar</p>
    </div>
</div>

<div class="resumoFilme">${overview}</div>`;

  return lista;
}

// adiciona informações aos cards
async function addInfosCard() {
  const infosFilm = await descobrirFilme();

  infosFilm.forEach((element) => {
    listaFilmes.appendChild(
      carregarCards(
        element.poster_path,
        element.title,
        element.vote_average,
        element.overview,
        element.id
      )
    );
  });
  filmeFavoritadoOuNao();
}

async function trazResultadoPesquisa() {
  input.addEventListener("click", limparSecaoFilmesAoDigitar);

  btnBuscar.addEventListener("click", async () => {
    const valorDigitado = input.value;
    listaFilmes.innerHTML = "";
    const resultadoBusca = await pesquisarFilmeDigitado(valorDigitado);

    resultadoBusca.forEach((element) => {
      listaFilmes.appendChild(
        carregarCards(
          element.poster_path,
          element.title,
          element.vote_average,
          element.overview
        )
      );
    });
  });
}

// funções menores

function limparSecaoFilmesAoDigitar() {
  listaFilmes.innerHTML = "";
}

function filmeFavoritadoOuNao() {
  const coracao = document.querySelectorAll("[data-favoritar]");
  coracao.forEach((element) => {
    element.addEventListener("click", function (e) {
      const infosLocalStorage = achaInfosDoFilmeFavoritado(e);
      const informacoesFilmeFavoritado = {
        id: infosLocalStorage[4],
        titulo: infosLocalStorage[1],
        nota: infosLocalStorage[2],
        resumo: infosLocalStorage[3],
        img: infosLocalStorage[0],
      };

      const existe = favoritados.find(
        (element) => element.id === informacoesFilmeFavoritado.id
      );

      
      
      if (existe) {
        //remover do localStorage
        favoritados.splice(favoritados.findIndex(element => element.id === informacoesFilmeFavoritado.id), 1)
        localStorage.setItem("favoritados", JSON.stringify(favoritados));
        this.src = './src/image/coracaoVazio.svg'
      }else{
        favoritados.push(informacoesFilmeFavoritado)
        localStorage.setItem("favoritados", JSON.stringify(favoritados));
        this.src = './src/image/coracaoPreenchido.svg'

      }


      
    });
  });
}

function achaInfosDoFilmeFavoritado(e) {
  const imagemFavoritado =
    e.target.parentNode.parentNode.parentNode.children[0].children[0]
      .currentSrc;
  const nomeFilmeFavoritado =
    e.target.parentNode.parentElement.children[0].textContent;
  const notaFavoritado =
    e.target.parentNode.parentElement.children[1].innerText;
  const resumoFavoritado =
    e.target.parentNode.parentNode.nextElementSibling.textContent;
  const id = e.target.parentNode.parentNode.attributes[1].textContent;
  const todasInfos = [
    imagemFavoritado,
    nomeFilmeFavoritado,
    notaFavoritado,
    resumoFavoritado,
    id,
  ];

  return todasInfos;
}

window.addEventListener("load", () => {
  trazResultadoPesquisa();
  addInfosCard();
});
