import { calculateMACD, calculateMFI } from "@/lib/indicators";
import { OHLCV } from "@/types/chart.types";
import { useMemo } from "react";

// Хук для получения данных MACD индикатора
export const useMACD = (candles: OHLCV[]) =>
  useMemo(() => calculateMACD(candles), [candles]);

// Хук для получения данных MFI индикатора
export const useMFI = (candles: OHLCV[]) =>
  useMemo(() => calculateMFI(candles), [candles]);
