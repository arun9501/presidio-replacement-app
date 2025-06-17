
import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Urgent': return 'bg-red-100 text-red-800';
    case 'High': return 'bg-orange-100 text-orange-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface CaseQueueProps {
  selectedCase: number | null;
  onSelectCase: (caseId: number) => void;
}

const CaseQueue: React.FC<CaseQueueProps> = ({ selectedCase, onSelectCase }) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Case Queue</h2>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-1" />
            New Case
          </Button>
        </div>
        
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search cases..."
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <span>Sort: Latest</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {cases.map((case_) => (
          <div
            key={case_.id}
            onClick={() => onSelectCase(case_.id)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedCase === case_.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-gray-900">#{case_.id}: {case_.title}</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                  {case_.priority}
                </span>
                {case_.status === 'Open' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Open
                  </span>
                )}
                {case_.status === 'Resolved' && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Resolved
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">{case_.customer}</div>
            <div className="text-sm font-medium text-gray-900 mb-1">{case_.amount}</div>
            <div className="text-xs text-gray-500">{case_.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseQueue;
