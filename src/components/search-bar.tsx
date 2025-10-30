import React from 'react';

import { useDebouncedCallback } from 'use-debounce';
import useUsers from '../hooks/use-users';
import InputSearch from './input-search';

export default function SearchBar(): React.ReactElement {
  const { setSearch } = useUsers();

  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, 300);

  return <InputSearch onChange={(e) => handleSearch(e)} />;
}
