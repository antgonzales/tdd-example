import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import {App} from '.';

describe('<App />', () => {
  it('searches for Star Wars people by name', async () => {
    const response = {
      "count": 1,
      "next": null,
      "previous": null,
      "results": [
        {
          "name": "R2-D2",
          "height": "96",
          "mass": "32",
          "hair_color": "n/a",
          "skin_color": "white, blue",
          "eye_color": "red",
          "birth_year": "33BBY",
          "gender": "n/a",
          "homeworld": "https://swapi.dev/api/planets/8/",
          "films": [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/4/",
            "https://swapi.dev/api/films/5/",
            "https://swapi.dev/api/films/6/"
          ],
          "species": [
            "https://swapi.dev/api/species/2/"
          ],
          "vehicles": [],
          "starships": [],
          "created": "2014-12-10T15:11:50.376000Z",
          "edited": "2014-12-20T21:17:50.311000Z",
          "url": "https://swapi.dev/api/people/3/"
        }
      ]
    }
    const scope = nock('https://swapi.dev')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true' 
      })
      .get('/api/people/')
      .query({search: 'r2'})
      .reply(200, response);
    render(<App />);
    const searchBox = screen.getByRole('textbox');
    fireEvent.change(searchBox, {target: {value: 'r2'}});
    const results = await waitFor(() => screen.getByText('R2-D2'));
    expect(results).toBeInTheDocument();
    expect(scope.isDone()).toBe(true);
  });
});
