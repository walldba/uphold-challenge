import {
  HttpStatus,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { setInterval } from 'timers/promises';
import { Repository } from 'typeorm';
import { NotificatorConfig } from '../../config/notificator.config';
import { UpholdService } from '../../uphold/services/uphold.service';
import { Notification } from '../entities/notification.entity';
import { INotificatorService } from '../interfaces/notificator.service.interface';

@Injectable()
export class NotificatorService implements INotificatorService, OnModuleInit {
  private initialRate: Map<string, number>;
  private readonly notificatorConfig: NotificatorConfig;
  private readonly logger = new Logger(NotificatorService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly upholdService: UpholdService,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {
    this.notificatorConfig =
      this.configService.get<NotificatorConfig>('notificator');

    this.initialRate = new Map<string, number>();
    this.notificatorConfig.currencyPairs.map((currency) => {
      this.initialRate.set(currency, 0);
    });
  }

  async onModuleInit() {
    this.logger.log(`Starting currency pooling`);
    this.startPooling();
  }

  async startPooling(): Promise<void> {
    for await (const _ of setInterval(this.notificatorConfig.listenInterval)) {
      Promise.all(
        this.notificatorConfig.currencyPairs.map((currency) => {
          this.getCurrencyPair(currency);
        }),
      );
    }
  }

  async getCurrencyPair(currencyPair: string): Promise<void> {
    try {
      this.logger.debug(`Currency pair: ${currencyPair}`);

      const response = await this.upholdService.getTicketCurrency(currencyPair);

      if (!this.initialRate[currencyPair]) {
        this.initialRate[currencyPair] = Number(response.data.bid);
      } else {
        if (response.status != HttpStatus.OK) {
          this.logger.log(`Failed to get Uphold Ticket Currency`, {
            status: response.status,
            statusText: response.statusText,
            data: response.data,
          });
        } else {
          const { hadOscillation, oscillation, percentage } =
            Notification.checkOscillationValue({
              percentageValue: this.notificatorConfig.percentage,
              firstRate: this.initialRate[currencyPair],
              newRate: Number(response.data.bid),
            });

          if (hadOscillation) {
            this.logger.log(
              `There was an oscillation in the currency pair: ${currencyPair}`,
              {
                initialRate: this.initialRate[currencyPair],
                currentRate: response.data.bid,
                oscillation,
                percentage,
              },
            );

            await this.notificationRepository.insert({
              currencyPair,
              percentage,
              oscillation,
              rate: +response.data.bid,
            });
          }
        }
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error('Something wrong happend with uphold pooling');
    }
  }

  async findNotifications() {
    return this.notificationRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findNotificationByCurrency(currencyPair: string) {
    return this.notificationRepository.find({
      where: { currencyPair },
      order: { createdAt: 'DESC' },
    });
  }
}
