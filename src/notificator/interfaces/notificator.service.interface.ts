export interface INotificatorService {
  startPooling(currencyPair: string): Promise<void>;
}
