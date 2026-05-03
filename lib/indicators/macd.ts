import type { OHLCV } from "@/types/chart.types";
import { MACDPoint } from "@/types/indicator.types";
import { INDICATOR_CONFIG } from "./indicator.config";

/**
 * Функция для расчета экспоненциальной скользящей средней (EMA)
 * @param values - массив значений
 * @param period - период скользящей средней
 * @returns массив значений EMA
 */
function calculateEMA(values: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const results = [values[0]];

  for (let i = 1; i < values.length; i++) {
    results.push(values[i] * k + results[i - 1] * (1 - k));
  }

  return results;
}

/**
 * Расчет MACD (Moving Average Convergence Divergence) индикатора
 * @param candles - массив свечей OHLCV
 * @returns массив точек MACD, содержащих время, значение MACD, сигнальную линию и гистограмму
 */
export function calculateMACD(candles: OHLCV[]): MACDPoint[] {
  const { fastPeriod, slowPeriod, signalPeriod } = INDICATOR_CONFIG.MACD;

  if (candles.length < slowPeriod + signalPeriod) return [];

  const closes = candles.map((c) => c.close);
  const fastEMA = calculateEMA(closes, fastPeriod);
  const slowEMA = calculateEMA(closes, slowPeriod);
  const macdLine = fastEMA.map((v, i) => v - slowEMA[i]);

  const macdSlice = macdLine.slice(slowPeriod - 1);
  const signalLine = calculateEMA(macdSlice, signalPeriod);

  return signalLine.map((signal, i) => {
    const idx = i + slowPeriod - 1;
    const macd = macdSlice[i];

    return {
      time: candles[idx].time,
      macd,
      signal,
      histogram: macd - signal,
    };
  });
}
