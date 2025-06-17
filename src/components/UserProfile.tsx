
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

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
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">User Profile</h2>
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </div>

      {/* User Info */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">User ID:</label>
          <p className="text-sm text-gray-900">2</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Name:</label>
          <p className="text-sm text-gray-900">Bob Johnson</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Registration:</label>
          <p className="text-sm text-gray-900">21/02/2025</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Account Status:</label>
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            active
          </span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Risk Score:</label>
          <p className="text-sm text-orange-600 font-medium">68/100 (Medium)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Balance:</label>
          <p className="text-sm text-gray-900 font-medium">$3440.47</p>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Activity (Last 30 Days)</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Bets:</span>
            <span className="text-sm text-gray-900">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Deposits:</span>
            <span className="text-sm text-gray-900">1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Withdrawals:</span>
            <span className="text-sm text-gray-900">2</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Logins:</span>
            <span className="text-sm text-gray-900">27</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            Customer reported unauthorized transaction from unknown device. 
            Customer stated: 'I did not make this bet, I was not even using my account at that time.'
          </p>
        </div>
      </div>

      {/* Similar Cases */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Similar Cases</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium text-gray-900">{activity.case}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'Open' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {activity.status}
                </span>
              </div>
              <p className="text-xs text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
