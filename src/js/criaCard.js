import { descobrirFilme, pesquisarFilmeDigitado } from "./conectaApi.js";
const listaFilmes = document.querySelector("[data-listaFilmes]");
const campoPesquisa = document.querySelector("[data-input]");




function carregarCards(image, title, average, overview) {
  const lista = document.createElement("div");
  lista.classList.add('card')
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
    <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20.2913 2.61183C19.7805 2.10083 19.1741 1.69547 18.5066 1.41891C17.8392 1.14235 17.1238 1 16.4013 1C15.6788 1 14.9634 1.14235 14.2959 1.41891C13.6285 1.69547 13.022 2.10083 12.5113 2.61183L11.4513 3.67183L10.3913 2.61183C9.3596 1.58013 7.96032 1.00053 6.50129 1.00053C5.04226 1.00053 3.64298 1.58013 2.61129 2.61183C1.5796 3.64352 1 5.04279 1 6.50183C1 7.96086 1.5796 9.36013 2.61129 10.3918L3.67129 11.4518L11.4513 19.2318L19.2313 11.4518L20.2913 10.3918C20.8023 9.88107 21.2076 9.27464 21.4842 8.60718C21.7608 7.93972 21.9031 7.22431 21.9031 6.50183C21.9031 5.77934 21.7608 5.06393 21.4842 4.39647C21.2076 3.72901 20.8023 3.12258 20.2913 2.61183V2.61183Z"
            stroke="#BA0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <p>Favoritar</p>
    </div>
</div>

<div class="resumoFilme">${overview}</div>`

  return lista;
}

async function addInfosCard() {
  const infosFilm = await descobrirFilme();

  infosFilm.forEach((element) => {
    listaFilmes.appendChild(
      carregarCards(
        element.poster_path,
        element.title,
        element.vote_average,
        element.overview
      )
    );
  });
}



const input = document.querySelector("[data-input]");
const btnBuscar = document.querySelector("[data-btnSearch]");




async function trazResultadoPesquisa (){
  
    btnBuscar.addEventListener("click", async () =>{
      const valorDigitado = input.value;
     
      if (valorDigitado == '') {
        console.log('Você é burro?')
      }else{
        listaFilmes.innerHTML = '';
        const resultadoBusca = await pesquisarFilmeDigitado(valorDigitado);

        resultadoBusca.forEach(element => {
          listaFilmes.appendChild(carregarCards( element.poster_path, element.title, element.vote_average, element.overview));
        });

      }
    })

    
}


addInfosCard();
trazResultadoPesquisa();

