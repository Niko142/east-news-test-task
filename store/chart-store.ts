import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CryptoSymbol, TimeFrame } from "@/types/chart.types";

interface IActions {
  setTimeFrame: (timeframe: TimeFrame) => void;
}

interface IInitialState {
  symbol: CryptoSymbol;
  timeframe: TimeFrame;
}

type ChartStore = IInitialState & IActions;

const initialState: IInitialState = {
  symbol: "BTCUSD",
  timeframe: "1M",
};

export const useChartStore = create<ChartStore>()(
  persist(
    (set) => ({
      ...initialState,
      setTimeFrame(timeframe) {
        set(() => ({ timeframe }));
      },
    }),
    {
      name: "chart-state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const setTimeFrame = (timeframe: TimeFrame) =>
  useChartStore.getState().setTimeFrame(timeframe);
