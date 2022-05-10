import { Notification } from './notification.entity';

describe('Notification class', () => {
  it('should create a new notification', () => {
    const notification = new Notification({
      currencyPair: 'USD-BTC',
      oscillation: 0,
      percentage: 0,
      rate: 0,
    });

    expect(notification).toBeTruthy();
  });

  it('should check there was a oscillation', () => {
    const { hadOscillation } = Notification.checkOscillationValue({
      percentageValue: 0.01,
      firstRate: 0.87742,
      newRate: 0.88742,
    });

    expect(hadOscillation).toBeTruthy();
  });

  it('should check there was not a oscillation', () => {
    const { hadOscillation } = Notification.checkOscillationValue({
      percentageValue: 0.01,
      firstRate: 0.87742,
      newRate: 0.87743,
    });

    expect(hadOscillation).toBeFalsy();
  });
});
