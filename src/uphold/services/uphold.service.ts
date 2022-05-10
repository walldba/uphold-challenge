import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ICurrencyResponse } from '../interfaces/uphold.currency.response';
import { IUpholdService } from '../interfaces/uphold.service.interface';

@Injectable()
export class UpholdService implements IUpholdService {
  constructor(private readonly httpService: HttpService) {}

  async getTicketCurrency(
    currencyPair: string,
  ): Promise<AxiosResponse<ICurrencyResponse, any>> {
    return await firstValueFrom(
      this.httpService.get<ICurrencyResponse>(`/ticker/${currencyPair}`),
    );
  }
}
