import { getShowLastUpdatedTimestampAsync } from '../tableStorageProvider/getShowLastUpdatedTimestampAsync.js';
import { saveShowAsync } from '../tableStorageProvider/saveShowsAsync.js';
import { fetchShowAsync } from '../tvMazeClient/fetchShowAsync.js';
import fetchShowUpdateInfosAsync from '../tvMazeClient/fetchShowUpdateInfosAsync.js';
import { ShowUpdateInfo } from '../tvMazeClient/ShowUpdateInfo.js';
import { UpdatePeriod } from '../tvMazeClient/UpdatePeriod.js';

export default async function syncShowUpdatesAsync() {
  console.log('Show updates sync started');

  const updatePeriod = await calculateUpdatePeriodAsync();
  const showUpdateInfos = await fetchShowUpdateInfosAsync(updatePeriod);
  await syncShowsAsync(showUpdateInfos);

  console.log('Show updates sync finished');
}

async function calculateUpdatePeriodAsync() {
  // TODO: Implement
  return UpdatePeriod.DAY;
}

async function syncShowsAsync(showUpdateInfos: ShowUpdateInfo[]) {
  for (const showUpdateInfo of showUpdateInfos) {
    await syncShowAsync(showUpdateInfo);
  }
}

async function syncShowAsync(showUpdateInfo: ShowUpdateInfo) {
  const shouldSync = await calculateShouldSyncAsync(showUpdateInfo);

  if (shouldSync) {
    console.log(`Show is out of sync. ID: '${showUpdateInfo.id}'`);
    const show = await fetchShowAsync(showUpdateInfo.id);
    await saveShowAsync(show);
  } else {
    console.log(`Show is in sync. Skipping. ID: '${showUpdateInfo.id}'`);
  }
}

async function calculateShouldSyncAsync(showUpdateInfo: ShowUpdateInfo): Promise<boolean> {
  const showLastUpdatedTimestamp = await getShowLastUpdatedTimestampAsync(showUpdateInfo.id);
  if (!showLastUpdatedTimestamp) return true;

  const periodSinceLastUpdate = showUpdateInfo.lastUpdatedTimestamp.diff(showLastUpdatedTimestamp);
  const result = periodSinceLastUpdate > 0;
  return result;
}
