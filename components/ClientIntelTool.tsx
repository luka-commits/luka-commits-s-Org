
import React, { useState } from 'react';
import { performClientIntel } from '../services/geminiService';

const ClientIntelTool: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;
    setLoading(true);
    try {
      const data = await performClientIntel(company);
      setResult(data || 'No intel found.');
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
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Client Intelligence</h2>
        </div>
        <p className="text-slate-500">Real-time summaries on any company.</p>
      </header>

      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <input 
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          placeholder="Enter company name (e.g. Siemens, Bayer, Allianz)"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
        <button 
          disabled={loading}
          className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {result && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm prose prose-slate max-w-none">
          <div className="flex justify-between items-center mb-6 not-prose">
             <h3 className="text-xl font-bold text-slate-900">{company} Intel Brief</h3>
             <button onClick={() => setResult(null)} className="text-sm text-slate-400 hover:text-slate-600">Clear</button>
          </div>
          <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-normal">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientIntelTool;
