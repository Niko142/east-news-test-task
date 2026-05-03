"use client";

import { useEffect, useRef } from "react";
import { LineSeries, type ISeriesApi, type Time } from "lightweight-charts";

import { IndicatorPanel } from "./IndicatorPanel";
import type { MFIPoint } from "@/types/indicator.types";
import { useChart } from "@/hooks/useChart";

interface MFIPanelProps {
  data: MFIPoint[];
}

export function MFIPanel({ data }: MFIPanelProps) {
  const { containerRef, chartRef } = useChart();
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  // Инициализация серии для MFI
  useEffect(() => {
    if (!chartRef.current || seriesRef.current) return;

    seriesRef.current = chartRef.current.addSeries(LineSeries, {
      color: "#2962FF",
      lineWidth: 1,
    });
  }, [chartRef]);

  // Обновление данных графика
  useEffect(() => {
    if (!seriesRef.current || !data.length) return;

    seriesRef.current.setData(
      data.map((p) => ({
        time: p.time as Time,
        value: p.value,
      })),
    );

    chartRef.current?.timeScale().fitContent();
  }, [data, chartRef]);

  return (
    <IndicatorPanel title="MFI">
      <div ref={containerRef} className="h-full w-full" />
    </IndicatorPanel>
  );
}
