import { CryptoSymbol } from "@/types/chart.types";

export const CHART_CONFIG = {
  // Количество свечей на графике
  candleCount: 300,
  // Максимальное изменение цены за свечу (в долях от текущей цены)
  maxChangePercent: 0.02,
  // Максимальная длина фитиля (в долях от текущей цены)
  maxWickPercent: 0.005,

  // Объем: минимальный и максимальный множитель от текущей цены
  volume: {
    min: 0.1,
    max: 0.5,
  },
} as const;

// Конфигурация для каждой криптовалютной пары
export const SYMBOLS_CONFIG: Record<
  CryptoSymbol,
  { basePrice: number; seed: number }
> = {
  BTCUSD: { basePrice: 78000, seed: 67 },
  ETHUSD: { basePrice: 2300, seed: 132 },
  BNBUSD: { basePrice: 615, seed: 85 },
};
