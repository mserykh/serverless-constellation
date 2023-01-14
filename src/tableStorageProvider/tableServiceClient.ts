import { AzureNamedKeyCredential, TableServiceClient } from '@azure/data-tables';
import config from '../config.js';

const credential = new AzureNamedKeyCredential(config.storageAccountName, config.storageAccountKey);
const tableServiceClient = new TableServiceClient(
  `${config.storageAccountTableUrl}/${config.storageAccountName}`,
  credential,
  {
    allowInsecureConnection: config.isDevelopment,
  },
);

export default tableServiceClient;
