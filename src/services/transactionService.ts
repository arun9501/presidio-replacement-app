import { caseQueueService } from './caseQueueService';

export interface Transaction {
  transaction_id: number;
  case_id: number;
  timestamp: string;
  transaction_type: string;
  amount: string;
  balance: string;
  status: string;
  time?: string; // For UI display
}

export interface TransactionResponse {
  transactions: Transaction[];
  total: number;
}

// This service now redirects to the case queue service
// since transaction data is now coming from the api/v1/case-queue API
export const transactionService = {
  /**
   * Get transactions for a specific case
   * @deprecated Use caseQueueService.getCaseDetails instead
   */
  getTransactionsByCaseId: async (caseId: number): Promise<Transaction[]> => {
    try {
      // Get case details from case queue service which includes transactions
      const caseDetails = await caseQueueService.getCaseDetails(caseId);
      return caseDetails.transactions || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },

  /**
   * Get transactions with pagination and filters
   * @deprecated Use caseQueueService.getCaseDetails instead
   */
  getTransactions: async (
    page: number = 1, 
    limit: number = 10, 
    filters?: { 
      case_id?: number; 
      status?: string; 
      transaction_type?: string;
    }
  ): Promise<TransactionResponse> => {
    try {
      if (filters?.case_id) {
        // If case_id is provided, get transactions for that specific case
        const caseDetails = await caseQueueService.getCaseDetails(filters.case_id);
        const transactions = caseDetails.transactions || [];
        
        // Apply additional filters if needed
        const filtered = transactions.filter(tx => {
          if (filters?.status && tx.status !== filters.status) return false;
          if (filters?.transaction_type && tx.transaction_type !== filters.transaction_type) return false;
          return true;
        });
        
        return {
          transactions: filtered.slice((page - 1) * limit, page * limit),
          total: filtered.length
        };
      } else {
        // If no case_id is provided, we can't get transactions from the case queue API
        console.warn('No case_id provided for transaction filtering');
        return {
          transactions: [],
          total: 0
        };
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return {
        transactions: [],
        total: 0
      };
    }
  }
};