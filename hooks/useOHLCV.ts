import { useMemo } from "react";

import { generateMockCandles } from "@/lib/mock/generateMock";
import { CryptoSymbol, TimeFrame } from "@/types/chart.types";

/**
 * Хук для получения OHLCV данных для графика.
 * @param symbol - торговая пара (например, BTCUSD, ETHUSD)
 * @param timeframe - Временной интервал
 * @returns Объект с массивом свечей OHLCV
 */
export const useOHLCV = (symbol: CryptoSymbol, timeframe: TimeFrame) => {
  const candles = useMemo(
    () => generateMockCandles(symbol, timeframe),
    [symbol, timeframe],
  );

  return { candles };
};
