import React, { useState, useEffect, memo, useCallback } from 'react';
import { Search, Filter, Plus, Clock, AlertCircle, DollarSign, ChevronDown, ArrowUpDown, Check, Loader2, User, Calendar } from 'lucide-react';
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
import { Case, cases as fallbackCases } from './CaseDetail';
import { caseQueueService } from '@/services/caseQueueService';

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
  onUserInfoChange?: (userInfo: any) => void;
}

type SortOption = 'latest' | 'oldest' | 'priority' | 'amount';
type FilterOption = 'all' | 'open' | 'resolved' | 'high' | 'urgent';

// Interface for API response case format
interface ApiCase {
  case_id: number;
  case_type: string;
  priority: string;
  status: string;
  amount: number;
  user_id: number;
  created_at: string;
  user_info?: {
    user_id: number;
    name: string;
    registration_date: string;
    account_status: string;
    risk_score: number;
    balance: number;
  };
  related_transactions?: any[];
  user_activities?: any[];
  recent_activities?: any[];
}

const CaseQueue: React.FC<CaseQueueProps> = ({ selectedCase, onSelectCase, onUserInfoChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [cases, setCases] = useState<Case[]>(fallbackCases);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCases, setTotalCases] = useState(0);
  const [apiCases, setApiCases] = useState<ApiCase[]>([]);
  const limit = 10;

  // Fetch cases from API
  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Prepare filters for API
        const apiFilters: Record<string, string> = {};
        
        if (searchTerm) {
          apiFilters.search = searchTerm;
        }
        
        if (filterBy !== 'all') {
          if (filterBy === 'open' || filterBy === 'resolved') {
            apiFilters.status = filterBy === 'open' ? 'Open' : 'Resolved';
          } else if (filterBy === 'high' || filterBy === 'urgent') {
            apiFilters.priority = filterBy === 'high' ? 'High' : 'Urgent';
          }
        }
        
        const response = await caseQueueService.getCases(page, limit, apiFilters);
        
        // Process the API response
        if (response) {
          let apiCases: ApiCase[] = [];
          
          // Handle different response formats
          if (Array.isArray(response.cases)) {
            apiCases = response.cases;
          } else if (response.cases && typeof response.cases === 'object') {
            apiCases = [response.cases];
          } else if (Array.isArray(response)) {
            apiCases = response;
          }
          
          // Store API cases in state for later use
          setApiCases(apiCases);
          
          // Map API cases to our Case interface
          const formattedCases = apiCases.map(apiCase => {
            // Store user info for the selected case
            if (apiCase.case_id === selectedCase && apiCase.user_info && onUserInfoChange) {
              onUserInfoChange(apiCase.user_info);
            }
            
            return {
              id: apiCase.case_id,
              title: apiCase.case_type || 'Untitled Case',
              customer: apiCase.user_info?.name || `User ${apiCase.user_id}`,
              amount: typeof apiCase.amount === 'number' ? `${apiCase.amount.toFixed(2)}` : `${apiCase.amount}`,
              date: new Date(apiCase.created_at).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              }),
              priority: apiCase.priority || 'Medium',
              status: apiCase.status || 'Open'
            } as Case;
          });
          
          setCases(formattedCases);
          setTotalCases(response.total_cases || response.total || formattedCases.length);
          
          // If no case is selected yet and we have cases, select the first one
          if (selectedCase === null && formattedCases.length > 0) {
            onSelectCase(formattedCases[0].id);
          }
        } else {
          // If response is not valid, use fallback data
          console.error('API response is not valid:', response);
          setError('Failed to load cases. Using fallback data.');
          setCases(fallbackCases);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch cases:', err);
        setError('Failed to load cases. Using fallback data.');
        setCases(fallbackCases);
        setIsLoading(false);
      }
    };
    
    fetchCases();
    // Removed selectedCase from dependency array to prevent re-fetching when a case is selected
  }, [page, filterBy, searchTerm, onSelectCase, onUserInfoChange]);

  // Update user info when selected case changes - optimized for speed
  useEffect(() => {
    if (selectedCase && onUserInfoChange) {
      // First immediately create minimal user info from case data for fast display
      const selectedCaseData = cases.find(c => c.id === selectedCase);
      if (selectedCaseData) {
        const minimalUserInfo = {
          user_id: selectedCase,
          name: selectedCaseData.customer,
          registration_date: new Date().toLocaleDateString(),
          risk_score: "50/100 (Medium)",
          balance: selectedCaseData.amount,
          created_at: selectedCaseData.date // Include the date as created_at
        };
        // Send minimal info immediately
        onUserInfoChange(minimalUserInfo);
      }
      
      // Then check for more detailed API data
      const selectedApiCase = apiCases.find(apiCase => apiCase.case_id === selectedCase);
      if (selectedApiCase) {
        // Send complete info when available, including created_at from the case itself
        const enhancedUserInfo = {
          ...(selectedApiCase.user_info || {}),
          created_at: selectedApiCase.created_at,
          user_id: selectedApiCase.user_id
        };
        onUserInfoChange(enhancedUserInfo);
      }
    }
  }, [selectedCase, apiCases, cases, onUserInfoChange]);

  // Apply sorting (client-side for now)
  const sortedCases = Array.isArray(cases) ? [...cases].sort((a, b) => {
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
        return parseFloat(b.amount.replace(/[^0-9.-]+/g, '')) - parseFloat(a.amount.replace(/[^0-9.-]+/g, ''));
      default:
        return 0;
    }
  }) : [];

  return (
    <div className="h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 flex flex-col overflow-hidden">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-white/30 dark:border-slate-700/50 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/30 flex-shrink-0">
        <div className="mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-300 dark:to-purple-300 bg-clip-text text-transparent">
            Case Queue
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {isLoading ? 'Loading cases...' : `${totalCases || cases.length} active cases`}
            </p>
            {isLoading && <Loader2 className="h-3 w-3 text-violet-500 animate-spin" />}
          </div>
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
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Sort
                  <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/50">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setSortBy('latest')} className="flex items-center justify-between">
                    <span>Latest First</span>
                    {sortBy === 'latest' && <Check className="h-3 w-3 text-violet-500" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('oldest')} className="flex items-center justify-between">
                    <span>Oldest First</span>
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
      
      {/* Case List */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-violet-500 animate-spin mr-3" />
              <span className="text-slate-600 dark:text-slate-400 font-medium">Loading cases...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50/70 dark:bg-red-950/30 border border-red-200/50 dark:border-red-800/30 rounded-xl p-4 text-center">
              <p className="text-red-700 dark:text-red-400">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/30"
                onClick={() => {
                  setPage(1);
                  setFilterBy('all');
                  setSearchTerm('');
                }}
              >
                Retry
              </Button>
            </div>
          ) : sortedCases.length === 0 ? (
            <div className="bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 rounded-xl p-8 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-2">No cases found</p>
              <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">Try adjusting your filters or search terms</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                onClick={() => {
                  setFilterBy('all');
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedCases.map((caseItem) => {
                const priorityConfig = getPriorityConfig(caseItem.priority);
                const PriorityIcon = priorityConfig.icon;
                
                return (
                  <div 
                    key={caseItem.id}
                    onClick={() => {
                      // Just call onSelectCase - the useEffect will handle updating user info
                      onSelectCase(caseItem.id);
                    }}
                    className={`
                      p-4 rounded-xl cursor-pointer transition-all duration-200
                      ${selectedCase === caseItem.id 
                        ? 'bg-gradient-to-r from-violet-100/80 to-purple-100/80 dark:from-violet-900/40 dark:to-purple-900/40 border border-violet-200/50 dark:border-violet-700/50 shadow-lg shadow-purple-500/10' 
                        : 'bg-white/50 dark:bg-slate-800/50 border border-white/50 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-medium text-xs ${selectedCase === caseItem.id ? 'text-violet-900 dark:text-violet-200' : 'text-slate-900 dark:text-slate-200'}`}>
                        #{caseItem.id}: {caseItem.title}
                      </h3>
                      <Badge variant="outline" className={`ml-2 ${priorityConfig.color}`}>
                        <PriorityIcon className="h-3 w-3 mr-1" />
                        {caseItem.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1.5 text-slate-500 dark:text-slate-500" />
                        {caseItem.customer}
                      </div>
                      <Badge className={`text-xs ${caseItem.status === 'Open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800/50' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800/50'}`}>
                        {caseItem.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-slate-500 dark:text-slate-500 text-[10px]">
                        <Calendar className="h-2.5 w-2.5 mr-1" />
                        {caseItem.date}
                      </div>
                      <div className="flex items-center font-medium text-emerald-700 dark:text-emerald-400 text-[10px]">
                        <DollarSign className="h-2.5 w-2.5 mr-0.5" />
                        {caseItem.amount}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Pagination Controls */}
              {totalCases > limit && (
                <div className="flex items-center justify-between pt-4 border-t border-white/30 dark:border-slate-700/50 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Page {page} of {Math.ceil(totalCases / limit)}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= Math.ceil(totalCases / limit)}
                    className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
// Memoize the component with custom comparison
// Don't memoize the CaseQueue component to ensure it always responds to changes
export default CaseQueue;