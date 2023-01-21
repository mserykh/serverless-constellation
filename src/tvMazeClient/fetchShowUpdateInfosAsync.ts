import moment from 'moment';
import fetch, { Response } from 'node-fetch';
import { ShowUpdateInfo } from './ShowUpdateInfo.js';
import { ShowUpdatesDto } from './ShowUpdatesDto.js';
import { UpdatePeriod } from './UpdatePeriod.js';

export default async function fetchShowUpdateInfosAsync(
  updatePeriod: UpdatePeriod,
): Promise<ShowUpdateInfo[]> {
  console.log(`Fetching show update infos for period '${updatePeriod}'`);

  const sinceParam = buildSinceParam(updatePeriod);
  const response: Response = await fetch(
    `https://api.tvmaze.com/updates/shows?since=${sinceParam}`,
  );
  const showUpdatesDto = (await response.json()) as ShowUpdatesDto;

  const showUpdateInfos = Object.entries(showUpdatesDto).map(([key, value]) => {
    return {
      id: key,
      lastUpdatedTimestamp: moment.utc(value * 1000, moment.ISO_8601),
    } as ShowUpdateInfo;
  });

  console.log(
    `Fetched show update infos for period '${updatePeriod}'. Count: '${showUpdateInfos.length}'`,
  );

  return showUpdateInfos;
}

function buildSinceParam(updatePeriod: UpdatePeriod) {
  switch (updatePeriod) {
    case UpdatePeriod.DAY:
      return 'day';
    case UpdatePeriod.WEEK:
      return 'week';
    case UpdatePeriod.MONTH:
      return 'month';
    case UpdatePeriod.ALL:
    default:
      return '';
  }
}
