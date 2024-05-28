import { useEffect, useState } from "react";
import theMovieDBapi from "../../helpers/movies-api";
import { Formik, Form, Field } from "formik";
import { Link, useLocation } from "react-router-dom";
import MoviesList from "../../components/MoviesList/MoviesList";
import MoviesListItem from "../../components/MoviesListItem/MoviesListItem";
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();
  useEffect(() => {
    const fetchMovie = async () => {
      if (!query) {
        return;
      }
      const { results } = await theMovieDBapi.getMovieByQuery(query);
      setMovies(results);
    };
    fetchMovie();
  }, [query]);

  const handleSubmit = (values, actions) => {
    values.search !== ""
      ? setQuery(values.search)
      : console.log("Please fill all fields");
    actions.resetForm();
  };
  return (
    <div>
      <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            name="search"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <MoviesList>
        {movies.map((movie) => (
          <MoviesListItem key={movie.id}>
            <Link to={`${movie.id}`} state={location}>
              {movie.title}
            </Link>
          </MoviesListItem>
        ))}
      </MoviesList>
    </div>
  );
};
export default MoviesPage;
