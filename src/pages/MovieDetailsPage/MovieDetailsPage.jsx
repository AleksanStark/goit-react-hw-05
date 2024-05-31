import { Suspense, useEffect, useRef, useState } from "react";
import theMovieDBapi from "../../helpers/movies-api";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { Oval } from "react-loader-spinner";
const MoviesDetailsPage = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [releaseYear, setReleaseYear] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { poster_path, title, overview, vote_average } = movies;
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovieById() {
      try {
        setError(false);
        setLoader(true);
        const data = await theMovieDBapi.getMoviesById(movieId);
        setMovies(data);
        setGenres(data.genres);
        setReleaseYear(data.release_date.slice(0, 4));
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchMovieById();
  }, [movieId]);

  return (
    <div>
      {loader && <Oval />}
      {error && <p>Oops something went wrong please try reload the page</p>}
      <Link className={css.go_back_link} to={backLinkRef.current}>
        Go back
      </Link>
      <div className={css.container}>
        <div className={css.image_box}>
          <img
            className={css.series_img}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt=""
          />
        </div>

        <div>
          <h2 className={css.title}>{`${title}  (${releaseYear})`}</h2>
          <span className={css.user_score}>
            User Score: {`${Math.round(vote_average * 10)}%`}
          </span>
          <h3 className={css.overview_title}>Overview:</h3>
          <p className={css.overview_text}>{overview}</p>
          <h3 className={css.genres_title}>genres:</h3>
          {genres.map((genre) => (
            <div key={genre.id}>
              <span>{genre.name}</span>
            </div>
          ))}
        </div>
      </div>
      <ul>
        <li>
          <Link to={"reviews"}>Reviews</Link>
        </li>
        <li>
          <Link to={"cast"}>Cast</Link>
        </li>
      </ul>

      <Suspense fallback={<Oval />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default MoviesDetailsPage;
