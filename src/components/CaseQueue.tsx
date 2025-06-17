
import React, { useState } from 'react';
import { Search, Filter, Plus, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Case {
  id: number;
  title: string;
  customer: string;
  amount: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'Resolved';
}

const cases: Case[] = [
  {
    id: 1,
    title: 'Payment Dispute',
    customer: 'Alice Smith',
    amount: '$50',
    date: 'Apr 07, 2025, 02:11 PM',
    priority: 'Medium',
    status: 'Open'
  },
  {
    id: 2,
    title: 'Unauthorized Transaction',
    customer: 'Bob Johnson',
    amount: '$936.85',
    date: 'Mar 26, 2025, 08:05 AM',
    priority: 'High',
    status: 'Open'
  },
  {
    id: 3,
    title: 'Unauthorized Transaction',
    customer: 'Xavier Brown',
    amount: '$1000',
    date: 'Apr 07, 2025, 08:42 AM',
    priority: 'High',
    status: 'Open'
  },
  {
    id: 4,
    title: 'Unauthorized Transaction',
    customer: 'Jason Parker',
    amount: '$100',
    date: 'Mar 30, 2025, 09:35 AM',
    priority: 'Urgent',
    status: 'Open'
  },
  {
    id: 5,
    title: 'Payment Dispute',
    customer: 'Emily Rodriguez',
    amount: '$150',
    date: 'Jan 16, 2025, 09:28 AM',
    priority: 'Medium',
    status: 'Open'
  },
  {
    id: 6,
    title: 'Payment Dispute',
    customer: 'George Sanders',
    amount: '$297.31',
    date: 'Nov 04, 2024, 10:06 AM',
    priority: 'Low',
    status: 'Resolved'
  }
];

const getPriorityConfig = (priority: string) => {
  switch (priority) {
    case 'Urgent': return { color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800', icon: AlertCircle };
    case 'High': return { color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800', icon: AlertCircle };
    case 'Medium': return { color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800', icon: Clock };
    case 'Low': return { color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800', icon: Clock };
    default: return { color: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800', icon: Clock };
  }
};

interface CaseQueueProps {
  selectedCase: number | null;
  onSelectCase: (caseId: number) => void;
}

const CaseQueue: React.FC<CaseQueueProps> = ({ selectedCase, onSelectCase }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = cases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full lg:w-80 xl:w-96 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/60 flex flex-col">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Case Queue</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{filteredCases.length} active cases</p>
          </div>
          <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg">
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-indigo-300 dark:focus:border-indigo-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <span className="text-sm text-slate-500 dark:text-slate-400">Sort: Latest</span>
          </div>
        </div>
      </div>
      
      {/* Cases List */}
      <div className="flex-1 overflow-y-auto">
        {filteredCases.map((caseItem) => {
          const priorityConfig = getPriorityConfig(caseItem.priority);
          const PriorityIcon = priorityConfig.icon;
          
          return (
            <div
              key={caseItem.id}
              onClick={() => onSelectCase(caseItem.id)}
              className={`group p-4 lg:p-6 border-b border-slate-100 dark:border-slate-800 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950 ${
                selectedCase === caseItem.id 
                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 border-l-4 border-l-indigo-500' 
                  : ''
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">#{caseItem.id}</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {caseItem.title}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{caseItem.customer}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-slate-900 dark:text-slate-100">
                  <DollarSign className="h-3 w-3" />
                  <span className="text-sm font-semibold">{caseItem.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs font-medium border ${priorityConfig.color}`}>
                    <PriorityIcon className="h-3 w-3 mr-1" />
                    {caseItem.priority}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">{caseItem.date}</span>
                <Badge 
                  variant={caseItem.status === 'Open' ? 'default' : 'secondary'}
                  className={`text-xs ${
                    caseItem.status === 'Open' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
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
            <Search className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No cases match your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseQueue;
