import React, { useState } from "react";
import SearchResult from "./SearchResult";

interface SearchPageProps {}

const SearchPage: React.SFC<SearchPageProps> = props => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDir, setSearchDir] = useState("/");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState({
    totalResults: 2,
    totalFiles: 1,
    results: []
  });

  const search = () => {
    //   Do search stuff
    setHasSearched(true);
  };

  return (
    <>
      <div className="deepsearch-inner-content">
        <input
          className="deepsearch-search-input"
          onChange={e => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search anything"
          onKeyDown={e => {
            if (e.key === "Enter") {
              search();
            }
          }}
        />
        <div className="deepsearch-label">files to include</div>
        <input
          className="deepsearch-search-input"
          onChange={e => {
            setSearchDir(e.target.value);
          }}
          placeholder="/"
          onKeyDown={e => {
            if (e.key === "Enter") {
              search();
            }
          }}
        />
        {hasSearched && (
          <div className="deepsearch-results-label">
            {searchResult.totalResults !== 0 &&
              `${searchResult.totalResults} result${
                searchResult.totalResults > 1 ? "s" : ""
              } in ${searchResult.totalFiles} file${
                searchResult.totalFiles > 1 ? "s" : ""
              }`}
            {searchResult.totalResults === 0 && "No results"}
          </div>
        )}
      </div>
      <SearchResult filename={searchQuery} />
    </>
  );
};

export default SearchPage;
