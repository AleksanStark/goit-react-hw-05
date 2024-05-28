import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Link, useLocation } from "react-router-dom";
import theMovieDBapi from "../../helpers/movies-api";
import { Oval } from "react-loader-spinner";
import MoviesList from "../../components/MoviesList/MoviesList";
import MoviesListItem from "../../components/MoviesListItem/MoviesListItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
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
      {movies.length > 0 && (
        <MoviesList>
          {movies.map((movie) => (
            <MoviesListItem key={movie.id}>
              <Link to={`movies/${movie.id}`} state={location}>
                {movie.title}
              </Link>
            </MoviesListItem>
          ))}
        </MoviesList>
      )}
      {error &&
        toast.error("Oops went something wrong please reload the page", {
          position: "top-right",
        })}
      <Toaster />
    </div>
  );
};
export default HomePage;
