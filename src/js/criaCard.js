import { descobrirFilme, pesquisarFilmeDigitado } from "./conectaApi.js";
const listaFilmes = document.querySelector("[data-listaFilmes]");
const input = document.querySelector("[data-input]");
const btnBuscar = document.querySelector("[data-btnSearch]");

function carregarCards(image, title, average, overview, imagemFavorito) {
  const lista = document.createElement("div");
  lista.classList.add("card");
  lista.innerHTML = `
<figure>
    <img src="https://image.tmdb.org/t/p/w200/${image}">
</figure>

<div class="infosFilme">
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

async function addInfosCard() {
  const infosFilm = await descobrirFilme();

  infosFilm.forEach((element) => {
    listaFilmes.appendChild(carregarCards(element.poster_path, element.title, element.vote_average, element.overview)
    
    );

 
  });

  const teste = document.querySelector("[data-favoritar]");

  teste.addEventListener("click", function(e){
  if (e.target.src == 'http://127.0.0.1:5500/src/image/coracaoVazio.svg') {
     e.target.src = 'http://127.0.0.1:5500/src/image/coracaoPreenchido.svg'

  }else{
    e.target.src = 'http://127.0.0.1:5500/src/image/coracaoVazio.svg'
  }

  })


}







async function trazResultadoPesquisa() {

  input.addEventListener("click", limparSecaoFilmesAoDigitar)

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




function limparSecaoFilmesAoDigitar(){
  listaFilmes.innerHTML = '';
}

window.addEventListener("load", () =>{
  addInfosCard();
  trazResultadoPesquisa();
})






