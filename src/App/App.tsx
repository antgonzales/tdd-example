import React from 'react';
import logo from './logo.png';
import './App.css';
import debounce from 'lodash/debounce';

import {CharacterList} from './CharacterList';


function App() {
  const [data, updateData] = React.useState<any>(); 
  const [status, updateStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');

  const onSearchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStatus('loading');
    try {
      const res = await fetch(`https://swapi.dev/api/people/?search=${e.target.value}`);
      const data = await res.json();
      updateData(data);
      updateStatus('success');
    } catch (e) {
      console.log(e);
    }
  };

  const debouncedOnSearchHandler = React.useCallback(debounce(onSearchHandler, 300), []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" onChange={debouncedOnSearchHandler} />
        {status === 'loading' &&
          <div data-testid="loading-indicator">Loading...</div>
        }
        {status === 'success' &&  <CharacterList characters={data?.results} />}
      </header>
    </div>
  );
}

export {App};
