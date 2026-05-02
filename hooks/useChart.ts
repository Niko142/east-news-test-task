"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  type ISeriesApi,
  type IChartApi,
  type Time,
  CandlestickSeries,
} from "lightweight-charts";

import { useOHLCV } from "@/hooks/useOHLCV";
import { candleTheme, chartTheme } from "@/themes/chart.variants";
import { ChartContext } from "@/types/chart.types";

interface UseChartProps extends ChartContext {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// Хук для управления графиком на базе lightweight-charts
export function useChart({ containerRef, symbol, timeframe }: UseChartProps) {
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const { candles } = useOHLCV(symbol, timeframe);

  // Инициализация графика
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, chartTheme);
    const series = chart.addSeries(CandlestickSeries, candleTheme);

    chartRef.current = chart;
    seriesRef.current = series;

    const ro = new ResizeObserver(([entry]) => {
      chart.applyOptions({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [containerRef]);

  // Обновление данных на графике
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
  }, [candles]);
}
