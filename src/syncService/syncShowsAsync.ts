import saveShowsAsync from '../tableStorageProvider/saveShowsAsync.js';
import fetchShowsPageAsync from '../tvMazeClient/fetchShowsAsync.js';

export default async function syncShowsAsync(startPageNumber = 1) {
  console.log('Sync started');

  let currentPageNumber = startPageNumber;

  while (true) {
    const pageResult = await fetchShowsPageAsync(currentPageNumber);
    if (pageResult.isLastPage) break;

    await saveShowsAsync(pageResult.shows);
    currentPageNumber++;
  }

  
  console.log('Sync finished');
}
