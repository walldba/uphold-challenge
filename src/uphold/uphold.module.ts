import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UpholdService } from './services/uphold.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import upholdConfig, { UpholdConfig } from '../config/uphold.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [upholdConfig],
      envFilePath: '.env',
      cache: true,
      isGlobal: true,
    }),

    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const { baseUrl, apiVersion } =
          configService.get<UpholdConfig>('uphold') || {};

        return {
          baseURL: `${baseUrl}/${apiVersion}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [UpholdService],
  exports: [UpholdService],
})
export class UpholdModule {}
