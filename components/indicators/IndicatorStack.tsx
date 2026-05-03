import { OHLCV } from "@/types/chart.types";
import { MACDPanel } from "./MACDPanel";
import { MFIPanel } from "./MFIPanel";
import { useMACD, useMFI } from "@/hooks/useIndicators";

interface IndicatorStackProps {
  candles: OHLCV[];
}

export function IndicatorStack({ candles }: IndicatorStackProps) {
  const macd = useMACD(candles);
  const mfi = useMFI(candles);

  return (
    <div className="flex h-full flex-col">
      <MFIPanel data={mfi} />
      <MACDPanel data={macd} />
    </div>
  );
}
