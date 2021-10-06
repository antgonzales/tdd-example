import React from 'react';
import {useQuery} from 'react-query';
import logo from './logo.png';
import './App.css';
import debounce from 'lodash/debounce';

import {CharacterList} from './CharacterList';


function App() {
  const [searchInput, updateSearchInput] = React.useState(''); 

  const {data: searchCharsRes, isLoading} = useQuery(['searchCharacters', searchInput], async () => {
    if (searchInput === '') {
      return;
    }
    const res = await fetch(`https://swapi.dev/api/people/?search=${searchInput}`);
    const data = await res.json();
    return data;
  })

  const onSearchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchInput(e.target.value);
  };

  const debouncedOnSearchHandler = React.useCallback(debounce(onSearchHandler, 300), []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" onChange={debouncedOnSearchHandler} />
        {isLoading &&
          <div data-testid="loading-indicator">Loading...</div>
        }
        {!isLoading &&  <CharacterList characters={searchCharsRes?.results} />}
      </header>
    </div>
  );
}

export {App};
