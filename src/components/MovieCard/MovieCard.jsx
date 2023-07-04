import './MovieCard.style.css';
import { getURL } from '../../servises/api';
// import PropTypes from 'prop-types';

const MovieCard = ({ info }) => {
  const {
    original_title,
    poster_path,
    genres,
    overview,
    vote_average,
    release_date,
  } = info;

  return (
    <div className="card_container">
      <div>
        <img src={getURL(poster_path)} alt={original_title} />
      </div>

      <div className="details">
        <h1>{original_title}</h1>

        <p>
          <span className="textCard">Overview: </span> {overview}
        </p>
        <p>
          <span className="textCard">Points:</span> {vote_average} / 10
        </p>
        <p>
          <span className="textCard">Release date:</span> {'  ' + release_date}
        </p>

        <span className="textCard"> Genre:</span>

        {genres
          ? genres.map((genre, index) => (
              <p key={index} className="genre_item">
                {genre.name + ','}
              </p>
            ))
          : 'Genres is not available'}
      </div>
    </div>
  );
};

// MovieCard.propTypes = {
//   info: PropTypes.shape({
//     original_title: PropTypes.string.isRequired,
//     poster_path: PropTypes.string.isRequired,
//     genres: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//       })
//     ),
//     overview: PropTypes.string.isRequired,
//     vote_average: PropTypes.number.isRequired,
//     release_date: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default MovieCard;
