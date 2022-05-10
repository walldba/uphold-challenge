import { Controller, Get, Param, Query } from '@nestjs/common';
import { NotificatorService } from '../services/notificator.service';

@Controller('notificator')
export class NotificatorController {
  constructor(private readonly notificationService: NotificatorService) {}

  @Get('/find')
  async find() {
    return await this.notificationService.findNotifications();
  }

  @Get('/findByCurrencyPair')
  async findByCurrency(@Query('currencyPair') currencyPair: string) {
    return await this.notificationService.findNotificationByCurrency(
      currencyPair,
    );
  }
}
