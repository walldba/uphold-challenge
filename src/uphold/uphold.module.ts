import { Module } from '@nestjs/common';
import { UpholdService } from './uphold.service';

@Module({
  providers: [UpholdService]
})
export class UpholdModule {}
