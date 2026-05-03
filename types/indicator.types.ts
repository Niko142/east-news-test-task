export type IndicatorType = "MACD" | "MFI";

export interface MACDPoint {
  time: number;
  macd: number;
  signal: number;
  histogram: number;
}

export interface MFIPoint {
  time: number;
  value: number;
}
