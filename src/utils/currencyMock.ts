import faker from '@faker-js/faker';

interface ICurrency {
  ask: string;
  bid: string;
  currency: string;
}
export function getCurrency(): ICurrency {
  return {
    ask: faker.finance.amount(),
    bid: faker.finance.amount(),
    currency: faker.finance.currencyCode(),
  };
}

export function getCurrencyPair(): string {
  return `${faker.finance.currencyCode()}-${faker.finance.currencyCode()} `;
}
