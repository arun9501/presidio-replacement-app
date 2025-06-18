import api from './api';
import { Case } from '@/components/CaseDetail';

export interface SimilarCase extends Case {
  similarity: number; // Similarity score (0-100)
  matchReason: string; // Reason for the match
}

// Fallback similar cases data
const fallbackSimilarCases: Record<number, SimilarCase[]> = {
  // Similar cases for case ID 2
  2: [
    {
      id: 3,
      title: 'Unauthorized Transaction',
      customer: 'Xavier Brown',
      amount: '$1000',
      date: 'Apr 07, 2025, 08:42 AM',
      priority: 'High',
      status: 'Open',
      similarity: 92,
      matchReason: 'Similar transaction pattern and amount'
    },
    {
      id: 4,
      title: 'Unauthorized Transaction',
      customer: 'Jason Parker',
      amount: '$100',
      date: 'Mar 30, 2025, 09:35 AM',
      priority: 'Urgent',
      status: 'Open',
      similarity: 78,
      matchReason: 'Similar transaction type and timeframe'
    }
  ],
  // Similar cases for case ID 1
  1: [
    {
      id: 5,
      title: 'Payment Dispute',
      customer: 'Emily Rodriguez',
      amount: '$150',
      date: 'Jan 16, 2025, 09:28 AM',
      priority: 'Medium',
      status: 'Open',
      similarity: 85,
      matchReason: 'Similar dispute reason and customer profile'
    },
    {
      id: 6,
      title: 'Payment Dispute',
      customer: 'George Sanders',
      amount: '$297.31',
      date: 'Nov 04, 2024, 10:06 AM',
      priority: 'Low',
      status: 'Resolved',
      similarity: 70,
      matchReason: 'Similar dispute type and resolution path'
    }
  ]
};

export const similarCasesService = {
  /**
   * Get similar cases for a specific case ID
   */
  getSimilarCases: async (caseId: number): Promise<SimilarCase[]> => {
    try {
      // Using the correct endpoint from the API docs
      const response = await api.get(`/cases/${caseId}/similar`);
      
      if (response.data && Array.isArray(response.data.similar_cases)) {
        return response.data.similar_cases;
      }
      
      // Return fallback data for the specific case ID
      return fallbackSimilarCases[caseId] || [];
    } catch (error) {
      console.error('Error fetching similar cases:', error);
      // Return fallback data for the specific case ID
      return fallbackSimilarCases[caseId] || [];
    }
  }
};