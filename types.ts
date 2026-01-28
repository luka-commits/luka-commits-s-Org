
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  DEMO_MODE = 'DEMO_MODE',
  MEETING_PREP = 'MEETING_PREP',
  CLIENT_INTEL = 'CLIENT_INTEL',
  INDUSTRY_INTEL = 'INDUSTRY_INTEL',
  POST_MEETING = 'POST_MEETING'
}

export enum Priority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM'
}

export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE'
}

export interface EmailAnalysis {
  priority: Priority;
  sentiment: Sentiment;
  summary: string[];
  suggestedAction: string;
  responseTime: string;
  category: string;
}

export interface MockEmail {
  id: string;
  from: string;
  company: string;
  subject: string;
  time: string;
  analysis: EmailAnalysis;
}

export interface Meeting {
  id: string;
  time: string;
  title: string;
  participants: string[];
  context: string;
  priority: Priority;
}
