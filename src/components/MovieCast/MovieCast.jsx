import { useEffect, useState } from "react";
import theMovieDBapi from "../../helpers/movies-api";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setError(false);
        setLoader(true);
        const { cast } = await theMovieDBapi.getCastById(movieId);
        setCast(cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    fetchCast();
  }, [movieId]);
  return (
    <>
      {loader && <Oval />}
      {error && <p>Oops something went wrong please try reload the page</p>}
      {cast.length > 0 && (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <h3>{actor.name}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt=""
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
