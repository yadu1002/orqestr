import React from 'react';
import { Bell, Search } from 'lucide-react';

const titles = {
  signals:      'SIGNAL FEED',
  playbooks:    'PLAYBOOKS',
  accounts:     'ACCOUNTS',
  integrations: 'INTEGRATIONS',
  analytics:    'ANALYTICS',
  admin:        'WAITLIST ADMIN',
};

const subtitles = {
  signals:      '12 ACTIVE ALERTS REQUIRING ATTENTION',
  playbooks:    'AUTOMATED RESPONSE WORKFLOWS',
  accounts:     'CUSTOMER HEALTH OVERVIEW',
  integrations: 'CONNECTED DATA SOURCES',
  analytics:    'PLAYBOOK PERFORMANCE & OUTCOMES',
  admin:        'SAMPLE WAITLIST SIGNUPS AND INTENT DATA',
};

export default function DemoHeader({ activeView }) {
  return (
    <div
      className="h-14 shrink-0 flex items-center justify-between px-6"
      style={{ borderBottom: '1px solid #30363D', background: '#161B22' }}
    >
      <div>
        <h1 className="font-mono text-sm font-bold tracking-widest" style={{ color: '#F0F6FC' }}>
          {titles[activeView]}
        </h1>
        <p className="font-mono text-[10px] font-semibold tracking-wider" style={{ color: '#00C853' }}>
          {subtitles[activeView]}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 rounded px-3 py-1.5"
          style={{ background: '#0D1117', border: '1px solid #30363D' }}
        >
          <Search className="w-3.5 h-3.5" style={{ color: '#8B949E' }} />
          <input
            className="bg-transparent outline-none w-40 font-mono text-xs"
            style={{ color: '#F0F6FC' }}
            placeholder="SEARCH..."
          />
        </div>
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded transition-colors"
          style={{ background: '#0D1117', border: '1px solid #30363D' }}
          onMouseEnter={e => e.currentTarget.style.background = '#30363D'}
          onMouseLeave={e => e.currentTarget.style.background = '#0D1117'}
        >
          <Bell className="w-3.5 h-3.5" style={{ color: '#8B949E' }} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#FF3B30' }} />
        </button>
      </div>
    </div>
  );
}