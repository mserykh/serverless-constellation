import fetch, { Response } from 'node-fetch';

export async function fetchShowAsync(id: string) {
  console.log(`Fetching show. ID: '${id}'`);

  const response: Response = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = (await response.json()) as any;

  console.log(`Fetched show. ID: '${id}'`);

  return show;
}
