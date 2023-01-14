import fetch from 'node-fetch';
import { Response } from 'node-fetch';

export default async function fetchShows() {
  const response: Response = await fetch('https://api.tvmaze.com/shows');
  const shows = await response.json();

  return shows;
}
