"use client";

import clsx from "clsx";
import { togglePanel, useChartStore } from "@/store/chart-store";
import { SIDEBAR_INDICATORS } from "./sidebar.data";
import { SyncLoader } from "react-spinners";

export function Sidebar() {
  const { activePanels, symbol, timeframe, _hydrate } = useChartStore();

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-l-2 border-gray-400/60 py-5 md:w-64">
      {/* Индикаторы */}
      {!_hydrate ? (
        <div className="flex h-full w-full items-center justify-center">
          <SyncLoader size={20} color="var(--color-blue-500)" />
        </div>
      ) : (
        <>
          <section className="flex flex-col gap-3 border-b-2 border-gray-400/60 px-3 pb-5">
            <h2 className="text-md font-semibold tracking-widest uppercase">
              Индикаторы
            </h2>
            <ul className="flex flex-col gap-4">
              {SIDEBAR_INDICATORS.map((ind) => {
                const isActive = activePanels.includes(ind.label);

                return (
                  <li key={ind.label}>
                    <button
                      aria-pressed={isActive}
                      onClick={() => togglePanel(ind.label)}
                      className="flex w-full items-center justify-between rounded-sm bg-gray-800 px-3 py-2.5 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-900"
                    >
                      <div className="flex flex-col items-start gap-0.5">
                        <h3 className="text-sm font-medium text-white">
                          {ind.label}
                        </h3>
                        <p className="text-[11px] text-white/70">
                          {ind.description}
                        </p>
                      </div>
                      <div
                        aria-hidden="true"
                        className={clsx(
                          "relative h-5 w-8 rounded-full transition-colors",
                          isActive ? "bg-green-700" : "bg-gray-400",
                        )}
                      >
                        <span
                          className={clsx(
                            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all",
                            isActive ? "left-3.5" : "left-0.5",
                          )}
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
          {/* Основная информация */}
          <section className="flex flex-col gap-2 px-3 py-5">
            <h2 className="text-md font-semibold tracking-widest uppercase">
              Инструмент
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-900">Валюта:</p>
                <span className="rounded border border-[#2A2E39] bg-gray-900 px-1.5 py-1 text-sm text-gray-200">
                  {symbol}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-900">Текущий диапазон:</p>
                <span className="rounded border border-[#2A2E39] bg-gray-900 px-1.5 py-1 text-sm text-gray-200">
                  {timeframe}
                </span>
              </div>
            </div>
          </section>
        </>
      )}
    </aside>
  );
}
