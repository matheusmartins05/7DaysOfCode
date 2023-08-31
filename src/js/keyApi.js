async function conectarApi() {
    const api =
      "https://api.themoviedb.org/3/movie/11?api_key=c5c16f06eea41ae9900c6f3484b51ecc";
    const apiResponse = await fetch(api);
  
    return apiResponse;
  }

  export { conectarApi };

