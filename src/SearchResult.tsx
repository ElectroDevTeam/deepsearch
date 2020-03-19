import React from 'react';

interface SearchResultProps {
    filename: string,
}

const SearchResult: React.SFC<SearchResultProps> = ({filename}) => {
    return <h2>{filename}</h2>;
};

export default SearchResult;