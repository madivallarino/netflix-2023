const API_KEY = "506fc7fa00a975aee3fe05def43f08d9"

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    // fetchActionMovies: `/discovermovie?api_key=${API_KEY}&with_genres=28`,
    // fetchComedyMovies: `/discovermovie?api_key=${API_KEY}&with_genres=35`,
    // fetchHorrorMovies: `/discovermovie?api_key=${API_KEY}&with_genres=27`,
    // fetchRomanceMovies: `/discovermovie?api_key=${API_KEY}&with_genres=10749`,
    // fetchDocumentariesMovies: `/discovermovie?api_key=${API_KEY}&with_genres=99`,
}

export default requests;