import React from 'react';

function CharacterList(props) {
  const [showPersonInfo, togglePersonInfo] = React.useState('')
  return <ul>{props.characters?.map((result: any) => {
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
  })}</ul>;
}

export {CharacterList};
