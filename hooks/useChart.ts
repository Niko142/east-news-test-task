"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  type IChartApi,
  type DeepPartial,
  type ChartOptions,
} from "lightweight-charts";
import { chartTheme } from "@/themes/chart.variants";

// Универсальный хук для управления графиком lightweight-charts
export const useChart = (options?: DeepPartial<ChartOptions>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // Создаем график с cleanup-очисткой
  useEffect(() => {
    if (!containerRef.current) return;

    chartRef.current = createChart(containerRef.current, {
      ...chartTheme,
      autoSize: true,
    });

    return () => {
      chartRef.current?.remove();
      chartRef.current = null;
    };
  }, []);

  // Обновляем опции графика
  useEffect(() => {
    if (!chartRef.current || !options) return;

    chartRef.current.applyOptions(options);
  }, [options]);

  return { containerRef, chartRef };
};
