import { Test, TestingModule } from '@nestjs/testing';
import { NotificatorService } from '../services/notificator.service';
import { NotificatorController } from './notificator.controller';

const notifications = [
  {
    id: 38,
    currencyPair: 'BRL-USD',
    rate: '0.1948300178',
    oscillation: '0.00020905090000000737',
    percentage: '0.0001',
    createdAt: '2022-05-10T12:58:56.000Z',
  },
];

describe('NotificatorController', () => {
  let controller: NotificatorController;
  let service: NotificatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: NotificatorService,
          useValue: {
            findNotifications: jest.fn(() => Promise.resolve(notifications)),
            findNotificationByCurrency: jest.fn(() =>
              Promise.resolve(notifications),
            ),
          },
        },
      ],
      controllers: [NotificatorController],
    }).compile();

    controller = module.get<NotificatorController>(NotificatorController);
    service = module.get<NotificatorService>(NotificatorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get notifications', async () => {
    const res = await controller.find();
    expect(res).toEqual(notifications);
  });

  it('should get notifications by currency pair', async () => {
    const res = await controller.findByCurrency('BRL-USD');
    expect(res).toEqual(notifications);
  });
});
