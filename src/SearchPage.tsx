import React, {useState} from 'react';
import SearchResult from './SearchResult';

interface SearchPageProps {
}

const SearchPage: React.SFC<SearchPageProps> = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    return <>
    <h1>This is a search page</h1>
    <input
      onChange={(e) => {setSearchQuery(e.target.value);}}
    />
    <SearchResult
        filename={searchQuery}
    />
    </>;
};

export default SearchPage;