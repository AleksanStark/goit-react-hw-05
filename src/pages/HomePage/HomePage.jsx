import { useEffect, useState } from "react";
import theMovieDBapi from "../../helpers/movies-api";
import { Oval } from "react-loader-spinner";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setError(false);
        setLoader(true);
        const { results } = await theMovieDBapi.getTrendingMovies();

        setMovies(results);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {loader && <Oval />}
      {error && <p>Oops something went wrong please try reload the page</p>}
      {movies.length > 0 && <MovieList moviesList={movies} />}
    </div>
  );
};
export default HomePage;
