import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle, AlertCircle, BarChart2, FileText, ArrowRight } from 'lucide-react';
import { Case } from './CaseDetail';

interface CaseStudyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCase: Case | null;
}

const CaseStudyDialog: React.FC<CaseStudyDialogProps> = ({ isOpen, onClose, selectedCase }) => {
  const [analysisStage, setAnalysisStage] = useState<number>(0);
  const [showReport, setShowReport] = useState<boolean>(false);

  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      setAnalysisStage(0);
      setShowReport(false);
      
      // Simulate analysis progress
      const timer1 = setTimeout(() => setAnalysisStage(1), 1500);
      const timer2 = setTimeout(() => setAnalysisStage(2), 3000);
      const timer3 = setTimeout(() => setAnalysisStage(3), 4500);
      const timer4 = setTimeout(() => {
        setAnalysisStage(4);
        setShowReport(true);
      }, 6000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isOpen]);

  if (!selectedCase) return null;

  const analysisSteps = [
    { 
      title: "Analyzing Transaction Data", 
      description: "Examining transaction patterns and user behavior...",
      icon: BarChart2,
      color: "text-blue-500"
    },
    { 
      title: "Evaluating Risk Factors", 
      description: "Calculating risk score based on account activity...",
      icon: AlertCircle,
      color: "text-orange-500"
    },
    { 
      title: "Generating Recommendations", 
      description: "Creating action items and resolution steps...",
      icon: FileText,
      color: "text-emerald-500"
    },
    { 
      title: "Finalizing Report", 
      description: "Compiling findings into comprehensive analysis...",
      icon: CheckCircle,
      color: "text-violet-500"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-0 max-w-5xl w-[98vw] sm:w-[95vw] max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="p-5 sm:p-7 border-b border-white/30 dark:border-slate-700/50 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/30 flex-shrink-0">
          <DialogTitle className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-300 dark:to-purple-300 bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-violet-500" />
            AI Case Study Generator
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600 dark:text-slate-400">
            Analyzing case #{selectedCase.id}: {selectedCase.title} for {selectedCase.customer}
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {!showReport ? (
            <div className="flex flex-col items-center justify-center py-4 sm:py-6">
              <div className="w-full max-w-md">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center animate-pulse">
                    <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {analysisSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isActive = analysisStage >= index;
                    const isCurrentStep = analysisStage === index;
                    
                    return (
                      <div 
                        key={index} 
                        className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/70 dark:bg-slate-800/70 border border-white/30 dark:border-slate-700/50 shadow-lg' 
                            : 'opacity-50'
                        }`}
                      >
                        <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center ${isActive ? step.color : 'text-slate-400'}`}>
                          <StepIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${isCurrentStep ? 'animate-pulse' : ''}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm sm:text-base text-slate-900 dark:text-slate-100">{step.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
                        </div>
                        {isActive && index < analysisStage && (
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-5">
              <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/30 dark:border-slate-700/50 p-3 sm:p-5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">Case Analysis Summary</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 mt-0.5 text-violet-500 flex-shrink-0">
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      The transaction in question ({selectedCase.amount}) was flagged due to unusual activity patterns that deviate from {selectedCase.customer}'s normal behavior.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 mt-0.5 text-violet-500 flex-shrink-0">
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Transaction occurred from an unrecognized device and IP address not previously associated with this account.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 mt-0.5 text-violet-500 flex-shrink-0">
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      The timing of the transaction (late night) does not match the customer's typical usage patterns.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/30 dark:border-slate-700/50 p-3 sm:p-5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">Risk Assessment</h2>
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/70 dark:to-amber-900/70 flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-orange-700 dark:text-orange-300">78%</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-slate-900 dark:text-slate-100">High Probability of Fraud</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Based on behavioral analysis and transaction patterns</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Device Trust Score:</span>
                    <span className="font-medium text-red-600 dark:text-red-400">Low (23/100)</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Behavioral Match:</span>
                    <span className="font-medium text-red-600 dark:text-red-400">Poor (18/100)</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Transaction Pattern:</span>
                    <span className="font-medium text-red-600 dark:text-red-400">Anomalous</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/30 dark:border-slate-700/50 p-3 sm:p-5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">Recommended Actions</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-lg border border-emerald-200/50 dark:border-emerald-800/30">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base text-emerald-800 dark:text-emerald-300">Approve Chargeback</h4>
                      <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400">Evidence strongly supports customer's claim of unauthorized transaction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-lg border border-blue-200/50 dark:border-blue-800/30">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base text-blue-800 dark:text-blue-300">Enable Additional Security</h4>
                      <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-400">Recommend two-factor authentication for future transactions</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button 
                  onClick={onClose}
                  size="sm"
                  className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 rounded-xl"
                >
                  Close Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyDialog;