import { Metadata } from "next";
import { CryptoSymbol } from "@/types/chart.types";
import { TradingView } from "@/components/chart/TradingView";

interface ChartPageProps {
  params: Promise<{ value: CryptoSymbol }>;
}

export async function generateMetadata({
  params,
}: ChartPageProps): Promise<Metadata> {
  const { value } = await params;

  return {
    title: `${value} - Анализ | График и индикаторы`,
    description: `График и индикаторы для ${value}: MACD, RSI, MFI и технический анализ.`,
  };
}

export default async function ChartPage() {
  return (
    <>
      <TradingView />
    </>
  );
}
