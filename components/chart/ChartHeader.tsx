"use client";

import Image from "next/image";
import { getImagePath } from "@/utils/format.utils";
import { useChartStore } from "@/store/chart-store";
import { TimeFrameSelector } from "./TimeFrameSelector";

export const ChartHeader = (): React.ReactElement => {
  const { symbol } = useChartStore();
  return (
    <header className="flex shrink-0 items-center justify-between gap-4 border-b-3 border-gray-400/60 px-4 py-3">
      <div className="flex items-center gap-3.5">
        <h1 className="text-2xl font-bold">{symbol}</h1>
        <Image
          src={getImagePath(symbol, "webp")}
          alt={`${symbol} Logo`}
          loading="eager"
          width={40}
          height={40}
        />
        {/* TODO: подключить данные о текущей цене и изменении за день */}
        <span className="text-sm">-</span>
      </div>

      {/* Пока что статичный timeframe */}
      <TimeFrameSelector />
      {/* <span className="text-md">{timeframe}</span> */}
    </header>
  );
};
