import api from "./api";
import { Case, cases } from "@/components/CaseDetail";

export interface CaseQueueResponse {
  cases: Case[];
  total: number;
}

export interface UserInfo {
  user_id: number;
  name: string;
  registration_date: string;
  risk_score: string;
  balance: string;
  activity?: {
    bets: number;
    deposits: number;
    withdrawals: number;
    logins: number;
  };
  recent_activity?: string;
}

export interface CaseDetailResponse {
  case: Case;
  user_info: UserInfo;
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

// Cache for storing case details to prevent repeated API calls
const caseDetailsCache: Record<number, CaseDetailResponse> = {};

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
   * Uses a cache to prevent repeated API calls for the same case
   */
  getCaseDetails: async (caseId: number): Promise<CaseDetailResponse> => {
    // Return cached data if available
    if (caseDetailsCache[caseId]) {
      console.log(`Using cached data for case ${caseId}`);
      return caseDetailsCache[caseId];
    }
    
    try {
      // First try to get case data from the case-queue API to use related_transactions
      try {
        const caseQueueResponse = await api.get("/api/v1/case-queue");
        if (caseQueueResponse.data) {
          // Find the case with matching ID
          const cases = Array.isArray(caseQueueResponse.data.cases) 
            ? caseQueueResponse.data.cases 
            : Array.isArray(caseQueueResponse.data) 
              ? caseQueueResponse.data 
              : [];
          
          const matchingCase = cases.find((c: any) => c.id === caseId || c.case_id === caseId);
          
          if (matchingCase) {
            // Format the case data
            const formattedCase: Case = {
              id: matchingCase.id || matchingCase.case_id || caseId,
              title: matchingCase.title || matchingCase.case_type || "Untitled Case",
              customer: matchingCase.customer || `User ${matchingCase.user_id || caseId}`,
              amount: typeof matchingCase.amount === 'string' 
                ? matchingCase.amount 
                : typeof matchingCase.amount === 'number'
                  ? `${matchingCase.amount.toFixed(2)}`
                  : "$0",
              date: matchingCase.date || new Date().toLocaleString(),
              priority: matchingCase.priority || "Medium",
              status: matchingCase.status || "Open",
            };
            
            // Format transactions from related_transactions
            const transactionsData = matchingCase.related_transactions || [];
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
            
            // Extract user info from the case data
            const userInfo: UserInfo = {
              user_id: matchingCase.user_id || caseId,
              name: matchingCase.customer || `User ${matchingCase.user_id || caseId}`,
              registration_date: matchingCase.registration_date || new Date().toLocaleDateString(),
              risk_score: matchingCase.risk_score || "50/100 (Medium)",
              balance: matchingCase.balance || "$0.00",
              activity: matchingCase.activity || {
                bets: 0,
                deposits: 0,
                withdrawals: 0,
                logins: 0,
              },
              recent_activity: matchingCase.recent_activity || ""
            };
            
            // Create sample activity data
            const sampleActivity = {
              bets: Math.floor(Math.random() * 5) + 1,
              deposits: Math.floor(Math.random() * 3) + 1,
              withdrawals: Math.floor(Math.random() * 2) + 1,
              logins: Math.floor(Math.random() * 10) + 5,
            };
            
            // Create sample timeline data
            const sampleTimeline = [
              { date: 'Feb 8', balance: 900, betAmount: 0, disputed: false },
              { date: 'Feb 10', balance: 950, betAmount: 0, disputed: false },
              { date: 'Mar 17', balance: 1000, betAmount: 0, disputed: false },
              { date: 'Mar 23', balance: 1050, betAmount: 0, disputed: false },
              { date: 'Mar 25', balance: 1000, betAmount: 900, disputed: true }
            ];
            
            const result = {
              case: formattedCase,
              user_info: userInfo,
              transactions: formattedTransactions,
              activity: sampleActivity,
              timeline: sampleTimeline,
            };
            
            // Cache the result
            caseDetailsCache[caseId] = result;
            return result;
          }
        }
      } catch (caseQueueError) {
        console.error(`Error fetching case-queue for case details: ${caseQueueError}`);
        // Continue to fallback method if this fails
      }
      
      // Fallback to the original endpoint if case-queue doesn't have the data
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
          amount: typeof caseData.amount === 'string'
            ? (caseData.amount.startsWith("$") ? caseData.amount : `${caseData.amount}`)
            : typeof caseData.amount === 'number'
              ? `${caseData.amount.toFixed(2)}`
              : "$0",
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

        // Extract user info from the API response
        const userInfo: UserInfo = {
          user_id: userData.user_id || caseData.user_id || caseId,
          name: userData.name || `User ${userData.user_id || caseData.user_id}`,
          registration_date: userData.registration_date || caseData.registration_date || new Date().toLocaleDateString(),
          risk_score: userData.risk_score || "50/100 (Medium)",
          balance: userData.balance || "$0.00",
          activity: userData.activity || {
            bets: 0,
            deposits: 0,
            withdrawals: 0,
            logins: 0,
          },
          recent_activity: userData.recent_activity || ""
        };
        
        const result = {
          case: formattedCase,
          user_info: userInfo,
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
        
        // Cache the result
        caseDetailsCache[caseId] = result;
        return result;
      }

      // If API doesn't return expected data, create a fallback from static data
      const fallbackCase = cases.find((c) => c.id === caseId);
      if (fallbackCase) {
        // Create fallback user info based on the customer name
        const userInfo: UserInfo = {
          user_id: fallbackCase.id,
          name: fallbackCase.customer,
          registration_date: new Date().toLocaleDateString(),
          risk_score: "50/100 (Medium)",
          balance: fallbackCase.amount || "$0.00",
          activity: {
            bets: 0,
            deposits: 0,
            withdrawals: 0,
            logins: 0,
          },
          recent_activity: ""
        };
        
        // Create sample activity data for fallback
        const sampleActivity = {
          bets: Math.floor(Math.random() * 5) + 1,
          deposits: Math.floor(Math.random() * 3) + 1,
          withdrawals: Math.floor(Math.random() * 2) + 1,
          logins: Math.floor(Math.random() * 10) + 5,
        };
        
        // Create sample timeline data for fallback
        const sampleTimeline = [
          { date: 'Feb 8', balance: 900, betAmount: 0, disputed: false },
          { date: 'Feb 10', balance: 950, betAmount: 0, disputed: false },
          { date: 'Mar 17', balance: 1000, betAmount: 0, disputed: false },
          { date: 'Mar 23', balance: 1050, betAmount: 0, disputed: false },
          { date: 'Mar 25', balance: 1000, betAmount: 900, disputed: true }
        ];
        
        const result = {
          case: fallbackCase,
          user_info: userInfo,
          transactions: [],
          activity: sampleActivity,
          timeline: sampleTimeline,
        };
        
        // Cache the result
        caseDetailsCache[caseId] = result;
        return result;
      }
      throw new Error("Invalid response data and no fallback case found");
    } catch (error) {
      console.error(`Error fetching case details for case ${caseId}:`, error);
      throw error;
    }
  },
  
  /**
   * Clear the case details cache for a specific case or all cases
   */
  clearCache: (caseId?: number) => {
    if (caseId !== undefined) {
      delete caseDetailsCache[caseId];
    } else {
      // Clear all cache
      Object.keys(caseDetailsCache).forEach(key => {
        delete caseDetailsCache[Number(key)];
      });
    }
  },

};
