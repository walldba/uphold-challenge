import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'notifications' })
export class Notification {
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
