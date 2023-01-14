import { AzureNamedKeyCredential, TableClient } from '@azure/data-tables';
import config from '../config.js';

export default function buildTableClient(tableName: string) {
  const credential = new AzureNamedKeyCredential(
    config.storageAccountName,
    config.storageAccountKey,
  );

  const tableClient = new TableClient(
    `${config.storageAccountTableUrl}/${config.storageAccountName}`,
    tableName,
    credential,
    {
      allowInsecureConnection: config.isDevelopment,
    },
  );

  return tableClient;
}
