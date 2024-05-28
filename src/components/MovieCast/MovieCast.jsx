import { useEffect, useState } from "react";
import MoviesList from "../MoviesList/MoviesList";
import theMovieDBapi from "../../helpers/movies-api";
import { useParams } from "react-router-dom";
import MoviesListItem from "../MoviesListItem/MoviesListItem";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    const fetchCast = async () => {
      const { cast } = await theMovieDBapi.getCastById(movieId);
      setCast(cast);
    };
    fetchCast();
  });
  return (
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
  );
};

export default MovieCast;
