async function conectarApi() {
  const api =
    "https://api.themoviedb.org/3/movie/11?api_key=c5c16f06eea41ae9900c6f3484b51ecc";
  const apiResponse = await fetch(api);

  return apiResponse;
}

async function discoverFilm(listaFilmes) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWMxNmYwNmVlYTQxYWU5OTAwYzZmMzQ4NGI1MWVjYyIsInN1YiI6IjY0ZTYyMDE1NTk0Yzk0MDBmZmU0Zjk5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yWLSBE7tNM4T2xE3RtYirCgBU44_Xx_VeRBlcLJsSjo",
    },
  };

  const sectionDiscoverApi = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  );
  const sectionDiscoverApiConvertida = await sectionDiscoverApi.json();

  listaFilmes = sectionDiscoverApiConvertida.results;
  return listaFilmes;
}

export{ 
  discoverFilm 
};
