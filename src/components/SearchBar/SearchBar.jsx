import { useState } from 'react';
import { toast } from 'react-toastify';
import './SearchBar.style.css';

function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query === '') {
      return toast.error('Enter something in the search !');
    }
    onSubmit(query);
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="formSearch">
      <button className="buttonSearch" type="submit">
        <span className="button_text">Search</span>
      </button>
      <input
        className="inputSearch"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={searchQuery}
        onChange={handleNameChange}
      />
    </form>
  );
}

export default SearchBar;
