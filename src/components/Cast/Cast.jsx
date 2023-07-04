import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast, getURL } from 'servises/api';
import { toast } from 'react-toastify';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import './Cast.styles.css';

const Casts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchCredits() {
      try {
        setIsLoading(true);
        setCast(await getMovieCast(Number(movieId)));
      } catch (error) {
        toast.error('we have a problem');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCredits();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginTop: '15px',
        }}
      >
        {cast ? (
          cast.map(({ original_name, id, profile_path, character }) => (
            <div
              key={id}
              style={{ listStyle: 'none', margin: '0 auto', maxWidth: '250px' }}
            >
              <img src={getURL(profile_path)} alt="poster" width={'250px'} />

              <p className="actor">{original_name}</p>
              <p className="character">Character:{character}</p>
            </div>
          ))
        ) : (
          <p>We don`t have any casts here</p>
        )}
      </div>
    </>
  );
};


Casts.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      original_name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      profile_path: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    })
  ),
};

export default Casts;