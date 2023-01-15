import fetch, { Response } from 'node-fetch';
import { PageResult } from './PageResult.js';

export default async function fetchShowsPageAsync(pageNumber: number): Promise<PageResult> {
  console.log(`Fetching shows for page '${pageNumber}'`);

  const response: Response = await fetch(`https://api.tvmaze.com/shows?page=${pageNumber}`);
  const shows = (await response.json()) as [];

  const isLastPage = response.status === 404 && shows.length === 0;

  console.log(
    `Fetched shows for page '${pageNumber}'. Count: '${shows.length}'. isLastPage: '${isLastPage}'`,
  );

  const result: PageResult = { shows, pageNumber, isLastPage };
  return result;
}
