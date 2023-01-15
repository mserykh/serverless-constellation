import ensureTableAsync from './ensureTableAsync.js';
import buildTableClient from './tableClient.js';

export default async function getShowsSyncSuccessAsync() {
  console.log(`Getting shows sync success status`);

  await ensureTableAsync('Status');

  const statusTableClient = buildTableClient('Status');

  const partitionKey = 'ShowsSyncSuccess';
  const rowKey = 'ShowsSyncSuccess';

  const showsSyncSuccessIterator = statusTableClient.listEntities({
    queryOptions: { filter: `PartitionKey eq '${partitionKey}' and RowKey eq '${rowKey}'` },
  }) as any;
  const showsSyncSuccessIteratorNext = await showsSyncSuccessIterator.next();
  const showsSyncSuccess = showsSyncSuccessIteratorNext?.value;

  const result = showsSyncSuccess ? { timestamp: showsSyncSuccess.timestamp } : null;
  return result;
}
