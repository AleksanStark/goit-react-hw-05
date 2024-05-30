import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import theMovieDBapi from "../../helpers/movies-api";
import { Oval } from "react-loader-spinner";
import Grid from "../../components/Grid/Grid";
import GridItem from "../../components/GridItem/GridItem";
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
        <Grid>
          {movies.map((movie) => (
            <GridItem key={movie.id}>
              <Link to={`movies/${movie.id}`} state={location}>
                {movie.title}
              </Link>
            </GridItem>
          ))}
        </Grid>
      )}
      {error && <p>Oops something went wrong please try reload the page</p>}
    </div>
  );
};
export default HomePage;
