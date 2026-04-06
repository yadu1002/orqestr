import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const META = {
  signals:      { title: 'Signal Feed',    subtitle: '6 active alerts requiring attention' },
  playbooks:    { title: 'Playbooks',       subtitle: '5 active playbooks · 68% completion rate' },
  accounts:     { title: 'Accounts',        subtitle: '8 accounts · $819k total ARR · 3 at risk' },
  integrations: { title: 'Integrations',    subtitle: '3 connected · 4 available' },
  analytics:    { title: 'Analytics',       subtitle: 'Last 30 days · signal and playbook performance' },
  admin:        { title: 'Waitlist Admin',  subtitle: 'Sample waitlist signups and intent data' },
};

export default function DemoHeader({ activeView }) {
  const { title, subtitle } = META[activeView] || META.signals;
  return (
    <div className="h-14 shrink-0 flex items-center justify-between px-6 bg-white border-b border-border">
      <div>
        <h1 className="text-sm font-bold text-foreground">{title}</h1>
        <p className="text-[11px] text-primary font-medium">{subtitle}</p>
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