import { Sidebar, Navbar } from "@/components/layout/Shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Navbar />
        <main className="pt-24 pb-12 px-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
