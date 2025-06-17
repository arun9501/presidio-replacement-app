
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Shield, TrendingUp, Activity, Calendar, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const recentActivity = [
  {
    case: '# 2: Bob Johnson',
    status: 'Open',
    description: 'Unauthorized Transaction case Open on Mar 26, 2025, 08:05 AM'
  },
  {
    case: '# 3: Xavier Brown',
    status: 'Open',
    description: 'Unauthorized Transaction case Open on Apr 07, 2025, 08:42 AM'
  },
  {
    case: '# 4: Jason Parker',
    status: 'Open',
    description: 'Unauthorized Transaction case Open on Mar 30, 2025, 09:35 AM'
  },
  {
    case: '# 8: George Sanders',
    status: 'Closed',
    description: 'Payment Dispute case resolved'
  }
];

const UserProfile: React.FC = () => {
  return (
    <div className="w-80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 flex flex-col overflow-hidden">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-white/30 dark:border-slate-700/50 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <User className="text-white h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-300 dark:to-purple-300 bg-clip-text text-transparent">
              User Profile
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Account Overview</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Enhanced User Info */}
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200/30 dark:border-blue-800/30">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <label className="text-sm font-semibold text-blue-700 dark:text-blue-300">User Details</label>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">ID:</span>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Name:</span>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Bob Johnson</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Status:</span>
                <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 dark:from-emerald-900/70 dark:to-green-900/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs">
                  Active
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-orange-50/50 to-amber-50/50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl border border-orange-200/30 dark:border-orange-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <label className="text-sm font-semibold text-orange-700 dark:text-orange-300">Risk Assessment</label>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Risk Score:</span>
                <Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 dark:from-orange-900/70 dark:to-amber-900/70 dark:text-orange-300 border-orange-200 dark:border-orange-800 text-xs">
                  68/100 (Medium)
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Registration:</span>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">21/02/2025</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200/30 dark:border-emerald-800/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <label className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Account Balance</label>
            </div>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">$3,440.47</div>
          </div>
        </div>

        {/* Enhanced Activity Stats */}
        <div className="p-4 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-xl border border-violet-200/30 dark:border-violet-800/30">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">Activity (Last 30 Days)</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">0</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Bets</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">1</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Deposits</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">2</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Withdrawals</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">27</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Logins</div>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="p-4 bg-gradient-to-r from-slate-50/50 to-gray-50/50 dark:from-slate-950/30 dark:to-gray-950/30 rounded-xl border border-slate-200/30 dark:border-slate-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Recent Activity</h3>
          </div>
          <div className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg border border-white/40 dark:border-slate-700/40">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Customer reported unauthorized transaction from unknown device. 
              Customer stated: 'I did not make this bet, I was not even using my account at that time.'
            </p>
          </div>
        </div>

        {/* Enhanced Similar Cases */}
        <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-xl border border-indigo-200/30 dark:border-indigo-800/30">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Similar Cases</h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="group p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer border border-white/40 dark:border-slate-700/40 hover:border-indigo-200/50 dark:hover:border-indigo-700/50 hover:shadow-lg hover:shadow-indigo-500/10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                    {activity.case}
                  </span>
                  <Badge 
                    variant="outline"
                    className={`text-xs font-medium rounded-lg ${
                      activity.status === 'Open' 
                        ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 dark:from-emerald-900/70 dark:to-green-900/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                        : 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 dark:from-slate-800/70 dark:to-gray-800/70 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
