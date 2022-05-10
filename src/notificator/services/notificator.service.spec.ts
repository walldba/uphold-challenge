import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpholdService } from '../../uphold/services/uphold.service';
import { NotificatorService } from './notificator.service';
import { Notification } from '../entities/notification.entity';
import { ConfigService } from '@nestjs/config';

const response = {
  data: {
    ask: '31655.1349275216',
    bid: '31527.3038236307',
    currency: 'USD',
  },
  status: 200,
  statusText: 'OK',
};

const notificationArray = [
  new Notification({
    currencyPair: 'a',
    oscillation: 0,
    percentage: 0,
    rate: 0,
  }),
  new Notification({
    currencyPair: 'b',
    oscillation: 0,
    percentage: 0,
    rate: 0,
  }),
  new Notification({
    currencyPair: 'c',
    oscillation: 0,
    percentage: 0,
    rate: 0,
  }),
];

const notification = new Notification({
  currencyPair: 'c',
  oscillation: 0,
  percentage: 0,
  rate: 0,
});

const notificationConfig = {
  listenInterval: 5000,
  currencyPairs: ['BTC-USD', 'BRL-USD', 'EUR-USD'],
  percentage: 0.01,
};

describe('NotificatorService', () => {
  let service: NotificatorService;
  let config: ConfigService;
  let upHoldService: UpholdService;
  let notificationRepository: Repository<Notification>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificatorService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'notificator') {
                return notificationConfig;
              }
              return null;
            }),
          },
        },
        {
          provide: UpholdService,
          useValue: {
            getTicketCurrency: jest.fn(() => Promise.resolve()),
          },
        },
        {
          provide: getRepositoryToken(Notification),
          useValue: {
            find: jest.fn().mockResolvedValue(notificationArray),
            insert: jest.fn().mockResolvedValue(notification),
          },
        },
      ],
    }).compile();

    service = module.get<NotificatorService>(NotificatorService);
    config = module.get<ConfigService>(ConfigService);
    upHoldService = module.get<UpholdService>(UpholdService);
    notificationRepository = module.get<Repository<Notification>>(
      getRepositoryToken(Notification),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find notifications', async () => {
    const response = await service.findNotifications();
    expect(response).toEqual(notificationArray);
  });

  it('should find notifications by currency pair', async () => {
    const response = await service.findNotificationByCurrency('BTC-USD');
    expect(response).toEqual(notificationArray);
  });

  it('should create a notification on database', async () => {
    const response = await notificationRepository.insert({
      currencyPair: 'c',
      oscillation: 0,
      percentage: 0,
      rate: 0,
    });

    expect(response).toEqual(notification);
  });

  it('should send oscillation notification', async () => {
    const { currencyPairs } = config.get('notificator');
    const upHoldSpy = jest.spyOn(upHoldService, 'getTicketCurrency');
    const notificationRepositorySpy = jest.spyOn(
      notificationRepository,
      'insert',
    );

    upHoldSpy
      .mockReturnValue(
        Promise.resolve({
          data: {
            ask: '32100.0531788659',
            bid: '32100.0531788659',
            currency: 'USD',
          },
          status: 200,
          statusText: 'OK',
        } as any),
      )
      .mockReturnValueOnce({
        data: {
          ask: '52100.0531788659',
          bid: '52100.0531788659',
          currency: 'USD',
        },
        status: 200,
        statusText: 'OK',
      } as any);

    await service.getCurrencyPair(currencyPairs[0]);
    await service.getCurrencyPair(currencyPairs[0]);

    expect(upHoldSpy).toHaveBeenCalled();
    expect(notificationRepositorySpy).toHaveBeenCalled();
  });

  it('should not send oscillation notification', async () => {
    const { currencyPairs } = config.get('notificator');
    const upHoldSpy = jest.spyOn(upHoldService, 'getTicketCurrency');
    const notificationRepositorySpy = jest.spyOn(
      notificationRepository,
      'insert',
    );

    upHoldSpy
      .mockReturnValue(
        Promise.resolve({
          data: {
            ask: '32100.0531788659',
            bid: '32100.0531788659',
            currency: 'USD',
          },
          status: 200,
          statusText: 'OK',
        } as any),
      )
      .mockReturnValueOnce({
        data: {
          ask: '32100.0531788659',
          bid: '32100.0531788659',
          currency: 'USD',
        },
        status: 200,
        statusText: 'OK',
      } as any);

    await service.getCurrencyPair(currencyPairs[0]);
    await service.getCurrencyPair(currencyPairs[0]);

    expect(upHoldSpy).toHaveBeenCalled();
    expect(notificationRepositorySpy).toBeCalledTimes(0);
  });

  it('should log a fail on uphold service', async () => {
    const { currencyPairs } = config.get('notificator');
    const upHoldSpy = jest.spyOn(upHoldService, 'getTicketCurrency');

    upHoldSpy.mockReturnValue(
      Promise.resolve({
        data: {
          code: 'not_found',
          message: 'Not Found',
        },
        status: 404,
      } as any),
    );

    await service.getCurrencyPair(currencyPairs[0]);
    await service.getCurrencyPair(currencyPairs[0]);

    expect(upHoldSpy).toHaveBeenCalled();
  });
});
