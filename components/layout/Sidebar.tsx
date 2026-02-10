import React from 'react';
import { LayoutDashboard, LineChart, TrendingUp, PieChart, Settings, LogOut, Briefcase } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  setPage: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentPage, setPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'stocks', label: 'Stocks', icon: LineChart },
    { id: 'rankings', label: 'Rankings', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 z-20 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col justify-between py-6">
        <div className="px-3">
          <div className="mb-2 px-4 text-2xl font-bold tracking-tight text-foreground">
            stocktop
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                }`}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-3">
          <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Settings
          </div>
          <div className="space-y-1">
            <button className="flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground">
              <Settings className="mr-3 h-4 w-4" />
              Preferences
            </button>
            <button className="flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10">
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};