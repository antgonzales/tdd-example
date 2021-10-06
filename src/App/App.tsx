import React from 'react';
import logo from './logo.png';
import './App.css';
import debounce from 'lodash/debounce';


function App() {
  const [data, updateData] = React.useState<any>(); 
  const [status, updateStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');
  const [showPersonInfo, togglePersonInfo] = React.useState('')

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
        {status === 'success' && <ul>
          {data?.results?.map((result: any) => {
            return (
              <li key={result.name} onMouseEnter={() => togglePersonInfo(result.name)} onMouseLeave={() => togglePersonInfo('')}>
                {result.name}
                {showPersonInfo === result.name && <div role="dialog">
                  <ul>
                    <li>Height: {result.height}</li>
                    <li>Mass: {result.mass}</li>
                    <li>Hair color: {result.hair_color}</li>
                  </ul>
                </div>}
              </li>
            )
          })}
        </ul>
        }
      </header>
    </div>
  );
}

export {App};
