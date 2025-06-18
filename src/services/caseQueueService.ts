import api from "./api";
import { Case, cases } from "@/components/CaseDetail";

export interface CaseQueueResponse {
  cases: Case[];
  total: number;
}

export interface CaseDetailResponse {
  case: Case;
  transactions: any[];
  activity: {
    bets: number;
    deposits: number;
    withdrawals: number;
    logins: number;
  };
  timeline: {
    date: string;
    balance: number;
    betAmount: number;
    disputed: boolean;
  }[];
}

export const caseQueueService = {
  /**
   * Get all cases for the queue
   */
  getCases: async (
    page: number = 1,
    limit: number = 10,
    filters?: {
      status?: string;
      priority?: string;
      search?: string;
    }
  ): Promise<CaseQueueResponse> => {
    try {
      // Using the correct endpoint from the API docs
      const response = await api.get("/api/v1/case-queue", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data && Array.isArray(response.data.cases)) {
        // Store related_transactions in the case objects if available
        const casesWithTransactions = response.data.cases.map((caseItem: any) => {
          if (caseItem.related_transactions) {
            caseItem.transactions = caseItem.related_transactions;
          }
          return caseItem;
        });
        
        return {
          cases: casesWithTransactions,
          total: response.data.total || casesWithTransactions.length,
        };
      } else if (response.data && Array.isArray(response.data)) {
        // Handle case where API returns array directly
        const casesWithTransactions = response.data.map((caseItem: any) => {
          if (caseItem.related_transactions) {
            caseItem.transactions = caseItem.related_transactions;
          }
          return caseItem;
        });
        
        return {
          cases: casesWithTransactions,
          total: casesWithTransactions.length,
        };
      }

      // Fallback to static data if API response is not as expected
      return {
        cases: cases,
        total: cases.length,
      };
    } catch (error) {
      console.error("Error fetching cases:", error);
      // Return fallback data on error
      return {
        cases: cases,
        total: cases.length,
      };
    }
  },

  /**
   * Get case details including transactions and activity
   */
  getCaseDetails: async (caseId: number): Promise<CaseDetailResponse> => {
    try {
      // Using the correct API endpoint structure
      const response = await api.get(`/db/case/${caseId}/summary`);

      // Validate response data
      if (response.data) {
        // Map the API response to our expected format
        const caseData = response.data.case_info || response.data;
        const userData = response.data.user_info || {};

        // Format the case data to match our interface
        const formattedCase: Case = {
          id: caseData.case_id || caseId,
          title: caseData.case_type || "Untitled Case",
          customer: userData.name || `User ${userData.user_id || caseData.user_id}`,
          amount: caseData.amount ? (caseData.amount.toString().startsWith("$") ? caseData.amount : `${caseData.amount}`) : "$0",
          date: caseData.created_at ? new Date(caseData.created_at).toLocaleString() : new Date().toLocaleString(),
          priority: caseData.priority || "Medium",
          status: caseData.status || "Open",
        };

        // Format transactions from the API response
        // First check for related_transactions, then fall back to transactions
        const transactionsData = response.data.related_transactions || response.data.transactions || [];
        const formattedTransactions = transactionsData.map((tx: any) => ({
          transaction_id: tx.transaction_id,
          case_id: tx.case_id,
          timestamp: tx.timestamp,
          transaction_type: tx.transaction_type,
          amount: typeof tx.amount === "number" ? (tx.amount < 0 ? `- ${Math.abs(tx.amount).toFixed(2)}` : `+ ${tx.amount.toFixed(2)}`) : tx.amount,
          balance: typeof tx.balance === "number" ? `${tx.balance.toFixed(2)}` : tx.balance,
          status: tx.status,
          time: tx.timestamp
            ? new Date(tx.timestamp).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : undefined,
        }));

        return {
          case: formattedCase,
          transactions: formattedTransactions,
          activity: response.data.activities
            ? {
                bets: response.data.activities.filter((a: any) => a.activity_type === "bet").length || 0,
                deposits: response.data.activities.filter((a: any) => a.activity_type === "deposit").length || 0,
                withdrawals: response.data.activities.filter((a: any) => a.activity_type === "withdraw").length || 0,
                logins: response.data.activities.filter((a: any) => a.activity_type === "login").length || 0,
              }
            : {
                bets: 0,
                deposits: 0,
                withdrawals: 0,
                logins: 0,
              },
          timeline: response.data.timeline || [],
        };
      }

      // If API doesn't return expected data, create a fallback from static data
      const fallbackCase = cases.find((c) => c.id === caseId);
      if (fallbackCase) {
        return {
          case: fallbackCase,
          transactions: [],
          activity: {
            bets: 0,
            deposits: 0,
            withdrawals: 0,
            logins: 0,
          },
          timeline: [],
        };
      }
      throw new Error("Invalid response data and no fallback available");
    } catch (error) {
      console.error(`Error fetching case details for case ${caseId}:`, error);

      // Create fallback from static data
      const fallbackCase = cases.find((c) => c.id === caseId);
      if (fallbackCase) {
        return {
          case: fallbackCase,
          transactions: [],
          activity: {
            bets: 0,
            deposits: 0,
            withdrawals: 0,
            logins: 0,
          },
          timeline: [],
        };
      }

      throw error;
    }
  },

  /**
   * Get transactions for a specific case
   */
  getTransactions: async (caseId: number): Promise<any[]> => {
    try {
      // First try to get transactions from the case-queue API
      try {
        const caseQueueResponse = await api.get(`/api/v1/case-queue`);
        if (caseQueueResponse.data) {
          // Find the case with matching ID
          const cases = Array.isArray(caseQueueResponse.data.cases) 
            ? caseQueueResponse.data.cases 
            : Array.isArray(caseQueueResponse.data) 
              ? caseQueueResponse.data 
              : [];
          
          const matchingCase = cases.find((c: any) => c.id === caseId || c.case_id === caseId);
          
          if (matchingCase && matchingCase.related_transactions && Array.isArray(matchingCase.related_transactions)) {
            return matchingCase.related_transactions;
          }
        }
      } catch (caseQueueError) {
        console.error(`Error fetching case-queue for transactions: ${caseQueueError}`);
        // Continue to fallback method if this fails
      }
      
      // Fallback to the original endpoint if case-queue doesn't have the data
      const response = await api.get(`/db/transaction-sequence/${caseId}`);

      if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && response.data.transactions && Array.isArray(response.data.transactions)) {
        return response.data.transactions;
      } else if (response.data && response.data.related_transactions && Array.isArray(response.data.related_transactions)) {
        return response.data.related_transactions;
      }

      return [];
    } catch (error) {
      console.error(`Error fetching transactions for case ${caseId}:`, error);
      return [];
    }
  },

  /**
   * Get similar cases for a specific case
   */
  getSimilarCases: async (caseId: number): Promise<Case[]> => {
    try {
      // Using the correct API endpoint structure
      const response = await api.get(`/db/cases/${caseId}/similar`);

      if (response.data && Array.isArray(response.data.similar_cases)) {
        return response.data.similar_cases;
      } else if (response.data && Array.isArray(response.data)) {
        return response.data;
      }

      return [];
    } catch (error) {
      console.error(`Error fetching similar cases for case ${caseId}:`, error);
      return [];
    }
  },
};
