import { useEffect, useState } from "react";
import MoviesList from "../MoviesList/MoviesList";
import theMovieDBapi from "../../helpers/movies-api";
import { useParams } from "react-router-dom";
import MoviesListItem from "../MoviesListItem/MoviesListItem";
import { Oval } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoader(true);
        setError(false);

        const { cast } = await theMovieDBapi.getCastById(movieId);
        setCast(cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    fetchCast();
  });
  return (
    <>
      {loader && <Oval />}
      {error &&
        toast.error("Oops something went wrong please reload the page", {
          position: "top-right",
        })}
      <Toaster />
      {cast.length > 0 && (
        <MoviesList>
          {cast.map((actor) => (
            <MoviesListItem key={actor.id}>
              <h3>{actor.name}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt=""
              />
            </MoviesListItem>
          ))}
        </MoviesList>
      )}
    </>
  );
};

export default MovieCast;
