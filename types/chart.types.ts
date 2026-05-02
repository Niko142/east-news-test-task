export type TimeFrame = "1D" | "1W" | "1M" | "6M" | "1Y";

// Тип для криптовалютных пар; логика пока для BTCUSD
export type CryptoSymbol = "BTCUSD" | "ETHUSD" | "BNBUSD";

export interface OHLCV {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
