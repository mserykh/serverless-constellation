import ensureTableAsync from './ensureTableAsync.js';
import buildTableClient from './tableClient.js';

export default async function saveShowsSyncSuccessAsync() {
  const timestamp = new Date().toISOString();
  console.log(`Saving shows sync success status. Timestamp: '${timestamp}'`);

  await ensureTableAsync('Status');

  const statusTableClient = buildTableClient('Status');

  const partitionKey = 'ShowsSyncSuccess';
  const rowKey = 'ShowsSyncSuccess';

  await statusTableClient.upsertEntity(
    {
      partitionKey,
      rowKey,
    },
    'Replace',
  );
}
