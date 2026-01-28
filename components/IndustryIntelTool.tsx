
import React from 'react';

const IndustryIntelTool: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
       <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Industry Monitor</h2>
        </div>
        <p className="text-slate-500">Curated business news and trends for your selected sectors.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex justify-between items-center">
              Daily Sector Brief: Automotive
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded tracking-widest uppercase">Latest</span>
            </h3>
            
            <div className="space-y-6">
              {[
                { title: "BMW announces €2B Cloud-Investment", impact: "High", summary: "Partnership with Microsoft Azure expanded to cover global production sites. Potential for advisory services in migration." },
                { title: "VW stops internal combustion engine development", impact: "Strategic", summary: "Shift to 100% electric platform focus by 2030. Impact on supply chain management services." }
              ].map((news, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{news.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{news.impact} Impact</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{news.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 mb-6">Pharmaceuticals News</h3>
             <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
               <p className="text-sm text-slate-500 italic">No high-priority updates in the last 12 hours for your tags.</p>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Your Preferences</h3>
            <div className="space-y-4">
               <div>
                 <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Industries</p>
                 <div className="flex flex-wrap gap-2">
                   {['Automotive', 'Pharma', 'Energy'].map(i => (
                     <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-semibold">{i}</span>
                   ))}
                 </div>
               </div>
               <div>
                 <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Topics</p>
                 <div className="flex flex-wrap gap-2">
                   {['AI/ML', 'Cloud', 'M&A'].map(t => (
                     <span key={t} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">{t}</span>
                   ))}
                 </div>
               </div>
               <button className="w-full py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50">Edit Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryIntelTool;
