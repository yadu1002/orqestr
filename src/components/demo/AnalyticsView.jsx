import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const signalTrend = [
  { month: 'Nov', churn: 8, expansion: 3, feature: 5 },
  { month: 'Dec', churn: 11, expansion: 4, feature: 7 },
  { month: 'Jan', churn: 14, expansion: 5, feature: 9 },
  { month: 'Feb', churn: 9, expansion: 7, feature: 6 },
  { month: 'Mar', churn: 12, expansion: 8, feature: 11 },
  { month: 'Apr', churn: 7, expansion: 6, feature: 8 },
];

const playbookPerformance = [
  { name: 'Feature Adoption', fired: 34, completed: 28, rate: 82 },
  { name: 'Churn Risk', fired: 19, completed: 14, rate: 73 },
  { name: 'Renewal Risk', fired: 11, completed: 9, rate: 91 },
  { name: 'Expansion', fired: 8, completed: 6, rate: 75 },
];

const timeToAction = [
  { week: 'W1', before: 4.2, after: 0.6 },
  { week: 'W2', before: 3.8, after: 0.5 },
  { week: 'W3', before: 5.1, after: 0.7 },
  { week: 'W4', before: 4.4, after: 0.4 },
  { week: 'W5', before: 3.9, after: 0.6 },
  { week: 'W6', before: 4.7, after: 0.5 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1f2e] border border-white/10 rounded-lg px-3 py-2 text-xs">
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function AnalyticsView() {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Mean Time to Action', value: '0.5 days', sub: 'Down from 4.2 days', color: 'text-emerald-400', trend: '↓ 88%' },
          { label: 'Signals Detected (30d)', value: '72', sub: 'Across 6 signal types', color: 'text-white', trend: '↑ 24%' },
          { label: 'Playbook Completion', value: '84%', sub: 'Avg across all playbooks', color: 'text-blue-400', trend: '↑ 11%' },
          { label: 'ARR Protected', value: '$340k', sub: 'From churn prevention', color: 'text-emerald-400', trend: 'This quarter' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl bg-white/4 border border-white/8 p-4">
            <p className="text-xs text-white/40 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[10px] text-white/30">{stat.sub}</p>
              <span className="text-[10px] text-emerald-400 font-semibold">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Signal trends */}
        <div className="rounded-xl bg-white/4 border border-white/8 p-5">
          <p className="text-sm font-semibold text-white mb-1">Signal Volume by Type</p>
          <p className="text-xs text-white/30 mb-4">Monthly detection trends</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={signalTrend}>
              <defs>
                <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="featGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="churn" name="Churn Risk" stroke="#ef4444" fill="url(#churnGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="expansion" name="Expansion" stroke="#10b981" fill="url(#expGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="feature" name="Feature Gap" stroke="#f59e0b" fill="url(#featGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Time to action */}
        <div className="rounded-xl bg-white/4 border border-white/8 p-5">
          <p className="text-sm font-semibold text-white mb-1">Mean Time to Action</p>
          <p className="text-xs text-white/30 mb-4">Days from signal to response (before vs. after Orqestr)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={timeToAction} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} unit="d" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="before" name="Before" fill="rgba(239,68,68,0.5)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="after" name="After Orqestr" fill="rgba(16,185,129,0.7)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Playbook performance table */}
      <div className="rounded-xl bg-white/4 border border-white/8 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8">
          <p className="text-sm font-semibold text-white">Playbook Performance</p>
          <p className="text-xs text-white/30 mt-0.5">Last 30 days</p>
        </div>
        <div className="divide-y divide-white/5">
          {playbookPerformance.map((pb, i) => (
            <motion.div
              key={pb.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-[2fr_1fr_1fr_2fr] gap-4 px-5 py-3 items-center"
            >
              <p className="text-sm text-white/80">{pb.name}</p>
              <p className="text-sm text-white/50">{pb.fired} fired</p>
              <p className="text-sm text-emerald-400 font-semibold">{pb.rate}%</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${pb.rate}%` }}
                  />
                </div>
                <span className="text-[10px] text-white/30">{pb.completed}/{pb.fired}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}