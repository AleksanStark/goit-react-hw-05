import { Suspense, useEffect, useRef, useState } from "react";
import theMovieDBapi from "../../helpers/movies-api";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import css from "./MoviesDetailsPage.module.css";
import MoviesList from "../../components/MoviesList/MoviesList";
import MoviesListItem from "../../components/MoviesListItem/MoviesListItem";
import { Oval } from "react-loader-spinner";
const MoviesDetailsPage = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [releaseYear, setReleaseYear] = useState("");

  const { poster_path, title, overview, vote_average } = movies;
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovieById() {
      const data = await theMovieDBapi.getMoviesById(movieId);
      setMovies(data);
      setGenres(data.genres);
      setReleaseYear(data.release_date.slice(0, 4));
    }
    fetchMovieById();
  }, [movieId]);

  return (
    <div>
      <button className={css.go_back_btn}>
        <Link className={css.go_back_link} to={backLinkRef.current}>
          Go back
        </Link>
      </button>
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
      <MoviesList>
        <MoviesListItem>
          <NavLink to={"reviews"}>reviews</NavLink>
        </MoviesListItem>
        <MoviesListItem>
          <NavLink to={"cast"}>cast</NavLink>
        </MoviesListItem>
      </MoviesList>

      <Suspense fallback={<Oval />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default MoviesDetailsPage;
