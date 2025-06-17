
import React, { useState } from 'react';
import CaseQueue from '@/components/CaseQueue';
import CaseDetail from '@/components/CaseDetail';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(2);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AC</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">AutoCaseAI: Dispute resolution</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        <CaseQueue selectedCase={selectedCase} onSelectCase={setSelectedCase} />
        <CaseDetail caseId={selectedCase} />
        <UserProfile />
      </div>
    </div>
  );
};

export default Index;
