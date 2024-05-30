import { useEffect, useState } from "react";
import theMovieDBapi from "../../helpers/movies-api";
import { useParams } from "react-router-dom";
import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import { Oval } from "react-loader-spinner";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoader(true);
        setError(false);
        const { results } = await theMovieDBapi.getReviewsById(movieId);
        setReviews(results);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {error && <p>Oops something went wrong please try reload the page</p>}

      {loader && <Oval />}
      {reviews.length > 0 ? (
        <Grid>
          {reviews.map((review) => (
            <GridItem key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <p>Not reviews yet</p>
      )}
    </>
  );
};
export default MovieReviews;
