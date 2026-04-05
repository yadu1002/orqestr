import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const titles = {
  signals:      'Signal Feed',
  playbooks:    'Playbooks',
  accounts:     'Accounts',
  integrations: 'Integrations',
  analytics:    'Analytics',
  admin:        'Waitlist Admin',
};

const subtitles = {
  signals:      '12 active alerts requiring attention',
  playbooks:    'Automated response workflows',
  accounts:     'Customer health overview',
  integrations: 'Connected data sources',
  analytics:    'Playbook performance & outcomes',
  admin:        'Sample waitlist signups and intent data',
};

export default function DemoHeader({ activeView }) {
  return (
    <div className="h-14 shrink-0 flex items-center justify-between px-6 bg-white border-b border-border">
      <div>
        <h1 className="text-sm font-bold text-foreground">{titles[activeView]}</h1>
        <p className="text-[11px] text-primary font-medium">{subtitles[activeView]}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 bg-secondary border border-border">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            className="bg-transparent outline-none w-36 text-xs text-foreground placeholder:text-muted-foreground"
            placeholder="Search..."
          />
        </div>
        <Link
          to="/Landing"
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:bg-secondary"
        >
          ← Back to site
        </Link>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-secondary hover:bg-muted transition-colors">
          <Bell className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
        </button>
      </div>
    </div>
  );
}