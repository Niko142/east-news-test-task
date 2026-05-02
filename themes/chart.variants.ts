import type { DeepPartial, ChartOptions } from "lightweight-charts";

export const chartTheme: DeepPartial<ChartOptions> = {
  autoSize: true,

  layout: {
    background: { color: "#131722" },
    textColor: "#787B86",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontSize: 12,
  },
  grid: {
    vertLines: { color: "#1C2030" },
    horzLines: { color: "#1C2030" },
  },
  crosshair: {
    vertLine: { color: "#4C5058", labelBackgroundColor: "#1E2433" },
    horzLine: { color: "#4C5058", labelBackgroundColor: "#1E2433" },
  },
  leftPriceScale: {
    visible: false,
  },
  rightPriceScale: {
    borderColor: "#2A2E39",
    visible: true,
  },
  timeScale: {
    borderColor: "#2A2E39",
    timeVisible: true,
    secondsVisible: false,
    fixLeftEdge: true,
    fixRightEdge: true,
  },
};

export const candleTheme = {
  upColor: "#26A69A",
  downColor: "#EF5350",
  borderUpColor: "#26A69A",
  borderDownColor: "#EF5350",
  wickUpColor: "#26A69A",
  wickDownColor: "#EF5350",
};
