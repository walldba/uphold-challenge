import { Test, TestingModule } from '@nestjs/testing';
import { getArrayNotifications } from '../../utils/notificationMock';
import { NotificatorService } from '../services/notificator.service';
import { NotificatorController } from './notificator.controller';

const notifications = getArrayNotifications();

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
    expect(service).toBeDefined();
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
