export default function ChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
      <aside className="w-64 shrink-0 border-l-2 border-gray-400/60" />
    </div>
  );
}
