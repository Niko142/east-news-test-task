import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CryptoSymbol, TimeFrame } from "@/types/chart.types";

interface IActions {
  setTimeFrame: (timeframe: TimeFrame) => void;
}

interface IInitialState {
  symbol: CryptoSymbol;
  timeframe: TimeFrame;
  _hydrate: boolean; // флаг для отслеживания гидратации состояния из localStorage
}

type ChartStore = IInitialState & IActions;

const initialState: IInitialState = {
  symbol: "BTCUSD",
  timeframe: "1M",
  _hydrate: false,
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
      onRehydrateStorage: () => (state) => {
        if (state) state._hydrate = true;
      },
      partialize: (state) => ({
        symbol: state.symbol,
        timeframe: state.timeframe,
      }),
    },
  ),
);

export const setTimeFrame = (timeframe: TimeFrame) =>
  useChartStore.getState().setTimeFrame(timeframe);
