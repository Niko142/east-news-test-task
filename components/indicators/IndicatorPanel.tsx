interface IndicatorPanelProps {
  title: string;
  children: React.ReactNode;
}

export function IndicatorPanel({ title, children }: IndicatorPanelProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2 className="text-md shrink-0 py-1.5 pl-3 font-semibold">{title}</h2>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
