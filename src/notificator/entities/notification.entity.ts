import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { INotification } from '../interfaces/notificator.entity.interface';

@Entity({ name: 'notifications' })
export class Notification implements INotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'currency_pair', type: 'varchar', length: 10 })
  currencyPair: string;

  @Column({ name: 'rate', type: 'varchar', length: 30 })
  rate: number;

  @Column({ name: 'oscillation', type: 'varchar', length: 100 })
  oscillation: number;

  @Column({ name: 'percentage', type: 'varchar', length: 30 })
  percentage: number;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP(0)' })
  createdAt: Date;

  constructor(data: INotification) {
    Object.assign(this, data);
  }

  static checkOscillationValue({
    percentageValue,
    firstRate,
    newRate,
  }: {
    percentageValue: number;
    firstRate: number;
    newRate: number;
  }) {
    const percentage = percentageValue / 100;
    const oscillation = Math.abs(firstRate - newRate);
    const hadOscillation = oscillation > firstRate * percentage;

    return {
      hadOscillation,
      percentage,
      oscillation,
    };
  }
}
