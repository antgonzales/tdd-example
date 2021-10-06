import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [data, updateData] = React.useState<any>(); 

  const onSearchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const res = await fetch(`https://swapi.dev/api/people/?search=${e.target.value}`);
      const data = await res.json();
      updateData(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" onChange={onSearchHandler} />
        <ul>
          {data?.results.map((result: any) => {
            return <li key={result.name}>{result.name}</li>
          })}
        </ul>
      </header>
    </div>
  );
}

export {App};
