
import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MeetingPrepTool from './components/MeetingPrepTool';
import ClientIntelTool from './components/ClientIntelTool';
import IndustryIntelTool from './components/IndustryIntelTool';
import PostMeetingTool from './components/PostMeetingTool';
import DemoMode from './components/DemoMode';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onViewChange={setCurrentView} />;
      case AppView.DEMO_MODE:
        return <DemoMode />;
      case AppView.MEETING_PREP:
        return <MeetingPrepTool />;
      case AppView.CLIENT_INTEL:
        return <ClientIntelTool />;
      case AppView.INDUSTRY_INTEL:
        return <IndustryIntelTool />;
      case AppView.POST_MEETING:
        return <PostMeetingTool />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar activeView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
