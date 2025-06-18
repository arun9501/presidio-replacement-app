import React, { useState, useEffect } from "react";
import CaseQueue from "@/components/CaseQueue";
import CaseDetail from "@/components/CaseDetail";
import UserProfile from "@/components/UserProfile";
import CreateCaseQueue from "@/components/CreateCaseQueue";
import GenerateCaseStudy from "@/components/GenerateCaseStudy";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search, Bell, Settings, Sparkles, Plus, BarChart3, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(2);
  
  // Function to handle case selection
  const handleCaseSelection = (caseId: number) => {
    setSelectedCase(caseId);
  };
  const [activeTab, setActiveTab] = useState("cases");
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 transition-all duration-500 overflow-x-hidden">
      {/* Animated background overlay */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 animate-pulse"></div>
      {/* Modern background patterns */}
      <div className="fixed inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Modern Header with glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-700/50 shadow-lg shadow-purple-500/5 dark:shadow-purple-500/20 px-3 sm:px-6 py-3 sm:py-4 relative">
        <div className="absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-xl transition-all duration-200 group"
            onClick={() => console.log("Logout clicked")}>
            <LogOut className="h-4 w-4 text-rose-500 dark:text-rose-400 group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors" />
          </Button>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative group">
              <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105">
                <Sparkles className="text-white h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-1 -left-1 h-2 w-2 sm:h-3 sm:w-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-bounce opacity-75"></div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                Presidio
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block font-medium">Intelligent Dispute Resolution</p>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 pr-10 sm:pr-12">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Search */}
      <div className="md:hidden px-3 py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50 sticky top-[73px] z-10">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 h-4 w-4 transition-colors duration-200" />
          <Input
            placeholder="Search cases..."
            className="pl-10 h-9 bg-white/80 dark:bg-slate-800/80 border-white/30 dark:border-slate-700/50 rounded-xl shadow-lg shadow-purple-500/5 backdrop-blur-sm focus:ring-2 focus:ring-violet-400/50"
          />
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="w-full px-3 sm:px-6 py-4 flex flex-col h-[calc(100vh-73px)] md:h-[calc(100vh-60px)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-grow">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-lg shadow-purple-500/5 overflow-hidden">
            <TabsTrigger
              value="cases"
              className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-200 data-[state=active]:shadow-md">
              <Search className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Case Management</span>
              <span className="sm:hidden">Cases</span>
            </TabsTrigger>
            <TabsTrigger
              value="create"
              className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-lg transition-all duration-200 data-[state=active]:shadow-md">
              <Plus className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Create Case</span>
              <span className="sm:hidden">Create</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg transition-all duration-200 data-[state=active]:shadow-md">
              <BarChart3 className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Charts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]">
            <div className="flex flex-col xl:flex-row gap-4 h-full">
              {/* Left Sidebar - Case Queue */}
              <div className="w-full xl:w-80 2xl:w-96 flex-shrink-0 overflow-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-purple-500/5">
                <div className="p-4">
                  <CaseQueue selectedCase={selectedCase} onSelectCase={handleCaseSelection} />
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
                {/* Center Area - Case Details */}
                <div className="flex-1 flex flex-col overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-purple-500/5">
                  <div className="flex-1 overflow-auto p-4">
                    <CaseDetail caseId={selectedCase} onSelectCase={handleCaseSelection} />
                  </div>
                </div>

                {/* Right Sidebar - User Profile */}
                <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 mt-4 lg:mt-0 flex flex-col overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-purple-500/5">
                  <div className="flex-1 overflow-auto p-4">
                    <UserProfile selectedCaseId={selectedCase} key={selectedCase} onSelectCase={handleCaseSelection} />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create" className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]">
            <div className="w-full h-full overflow-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-purple-500/5">
              <div className="p-4 sm:p-6">
                <CreateCaseQueue />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]">
            <div className="w-full h-full overflow-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-purple-500/5">
              <div className="p-4 sm:p-6">
                <GenerateCaseStudy />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
