import { useEffect, useState } from "react";
import theMovieDBapi from "../../helpers/movies-api";
import { Formik, Form, Field } from "formik";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Grid from "../../components/Grid/Grid";
import GridItem from "../../components/GridItem/GridItem";
import toast, { Toaster } from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const query = searchParams.get("query") ?? "";
  const location = useLocation();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!searchParams) {
          return;
        }
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
      <Grid>
        {movies.map((movie) => (
          <GridItem key={movie.id}>
            <Link to={`${movie.id}`} state={location}>
              {movie.title}
            </Link>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
export default MoviesPage;
