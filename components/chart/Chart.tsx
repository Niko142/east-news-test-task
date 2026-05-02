"use client";

import { useRef } from "react";
import { useChart } from "@/hooks/useChart";
import { useChartStore } from "@/store/chart-store";
import { ChartHeader } from "./ChartHeader";

export const Chart = (): React.ReactElement => {
  const { symbol, timeframe } = useChartStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useChart({ containerRef, symbol, timeframe });

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <ChartHeader />
      <div className="h-[80vh] min-h-0 w-full">
        <div ref={containerRef} className="h-full w-full" />
      </div>
    </div>
  );
};
