import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SimilarCase, similarCasesService } from '@/services/similarCasesService';

interface SimilarCasesProps {
  caseId: number | null;
  onSelectCase: (caseId: number) => void;
}

const SimilarCases: React.FC<SimilarCasesProps> = ({ caseId, onSelectCase }) => {
  const [similarCases, setSimilarCases] = useState<SimilarCase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (caseId) {
      setIsLoading(true);
      setError(null);
      
      similarCasesService.getSimilarCases(caseId)
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
  }, [caseId]);

  if (!caseId) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold bg-gradient-to-r from-amber-700 to-orange-700 dark:from-amber-300 dark:to-orange-300 bg-clip-text text-transparent mb-4">
        Similar Cases
      </h3>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 text-amber-500 animate-spin mr-2" />
          <span className="text-slate-600 dark:text-slate-400">Loading similar cases...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/50 dark:border-rose-800/30 rounded-xl text-center">
          <p className="text-rose-600 dark:text-rose-400">{error}</p>
        </div>
      ) : similarCases.length === 0 ? (
        <div className="p-4 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/30 rounded-xl text-center">
          <p className="text-slate-600 dark:text-slate-400">No similar cases found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {similarCases.map(similarCase => (
            <div 
              key={similarCase.id}
              className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/30 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectCase(similarCase.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="font-medium text-slate-900 dark:text-slate-200">
                      #{similarCase.id}: {similarCase.title}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {similarCase.customer} • {similarCase.amount} • {similarCase.date}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{ width: `${similarCase.similarity}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                      {similarCase.similarity}% match
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {similarCase.matchReason}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    onSelectCase(similarCase.id);
                  }}
                >
                  <ArrowRight className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarCases;