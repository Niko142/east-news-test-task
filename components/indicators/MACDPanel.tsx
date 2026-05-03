"use client";

import { useEffect, useRef } from "react";
import {
  LineSeries,
  HistogramSeries,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import { useChart } from "@/hooks/useChart";
import { IndicatorPanel } from "./IndicatorPanel";
import type { MACDPoint } from "@/types/indicator.types";

type Series = {
  macd: ISeriesApi<"Line">;
  signal: ISeriesApi<"Line">;
  hist: ISeriesApi<"Histogram">;
};

export function MACDPanel({ data }: { data: MACDPoint[] }): React.ReactElement {
  const { containerRef, chartRef } = useChart({
    timeScale: { visible: false },
  });
  const seriesRef = useRef<Series | null>(null);

  // Инициализация серий для MACD
  useEffect(() => {
    if (!chartRef.current || seriesRef.current) return;

    seriesRef.current = {
      macd: chartRef.current.addSeries(LineSeries, {
        color: "#2962FF",
        lineWidth: 1,
      }),
      signal: chartRef.current.addSeries(LineSeries, {
        color: "#FF6D00",
        lineWidth: 1,
      }),
      hist: chartRef.current.addSeries(HistogramSeries, {}),
    };
  }, [chartRef]);

  // Обновление данных графика
  useEffect(() => {
    if (!seriesRef.current || !data.length) return;

    const { macd, signal, hist } = seriesRef.current;

    macd.setData(data.map((p) => ({ time: p.time as Time, value: p.macd })));
    signal.setData(
      data.map((p) => ({ time: p.time as Time, value: p.signal })),
    );
    hist.setData(
      data.map((p) => ({
        time: p.time as Time,
        value: p.histogram,
        color: p.histogram >= 0 ? "#26A69A" : "#EF5350",
      })),
    );

    chartRef.current?.timeScale().fitContent();
  }, [data, chartRef]);

  return (
    <IndicatorPanel title="MACD">
      <div ref={containerRef} className="h-full w-full" />
    </IndicatorPanel>
  );
}
