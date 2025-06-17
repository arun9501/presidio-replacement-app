
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 transition-all duration-500">
      {/* Animated background overlay */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 animate-pulse"></div>
      
      {/* Modern Header with glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-700/50 shadow-lg shadow-purple-500/5 dark:shadow-purple-500/20 px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative group">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105">
                <Sparkles className="text-white h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-1 -left-1 h-3 w-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-bounce opacity-75"></div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                AutoCaseAI
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block font-medium">Intelligent Dispute Resolution</p>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 h-4 w-4 transition-colors duration-200" />
              <Input
                placeholder="Search cases, customers..."
                className="pl-12 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 border-white/30 dark:border-slate-700/50 focus:border-violet-300 dark:focus:border-violet-500 rounded-xl shadow-lg shadow-violet-500/5 backdrop-blur-sm transition-all duration-200 focus:shadow-violet-500/20"
              />
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 relative hover:bg-violet-100 dark:hover:bg-violet-900/50 rounded-xl transition-all duration-200 group">
              <Bell className="h-4 w-4 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg"></span>
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-violet-100 dark:hover:bg-violet-900/50 rounded-xl transition-all duration-200 group">
              <Settings className="h-4 w-4 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Search */}
      <div className="md:hidden px-4 py-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 h-4 w-4 transition-colors duration-200" />
          <Input
            placeholder="Search cases..."
            className="pl-12 bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-700/50 rounded-xl shadow-lg backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Main Content with improved spacing and backgrounds */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] lg:h-[calc(100vh-89px)] max-w-7xl mx-auto p-4 gap-4">
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 gap-4">
          <CaseQueue selectedCase={selectedCase} onSelectCase={setSelectedCase} />
          <div className="flex-1 flex flex-col lg:flex-row min-h-0 gap-4">
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
