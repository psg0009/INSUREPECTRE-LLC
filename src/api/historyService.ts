// History service for storing and retrieving user history
// This includes chat history and quote history

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export type HistoryEntry = {
  _id?: string;
  userId?: string;
  type: 'chat' | 'quote';
  content: any;
  createdAt?: Date;
};

// Get all history entries
export const getUserHistory = async (): Promise<HistoryEntry[]> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_URL}/history`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch history');
    }
    
    return response.json();
  } catch (error) {
    console.error('History fetch error:', error);
    throw error;
  }
};

// Add a new history entry
export const addHistoryEntry = async (entry: Omit<HistoryEntry, 'userId' | 'createdAt'>): Promise<HistoryEntry> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_URL}/history`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add history entry');
    }
    
    return response.json();
  } catch (error) {
    console.error('Add history error:', error);
    throw error;
  }
};

// Get history by type
export const getHistoryByType = async (type: 'chat' | 'quote'): Promise<HistoryEntry[]> => {
  try {
    const allHistory = await getUserHistory();
    return allHistory.filter(entry => entry.type === type);
  } catch (error) {
    console.error(`History fetch error (type: ${type}):`, error);
    throw error;
  }
};

// Delete history entry
export const deleteHistoryEntry = async (entryId: string): Promise<void> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_URL}/history/${entryId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete history entry');
    }
  } catch (error) {
    console.error('Delete history error:', error);
    throw error;
  }
}; 