import fetch, { Response } from 'node-fetch';

export default async function fetchShowsAsync(pageNumber: number) {
  console.log(`Fetching shows for page '${pageNumber}'`);

  const response: Response = await fetch(`https://api.tvmaze.com/shows?page=${pageNumber}`);
  const shows = (await response.json()) as [];

  console.log(`Fetched shows for page '${pageNumber}'. Count: '${shows.length}'`);

  return shows;
}
