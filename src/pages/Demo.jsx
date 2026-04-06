import React, { useState, useEffect } from 'react';
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

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 's' || e.key === 'S') setActiveView('signals');
      if (e.key === 'a' || e.key === 'A') setActiveView('accounts');
      if (e.key === 'p' || e.key === 'P') setActiveView('playbooks');
      if (e.key === 'i' || e.key === 'I') setActiveView('integrations');
      if (e.key === 'n' || e.key === 'N') setActiveView('analytics');
      if (e.key === 'r' || e.key === 'R') {
        if (window.confirm('Reset demo to initial state?')) setActiveView('signals');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const views = {
    signals: <SignalFeedView />,
    playbooks: <PlaybooksView />,
    accounts: <AccountsView onNavigate={setActiveView} />,
    integrations: <IntegrationsView />,
    analytics: <AnalyticsView />,
    admin: <AdminDemoView />,
  };

  return (
    <div className="h-screen flex overflow-hidden font-inter bg-background text-foreground">
      <DemoSidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DemoHeader activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {views[activeView]}
        </main>
      </div>
    </div>
  );
}