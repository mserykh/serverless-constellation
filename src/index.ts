import fetchShows from './tvMazeClient/fetchShows.js';

const shows = await fetchShows();
console.log(shows);
