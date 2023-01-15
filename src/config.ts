import * as dotenv from 'dotenv';

dotenv.config();

const environment = process.env.ENVIRONMENT;
const isDevelopment = environment === 'DEVELOPMENT';

const storageAccountName = process.env.STORAGE_ACCOUNT_NAME || '';
const storageAccountKey = process.env.STORAGE_ACCOUNT_KEY || '';
const storageAccountTableUrl = process.env.STORAGE_ACCOUNT_TABLE_URL;

const showsSyncRefreshPeriod = process.env.SHOWS_SYNC_REFRESH_PERIOD;

const config = { isDevelopment, storageAccountName, storageAccountKey, storageAccountTableUrl, showsSyncRefreshPeriod };
export default config;
