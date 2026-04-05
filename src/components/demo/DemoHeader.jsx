import React from 'react';
import { Bell, Search } from 'lucide-react';

const titles = {
  signals: 'Signal Feed',
  playbooks: 'Playbooks',
  accounts: 'Accounts',
  integrations: 'Integrations',
  analytics: 'Analytics',
};

const subtitles = {
  signals: '12 active alerts requiring attention',
  playbooks: 'Automated response workflows',
  accounts: 'Customer health overview',
  integrations: 'Connected data sources',
  analytics: 'Playbook performance & outcomes',
};

export default function DemoHeader({ activeView }) {
  return (
    <div className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-white/8 bg-[#0d1018]/80 backdrop-blur-sm">
      <div>
        <h1 className="text-sm font-semibold text-white">{titles[activeView]}</h1>
        <p className="text-xs text-white/40">{subtitles[activeView]}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
          <Search className="w-3.5 h-3.5 text-white/30" />
          <input
            className="bg-transparent text-xs text-white/60 placeholder-white/25 outline-none w-40"
            placeholder="Search..."
          />
        </div>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
          <Bell className="w-3.5 h-3.5 text-white/50" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
      </div>
    </div>
  );
}