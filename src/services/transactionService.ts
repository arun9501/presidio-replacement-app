import api from './api';

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

// Fallback transaction data
const fallbackTransactions: Transaction[] = [
  {
    transaction_id: 1,
    case_id: 2,
    timestamp: '2025-03-25T11:59:00',
    transaction_type: 'Withdraw',
    amount: '- $3,096.42',
    balance: '$3,440.47',
    status: 'Failed',
    time: 'Mar 25, 2025, 11:59 AM'
  },
  {
    transaction_id: 2,
    case_id: 2,
    timestamp: '2025-03-25T11:53:00',
    transaction_type: 'Bet',
    amount: '- $936.85',
    balance: '$3,440.47',
    status: 'Disputed',
    time: 'Mar 25, 2025, 11:53 AM'
  },
  {
    transaction_id: 3,
    case_id: 2,
    timestamp: '2025-03-25T02:50:00',
    transaction_type: 'Deposit',
    amount: '+ $1,126.44',
    balance: '$4,377.32',
    status: 'Completed',
    time: 'Mar 25, 2025, 02:50 AM'
  },
  {
    transaction_id: 4,
    case_id: 2,
    timestamp: '2025-03-23T09:07:00',
    transaction_type: 'Bet',
    amount: '- $30.77',
    balance: '$3,250.88',
    status: 'Completed',
    time: 'Mar 23, 2025, 09:07 AM'
  },
  {
    transaction_id: 5,
    case_id: 2,
    timestamp: '2025-03-17T09:18:00',
    transaction_type: 'Withdraw',
    amount: '- $109.37',
    balance: '$3,281.65',
    status: 'Completed',
    time: 'Mar 17, 2025, 09:18 AM'
  }
];

// Helper function to format transaction data
const formatTransactions = (transactions: any[]): Transaction[] => {
  return transactions.map(tx => ({
    ...tx,
    amount: typeof tx.amount === 'number' 
      ? (tx.amount < 0 ? `- ${Math.abs(tx.amount).toFixed(2)}` : `+ ${tx.amount.toFixed(2)}`)
      : tx.amount,
    balance: typeof tx.balance === 'number'
      ? `${tx.balance.toFixed(2)}`
      : tx.balance,
    time: tx.timestamp ? new Date(tx.timestamp).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) : undefined
  }));
};

export const transactionService = {
  /**
   * Get transactions for a specific case
   */
  getTransactionsByCaseId: async (caseId: number): Promise<Transaction[]> => {
    try {
      // Using the /db/transactions endpoint with case_id filter
      const response = await api.get('/db/transactions', {
        params: {
          case_id: caseId,
          limit: 100
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        return formatTransactions(response.data);
      }
      
      // Return fallback data filtered by case ID
      return fallbackTransactions.filter(tx => tx.case_id === caseId);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Return fallback data filtered by case ID
      return fallbackTransactions.filter(tx => tx.case_id === caseId);
    }
  },

  /**
   * Get transactions with pagination and filters
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
      const params = { 
        offset: (page - 1) * limit,
        limit,
        ...filters
      };
      
      // Using the correct endpoint from the API docs
      const response = await api.get('/db/transactions', { params });
      
      if (response.data) {
        return {
          transactions: formatTransactions(response.data),
          total: response.data.length
        };
      }
      
      // Return fallback data
      const filtered = fallbackTransactions.filter(tx => {
        if (filters?.case_id && tx.case_id !== filters.case_id) return false;
        if (filters?.status && tx.status !== filters.status) return false;
        if (filters?.transaction_type && tx.transaction_type !== filters.transaction_type) return false;
        return true;
      });
      
      return {
        transactions: filtered.slice((page - 1) * limit, page * limit),
        total: filtered.length
      };
    } catch (error) {
      console.error('Error fetching transactions:', error);
      
      // Return fallback data
      const filtered = fallbackTransactions.filter(tx => {
        if (filters?.case_id && tx.case_id !== filters.case_id) return false;
        if (filters?.status && tx.status !== filters.status) return false;
        if (filters?.transaction_type && tx.transaction_type !== filters.transaction_type) return false;
        return true;
      });
      
      return {
        transactions: filtered.slice((page - 1) * limit, page * limit),
        total: filtered.length
      };
    }
  }
};