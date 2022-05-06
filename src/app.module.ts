import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificatorModule } from './notificator/notificator.module';
import { UpholdModule } from './uphold/uphold.module';

@Module({
  imports: [NotificatorModule, UpholdModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
