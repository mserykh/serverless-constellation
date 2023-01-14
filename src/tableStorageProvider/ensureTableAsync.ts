import tableServiceClient from './tableServiceClient.js';

export default async function ensureTableAsync(tableName: string) {
  console.log(`Ensuring table '${tableName}'`);

  await tableServiceClient.createTable(tableName, {
    onResponse: (response: any) => {
      if (response.status === 409) {
        console.log(`Table '${tableName}' already exists`);
      }
    },
  });
}
