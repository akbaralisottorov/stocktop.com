import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';

// Simple Router implementation since we are using client-side rendering without browser router
const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setPage] = useState('dashboard');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'stocks':
        return <div className="p-8 text-center text-muted-foreground">Stock Screener Component Placeholder</div>;
      case 'rankings':
        return <div className="p-8 text-center text-muted-foreground">Rankings Component Placeholder</div>;
      case 'portfolio':
        return <div className="p-8 text-center text-muted-foreground">Portfolio Component Placeholder</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          currentPage={currentPage} 
          setPage={setPage} 
        />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
          <div className="container mx-auto p-4 md:p-8 pt-6">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;