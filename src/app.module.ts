import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { NotificatorModule } from './notificator/notificator.module';
import { UpholdModule } from './uphold/uphold.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: '.env',
      cache: true,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        autoLoadEntities: true,
        migrations: ['dist/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'migrations',
        },
      }),
    }),

    NotificatorModule,
    UpholdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
