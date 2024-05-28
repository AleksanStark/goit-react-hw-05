import axios from "axios";

const getTrendingMovies = async () => {
  const reponse = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=ISO-639-1'",
    {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTMwOWEyMTc2NDlmOGQ0MTY1YzA5YTM5Y2I5YjQyYSIsInN1YiI6IjY2NTA3NTVhNDY2NzQ0MGY4OTM1MGYwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1SvWUP_WSfRFneIx8tyMWsZHj4GCYlqBPYcQNhpp9Q",
      },
    }
  );
  return reponse.data;
};

const getMoviesById = async (movie_id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}?language=en`,
    {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTMwOWEyMTc2NDlmOGQ0MTY1YzA5YTM5Y2I5YjQyYSIsInN1YiI6IjY2NTA3NTVhNDY2NzQ0MGY4OTM1MGYwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1SvWUP_WSfRFneIx8tyMWsZHj4GCYlqBPYcQNhpp9Q",
      },
    }
  );
  return data;
};

const getMovieByQuery = async (query) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTMwOWEyMTc2NDlmOGQ0MTY1YzA5YTM5Y2I5YjQyYSIsInN1YiI6IjY2NTA3NTVhNDY2NzQ0MGY4OTM1MGYwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1SvWUP_WSfRFneIx8tyMWsZHj4GCYlqBPYcQNhpp9Q",
      },
    }
  );
  return data;
};

const getReviewsById = async (movie_id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
    {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTMwOWEyMTc2NDlmOGQ0MTY1YzA5YTM5Y2I5YjQyYSIsInN1YiI6IjY2NTA3NTVhNDY2NzQ0MGY4OTM1MGYwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1SvWUP_WSfRFneIx8tyMWsZHj4GCYlqBPYcQNhpp9Q",
      },
    }
  );
  return data;
};

const getCastById = async (movie_id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTMwOWEyMTc2NDlmOGQ0MTY1YzA5YTM5Y2I5YjQyYSIsInN1YiI6IjY2NTA3NTVhNDY2NzQ0MGY4OTM1MGYwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1SvWUP_WSfRFneIx8tyMWsZHj4GCYlqBPYcQNhpp9Q",
      },
    }
  );
  return data;
};

const theMovieDBapi = {
  getTrendingMovies,
  getMoviesById,
  getMovieByQuery,
  getReviewsById,
  getCastById,
};
export default theMovieDBapi;
