import React from 'react';
import SearchBar from 'react-native-search-bar';
const Search = ({
  onSearch,
}: {
  onSearch: (query: string) => void;
}): JSX.Element => {
  return (
    <SearchBar textColor={'black'} placeholder={'Type Here...'} onSearchButtonPress={onSearch} />
  );
};
export default Search;
