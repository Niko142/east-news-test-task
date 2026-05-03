import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CryptoSymbol, TimeFrame } from "@/types/chart.types";
import { IndicatorType } from "@/types/indicator.types";

interface IActions {
  setTimeFrame: (timeframe: TimeFrame) => void;
  togglePanel: (indicator: IndicatorType) => void;
}

interface IInitialState {
  symbol: CryptoSymbol;
  timeframe: TimeFrame;
  activePanels: IndicatorType[];
  _hydrate: boolean; // флаг для отслеживания гидратации состояния из localStorage
}

type ChartStore = IInitialState & IActions;

const initialState: IInitialState = {
  symbol: "BTCUSD",
  timeframe: "1M",
  activePanels: ["MACD", "MFI"],
  _hydrate: false,
};

export const useChartStore = create<ChartStore>()(
  persist(
    (set) => ({
      ...initialState,
      setTimeFrame(timeframe) {
        set(() => ({ timeframe }));
      },
      togglePanel: (panel: IndicatorType) =>
        set((state) => ({
          activePanels: state.activePanels.includes(panel)
            ? state.activePanels.filter((p) => p !== panel)
            : [...state.activePanels, panel],
        })),
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
        activePanels: state.activePanels,
      }),
    },
  ),
);

export const setTimeFrame = (timeframe: TimeFrame) =>
  useChartStore.getState().setTimeFrame(timeframe);

export const togglePanel = (panel: IndicatorType) =>
  useChartStore.getState().togglePanel(panel);
