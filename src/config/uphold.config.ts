import { registerAs } from '@nestjs/config';

export interface UpholdConfig {
  baseUrl: string;
  apiVersion: string;
}

export default registerAs<UpholdConfig>('uphold', () => ({
  baseUrl: process.env.UPHOLD_BASE_URL || 'https://api.uphold.com',
  apiVersion: process.env.API_VERSION || 'v0',
}));
