import saveShowsAsync from '../tableStorageProvider/saveShowsAsync.js';
import fetchShowsAsync from '../tvMazeClient/fetchShowsAsync.js';

export default async function syncShowsAsync() {
  console.log('Sync started');

  const shows = await fetchShowsAsync(1);
  await saveShowsAsync(shows);

  console.log('Sync finished');
}
