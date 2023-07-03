import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTrandingMovies, getURL } from 'servises/api';
import { toast } from 'react-toastify';
import Loader from 'components/Loader/Loader';

import './Home.styles.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setTrendingMovies(await getTrandingMovies());
      } catch (error) {
        toast.error('we have a problem');
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);
  return (
    <div className="container">
      <h2 className="title">Trending movies</h2>
      {isLoading && <Loader />}
      {trendingMovies && (
        <div className="list">
          {trendingMovies.map(({ id, title, poster_path }) => {
            return (
              <Link
                className="link"
                to={`/movies/${id}`}
                key={id}
                state={{ from: location }}
              >
                <img className="img" src={getURL(poster_path)} alt={title} />
                <h2 className="text">{title}</h2>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Home;