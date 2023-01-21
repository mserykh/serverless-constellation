import moment from 'moment';
import config from '../config.js';
import getShowsSyncSuccessAsync from '../tableStorageProvider/getShowsSyncSuccessAsync.js';
import saveShowsAsync from '../tableStorageProvider/saveShowsAsync.js';
import saveShowsSyncSuccessAsync from '../tableStorageProvider/saveShowsSyncSuccessAsync.js';
import fetchShowsPageAsync from '../tvMazeClient/fetchShowsAsync.js';

export default async function doInitialShowsSyncAsync(startPageNumber = 0) {
  console.log('Shows sync started');

  const lastShowsSyncSuccess = await getShowsSyncSuccessAsync();
  if (lastShowsSyncSuccess?.timestamp) {
    const lastShowsSyncSuccessMoment = moment.utc(lastShowsSyncSuccess.timestamp, moment.ISO_8601);
    const currentTimestampMoment = moment.utc();
    const durationSinceLastSyncSuccess = moment.duration(
      currentTimestampMoment.diff(lastShowsSyncSuccessMoment),
    );
    const showsSyncRefreshPeriod = moment.duration(config.showsSyncRefreshPeriod);
    const shouldSkipSync =
      durationSinceLastSyncSuccess.asMilliseconds() - showsSyncRefreshPeriod.asMilliseconds() < 0;

    if (shouldSkipSync) {
      console.log(
        `Sync skipped. lastShowsSyncSuccess: '${
          lastShowsSyncSuccess.timestamp
        }'. durationSinceLastSyncSuccess: '${durationSinceLastSyncSuccess.toISOString()}'. showsSyncRefreshPeriod: '${
          config.showsSyncRefreshPeriod
        }'`,
      );
      return;
    }
  }

  let currentPageNumber = startPageNumber;

  while (true) {
    const pageResult = await fetchShowsPageAsync(currentPageNumber);
    if (pageResult.isLastPage) break;

    await saveShowsAsync(pageResult.shows);
    currentPageNumber++;
  }

  if (startPageNumber === 1) {
    await saveShowsSyncSuccessAsync();
  }

  console.log('Shows sync finished');
}
