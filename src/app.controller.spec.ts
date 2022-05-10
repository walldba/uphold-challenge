import { Test, TestingModule } from '@nestjs/testing';
import { isDate, isNumberObject } from 'util/types';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Uptime!"', async () => {
      const status = await appController.getStatus();
      expect(status.name).toContain('uphold-challenge');
    });
  });
});
