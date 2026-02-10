import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-border bg-background px-4 md:px-6">
      <button onClick={toggleSidebar} className="mr-4 lg:hidden p-2 text-muted-foreground hover:text-foreground">
        <Menu size={24} />
      </button>
      
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4 md:w-1/3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search stocks, ETFs..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-full bg-secondary p-2 text-muted-foreground hover:text-foreground">
            <Bell size={20} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User size={16} />
            </div>
            <span className="hidden text-sm font-medium md:block">Senior Dev</span>
          </div>
        </div>
      </div>
    </header>
  );
};