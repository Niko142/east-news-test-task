import { CryptoSymbol, OHLCV, TimeFrame } from "@/types/chart.types";
import { createSeededRandom } from "@/utils/random.utils";

import { CHART_CONFIG, SYMBOLS_CONFIG } from "./seeds.config";
import { TIMEFRAME_SECONDS } from "./timeframes.data";

/**
 * Генерация mock OHLCV-данных для визуализации графика
 * Данные имитируют поведение рынка:
 * - плавные изменения цены (через random + volatility)
 * - фитили (high/low)
 * - объем (volume), пропорциональный цене
 * !!! Данные полностью синтетические, не реальные показатели
 *
 * @param symbol - Торговая пара (например, BTCUSD, ETHUSD)
 * @param timeframe - Временной интервал
 * @returns массив OHLCV свечей
 */
export const generateMockCandles = (
  symbol: CryptoSymbol,
  timeframe: TimeFrame,
): OHLCV[] => {
  const { seed, basePrice } = SYMBOLS_CONFIG[symbol];

  //   const timeStep = TIMEFRAME_SECONDS[timeframe];
  //   const startTime =
  //     Math.floor(Date.now() / 1000) - timeStep * CHART_CONFIG.candleCount;
  const endTime = Math.floor(Date.now() / 1000);
  const startTime = endTime - TIMEFRAME_SECONDS[timeframe];

  const timeStep = TIMEFRAME_SECONDS[timeframe] / CHART_CONFIG.candleCount;

  const random = createSeededRandom(seed);
  const candles: OHLCV[] = [];
  let currentPrice = basePrice;

  for (let i = 0; i < CHART_CONFIG.candleCount; i++) {
    const open = currentPrice;

    const change = (random() - 0.5) * 2 * open * CHART_CONFIG.maxChangePercent;
    const close = Math.max(open + change, basePrice * 0.1);

    const upperWick = random() * open * CHART_CONFIG.maxWickPercent;
    const lowerWick = random() * open * CHART_CONFIG.maxWickPercent;

    const high = Math.max(open, close) + upperWick;
    const low = Math.min(open, close) - lowerWick;

    const volume =
      ((open + close) / 2) *
      (CHART_CONFIG.volume.min +
        random() * (CHART_CONFIG.volume.max - CHART_CONFIG.volume.min));

    candles.push({
      time: startTime + i * timeStep,
      open,
      high,
      low,
      close,
      volume,
    });

    currentPrice = close;
  }

  return candles;
};
