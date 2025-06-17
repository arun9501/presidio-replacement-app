import React, { useState } from 'react';
import { Search, Filter, Plus, Clock, AlertCircle, DollarSign, ChevronDown, ArrowUpDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Case, cases } from './CaseDetail';

const getPriorityConfig = (priority: string) => {
  switch (priority) {
    case 'Urgent': return { 
      color: 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 dark:from-red-950/50 dark:to-pink-950/50 dark:text-red-400 border-red-200/50 dark:border-red-800/50', 
      icon: AlertCircle 
    };
    case 'High': return { 
      color: 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 dark:from-orange-950/50 dark:to-amber-950/50 dark:text-orange-400 border-orange-200/50 dark:border-orange-800/50', 
      icon: AlertCircle 
    };
    case 'Medium': return { 
      color: 'bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 dark:from-yellow-950/50 dark:to-orange-950/50 dark:text-yellow-400 border-yellow-200/50 dark:border-yellow-800/50', 
      icon: Clock 
    };
    case 'Low': return { 
      color: 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 dark:from-emerald-950/50 dark:to-green-950/50 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50', 
      icon: Clock 
    };
    default: return { 
      color: 'bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 dark:from-slate-950/50 dark:to-gray-950/50 dark:text-slate-400 border-slate-200/50 dark:border-slate-800/50', 
      icon: Clock 
    };
  }
};

interface CaseQueueProps {
  selectedCase: number | null;
  onSelectCase: (caseId: number) => void;
}

type SortOption = 'latest' | 'oldest' | 'priority' | 'amount';
type FilterOption = 'all' | 'open' | 'resolved' | 'high' | 'urgent';

const CaseQueue: React.FC<CaseQueueProps> = ({ selectedCase, onSelectCase }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  // Apply filters
  let filteredCases = cases.filter(caseItem => {
    // Search filter
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status and priority filters
    const matchesFilter = 
      filterBy === 'all' ||
      (filterBy === 'open' && caseItem.status === 'Open') ||
      (filterBy === 'resolved' && caseItem.status === 'Resolved') ||
      (filterBy === 'high' && caseItem.priority === 'High') ||
      (filterBy === 'urgent' && caseItem.priority === 'Urgent');
    
    return matchesSearch && matchesFilter;
  });

  // Apply sorting
  filteredCases = [...filteredCases].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'priority': {
        const priorityOrder: Record<string, number> = { 'Urgent': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      case 'amount':
        return parseFloat(b.amount.replace('$', '')) - parseFloat(a.amount.replace('$', ''));
      default:
        return 0;
    }
  });

  return (
    <div className="h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 flex flex-col overflow-hidden">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-white/30 dark:border-slate-700/50 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/30 flex-shrink-0">
        <div className="mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-300 dark:to-purple-300 bg-clip-text text-transparent">
            Case Queue
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{filteredCases.length} active cases</p>
        </div>
        
        <div className="space-y-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 h-4 w-4 transition-colors duration-200" />
            <Input
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/70 dark:bg-slate-800/70 border-white/40 dark:border-slate-700/50 focus:border-violet-300 dark:focus:border-violet-500 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center justify-between">
            {/* Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-100/50 dark:hover:bg-violet-900/30 rounded-lg transition-all duration-200">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                  <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/50">
                <DropdownMenuLabel className="text-xs font-medium text-slate-500 dark:text-slate-400">Filter by Status</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setFilterBy('all')} className="flex items-center justify-between">
                    <span>All Cases</span>
                    {filterBy === 'all' && <Check className="h-3 w-3 text-violet-500" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterBy('open')} className="flex items-center justify-between">
                    <span>Open Cases</span>
                    {filterBy === 'open' && <Check className="h-3 w-3 text-violet-500" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterBy('resolved')} className="flex items-center justify-between">
                    <span>Resolved Cases</span>
                    {filterBy === 'resolved' && <Check className="h-3 w-3 text-violet-500" />}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-medium text-slate-500 dark:text-slate-400">Filter by Priority</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setFilterBy('high')} className="flex items-center justify-between">
                    <span>High Priority</span>
                    {filterBy === 'high' && <Check className="h-3 w-3 text-violet-500" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterBy('urgent')} className="flex items-center justify-between">
                    <span>Urgent Priority</span>
                    {filterBy === 'urgent' && <Check className="h-3 w-3 text-violet-500" />}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-100/50 dark:hover:bg-violet-900/30 rounded-lg transition-all duration-200">
                  <ArrowUpDown className="h-3 w-3 mr-1" />
                  <span className="text-sm">Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/50">
                <DropdownMenuLabel className="text-xs font-medium text-slate-500 dark:text-slate-400">Sort by</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setSortBy('latest')} className="flex items-center justify-between">
                    <span>Latest</span>
                    {sortBy === 'latest' && <Check className="h-3 w-3 text-violet-500" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('oldest')} className="flex items-center justify-between">
                    <span>Oldest</span>
                    {sortBy === 'oldest' && <Check className="h-3 w-3 text-violet-500" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('priority')} className="flex items-center justify-between">
                    <span>Priority</span>
                    {sortBy === 'priority' && <Check className="h-3 w-3 text-violet-500" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('amount')} className="flex items-center justify-between">
                    <span>Amount</span>
                    {sortBy === 'amount' && <Check className="h-3 w-3 text-violet-500" />}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Enhanced Cases List with proper scroll */}
      <ScrollArea className="flex-1">
        <div className="p-0">
          {filteredCases.map((caseItem) => {
            const priorityConfig = getPriorityConfig(caseItem.priority);
            const PriorityIcon = priorityConfig.icon;
            
            return (
              <div
                key={caseItem.id}
                onClick={() => onSelectCase(caseItem.id)}
                className={`group p-6 border-b border-white/20 dark:border-slate-800/50 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-purple-50/50 dark:hover:from-violet-950/30 dark:hover:to-purple-950/30 ${
                  selectedCase === caseItem.id 
                    ? 'bg-gradient-to-r from-violet-100/60 to-purple-100/60 dark:from-violet-900/40 dark:to-purple-900/40 border-l-4 border-l-violet-500 shadow-lg shadow-violet-500/10' 
                    : ''
                }`}
              >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-100/50 dark:bg-violet-900/50 px-2 py-1 rounded-lg">
                      #{caseItem.id}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {caseItem.title}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{caseItem.customer}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-slate-900 dark:text-slate-100 bg-gradient-to-r from-emerald-100/50 to-green-100/50 dark:from-emerald-900/50 dark:to-green-900/50 px-3 py-1 rounded-lg">
                  <DollarSign className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{caseItem.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs font-medium border ${priorityConfig.color} rounded-lg shadow-sm`}>
                    <PriorityIcon className="h-3 w-3 mr-1" />
                    {caseItem.priority}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{caseItem.date}</span>
                <Badge 
                  variant={caseItem.status === 'Open' ? 'default' : 'secondary'}
                  className={`text-xs font-medium rounded-lg shadow-sm ${
                    caseItem.status === 'Open' 
                      ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 dark:from-emerald-900/70 dark:to-green-900/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                      : 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 dark:from-slate-800/70 dark:to-gray-800/70 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {caseItem.status}
                </Badge>
              </div>
            </div>
            );
          })}

          {filteredCases.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 rounded-2xl flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-violet-400 dark:text-violet-500" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">No cases match your search</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CaseQueue;