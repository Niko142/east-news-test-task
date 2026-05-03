"use client";

import { useOHLCV } from "@/hooks/useOHLCV";
import { useChartStore } from "@/store/chart-store";
import { Chart } from "./Chart";
import { IndicatorStack } from "../indicators";

export function TradingView() {
  const { symbol, timeframe } = useChartStore();
  const { candles } = useOHLCV(symbol, timeframe);

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden p-2">
      <div className="min-h-0 flex-[55%]">
        <Chart />
      </div>

      <div className="min-h-0 flex-[45%] border-t-3 border-gray-400/60">
        <IndicatorStack candles={candles} />
      </div>
    </div>
  );
}
