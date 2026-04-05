import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const accounts = [
  { company: 'Stark Industries', arr: 210000, csm: 'Maria K.', health: 89, trend: 'up', renewal: '2026-11-01', tier: 'Enterprise', signals: 1, lastActive: '2h ago' },
  { company: 'Globex Industries', arr: 120000, csm: 'Maria K.', health: 24, trend: 'down', renewal: '2026-05-04', tier: 'Growth', signals: 3, lastActive: '21d ago' },
  { company: 'Acme Corp', arr: 84000, csm: 'Jordan P.', health: 38, trend: 'down', renewal: '2026-07-15', tier: 'Growth', signals: 2, lastActive: '14d ago' },
  { company: 'Wayne Enterprises', arr: 52000, csm: 'Lisa A.', health: 91, trend: 'up', renewal: '2026-09-20', tier: 'Startup', signals: 1, lastActive: 'Today' },
  { company: 'Umbrella Corp', arr: 67000, csm: 'Jordan P.', health: 41, trend: 'down', renewal: '2026-08-12', tier: 'Growth', signals: 2, lastActive: '3d ago' },
  { company: 'Initech LLC', arr: 36000, csm: 'Tom B.', health: 55, trend: 'flat', renewal: '2026-10-08', tier: 'Startup', signals: 1, lastActive: '7d ago' },
  { company: 'Oscorp', arr: 95000, csm: 'Lisa A.', health: 76, trend: 'up', renewal: '2026-12-01', tier: 'Growth', signals: 0, lastActive: 'Today' },
  { company: 'Cyberdyne Systems', arr: 155000, csm: 'Tom B.', health: 63, trend: 'flat', renewal: '2026-06-30', tier: 'Enterprise', signals: 1, lastActive: '5d ago' },
];

function HealthPill({ score }) {
  const cfg = score >= 70
    ? 'bg-primary/8 text-primary'
    : score >= 40
    ? 'bg-orange-50 text-orange-600'
    : 'bg-red-50 text-red-600';
  const barColor = score >= 70 ? 'bg-primary' : score >= 40 ? 'bg-orange-400' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${cfg}`}>{score}</span>
    </div>
  );
}

export default function AccountsView() {
  const [sort, setSort] = useState('health_asc');

  const sorted = [...accounts].sort((a, b) => {
    if (sort === 'health_asc') return a.health - b.health;
    if (sort === 'health_desc') return b.health - a.health;
    if (sort === 'arr') return b.arr - a.arr;
    if (sort === 'signals') return b.signals - a.signals;
    return 0;
  });

  const atRisk = accounts.filter(a => a.health < 50).length;
  const totalArr = accounts.reduce((s, a) => s + a.arr, 0);
  const atRiskArr = accounts.filter(a => a.health < 50).reduce((s, a) => s + a.arr, 0);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Accounts', value: accounts.length, color: 'text-foreground' },
          { label: 'At-Risk Accounts', value: atRisk, color: 'text-red-600' },
          { label: 'Total ARR', value: `$${(totalArr / 1000).toFixed(0)}k`, color: 'text-foreground' },
          { label: 'At-Risk ARR', value: `$${(atRiskArr / 1000).toFixed(0)}k`, color: 'text-orange-600' },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl bg-card border border-border p-4 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_1fr_1fr] gap-4 px-5 py-3 border-b border-border bg-secondary/60">
          {[
            { label: 'Account', sort: null },
            { label: 'ARR', sort: 'arr' },
            { label: 'Health', sort: 'health_asc' },
            { label: 'CSM', sort: null },
            { label: 'Renewal', sort: null },
            { label: 'Signals', sort: 'signals' },
            { label: 'Last Active', sort: null },
          ].map(col => (
            <button
              key={col.label}
              onClick={() => col.sort && setSort(col.sort)}
              className={`text-left text-[10px] font-semibold uppercase tracking-wider ${col.sort ? 'hover:text-foreground cursor-pointer' : 'cursor-default'} ${sort === col.sort ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {col.label}
            </button>
          ))}
        </div>

        {sorted.map((account, i) => (
          <motion.div
            key={account.company}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_1fr_1fr] gap-4 px-5 py-3.5 border-b border-border hover:bg-secondary/30 transition-colors last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{account.company}</p>
              <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-border">{account.tier}</span>
            </div>
            <p className="text-sm text-foreground/70 self-center">${(account.arr / 1000).toFixed(0)}k</p>
            <div className="self-center"><HealthPill score={account.health} /></div>
            <p className="text-xs text-muted-foreground self-center">{account.csm}</p>
            <p className="text-xs text-muted-foreground self-center">{new Date(account.renewal).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            <div className="self-center">
              {account.signals > 0 ? (
                <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                  {account.signals} alert{account.signals > 1 ? 's' : ''}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 self-center">
              {account.trend === 'up' && <TrendingUp className="w-3 h-3 text-primary" />}
              {account.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
              {account.trend === 'flat' && <Minus className="w-3 h-3 text-muted-foreground" />}
              <span className="text-xs text-muted-foreground">{account.lastActive}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}