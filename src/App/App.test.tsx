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

  it('displays a loading screen until results are fetched', async () => {
    const response = {
      "count": 1,
      "next": null,
      "previous": null,
      "results": [
        {
          "name": "R2-D2",
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
    const loader = await screen.findByTestId('loading-indicator');
    expect(loader).toBeInTheDocument();
    await waitFor(() => screen.getByText('R2-D2'));
    expect(loader).not.toBeInTheDocument();
    expect(scope.isDone()).toBe(true);
  });
});
