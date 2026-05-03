"use client";

import { useChart } from "@/hooks/useChart";
import { useChartStore } from "@/store/chart-store";
import { useOHLCV } from "@/hooks/useOHLCV";
import { useCandleSeries } from "@/hooks/useCandleSeries";
import { ChartHeader } from "./ChartHeader";

export const Chart = (): React.ReactElement => {
  const { symbol, timeframe } = useChartStore();
  const { candles } = useOHLCV(symbol, timeframe);
  const { containerRef, chartRef } = useChart();

  useCandleSeries(chartRef, candles);

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <ChartHeader />
      <div className="min-h-0 flex-1">
        <div ref={containerRef} className="h-full w-full" />
      </div>
    </div>
  );
};
