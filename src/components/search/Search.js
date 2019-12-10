import React from 'react';
import {Input} from 'semantic-ui-react'
import './search.scss'

const SearchBar = (props) => {
  const {
    activeSearchQuery,
    filterItems,
    languageSetting,
    currentLanguage,
    filtersAreLoading,
    errorJobs
  } = props;

  return (
    <div className='search-custom'>
      <Input
        disabled={(filtersAreLoading || errorJobs)}
        fluid icon='search'
        size='big'
        iconPosition='left'
        value={activeSearchQuery}
        placeholder={languageSetting('searchPlaceholder', currentLanguage)}
        onChange={({target: {value}}) => {
          filterItems(value, 'searchResult');
        }}
      />
    </div>
  );
};

export default SearchBar;
