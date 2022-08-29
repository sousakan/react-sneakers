import './Search.scss';

import searchIcon from '../../assets/icons/search_icon.svg';

interface Props {
  value: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ onSearchChange, value }: Props) => {
  return (
    <div className="search">
      <img className="search__icon" src={searchIcon} alt="search icon" />
      <input
        className="search__input"
        type="search"
        placeholder="Поиск..."
        value={value}
        onChange={onSearchChange}
        role="search"
      />
    </div>
  );
};

export default Search;
