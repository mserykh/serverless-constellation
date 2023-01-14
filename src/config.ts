import * as dotenv from 'dotenv';

dotenv.config();

const environment = process.env.ENVIRONMENT;
const isDevelopment = environment === 'DEVELOPMENT';

const storageAccountName = process.env.STORAGE_ACCOUNT_NAME || '';
const storageAccountKey = process.env.STORAGE_ACCOUNT_KEY || '';
const storageAccountTableUrl = process.env.STORAGE_ACCOUNT_TABLE_URL;

const config = { isDevelopment, storageAccountName, storageAccountKey, storageAccountTableUrl };
export default config;
