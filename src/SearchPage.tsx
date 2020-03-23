import React, { useState } from "react";
import SearchResult from "./SearchResult";
import axios from "axios";
import {IDocumentManager} from "@jupyterlab/docmanager";
import { PathExt } from "@jupyterlab/coreutils";

interface SearchPageProps {
  docManager: IDocumentManager,
}

const SearchPage: React.SFC<SearchPageProps> = ({docManager}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDir, setSearchDir] = useState("/");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState({
    totalResults: 0,
    totalFiles: 0,
    results: []
  });

  const openFunction = (filePath: string) => () => {
    docManager.openOrReveal(PathExt.normalize(filePath.replace('\\/', '\\')));
  };

  const search = () => {
    if (searchQuery !== "") {
      //   Do search stuff
      axios
        .get(`/api/deepsearch?query=${searchQuery}&dir=${searchDir}`)
        .then(result => {
          setSearchResult(result.data);
        });
      setHasSearched(true);
    }
  };

  return (
    <>
      <div className="deepsearch-inner-content noselect">
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
      <div className="deepsearch-searchresult-collection">
        {searchResult.results.map(res => (
          <SearchResult filename={res.filename} results={res.results} openFunc={openFunction(res.filename)}/>
        ))}
      </div>
    </>
  );
};

export default SearchPage;
