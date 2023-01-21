import moment, { Moment } from 'moment';
import ensureTableAsync from './ensureTableAsync.js';
import buildTableClient from './tableClient.js';

export async function getShowLastUpdatedTimestampAsync(id: string): Promise<Moment | null> {
  console.log(`Getting show last updated timestamp. ID: '${id}'`);

  await ensureTableAsync('Shows');

  const showsTableClient = buildTableClient('Shows');

  const partitionKey = id;
  const rowKey = id;

  const entitiesIterator = showsTableClient.listEntities({
    queryOptions: {
      filter: `PartitionKey eq '${partitionKey}' and RowKey eq '${rowKey}'`,
      select: ['lastModified'],
    },
  }) as any;
  const entitiesIteratorNext = await entitiesIterator.next();
  const entity = entitiesIteratorNext?.value;

  const result = entity ? moment.utc(entity.lastModified, moment.ISO_8601) : null;
  return result;
}
