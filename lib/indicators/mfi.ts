import { OHLCV } from "@/types/chart.types";
import { MFIPoint } from "@/types/indicator.types";
import { INDICATOR_CONFIG } from "./indicator.config";

/**
 * Расчет MFI (Money Flow Index) индикатора
 * @param candles - массив свечей OHLCV
 * @returns массив точек MFI, содержащих время и значение индикатора
 */
export function calculateMFI(candles: OHLCV[]): MFIPoint[] {
  const { period } = INDICATOR_CONFIG.MFI;

  if (candles.length < period + 1) return [];

  const results: MFIPoint[] = [];

  for (let i = period; i < candles.length; i++) {
    let positiveFlow = 0;
    let negativeFlow = 0;

    for (let j = i - period + 1; j <= i; j++) {
      const typicalPrice =
        (candles[j].high + candles[j].low + candles[j].close) / 3;

      const prevTypicalPrice =
        (candles[j - 1].high + candles[j - 1].low + candles[j - 1].close) / 3;

      const moneyFlow = typicalPrice * candles[j].volume;

      if (typicalPrice >= prevTypicalPrice) positiveFlow += moneyFlow;
      else negativeFlow += moneyFlow;
    }

    const mfi =
      negativeFlow === 0 ? 100 : 100 - 100 / (1 + positiveFlow / negativeFlow);

    results.push({ time: candles[i].time, value: mfi });
  }

  return results;
}
