import { clsx } from "clsx";
import { TIMEFRAMES } from "@/lib/mock/timeframes.data";
import { setTimeFrame, useChartStore } from "@/store/chart-store";

export const TimeFrameSelector = (): React.ReactElement => {
  const { timeframe, _hydrate } = useChartStore();

  return (
    <menu className="flex gap-2">
      {TIMEFRAMES.map((tmf) => (
        <button
          key={tmf}
          className={clsx(
            "rounded-md px-3 py-1 text-xs font-semibold outline-offset-2 transition-colors duration-400 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-gray-700 md:text-sm",
            _hydrate && tmf === timeframe
              ? "bg-gray-700 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200",
          )}
          onClick={() => setTimeFrame(tmf)}
        >
          {tmf}
        </button>
      ))}
    </menu>
  );
};
