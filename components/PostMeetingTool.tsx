
import React, { useState } from 'react';
import { analyzeMeetingTranscript } from '../services/geminiService';

const PostMeetingTool: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleProcess = async () => {
    if (!transcript) return;
    setLoading(true);
    try {
      const data = await analyzeMeetingTranscript(transcript);
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
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Post-Meeting Assistant</h2>
        </div>
        <p className="text-slate-500">Capture decisions and automate follow-up tasks.</p>
      </header>

      {!result ? (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Meeting Summary</h3>
            <textarea 
              className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[300px] text-slate-700"
              placeholder="Paste meeting notes, transcript, or type a voice summary here..."
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
            />
            <div className="mt-6 flex gap-4">
              <button 
                onClick={handleProcess}
                disabled={loading || !transcript}
                className="flex-1 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing Protocol...' : 'Generate Protocol'}
              </button>
              <button className="px-6 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                Record Summary
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Generated Protocol</h3>
            <button onClick={() => setResult(null)} className="text-sm font-semibold text-purple-600 hover:text-purple-700">New Process</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Key Decisions</h4>
              <ul className="space-y-4">
                {result.decisions?.map((d: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded flex items-center justify-center flex-shrink-0">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Action Items</h4>
              <ul className="space-y-4">
                {result.actions?.map((a: any, idx: number) => (
                  <li key={idx} className="border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <p className="font-bold text-slate-900 text-sm">{a.owner}</p>
                      <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold uppercase">{a.priority}</span>
                    </div>
                    <p className="text-sm text-slate-600">{a.task}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="bg-slate-900 text-white rounded-2xl p-8 shadow-lg">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Email Follow-up Draft</h4>
            <div className="bg-slate-800 p-6 rounded-xl text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
              {result.emailDraft}
            </div>
            <div className="mt-6 flex gap-3">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700">Open in Outlook</button>
              <button className="px-6 py-2 border border-slate-700 text-slate-400 rounded-lg text-sm font-bold hover:bg-slate-800">Copy to Clipboard</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default PostMeetingTool;
