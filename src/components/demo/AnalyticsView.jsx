import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, Legend,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const dailySignals = [
  { day: 'Mar 8', total: 4, actioned: 2 }, { day: 'Mar 9', total: 6, actioned: 4 },
  { day: 'Mar 10', total: 3, actioned: 2 }, { day: 'Mar 11', total: 7, actioned: 5 },
  { day: 'Mar 12', total: 5, actioned: 3 }, { day: 'Mar 13', total: 8, actioned: 6 },
  { day: 'Mar 14', total: 4, actioned: 3 }, { day: 'Mar 15', total: 9, actioned: 7 },
  { day: 'Mar 16', total: 6, actioned: 4 }, { day: 'Mar 17', total: 11, actioned: 8 },
  { day: 'Mar 18', total: 7, actioned: 5 }, { day: 'Mar 19', total: 5, actioned: 4 },
  { day: 'Mar 20', total: 8, actioned: 6 }, { day: 'Mar 21', total: 10, actioned: 8 },
  { day: 'Mar 22', total: 6, actioned: 5 }, { day: 'Mar 23', total: 7, actioned: 6 },
  { day: 'Mar 24', total: 12, actioned: 9 }, { day: 'Mar 25', total: 9, actioned: 7 },
  { day: 'Mar 26', total: 5, actioned: 4 }, { day: 'Mar 27', total: 8, actioned: 6 },
  { day: 'Mar 28', total: 11, actioned: 9 }, { day: 'Mar 29', total: 7, actioned: 6 },
  { day: 'Mar 30', total: 9, actioned: 7 }, { day: 'Mar 31', total: 13, actioned: 10 },
  { day: 'Apr 1', total: 8, actioned: 6 }, { day: 'Apr 2', total: 10, actioned: 8 },
  { day: 'Apr 3', total: 7, actioned: 6 }, { day: 'Apr 4', total: 12, actioned: 10 },
  { day: 'Apr 5', total: 9, actioned: 8 }, { day: 'Apr 6', total: 6, actioned: 5 },
];

const playbookPerf = [
  { name: 'Support Escalation', rate: 89 },
  { name: 'Re-Engagement', rate: 81 },
  { name: 'Feature Adoption', rate: 72 },
  { name: 'Expansion', rate: 76 },
  { name: 'Renewal Risk', rate: 64 },
];

const signalDist = [
  { name: 'Low Adoption', value: 34, color: '#f97316' },
  { name: 'Renewal Risk', value: 21, color: '#ef4444' },
  { name: 'Re-Engagement', value: 18, color: '#eab308' },
  { name: 'Support Escalation', value: 14, color: '#8b5cf6' },
  { name: 'Expansion', value: 13, color: '#16a34a' },
];

const atRiskAccounts = [
  { company: 'Globex Industries', arr: '$120k', health: 24, daysToRenewal: 28, signals: 3 },
  { company: 'Stripe Inc',        arr: '$148k', health: 29, daysToRenewal: 18, signals: 2 },
  { company: 'ScaleUp AI',        arr: '$95k',  health: 31, daysToRenewal: 31, signals: 2 },
  { company: 'Acme Corp',         arr: '$84k',  health: 38, daysToRenewal: 99, signals: 2 },
];

const kpiTiles = [
  { label: 'AVG TIME TO ACTION', value: '4.2 hours', sub: 'Down 38% from last month', trend: '↓ 38%', numColor: '#15803d', topColor: '#16a34a' },
  { label: 'PLAYBOOK COMPLETION RATE', value: '68%', sub: 'Up 12% from last month', trend: '↑ 12%', numColor: '#15803d', topColor: '#16a34a' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}{p.name?.includes('Rate') ? '%' : ''}</p>
      ))}
    </div>
  );
};

function DonutChart({ data }) {
  return (
    <div className="rounded-lg bg-white border border-border p-5">
      <p className="text-sm font-semibold text-foreground mb-1">Signal Distribution</p>
      <p className="text-xs text-muted-foreground mb-3">By signal type — last 30 days</p>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={2} dataKey="value">
              {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 flex-1">
          {data.map(d => (
            <div key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-[10px] text-muted-foreground">{d.name}</span>
              </div>
              <span className="text-[10px] font-semibold text-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsView() {
  return (
    <div className="space-y-5">
      {/* Row 1: KPI tiles */}
      <div className="grid grid-cols-2 gap-3">
        {kpiTiles.map(t => (
          <div key={t.label} style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', borderTop: `3px solid ${t.topColor}`, borderRadius: 8, padding: 20 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', marginBottom: 8 }}>{t.label}</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: t.numColor, lineHeight: 1 }}>{t.value}</p>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: '#6b7280' }}>{t.sub}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#15803d' }}>{t.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Line chart — Signal Volume */}
      <div className="rounded-lg bg-white border border-border p-5">
        <p className="text-sm font-semibold text-foreground mb-1">Signal Volume — Last 30 Days</p>
        <p className="text-xs text-muted-foreground mb-4">Daily signal detections vs actioned</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dailySignals}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false}
              tickFormatter={(v, i) => i % 5 === 0 ? v : ''} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="total" name="Total Signals" stroke="#4ade80" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="actioned" name="Actioned" stroke="#15803d" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Row 3: Bar chart + Donut */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white border border-border p-5">
          <p className="text-sm font-semibold text-foreground mb-1">Playbook Performance</p>
          <p className="text-xs text-muted-foreground mb-4">Completion rate % by playbook type</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={playbookPerf} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
              <YAxis type="category" dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" name="Completion Rate" fill="#16a34a" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <DonutChart data={signalDist} />
      </div>

      {/* Row 4: At-Risk Accounts Table */}
      <div className="rounded-lg bg-white border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Top At-Risk Accounts This Month</p>
          <p className="text-xs text-muted-foreground mt-0.5">Sorted by risk — health score + renewal proximity</p>
        </div>
        <div className="grid grid-cols-5 gap-4 px-5 py-2.5 border-b border-border bg-white">
          {['ACCOUNT', 'ARR', 'HEALTH SCORE', 'DAYS TO RENEWAL', 'OPEN SIGNALS'].map(h => (
            <p key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#374151' }}>{h}</p>
          ))}
        </div>
        <div className="divide-y divide-border">
          {atRiskAccounts.map((acc, i) => {
            const hColor = acc.health >= 70 ? '#15803d' : acc.health >= 40 ? '#f97316' : '#ef4444';
            return (
              <motion.div key={acc.company} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                className="grid grid-cols-5 gap-4 px-5 py-3.5 items-center hover:bg-gray-50 transition-colors">
                <p className="text-sm font-medium text-foreground">{acc.company}</p>
                <p className="text-sm text-muted-foreground">{acc.arr}</p>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1.5 rounded-full overflow-hidden bg-secondary">
                    <div className="h-full rounded-full" style={{ width: `${acc.health}%`, background: hColor }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: hColor }}>{acc.health}</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: acc.daysToRenewal < 30 ? '#ef4444' : '#374151' }}>
                  {acc.daysToRenewal}d
                </p>
                <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 w-fit">
                  {acc.signals} open
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}