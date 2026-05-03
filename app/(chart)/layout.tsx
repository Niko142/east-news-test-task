import { Sidebar } from "@/components/sidebar/Sidebar";

export default function ChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
      <Sidebar />
    </div>
  );
}
