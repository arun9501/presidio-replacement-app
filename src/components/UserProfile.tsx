import React, { useState, useEffect } from "react";
import { User, Shield, TrendingUp, Activity, Calendar, DollarSign, ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Case, cases } from "./CaseDetail";
import { SimilarCase, similarCasesService } from "@/services/similarCasesService";

// User profile data for each customer
const userProfiles = {
  "Bob Johnson": {
    id: 2,
    riskScore: "68/100 (Medium)",
    registration: "21/02/2025",
    balance: "$3,440.47",
    activity: {
      bets: 0,
      deposits: 1,
      withdrawals: 2,
      logins: 27,
    },
    recentActivity:
      "Customer reported unauthorized transaction from unknown device. Customer stated: 'I did not make this bet, I was not even using my account at that time.'",
  },
  "Alice Smith": {
    id: 1,
    riskScore: "42/100 (Low)",
    registration: "15/01/2025",
    balance: "$1,250.00",
    activity: {
      bets: 3,
      deposits: 2,
      withdrawals: 1,
      logins: 15,
    },
    recentActivity: "Customer disputed a payment made on their account. Customer stated: 'I never authorized this transaction.'",
  },
  "Xavier Brown": {
    id: 3,
    riskScore: "75/100 (High)",
    registration: "03/03/2025",
    balance: "$2,780.25",
    activity: {
      bets: 12,
      deposits: 4,
      withdrawals: 1,
      logins: 42,
    },
    recentActivity: "Customer reported unauthorized transaction. Customer stated: 'Someone accessed my account without permission.'",
  },
  "Jason Parker": {
    id: 4,
    riskScore: "82/100 (High)",
    registration: "10/01/2025",
    balance: "$520.75",
    activity: {
      bets: 8,
      deposits: 3,
      withdrawals: 2,
      logins: 31,
    },
    recentActivity: "Customer reported unauthorized transaction from a different location. Customer stated: 'I was not at that location at the time.'",
  },
  "Emily Rodriguez": {
    id: 5,
    riskScore: "55/100 (Medium)",
    registration: "05/12/2024",
    balance: "$875.30",
    activity: {
      bets: 5,
      deposits: 2,
      withdrawals: 1,
      logins: 19,
    },
    recentActivity: "Customer disputed a payment. Customer stated: 'I did not authorize this transaction.'",
  },
  "George Sanders": {
    id: 6,
    riskScore: "35/100 (Low)",
    registration: "18/10/2024",
    balance: "$1,450.60",
    activity: {
      bets: 2,
      deposits: 1,
      withdrawals: 0,
      logins: 12,
    },
    recentActivity: "Customer disputed a payment but later confirmed it was valid.",
  },
};

// Similar cases data by case type
const similarCasesByType = {
  "Unauthorized Transaction": [
    {
      case: "# 2: Bob Johnson",
      status: "Open",
      description: "Unauthorized Transaction case Open on Mar 26, 2025, 08:05 AM",
    },
    {
      case: "# 3: Xavier Brown",
      status: "Open",
      description: "Unauthorized Transaction case Open on Apr 07, 2025, 08:42 AM",
    },
    {
      case: "# 4: Jason Parker",
      status: "Open",
      description: "Unauthorized Transaction case Open on Mar 30, 2025, 09:35 AM",
    },
  ],
  "Payment Dispute": [
    {
      case: "# 1: Alice Smith",
      status: "Open",
      description: "Payment Dispute case Open on Apr 07, 2025, 02:11 PM",
    },
    {
      case: "# 5: Emily Rodriguez",
      status: "Open",
      description: "Payment Dispute case Open on Jan 16, 2025, 09:28 AM",
    },
    {
      case: "# 6: George Sanders",
      status: "Resolved",
      description: "Payment Dispute case resolved on Nov 04, 2024",
    },
  ],
};

interface UserProfileProps {
  selectedCaseId: number | null;
  onSelectCase?: (caseId: number) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ selectedCaseId, onSelectCase }) => {
  const [similarCases, setSimilarCases] = useState<SimilarCase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCaseId) {
      setIsLoading(true);
      setError(null);
      
      similarCasesService.getSimilarCases(selectedCaseId)
        .then(data => {
          setSimilarCases(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch similar cases:', err);
          setError('Failed to load similar cases');
          setIsLoading(false);
        });
    } else {
      setSimilarCases([]);
    }
  }, [selectedCaseId]);
  // Find the selected case
  const selectedCase = cases.find((c) => c.id === selectedCaseId);

  // Get the user profile based on the selected case
  const userProfile = selectedCase && userProfiles[selectedCase.customer as keyof typeof userProfiles] 
    ? userProfiles[selectedCase.customer as keyof typeof userProfiles] 
    : userProfiles["Bob Johnson"]; // Default to Bob Johnson if no case selected

  return (
    <div className="w-full bg-white/70 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 flex flex-col overflow-hidden">
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
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{userProfile.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Name:</span>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{selectedCase?.customer || "Bob Johnson"}</span>
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
                  {userProfile.riskScore}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Registration:</span>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{userProfile.registration}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200/30 dark:border-emerald-800/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <label className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Account Balance</label>
            </div>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{userProfile.balance}</div>
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
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{userProfile.activity.bets}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Bets</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{userProfile.activity.deposits}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Deposits</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{userProfile.activity.withdrawals}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Withdrawals</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{userProfile.activity.logins}</div>
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
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{userProfile.recentActivity}</p>
          </div>
        </div>

        {/* Enhanced Similar Cases */}
        <div className="p-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200/30 dark:border-amber-800/30">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-300">Similar Cases</h3>
          </div>
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 text-amber-500 animate-spin mr-2" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Loading similar cases...</span>
              </div>
            ) : error ? (
              <div className="p-3 bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/50 dark:border-rose-800/30 rounded-lg text-center">
                <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
              </div>
            ) : similarCases.length === 0 ? (
              <div className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg border border-white/40 dark:border-slate-700/40">
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center">No similar cases found</p>
              </div>
            ) : (
              similarCases.map((similarCase) => (
                <div 
                  key={similarCase.id}
                  className="group p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer border border-white/40 dark:border-slate-700/40 hover:border-amber-200/50 dark:hover:border-amber-700/50 hover:shadow-lg hover:shadow-amber-500/10"
                  onClick={() => onSelectCase && onSelectCase(similarCase.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                          #{similarCase.id}: {similarCase.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {similarCase.customer} • {similarCase.amount} • {similarCase.date}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCase && onSelectCase(similarCase.id);
                      }}
                    >
                      <ArrowRight className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{ width: `${similarCase.similarity}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400 whitespace-nowrap">
                      {similarCase.similarity}%
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
