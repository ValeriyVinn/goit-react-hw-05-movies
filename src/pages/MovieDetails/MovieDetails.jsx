import GoBack from 'components/GoBack/GoBack';
import Loader from 'components/Loader/Loader';
import MovieCard from 'components/MovieCard/MovieCard';
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';

import { toast } from 'react-toastify';
import { getMovieDetails } from 'servises/api';

import './MovieDetails.styles.css';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    async function fetchDetails() {
      try {
        setIsLoading(true);
        setMovieDetails(await getMovieDetails(Number(movieId)));
      } catch (error) {
        toast.error('we have a problem');
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [movieId]);

  if (!movieDetails) {
    return null;
  }
  return (
    <div className="card">
      <>
        <Link to={backLinkHref} className="backLink">
          <GoBack />
        </Link>
        {isLoading && <Loader />}
        <MovieCard info={movieDetails} />

        <Link to="cast" state={{ from: backLinkHref }} className="castLink">
          {' '}
          Cast{' '}
        </Link>

        <Link
          to="reviews"
          state={{ from: backLinkHref }}
          className="reviewsLink"
        >
          {' '}
          Reviews{' '}
        </Link>
        <Outlet />
      </>
    </div>
  );
};
export default MovieDetails;
