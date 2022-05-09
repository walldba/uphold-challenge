import { registerAs } from '@nestjs/config';

export interface NotificatorConfig {
  listenInterval: number;
  currencyPairs: string[];
  percentage: number;
}

export default registerAs<NotificatorConfig>('notificator', () => ({
  listenInterval: +process.env.LISTEN_INTERVAL || 5000,
  currencyPairs: process.env.CURRENCY_PAIRS?.split('/') || ['v0', ''],
  percentage: +process.env.PERCENTAGE || 0.01,
}));
