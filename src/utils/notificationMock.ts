import faker from '@faker-js/faker';
import { getCurrencyPair } from './currencyMock';

interface INotification {
  id: number;
  currencyPair: string;
  rate: string;
  oscillation: string;
  percentage: string;
  createdAt: string;
}
export function getNotification(): INotification {
  return {
    id: +faker.finance.amount(1, 50, 0),
    currencyPair: getCurrencyPair(),
    rate: faker.finance.amount(),
    oscillation: faker.finance.amount(),
    percentage: faker.finance.amount(),
    createdAt: faker.date.recent().toISOString(),
  };
}

export function getArrayNotifications(): INotification[] {
  return Array.from(
    { length: +faker.finance.amount(1, 10, 0) },
    getNotification,
  );
}
