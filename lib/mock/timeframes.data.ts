import { TimeFrame } from "@/types/chart.types";

export const TIMEFRAME_RANGE: Record<TimeFrame, number> = {
  "1D": 1 * 24 * 60 * 60,
  "1W": 7 * 24 * 60 * 60,
  "1M": 30 * 24 * 60 * 60,
  "6M": 6 * 30 * 24 * 60 * 60,
  "1Y": 365 * 24 * 60 * 60,
};

export const STEP_BY_TIMEFRAME: Record<TimeFrame, number> = {
  "1D": 60 * 5, // 5 минут
  "1W": 60 * 30, // 30 минут
  "1M": 60 * 60, // 1 час
  "6M": 60 * 60 * 4, // 4 часа
  "1Y": 60 * 60 * 24, // 1 день
};

export const TIMEFRAMES: TimeFrame[] = ["1D", "1W", "1M", "6M", "1Y"];
