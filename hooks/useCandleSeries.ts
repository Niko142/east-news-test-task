"use client";

import { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import { candleTheme } from "@/themes/chart.variants";
import type { OHLCV } from "@/types/chart.types";

// Хук для управления свечной серией на графике
export const useCandleSeries = (
  chartRef: React.RefObject<IChartApi | null>,
  candles: OHLCV[],
) => {
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartRef.current || seriesRef.current) return;
    seriesRef.current = chartRef.current.addSeries(
      CandlestickSeries,
      candleTheme,
    );
  }, [chartRef]);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;
    seriesRef.current.setData(
      candles.map((c) => ({
        time: c.time as Time,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      })),
    );
    chartRef.current.timeScale().fitContent();
  }, [candles, chartRef]);
};
