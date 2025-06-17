
import React, { useState } from 'react';
import CaseQueue from '@/components/CaseQueue';
import CaseDetail from '@/components/CaseDetail';
import UserProfile from '@/components/UserProfile';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Search, Bell, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-700/60 px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="h-9 w-9 sm:h-10 sm:w-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                AutoCaseAI
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">Intelligent Dispute Resolution</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search cases, customers..."
                className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-indigo-300 dark:focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 relative hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Settings className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Search - Visible only on mobile */}
      <div className="md:hidden px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search cases..."
            className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)] lg:h-[calc(100vh-73px)] max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          <CaseQueue selectedCase={selectedCase} onSelectCase={setSelectedCase} />
          <div className="flex-1 flex flex-col lg:flex-row min-h-0">
            <CaseDetail caseId={selectedCase} />
            <div className="hidden xl:block">
              <UserProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
