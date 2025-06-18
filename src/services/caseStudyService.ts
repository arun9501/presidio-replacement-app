import api from './api';
import { Case } from '@/components/CaseDetail';

export interface CaseSummaryResponse {
  summary: {
    case_metadata: {
      case_id: number;
      case_type: string;
      user_name: string;
      amount: number;
      status: string;
      priority: string;
    };
    case_analysis_summary: {
      summary_points: string[];
    };
    risk_assessment: {
      risk_score_percent: number;
      risk_level: string;
      risk_reason: string;
      device_trust_score: {
        label: string;
        value: number;
      };
      behavioral_match: {
        label: string;
        value: number;
      };
      transaction_pattern: string;
    };
    recommended_actions: {
      action: string;
      description: string;
      type: string;
    }[];
  };
}

export interface CaseAnalysisResponse {
  summary: {
    points: string[];
  };
  riskAssessment: {
    score: number;
    level: string;
    deviceTrustScore: number;
    behavioralMatch: number;
    transactionPattern: string;
  };
  recommendations: {
    action: string;
    description: string;
    type: 'approve' | 'security' | 'monitor';
  }[];
}

export const caseStudyService = {
  /**
   * Generate a case study analysis
   */
  generateCaseStudy: async (caseData: Case): Promise<CaseAnalysisResponse> => {
    try {
      const response = await api.post('/case-analysis', { caseData });
      return response.data;
    } catch (error) {
      console.error('Error generating case study:', error);
      // Return fallback data if API fails
      return getFallbackAnalysis(caseData);
    }
  },
  
  /**
   * Get case summary from the API
   */
  getCaseSummary: async (caseId: number): Promise<CaseSummaryResponse> => {
    try {
      // Increase timeout for this specific request
      const response = await api.get(`/api/v1/case/${caseId}/summary`, {
        timeout: 30000, // 30 seconds timeout
      });
      console.log('Case summary API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching case summary:', error);
      throw error;
    }
  },
  
  /**
   * Convert the new API response format to the existing format used by the UI
   */
  convertSummaryToAnalysis: (summary: CaseSummaryResponse): CaseAnalysisResponse => {
    return {
      summary: {
        points: summary.summary.case_analysis_summary.summary_points || []
      },
      riskAssessment: {
        score: summary.summary.risk_assessment.risk_score_percent,
        level: summary.summary.risk_assessment.risk_level,
        deviceTrustScore: summary.summary.risk_assessment.device_trust_score.value,
        behavioralMatch: summary.summary.risk_assessment.behavioral_match.value,
        transactionPattern: summary.summary.risk_assessment.transaction_pattern
      },
      recommendations: summary.summary.recommended_actions.map(rec => ({
        action: rec.action,
        description: rec.description,
        type: rec.type === 'primary' ? 'approve' : 
              rec.type === 'secondary' ? 'security' : 'monitor'
      }))
    };
  }
};

// Fallback data in case API fails
function getFallbackAnalysis(caseData: Case): CaseAnalysisResponse {
  return {
    summary: {
      points: [
        `The transaction in question (${caseData.amount}) was flagged due to unusual activity patterns that deviate from ${caseData.customer}'s normal behavior.`,
        'Transaction occurred from an unrecognized device and IP address not previously associated with this account.',
        'The timing of the transaction (late night) does not match the customer\'s typical usage patterns.'
      ]
    },
    riskAssessment: {
      score: 78,
      level: 'High',
      deviceTrustScore: 23,
      behavioralMatch: 18,
      transactionPattern: 'Anomalous'
    },
    recommendations: [
      {
        action: 'Approve Chargeback',
        description: 'Evidence strongly supports customer\'s claim of unauthorized transaction',
        type: 'approve'
      },
      {
        action: 'Enable Additional Security',
        description: 'Recommend two-factor authentication for future transactions',
        type: 'security'
      }
    ]
  };
}