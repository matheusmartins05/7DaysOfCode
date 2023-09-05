import { descobrirFilme, pesquisarFilmeDigitado } from "./conectaApi.js";
const listaFilmes = document.querySelector("[data-listaFilmes]");
const input = document.querySelector("[data-input]");
const campoBusca = document.querySelector(".input-container");
const btnBuscar = document.querySelector("[data-btnSearch]");
const tituloPagina = document.querySelector(".tituloPagina")


const mostraFavoritados = document.querySelector("#filmesFavoritos")
const favoritados = JSON.parse(localStorage.getItem("favoritados")) || [];

// esqueleto dos cards
function cardFilme(image, title, average, overview, idFilme) {
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

// section discover Api
async function filmesPopulares() {
  const infosFilm = await descobrirFilme();

  infosFilm.forEach((element) => {
    listaFilmes.appendChild(
      cardFilme(
        element.poster_path,
        element.title,
        element.vote_average,
        element.overview,
        element.id
      )
    );
  });
  favoritaoOuNao();
  adicionaRemoveLocalStorage();
}

//section search film Api

async function filmesPorBusca() {
  const filmeBuscado = document.querySelector("[data-input]");
  const resultadoBusca = await pesquisarFilmeDigitado(filmeBuscado.value);

  resultadoBusca.forEach((element) => {
    listaFilmes.appendChild(
      cardFilme(
        element.poster_path,
        element.title,
        element.vote_average,
        element.overview,
        element.id
      )
    );
  });

  favoritaoOuNao();
  adicionaRemoveLocalStorage();
}


function filmesFavoritados(){

  favoritados.forEach(element => {
    listaFilmes.appendChild(cardFilme(element.img, element.titulo, element.nota, element.resumo, element.id))
  });
  favoritaoOuNao()
  adicionaRemoveLocalStorage();
}


function mostraListaDeFavoritos(){
  mostraFavoritados.addEventListener("click", function(){
    if(mostraFavoritados.checked){

      limparSecaoFilmesAoDigitar()
      campoBusca.classList.add("naoExibeBarraPesquisa");
      tituloPagina.innerText = 'Meus filmes favoritos'
      filmesFavoritados()
    }else{
      limparSecaoFilmesAoDigitar()
      campoBusca.classList.remove("naoExibeBarraPesquisa");
      tituloPagina.innerText = 'Filmes Populares'
      filmesPopulares()
    }
  })
}

mostraListaDeFavoritos()


async function pesquisarFilme() {

  input.addEventListener("keydown", function (e) {
    if (input.value != '') {
      limparSecaoFilmesAoDigitar();
    }

    if (e.key === "Enter" && input.value != '') {
      e.preventDefault();
      filmesPorBusca();
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      filmesPopulares();
    }
  });

  btnBuscar.addEventListener("click",  filmesPorBusca)

}



// funções menores

function limparSecaoFilmesAoDigitar() {
  listaFilmes.innerHTML = "";
}

function adicionaRemoveLocalStorage() {
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
        favoritados.splice(
          favoritados.findIndex(
            (element) => element.id === informacoesFilmeFavoritado.id
          ),
          1
        );
        localStorage.setItem("favoritados", JSON.stringify(favoritados));
        this.src = "./src/image/coracaoVazio.svg";
      } else {
        //adiciona ao localStorage
        favoritados.push(informacoesFilmeFavoritado);
        localStorage.setItem("favoritados", JSON.stringify(favoritados));
        this.src = "./src/image/coracaoPreenchido.svg";
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

function favoritaoOuNao() {
  // verifica se o filme está favoritado no localStorage e adiciona a imagem de coração favoritado.
  const coracao = document.querySelectorAll("[data-favoritar]");
  coracao.forEach((element) => {
    element.addEventListener("load", function (e) {
      const teste = achaInfosDoFilmeFavoritado(e);
      const existe = favoritados.find((element) => element.id === teste[4]);

      if (existe) {
        e.target.src = "./src/image/coracaoPreenchido.svg";
      }
    });
  });
}


window.addEventListener("load", () => {
  pesquisarFilme();
  filmesPopulares();
});
