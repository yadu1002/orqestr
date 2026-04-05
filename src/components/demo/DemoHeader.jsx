import React from 'react';
import { Bell, Search } from 'lucide-react';

const titles = {
  signals: 'Signal Feed',
  playbooks: 'Playbooks',
  accounts: 'Accounts',
  integrations: 'Integrations',
  analytics: 'Analytics',
  admin: 'Waitlist Admin',
};

const subtitles = {
  signals: '12 active alerts requiring attention',
  playbooks: 'Automated response workflows',
  accounts: 'Customer health overview',
  integrations: 'Connected data sources',
  analytics: 'Playbook performance & outcomes',
  admin: 'Sample waitlist signups and intent data',
};

export default function DemoHeader({ activeView }) {
  return (
    <div className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-card/80 backdrop-blur-sm">
      <div>
        <h1 className="text-sm font-semibold text-foreground">{titles[activeView]}</h1>
        <p className="text-xs text-muted-foreground">{subtitles[activeView]}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-secondary border border-border rounded-lg px-3 py-1.5">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            className="bg-transparent text-xs text-foreground placeholder-muted-foreground outline-none w-40"
            placeholder="Search..."
          />
        </div>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-secondary hover:bg-muted border border-border transition-colors">
          <Bell className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
        </button>
      </div>
    </div>
  );
}