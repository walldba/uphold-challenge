import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { UpholdService } from './uphold.service';
import { AxiosResponse } from 'axios';
import { ICurrencyResponse } from '../interfaces/uphold.currency.response';
import { of } from 'rxjs';

describe('UpholdService', () => {
  let service: UpholdService;
  let httpService: HttpService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpholdService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpholdService>(UpholdService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return exchange rate of a currency relative to any other currency', async () => {
    const data = {
      ask: '31655.1349275216',
      bid: '31527.3038236307',
      currency: 'USD',
    };

    const response: AxiosResponse<ICurrencyResponse, any> = {
      data,
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: {
          ask: '31655.1349275216',
          bid: '31527.3038236307',
          currency: 'USD',
        },
        status: 200,
        statusText: 'OK',
      } as any),
    );

    service.getTicketCurrency('BTC-USD').then((res) => {
      expect(res.data).toEqual(response.data);
      expect(res.status).toEqual(response.status);
      expect(res.statusText).toEqual(response.statusText);
    });
  });
});
