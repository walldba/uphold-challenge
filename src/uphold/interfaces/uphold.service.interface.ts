import { AxiosResponse } from 'axios';
import { ICurrencyResponse } from './uphold.currency.response';

export interface IUpholdService {
  getTicketCurrency(
    currencyPair: string,
  ): Promise<AxiosResponse<ICurrencyResponse, any>>;
}
