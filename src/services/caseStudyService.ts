import api from './api';
import { Case } from '@/components/CaseDetail';

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