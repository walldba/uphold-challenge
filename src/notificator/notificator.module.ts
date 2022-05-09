import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import notificatorConfig from '../config/notificator.config';
import { UpholdModule } from '../uphold/uphold.module';
import { NotificatorController } from './controllers/notificator.controller';
import { Notification } from './entities/notification.entity';
import { NotificationRepository } from './repositories/notification.repository';
import { NotificatorService } from './services/notificator.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [notificatorConfig],
      envFilePath: '.env',
      cache: true,
      isGlobal: true,
    }),

    TypeOrmModule.forFeature([Notification, NotificationRepository]),

    UpholdModule,
  ],
  controllers: [NotificatorController],
  providers: [NotificatorService],
})
export class NotificatorModule {}
