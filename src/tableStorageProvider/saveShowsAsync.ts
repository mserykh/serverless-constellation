import { TableClient } from '@azure/data-tables';
import ensureTableAsync from './ensureTableAsync.js';
import buildTableClient from './tableClient.js';

export default async function saveShowsAsync(shows: []) {
  console.log(`Saving shows. Count: '${shows.length}'`);

  await ensureTableAsync('Shows');

  const showsTableClient = buildTableClient('Shows');

  for (let show of shows) {
    await saveShowToTableAsync(showsTableClient, show);
  }
}

export async function saveShowAsync(show: any): Promise<void> {
  await ensureTableAsync('Shows');

  const showsTableClient = buildTableClient('Shows');

  await saveShowToTableAsync(showsTableClient, show);
}

async function saveShowToTableAsync(showsTableClient: TableClient, show: any) {
  console.log(`Saving show. ID: '${show.id}'`);

  const partitionKey = `${show.id}`;
  const rowKey = `${show.id}`;
  const lastModified = new Date(show.updated * 1000).toISOString();

  console.log(
    `Getting existing show. ID: '${show.id}', partitionKey: '${partitionKey}', rowKey: '${rowKey}'`,
  );
  const existingShowsIterator = showsTableClient.listEntities({
    queryOptions: { filter: `PartitionKey eq '${partitionKey}' and RowKey eq '${rowKey}'` },
  }) as any;
  const existingShowsIteratorNext = await existingShowsIterator.next();

  const existingShow = existingShowsIteratorNext.value;

  if (!existingShow) {
    console.log(
      `Show does not exist. Creating show. ID: '${show.id}', partitionKey: '${partitionKey}', rowKey: '${rowKey}'`,
    );
    await showsTableClient.createEntity({
      partitionKey,
      rowKey,
      lastModified,
      json: JSON.stringify(show),
    });
  } else if (lastModified > existingShow.lastModified) {
    console.log(
      `Show exists but 'lastModified' is older. Replacing show. ID: '${show.id}', partitionKey: '${partitionKey}', rowKey: '${rowKey}', prevLastModified: '${existingShow.lastModified}', newLastModified: '${lastModified}'`,
    );
    await showsTableClient.updateEntity(
      {
        partitionKey,
        rowKey,
        lastModified,
        json: JSON.stringify(show),
      },
      'Replace',
    );
  } else {
    console.log(
      `Show exists. Skipping show. ID: '${show.id}', partitionKey: '${partitionKey}', rowKey: '${rowKey}'`,
    );
  }
}
