import { useEffect, useState } from "react";
import theMovieDBapi from "../../helpers/movies-api";
import { useParams } from "react-router-dom";
import MoviesList from "../MoviesList/MoviesList";
import MoviesListItem from "../MoviesListItem/MoviesListItem";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchReviews = async () => {
      const { results } = await theMovieDBapi.getReviewsById(movieId);
      setReviews(results);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <MoviesList>
      {reviews.map((review) => (
        <MoviesListItem key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </MoviesListItem>
      ))}
    </MoviesList>
  );
};
export default MovieReviews;
