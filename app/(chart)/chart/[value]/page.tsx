import { Metadata } from "next";
import { Chart } from "@/components/chart";
import { CryptoSymbol } from "@/types/chart.types";

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

export default async function ChartPage({ params }: ChartPageProps) {
  const { value } = await params;

  return (
    <div className="h-full w-full">
      <Chart symbol={value} timeframe="1M" />
    </div>
  );
}
