import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  filter: string;
  handleFilterChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  numberFilter: number;
  handleNumberFilterChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  filter,
  handleFilterChange,
  numberFilter,
  handleNumberFilterChange,
}) => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBarItem}>
        Search
        <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <div className={styles.searchBarItem}>
        Filter
        <select value={numberFilter} onChange={handleNumberFilterChange}>
          <option value={0}>All</option>
          <option value={10}>{`> 10`}</option>
          <option value={50}>{`> 50`}</option>
          <option value={100}>`{`> 100`}</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
