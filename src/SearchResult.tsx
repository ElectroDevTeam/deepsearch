import React, { useState } from "react";

interface SearchResultProps {
  filename: string;
  results: Array<any>;
  openFunc: Function;
}

const SearchResult: React.SFC<SearchResultProps> = ({ filename, results, openFunc }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="deepsearch-searchresult noselect">
      <div
        style={{
          overflow: 'hidden'
        }}
      >
        <span
          className="deepsearch-searchresult-filename deepsearch-highlight-hover"
          onClick={() => {setIsCollapsed(!isCollapsed);}}
        >
          {filename.replace(/^.*[\\\/]/, '')}
        </span>
      </div>
      {!isCollapsed && 
      <div
        className="deepsearch-searchresult-description noselect"
      >
        {results.map(res => (
          <div
            className="deepsearch-highlight-hover"
            onClick={() => {openFunc();}}
          >
            {res.linenumber} {res.content}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default SearchResult;
