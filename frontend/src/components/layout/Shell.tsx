import Link from 'next/link';
import { Home, LayoutDashboard, BarChart3, Search, Settings, User, Bell, LogOut } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col z-50">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            StockTop
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <SidebarLink href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
        <SidebarLink href="/stocks" icon={<BarChart3 className="w-5 h-5" />} label="Stocks" />
        <SidebarLink href="/search" icon={<Search className="w-5 h-5" />} label="Search" />
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <SidebarLink href="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
        <button className="flex items-center space-x-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group"
    >
      <span className="group-hover:scale-110 transition-transform duration-200">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-slate-950/50 backdrop-blur-xl border-b border-slate-800 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 w-96">
        <Search className="w-4 h-4 text-slate-500 mr-2" />
        <input
          type="text"
          placeholder="Search stocks, news, or sectors..."
          className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-300"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-400 hover:text-white transition">
          <Bell className="w-5 h-5" />
        </button>
        <div className="h-8 w-px bg-slate-800" />
        <button className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <User className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition">
            Investor Profile
          </span>
        </button>
      </div>
    </header>
  );
}
