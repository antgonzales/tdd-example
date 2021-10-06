import React from 'react';
import logo from './logo.png';
import './App.css';


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
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" onChange={onSearchHandler} />
        {status === 'loading' &&
          <div data-testid="loading-indicator">Loading...</div>
        }
        {status === 'success' && <ul>
          {data?.results?.map((result: any) => {
            return <li key={result.name}>{result.name}</li>
          })}
        </ul>
        }
      </header>
    </div>
  );
}

export {App};
