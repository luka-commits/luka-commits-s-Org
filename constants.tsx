
import React from 'react';
import { Priority, Sentiment, MockEmail, Meeting } from './types';

export const COLORS = {
  accenturePurple: '#A100FF',
  critical: '#EF4444',
  high: '#F97316',
  medium: '#EAB308',
  bgGray: '#F8FAFC'
};

export const MOCK_EMAILS: MockEmail[] = [
  {
    id: '1',
    from: 'Dr. Michael Schmidt',
    company: 'BMW Group',
    subject: 'Urgent: Q1 Strategy Review - Reschedule needed',
    time: 'Yesterday, 18:23',
    analysis: {
      priority: Priority.CRITICAL,
      sentiment: Sentiment.NEUTRAL,
      summary: [
        'Meeting reschedule request from BMW CIO',
        'Conflict on Jan 27th',
        'Proposes 3 alternative dates next week'
      ],
      suggestedAction: 'Respond with availability from calendar',
      responseTime: '< 1 hour',
      category: 'Client Urgent'
    }
  },
  {
    id: '2',
    from: 'Sarah Jenkins',
    company: 'Accenture Internal',
    subject: 'Staffing Approval: Project Apollo',
    time: 'Today, 08:45',
    analysis: {
      priority: Priority.HIGH,
      sentiment: Sentiment.POSITIVE,
      summary: [
        'Request for 2 additional Senior Analysts',
        'Budget already pre-cleared by Finance',
        'Urgent kickoff on Monday'
      ],
      suggestedAction: 'Approve via Workday or reply with Go',
      responseTime: 'Today',
      category: 'Internal Approval'
    }
  },
  {
    id: '3',
    from: 'Thomas Müller',
    company: 'Siemens AG',
    subject: 'Follow-up on IoT Workshop',
    time: 'Today, 09:12',
    analysis: {
      priority: Priority.MEDIUM,
      sentiment: Sentiment.POSITIVE,
      summary: [
        'Feedback on yesterday\'s session was excellent',
        'Requesting final proposal by Friday',
        'Wants to discuss Cloud security separately'
      ],
      suggestedAction: 'Delegate proposal draft to team lead',
      responseTime: '24 hours',
      category: 'Client Follow-up'
    }
  }
];

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 'm1',
    time: '09:00 - 10:00',
    title: 'BMW Q1 Strategy Review',
    participants: ['Dr. Michael Schmidt (CIO)', 'Anna Müller (Head of Digital)'],
    context: 'Last met Jan 5th. Action items: Cloud POC feasibility.',
    priority: Priority.CRITICAL
  },
  {
    id: 'm2',
    time: '11:30 - 12:00',
    title: 'Internal Staffing Sync',
    participants: ['Sarah Jenkins', 'Global HR Lead'],
    context: 'Project Apollo resource allocation.',
    priority: Priority.HIGH
  },
  {
    id: 'm3',
    time: '14:00 - 15:30',
    title: 'Siemens IoT Deep Dive',
    participants: ['Thomas Müller', 'Tech Team'],
    context: 'Follow-up on Digital Twin workshop.',
    priority: Priority.MEDIUM
  }
];
