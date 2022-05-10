import { ICurrencyResponse } from '../../uphold/interfaces/uphold.currency.response';

export interface INotificatorService {
  startPooling(currencyPair: string): Promise<void>;
}
