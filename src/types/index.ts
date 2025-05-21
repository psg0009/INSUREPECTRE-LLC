export interface User {
  id: string;
  email: string;
  fullName: string;
  university?: string;
  studentId?: string;
  documents: Document[];
  preferences: UserPreferences;
}

export interface Document {
  id: string;
  type: 'passport' | 'i20' | 'insurance' | 'sim' | 'ssn' | 'other';
  name: string;
  url: string;
  expiryDate?: Date;
  metadata: Record<string, any>;
}

export interface UserPreferences {
  budgetRange: {
    min: number;
    max: number;
  };
  locationPreferences: string[];
  notificationSettings: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  documentAlerts: boolean;
  travelAlerts: boolean;
}

export interface ServiceRecommendation {
  id: string;
  type: 'insurance' | 'phone' | 'banking' | 'housing' | 'travel' | 'legal';
  provider: string;
  plan: string;
  cost: number;
  features: string[];
  rating: number;
  reviews: number;
  link: string;
}

export interface RelocationTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  category: 'housing' | 'documentation' | 'utilities' | 'transportation' | 'other';
}

export interface TravelOption {
  id: string;
  type: 'bus' | 'carpool' | 'shuttle';
  provider: string;
  departure: {
    location: string;
    time: Date;
  };
  arrival: {
    location: string;
    time: Date;
  };
  price: number;
  availableSeats: number;
  rating?: number;
}

export interface Grant {
  id: string;
  name: string;
  amount: number;
  deadline: Date;
  eligibility: string[];
  requirements: string[];
  applicationUrl: string;
  category: 'academic' | 'research' | 'cultural' | 'needBased' | 'merit';
}

export interface MicroTask {
  id: string;
  title: string;
  description: string;
  payment: number;
  duration: string;
  location: string;
  category: 'flyer' | 'survey' | 'tutoring' | 'moving' | 'other';
  status: 'open' | 'assigned' | 'completed';
  postedBy: string;
} 