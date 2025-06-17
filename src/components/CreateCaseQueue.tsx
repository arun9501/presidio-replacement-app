
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
    console.log('Creating new case:', newCase);
    // Reset form
    setNewCase({ title: '', customer: '', amount: '', priority: 'Medium' });
  };

  return (
    <Card className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20">
      <CardHeader className="pb-4 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/30 border-b border-white/30 dark:border-slate-700/50">
        <CardTitle className="flex items-center gap-3 text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-300 dark:to-purple-300 bg-clip-text text-transparent">
          <div className="h-10 w-10 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Plus className="text-white h-5 w-5" />
          </div>
          Create New Case
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                Case Title
              </label>
              <Input
                value={newCase.title}
                onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                placeholder="Enter case title..."
                className="bg-white/70 dark:bg-slate-800/70 border-white/40 dark:border-slate-700/50 focus:border-violet-300 dark:focus:border-violet-500 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Customer Name
              </label>
              <Input
                value={newCase.customer}
                onChange={(e) => setNewCase({...newCase, customer: e.target.value})}
                placeholder="Enter customer name..."
                className="bg-white/70 dark:bg-slate-800/70 border-white/40 dark:border-slate-700/50 focus:border-violet-300 dark:focus:border-violet-500 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Amount
              </label>
              <Input
                value={newCase.amount}
                onChange={(e) => setNewCase({...newCase, amount: e.target.value})}
                placeholder="$0.00"
                className="bg-white/70 dark:bg-slate-800/70 border-white/40 dark:border-slate-700/50 focus:border-violet-300 dark:focus:border-violet-500 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                Priority
              </label>
              <select
                value={newCase.priority}
                onChange={(e) => setNewCase({...newCase, priority: e.target.value as any})}
                className="w-full p-3 bg-white/70 dark:bg-slate-800/70 border border-white/40 dark:border-slate-700/50 focus:border-violet-300 dark:focus:border-violet-500 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/20 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Calendar className="h-4 w-4" />
              <span>Created: {new Date().toLocaleDateString()}</span>
            </div>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 rounded-xl px-8"
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
