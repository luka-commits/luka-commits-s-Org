
import React from 'react';
import { MOCK_EMAILS, MOCK_MEETINGS, COLORS } from '../constants';
import { Priority, Sentiment, MockEmail } from '../types';

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const styles = {
    [Priority.CRITICAL]: 'bg-red-100 text-red-700 border-red-200',
    [Priority.HIGH]: 'bg-orange-100 text-orange-700 border-orange-200',
    [Priority.MEDIUM]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${styles[priority]}`}>
      {priority}
    </span>
  );
};

const DemoMode: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <header className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Morning Brief</h2>
          <p className="text-slate-500 font-medium">Saturday, January 25, 2026</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-slate-100 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5l-2.5-2.5 1.5-1.5L12 13.5l3.5-3.5 1.5 1.5z"/></svg>
            12 Emails Analyzed
          </div>
          <div className="bg-slate-100 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            6 Meetings Today
          </div>
        </div>
      </header>

      <section>
        <div className="flex items-center gap-2 mb-6 text-slate-400 font-semibold uppercase text-xs tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Gestern - Quick Recap
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1 flex-shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">BMW Project phase 1 approved by CIO. Proposal draft due Monday.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1 flex-shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">Siemens workshop successfully delivered. Follow-up meeting scheduled for next week.</p>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6 text-slate-400 font-semibold uppercase text-xs tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Heute - Deine Meetings
        </div>
        <div className="space-y-4">
          {MOCK_MEETINGS.map((meeting) => (
            <div key={meeting.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-slate-900">{meeting.time}</span>
                  <PriorityBadge priority={meeting.priority} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{meeting.title}</h4>
                <p className="text-xs text-slate-500 mb-3">Participants: {meeting.participants.join(', ')}</p>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-600 italic">
                  &ldquo;{meeting.context}&rdquo;
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">View Prep</button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">Join Teams</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-slate-400 font-semibold uppercase text-xs tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> 📧 Email Intelligence
          </div>
          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">Powered by Microsoft Graph + ChatGPT</span>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-red-600 border-b border-red-100 pb-2 uppercase tracking-tighter flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span> Critical - Action Required
            </h5>
            {MOCK_EMAILS.filter(e => e.analysis.priority === Priority.CRITICAL).map(email => (
              <EmailCard key={email.id} email={email} />
            ))}
          </div>

          <div className="space-y-4">
            <h5 className="text-xs font-bold text-orange-600 border-b border-orange-100 pb-2 uppercase tracking-tighter flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-600"></span> High Priority
            </h5>
            {MOCK_EMAILS.filter(e => e.analysis.priority === Priority.HIGH).map(email => (
              <EmailCard key={email.id} email={email} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Properly define EmailCard as a React functional component with explicit props typing
// to resolve TypeScript errors when passing the 'key' prop in list mapping.
const EmailCard: React.FC<{ email: MockEmail }> = ({ email }) => (
  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div className="p-5 flex justify-between items-start gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-slate-900">{email.from} ({email.company})</span>
          <span className="text-[10px] text-slate-400 font-medium">{email.time}</span>
        </div>
        <h4 className="text-md font-semibold text-slate-800 mb-3">{email.subject}</h4>
        
        <div className="bg-purple-50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-purple-700 uppercase tracking-widest">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            ChatGPT Intelligence
          </div>
          <ul className="space-y-2">
            {email.analysis.summary.map((point: string, idx: number) => (
              <li key={idx} className="text-sm text-slate-700 flex gap-2">
                <span className="text-purple-400 font-bold">•</span> {point}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <div className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">Suggest: {email.analysis.suggestedAction}</div>
          <div className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">TAT: {email.analysis.responseTime}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <PriorityBadge priority={email.analysis.priority} />
        <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-400 hover:text-purple-600" title="Open in Outlook">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </button>
      </div>
    </div>
  </div>
);

export default DemoMode;
