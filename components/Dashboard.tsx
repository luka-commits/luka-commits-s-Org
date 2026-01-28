
import React from 'react';
import { AppView } from '../types';
import { COLORS } from '../constants';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Good morning, Martin.</h2>
        <p className="text-slate-500 mt-1">Here is how Accenture can support you today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-purple-700 to-indigo-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-purple-200">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Automated Morning Brief</h3>
            <p className="text-purple-100 mb-6 max-w-md">Get a full executive summary of your meetings, critical emails, and action items in seconds.</p>
            <button 
              onClick={() => onViewChange(AppView.DEMO_MODE)}
              className="px-6 py-3 bg-white text-purple-700 rounded-xl font-bold hover:bg-purple-50 transition-colors shadow-lg"
            >
              Launch Morning Brief Demo
            </button>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.636 5.636m12.728 12.728L5.636 5.636"/></svg>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Saved Today</h3>
            <p className="text-slate-500">Accenture has already saved you approximately</p>
            <div className="text-4xl font-bold text-slate-900 my-4">32 min</div>
          </div>
          <p className="text-sm text-slate-400">Projected weekly saving: 2.8 hrs</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
        Standalone Intelligence Tools
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Meeting Prep', 
            view: AppView.MEETING_PREP, 
            desc: 'Research participants and company news before your next call.', 
            color: 'bg-blue-50 text-blue-600',
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          },
          { 
            title: 'Client Intel', 
            view: AppView.CLIENT_INTEL, 
            desc: 'Real-time deep dives into company financials and news.', 
            color: 'bg-emerald-50 text-emerald-600',
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          },
          { 
            title: 'Industry Monitor', 
            view: AppView.INDUSTRY_INTEL, 
            desc: 'Daily curated briefs on your selected sectors.', 
            color: 'bg-indigo-50 text-indigo-600',
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          },
          { 
            title: 'Post-Meeting', 
            view: AppView.POST_MEETING, 
            desc: 'Turn voice summaries into protocols and drafts.', 
            color: 'bg-amber-50 text-amber-600',
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          }
        ].map((tool) => (
          <button
            key={tool.title}
            onClick={() => onViewChange(tool.view)}
            className="group bg-white border border-slate-200 p-6 rounded-2xl text-left hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {tool.icon}
            </div>
            <h4 className="font-bold text-slate-900 mb-2">{tool.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{tool.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
