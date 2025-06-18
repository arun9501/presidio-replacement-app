
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, User, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CreateCaseQueue: React.FC = () => {
  const [newCase, setNewCase] = useState({
    title: '',
    customer: '',
    amount: '',
    priority: 'Medium' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format the amount with $ sign
    const formattedCase = {
      ...newCase,
      amount: newCase.amount ? `${parseFloat(newCase.amount).toFixed(2)}` : ''
    };
    console.log('Creating new case:', formattedCase);
    // Reset form
    setNewCase({ title: '', customer: '', amount: '', priority: 'Medium' });
  };

  return (
    <Card className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 rounded-2xl">
      <CardHeader className="pb-3 sm:pb-4 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/30 border-b border-white/30 dark:border-slate-700/50">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3 text-xl font-bold">
          <div className="h-10 w-10 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Plus className="text-white h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-300 dark:to-purple-300 bg-clip-text text-transparent">Create New Case</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-1.5">
              <label htmlFor="case-title" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                Case Title
              </label>
              <Input
                id="case-title"
                value={newCase.title}
                onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                placeholder="Enter case title..."
                className="bg-white/70 dark:bg-slate-800/70 border-white/40 dark:border-slate-700/50 focus:border-violet-300 dark:focus:border-violet-500 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="customer-name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Customer Name
              </label>
              <Input
                id="customer-name"
                value={newCase.customer}
                onChange={(e) => setNewCase({...newCase, customer: e.target.value})}
                placeholder="Enter customer name..."
                className="bg-white/70 dark:bg-slate-800/70 border-white/40 dark:border-slate-700/50 focus:border-violet-300 dark:focus:border-violet-500 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="amount" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400">$</span>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newCase.amount}
                  onChange={(e) => setNewCase({...newCase, amount: e.target.value})}
                  placeholder="0.00"
                  className="pl-7 bg-white/70 dark:bg-slate-800/70 border-white/40 dark:border-slate-700/50 focus:border-violet-300 dark:focus:border-violet-500 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="priority" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                Priority
              </label>
              <select
                id="priority"
                value={newCase.priority}
                onChange={(e) => setNewCase({...newCase, priority: e.target.value as any})}
                className="w-full p-2.5 bg-white/70 dark:bg-slate-800/70 border border-white/40 dark:border-slate-700/50 focus:border-violet-300 dark:focus:border-violet-500 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/20 dark:border-slate-700/50 gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>Created: {new Date().toLocaleDateString()}</span>
            </div>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 rounded-xl px-8 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Case
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCaseQueue;
