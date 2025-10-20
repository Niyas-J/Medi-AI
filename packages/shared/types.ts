// TypeScript types for Firestore schemas and API responses

export interface User {
  uid: string;
  email: string;
  role: 'patient' | 'clinician' | 'admin';
  createdAt: Date;
  profile?: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: string;
  };
}

export interface MLResult {
  id: string;
  userId: string;
  result: {
    wound_size: number;
    infection_score: number;
    abnormality: string;
    recommendations: string[];
    severity: 'low' | 'medium' | 'high';
    confidence: number;
  };
  timestamp: Date;
  imageUrl: string;
}

export interface Scan {
  id: string;
  userId: string;
  code: string;
  metadata: {
    name: string;
    dosage: string;
    manufacturer: string;
    expiry_date: string;
    instructions: string;
    side_effects: string[];
    interactions: string[];
    warnings: string[];
  };
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Emergency {
  id: string;
  userId: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  status: 'active' | 'resolved';
  type: 'medical_emergency' | 'fall' | 'cardiac' | 'other';
}

export interface Appointment {
  id: string;
  userId: string;
  type: 'General Checkup' | 'Follow-up' | 'Emergency' | 'Specialist';
  date: Date;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  notes?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
