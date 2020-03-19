import React from 'react';
import SearchResult from './SearchResult';

interface SearchPageProps {
}

const SearchPage: React.SFC<SearchPageProps> = (props) => {
    return <>
    <h1>This is a search page</h1>
    <SearchResult
        filename={"Hi There!!"}
    />
    </>;
};

export default SearchPage;