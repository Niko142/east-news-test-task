"use client";

import { useRef } from "react";
import { useChart } from "@/hooks/useChart";
import { ChartContext } from "@/types/chart.types";
import ChartHeader from "./ChartHeader";

export type ChartProps = ChartContext;

export const Chart = ({
  symbol,
  timeframe,
}: ChartProps): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  useChart({ containerRef, symbol, timeframe });

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <ChartHeader symbol={symbol} timeframe={timeframe} />
      <div className="h-[80vh] min-h-0 w-full">
        <div ref={containerRef} className="h-full w-full" />
      </div>
    </div>
  );
};

export default Chart;
