
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, DollarSign, Calendar, BarChart2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const activityData = [
  { name: 'Bets', disputed: 1, average: 1 },
  { name: 'Deposits', disputed: 1, average: 1 },
  { name: 'Withdraws', disputed: 1, average: 1 },
  { name: 'Logins', disputed: 2, average: 1 }
];

const timelineData = [
  { date: 'Feb 8', balance: 900, betAmount: 0, disputed: false },
  { date: 'Feb 10', balance: 950, betAmount: 0, disputed: false },
  { date: 'Mar 17', balance: 1000, betAmount: 0, disputed: false },
  { date: 'Mar 23', balance: 1050, betAmount: 0, disputed: false },
  { date: 'Mar 25', balance: 1000, betAmount: 900, disputed: true }
];

const transactions = [
  {
    time: 'Mar 25, 2025, 11:59 AM',
    transaction: 'Withdraw',
    amount: '- $3,096.42',
    balance: '$3,440.47',
    status: 'Failed'
  },
  {
    time: 'Mar 25, 2025, 11:53 AM',
    transaction: 'Bet',
    amount: '- $936.85',
    balance: '$3,440.47',
    status: 'Disputed'
  },
  {
    time: 'Mar 25, 2025, 02:50 AM',
    transaction: 'Deposit',
    amount: '+ $1,126.44',
    balance: '$4,377.32',
    status: 'Completed'
  },
  {
    time: 'Mar 23, 2025, 09:07 AM',
    transaction: 'Bet',
    amount: '- $30.77',
    balance: '$3,250.88',
    status: 'Completed'
  },
  {
    time: 'Mar 17, 2025, 09:18 AM',
    transaction: 'Withdraw',
    amount: '- $109.37',
    balance: '$3,281.65',
    status: 'Completed'
  }
];

// This function is no longer needed as we're using inline styles with dark mode support

interface CaseDetailProps {
  caseId: number | null;
}

const CaseDetail: React.FC<CaseDetailProps> = ({ caseId }) => {
  if (!caseId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-purple-500/5">
          <h3 className="text-lg font-bold bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-300 dark:to-purple-300 bg-clip-text text-transparent mb-2">Select a case to view details</h3>
          <p className="text-slate-600 dark:text-slate-400">Choose a case from the queue to see its information and resolution tools.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-purple-500/5 rounded-2xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-300 dark:to-purple-300 bg-clip-text text-transparent mb-2">
                #{caseId}: Unauthorized Transaction
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  <span>Bob Johnson</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>936.85</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Mar 26, 2025, 08:05 AM</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-800/50">
                Open
              </span>
              <Button variant="outline" size="sm" className="border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/50">
                Ask AI
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 rounded-xl">
                Generate Case Study
              </Button>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* User Activity Chart */}
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/20 rounded-2xl">
            <div className="pb-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b border-white/30 dark:border-slate-700/50 px-4 sm:px-6 pt-4 sm:pt-6">
              <h3 className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                User Activity vs. Average
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div style={{ width: '100%', height: 250 }}>
                <ChartContainer config={{
                  disputed: { label: "Disputed Date", color: "#8b5cf6" },
                  average: { label: "30-day Avg", color: "#10b981" }
                }} className="w-full h-full">
                  <ResponsiveContainer>
                    <BarChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 10 }} />
                      <YAxis className="text-xs" tick={{ fontSize: 10 }} width={30} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="disputed" fill="url(#disputedGradient)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      <Bar dataKey="average" fill="url(#averageGradient)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      <defs>
                        <linearGradient id="disputedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#a855f7" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="averageGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>

          {/* Betting History Timeline */}
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 rounded-2xl">
            <div className="pb-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-white/30 dark:border-slate-700/50 px-4 sm:px-6 pt-4 sm:pt-6">
              <h3 className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Betting History Timeline
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div style={{ width: '100%', height: 250 }}>
                <ChartContainer config={{
                  balance: { label: "Balance", color: "#3b82f6" },
                  betAmount: { label: "Bet Amount", color: "#10b981" }
                }} className="w-full h-full">
                  <ResponsiveContainer>
                    <LineChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 10 }} />
                      <YAxis className="text-xs" tick={{ fontSize: 10 }} width={30} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="balance" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 2, strokeWidth: 1 }}
                        activeDot={{ r: 4, strokeWidth: 0, fill: "#3b82f6" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="betAmount" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ r: 2, strokeWidth: 1 }}
                        activeDot={{ r: 4, strokeWidth: 0, fill: "#10b981" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-400">Balance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-400">Bet Amount</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-400">Disputed</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-red-50/70 dark:bg-red-950/30 border border-red-200/50 dark:border-red-800/30 rounded-xl">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-300 text-sm">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  <span>Disputed transaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Sequence */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-emerald-500/10 dark:shadow-emerald-500/20 rounded-2xl">
          <div className="pb-3 bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 dark:from-emerald-950/30 dark:to-cyan-950/30 border-b border-white/30 dark:border-slate-700/50 px-4 sm:px-6 pt-4 sm:pt-6">
            <h3 className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 dark:from-emerald-300 dark:to-cyan-300 bg-clip-text text-transparent">
              <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Transaction Sequence
            </h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/30 dark:border-slate-700/50">
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 text-sm">TIME</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 text-sm">TRANSACTION</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 text-sm">AMOUNT</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 text-sm">BALANCE</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 text-sm">STATUS</th>
                  </tr>
                </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-white/20 dark:border-slate-700/50 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{transaction.time}</td>
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-200">{transaction.transaction}</td>
                    <td className={`py-3 px-4 text-sm font-medium ${
                      transaction.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {transaction.amount}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-200">{transaction.balance}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Failed' ? 'bg-rose-100/70 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/50' : 
                        transaction.status === 'Disputed' ? 'bg-purple-100/70 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/50' : 
                        'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
