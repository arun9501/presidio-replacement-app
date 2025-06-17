
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, DollarSign, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Failed': return 'bg-red-100 text-red-800';
    case 'Disputed': return 'bg-purple-100 text-purple-800';
    case 'Completed': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface CaseDetailProps {
  caseId: number | null;
}

const CaseDetail: React.FC<CaseDetailProps> = ({ caseId }) => {
  if (!caseId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a case to view details</h3>
          <p className="text-gray-500">Choose a case from the queue to see its information and resolution tools.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                #{caseId}: Unauthorized Transaction
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Bob Johnson</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>936.85</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Mar 26, 2025, 08:05 AM</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Open
              </span>
              <Button variant="outline">Ask AI</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Generate Case Study</Button>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Activity Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity vs. Average</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="disputed" fill="#3b82f6" name="Disputed Date" />
                  <Bar dataKey="average" fill="#10b981" name="30-day Avg" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Betting History Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Betting History Timeline</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" name="Balance" />
                  <Line type="monotone" dataKey="betAmount" stroke="#10b981" name="Bet Amount" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                <span>Balance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span>Bet Amount</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                <span>Disputed</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800 text-sm">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span>Disputed transaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Sequence */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Sequence</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">TIME</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">TRANSACTION</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">AMOUNT</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">BALANCE</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.time}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{transaction.transaction}</td>
                    <td className={`py-3 px-4 text-sm font-medium ${
                      transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{transaction.balance}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
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
  );
};

export default CaseDetail;
