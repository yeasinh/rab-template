import React from 'react';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

const SearchComponent: React.FC<SearchProps> = ({ searchTerm, setSearchTerm, placeholder = "Search Here" }) => {
  return (
    <form className="table-search-wrapper" role="search">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        className="form-control me-2"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
    </form>
  );
};

export default SearchComponent;
