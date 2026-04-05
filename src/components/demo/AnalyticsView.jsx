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

const timeToAction = [
  { week: 'W1', before: 4.2, after: 0.6 },
  { week: 'W2', before: 3.8, after: 0.5 },
  { week: 'W3', before: 5.1, after: 0.7 },
  { week: 'W4', before: 4.4, after: 0.4 },
  { week: 'W5', before: 3.9, after: 0.6 },
  { week: 'W6', before: 4.7, after: 0.5 },
];

const playbookPerformance = [
  { name: 'Feature Adoption', fired: 34, completed: 28, rate: 82 },
  { name: 'Churn Risk', fired: 19, completed: 14, rate: 73 },
  { name: 'Renewal Risk', fired: 11, completed: 9, rate: 91 },
  { name: 'Expansion', fired: 8, completed: 6, rate: 75 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="text-muted-foreground mb-1">{label}</p>
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
          { label: 'Mean Time to Action', value: '0.5 days', sub: 'Down from 4.2 days', color: 'text-primary', trend: '↓ 88%' },
          { label: 'Signals Detected (30d)', value: '72', sub: 'Across 6 signal types', color: 'text-foreground', trend: '↑ 24%' },
          { label: 'Playbook Completion', value: '84%', sub: 'Avg across all playbooks', color: 'text-blue-600', trend: '↑ 11%' },
          { label: 'ARR Protected', value: '$340k', sub: 'From churn prevention', color: 'text-primary', trend: 'This quarter' },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
              <span className="text-[10px] text-primary font-semibold">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
          <p className="text-sm font-semibold text-foreground mb-1">Signal Volume by Type</p>
          <p className="text-xs text-muted-foreground mb-4">Monthly detection trends</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={signalTrend}>
              <defs>
                <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142,72%,36%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(142,72%,36%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="featGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,92%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(220,9%,55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(220,9%,55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="churn" name="Churn Risk" stroke="#ef4444" fill="url(#churnGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="expansion" name="Expansion" stroke="hsl(142,72%,36%)" fill="url(#expGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="feature" name="Feature Gap" stroke="#f59e0b" fill="url(#featGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
          <p className="text-sm font-semibold text-foreground mb-1">Mean Time to Action</p>
          <p className="text-xs text-muted-foreground mb-4">Days from signal to response (before vs. after Orqestr)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={timeToAction} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,92%)" />
              <XAxis dataKey="week" tick={{ fill: 'hsl(220,9%,55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(220,9%,55%)', fontSize: 11 }} axisLine={false} tickLine={false} unit="d" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="before" name="Before" fill="rgba(239,68,68,0.4)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" name="After Orqestr" fill="hsl(142,72%,36%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Playbook performance table */}
      <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Playbook Performance</p>
          <p className="text-xs text-muted-foreground mt-0.5">Last 30 days</p>
        </div>
        <div className="divide-y divide-border">
          {playbookPerformance.map((pb, i) => (
            <motion.div
              key={pb.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-[2fr_1fr_1fr_2fr] gap-4 px-5 py-3.5 items-center hover:bg-secondary/30 transition-colors"
            >
              <p className="text-sm text-foreground">{pb.name}</p>
              <p className="text-sm text-muted-foreground">{pb.fired} fired</p>
              <p className="text-sm text-primary font-semibold">{pb.rate}%</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${pb.rate}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground">{pb.completed}/{pb.fired}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}