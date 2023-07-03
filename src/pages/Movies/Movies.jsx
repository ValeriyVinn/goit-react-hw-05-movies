import Loader from 'components/Loader/Loader';
import SearchBar from 'components/SearchBar/SearchBar';
import MoviesList from 'components/MovieList/MovieList';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesBySearch } from 'servises/api';
import { toast } from 'react-toastify';

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('name') ?? '/';
  useEffect(() => {
    if (movieName === '') {
      return;
    }
    const fetchMoviesList = async () => {
      try {
        setIsLoading(true);
        setMovieList(await getMoviesBySearch(movieName));
      } catch (error) {
        toast.error('we have a problem');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesList();
  }, [movieName]);

  const inputValue = name => {
    setSearchParams(name !== '' ? { name } : {});
  };

  return (
    <>
      <SearchBar onSubmit={inputValue} />
      {isLoading && <Loader />}
      {movieList.length > 0 && <MoviesList list={movieList} name={movieName} />}
    </>
  );
};
export default Movies;