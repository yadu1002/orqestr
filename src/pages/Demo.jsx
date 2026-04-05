import React, { useState } from 'react';
import DemoSidebar from '../components/demo/DemoSidebar';
import DemoHeader from '../components/demo/DemoHeader';
import SignalFeedView from '../components/demo/SignalFeedView';
import PlaybooksView from '../components/demo/PlaybooksView';
import AccountsView from '../components/demo/AccountsView';
import IntegrationsView from '../components/demo/IntegrationsView';
import AnalyticsView from '../components/demo/AnalyticsView';
import AdminDemoView from '../components/demo/AdminDemoView';

export default function Demo() {
  const [activeView, setActiveView] = useState('signals');

  const views = {
    signals: <SignalFeedView />,
    playbooks: <PlaybooksView />,
    accounts: <AccountsView />,
    integrations: <IntegrationsView />,
    analytics: <AnalyticsView />,
    admin: <AdminDemoView />,
  };

  return (
    <div className="h-screen flex overflow-hidden font-mono" style={{ background: '#0D1117', color: '#F0F6FC' }}>
      <DemoSidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DemoHeader activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-6" style={{ background: '#0D1117' }}>
          {views[activeView]}
        </main>
      </div>
    </div>
  );
}