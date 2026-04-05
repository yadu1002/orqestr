import React, { useState } from 'react';
import DemoSidebar from '../components/demo/DemoSidebar';
import DemoHeader from '../components/demo/DemoHeader';
import SignalFeedView from '../components/demo/SignalFeedView';
import PlaybooksView from '../components/demo/PlaybooksView';
import AccountsView from '../components/demo/AccountsView';
import IntegrationsView from '../components/demo/IntegrationsView';
import AnalyticsView from '../components/demo/AnalyticsView';

export default function Demo() {
  const [activeView, setActiveView] = useState('signals');

  const views = {
    signals: <SignalFeedView />,
    playbooks: <PlaybooksView />,
    accounts: <AccountsView />,
    integrations: <IntegrationsView />,
    analytics: <AnalyticsView />,
  };

  return (
    <div className="h-screen flex bg-[#0f1117] text-white overflow-hidden font-inter">
      <DemoSidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DemoHeader activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-6">
          {views[activeView]}
        </main>
      </div>
    </div>
  );
}