import { useEffect, useState } from "react";
import theMovieDBapi from "../../helpers/movies-api";
import { Formik, Form, Field } from "formik";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoader(true);
        setError(false);
        const { results } = await theMovieDBapi.getMovieByQuery(query);
        setMovies(results);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    fetchMovie();
  }, [query, searchParams]);

  const handleSubmit = (values, actions) => {
    values.search !== ""
      ? searchParams.set("query", values.search)
      : toast.error("Please fill all fields", { position: "top-right" });
    setSearchParams(searchParams);
    actions.resetForm();
  };
  return (
    <div>
      {loader && <Oval />}
      {error && <p>Oops something went wrong please try reload the page</p>}
      <Formik initialValues={{ search: query }} onSubmit={handleSubmit}>
        <Form>
          <Field
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            name="search"
          />
          <button type="submit">Search</button>
          <Toaster />
        </Form>
      </Formik>
      <MovieList moviesList={movies} />
    </div>
  );
};
export default MoviesPage;
