import './Search.scss';

import searchIcon from '../../assets/icons/search_icon.svg';

const Search = ({ onSearchChange }) => {
  return (
    <div className="search">
      <img className="search__icon" src={searchIcon} alt="search icon" />
      <input
        className="search__input"
        type="search"
        placeholder="Поиск..."
        onChange={onSearchChange}
      />
    </div>
  );
};

export default Search;
