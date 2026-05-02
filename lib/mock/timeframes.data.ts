import { TimeFrame } from "@/types/chart.types";

export const TIMEFRAME_SECONDS: Record<TimeFrame, number> = {
  "1D": 24 * 60 * 60,
  "1W": 7 * 24 * 60 * 60,
  "1M": 30 * 24 * 60 * 60,
  "6M": 6 * 30 * 24 * 60 * 60,
  "1Y": 365 * 24 * 60 * 60,
};
