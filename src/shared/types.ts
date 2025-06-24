// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'author' | 'researcher' | 'both';
  subscription: SubscriptionTier;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionTier {
  name: 'free' | 'pro' | 'team' | 'enterprise';
  aiCreditsMonthly: number;
  features: string[];
  priceUsd: number;
}

// Document Types
export interface Document {
  id: string;
  title: string;
  content: string;
  type: 'novel' | 'non-fiction' | 'research-paper' | 'dissertation' | 'article';
  userId: string;
  collaborators: string[];
  version: number;
  createdAt: Date;
  updatedAt: Date;
  metadata: DocumentMetadata;
}

export interface DocumentMetadata {
  wordCount: number;
  language: string;
  genre?: string;
  subject?: string;
  citationStyle?: 'apa' | 'mla' | 'chicago' | 'ieee' | 'harvard';
  tags: string[];
}

// AI Service Types
export interface AIRequest {
  id: string;
  userId: string;
  service: AIServiceType;
  prompt: string;
  parameters: Record<string, any>;
  response?: string;
  costUsd: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export type AIServiceType = 
  | 'plot-builder'
  | 'character-generator'
  | 'cover-designer'
  | 'citation-manager'
  | 'literature-review'
  | 'fact-checker'
  | 'grammar-checker'
  | 'text-to-speech'
  | 'plagiarism-checker'
  | 'bias-detector';

// Citation Types
export interface Citation {
  id: string;
  type: 'book' | 'journal' | 'website' | 'conference' | 'thesis';
  title: string;
  authors: string[];
  year: number;
  publisher?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  accessDate?: Date;
}

// Collaboration Types
export interface Collaboration {
  documentId: string;
  participants: Participant[];
  permissions: Permission[];
  lastActivity: Date;
}

export interface Participant {
  userId: string;
  role: 'owner' | 'editor' | 'commenter' | 'viewer';
  joinedAt: Date;
}

export interface Permission {
  userId: string;
  canEdit: boolean;
  canComment: boolean;
  canShare: boolean;
  canExport: boolean;
}

// Export Types
export interface ExportRequest {
  documentId: string;
  format: 'pdf' | 'epub' | 'docx' | 'latex' | 'html';
  options: ExportOptions;
}

export interface ExportOptions {
  includeComments?: boolean;
  includeCitations?: boolean;
  includeImages?: boolean;
  paperSize?: 'letter' | 'a4' | 'legal';
  margins?: string;
  fontSize?: number;
  fontFamily?: string;
}

// Vector Database Types
export interface VectorDocument {
  id: string;
  content: string;
  embedding: number[];
  metadata: {
    documentId: string;
    chunkIndex: number;
    source: string;
    timestamp: Date;
  };
}

// Error Types
export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

// Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
} 