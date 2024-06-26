import { getMovieReviews } from 'servises/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'components/Loader/Loader';
import './Review.style.css';

const Reviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchCredits() {
      try {
        setIsLoading(true);
        setReviews(await getMovieReviews(Number(movieId)));
      } catch (error) {
        toast.error('we have a problem');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCredits();
  }, [movieId]);

  return (
    <div className="reviewesContainer">
      {isLoading && <Loader />}
    {reviews.length === 0 ? (<h3 className="noReviewes">We don`t have any reviews yet</h3>) : (
        <ul className="reviewsList">
            {reviews.map(({ id, author, content }) => (
                <li key={id}>
                    <p>
                        <span className="reviewesAutor">Author:</span> {author}
                    </p>
                    <p>{content}</p>
                </li>
            ))}
        </ul>
    )}
</div>
  );
};
export default Reviews;