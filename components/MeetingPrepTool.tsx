
import React, { useState } from 'react';
import { performMeetingPrep } from '../services/geminiService';
import { COLORS } from '../constants';

const MeetingPrepTool: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', company: '', participants: '' });
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await performMeetingPrep(
        formData.title,
        formData.participants.split(',').map(p => p.trim()),
        formData.company
      );
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Meeting Prep Assistant</h2>
        </div>
        <p className="text-slate-500">Research participants and company context in seconds.</p>
      </header>

      {!result ? (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Meeting Title</label>
              <input 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. Q1 Strategy Review"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Client / Company</label>
              <input 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. BMW"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Participants (comma separated)</label>
            <textarea 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
              placeholder="e.g. Dr. Schmidt, Anna Müller"
              value={formData.participants}
              onChange={e => setFormData({ ...formData, participants: e.target.value })}
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing Intelligence...
              </>
            ) : 'Generate Briefing'}
          </button>
        </form>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{formData.title}</h3>
              <p className="text-sm text-slate-500">{formData.company} • Research generated today</p>
            </div>
            <button 
              onClick={() => setResult(null)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50"
            >
              New Search
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Participant Intel</h4>
                <div className="space-y-6">
                  {result.participants?.map((p: any, idx: number) => (
                    <div key={idx} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                      <p className="font-bold text-slate-900 text-lg">{p.name}</p>
                      <p className="text-purple-600 font-semibold text-sm mb-2">{p.role}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.insight}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Company Context & News</h4>
                <div className="space-y-4">
                  {result.companyContext?.news?.map((n: string, idx: number) => (
                    <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-1.5 h-auto bg-purple-400 rounded-full flex-shrink-0"></div>
                      <p className="text-sm text-slate-700">{n}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Strategic Talking Points</h4>
                <ul className="space-y-4">
                  {result.talkingPoints?.map((tp: string, idx: number) => (
                    <li key={idx} className="text-sm border-l-2 border-purple-500 pl-4">{tp}</li>
                  ))}
                </ul>
              </section>

              <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Questions to Ask</h4>
                <ul className="space-y-3">
                  {result.questions?.map((q: string, idx: number) => (
                    <li key={idx} className="text-sm text-slate-700 italic border-b border-slate-100 pb-3 last:border-0">{q}</li>
                  ))}
                </ul>
              </section>

              <section className="bg-red-50 border border-red-100 rounded-2xl p-8 shadow-sm">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-6">Risk Monitoring</h4>
                <ul className="space-y-3">
                  {result.risks?.map((r: string, idx: number) => (
                    <li key={idx} className="text-sm text-red-800 flex gap-2">
                      <span className="font-bold">!</span> {r}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingPrepTool;
