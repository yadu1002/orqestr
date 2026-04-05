import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Building2, Zap, Target, BarChart2, Wrench, Mail, Calendar } from 'lucide-react';

const sampleSignups = [
  { name: 'Sarah Chen', email: 'sarah@scaleup.ai', company: 'ScaleUp AI', size: '51-200', tool: 'Gainsight', pain: 'Slow response to churn signals', date: 'Apr 4, 2026' },
  { name: 'Marcus Johnson', email: 'marcus@techflow.io', company: 'TechFlow Inc', size: '201-500', tool: 'Spreadsheets/manual', pain: 'Manual cross-team coordination', date: 'Apr 3, 2026' },
  { name: 'Alex Rivera', email: 'alex@cloudbase.co', company: 'CloudBase', size: '51-200', tool: 'ChurnZero', pain: 'Poor feature adoption visibility', date: 'Apr 3, 2026' },
  { name: 'Jordan Park', email: 'jordan@finops.com', company: 'FinOps Labs', size: '1-50', tool: 'Salesforce only', pain: 'No clear playbooks', date: 'Apr 2, 2026' },
  { name: 'Priya Nair', email: 'priya@meridian.io', company: 'Meridian SaaS', size: '500+', tool: 'Vitally', pain: 'Slow response to churn signals', date: 'Apr 2, 2026' },
  { name: 'Tom Walsh', email: 'tom@datasync.pro', company: 'DataSync Pro', size: '201-500', tool: 'Totango', pain: 'Manual cross-team coordination', date: 'Apr 1, 2026' },
  { name: 'Lisa Park', email: 'lisa@oscorp.com', company: 'Oscorp', size: '500+', tool: 'Gainsight', pain: 'Poor feature adoption visibility', date: 'Mar 31, 2026' },
  { name: null, email: 'anon@startup.co', company: null, size: '1-50', tool: 'Spreadsheets/manual', pain: 'Slow response to churn signals', date: 'Mar 30, 2026' },
];

const toolCounts = { 'Gainsight': 2, 'Spreadsheets/manual': 2, 'ChurnZero': 1, 'Salesforce only': 1, 'Vitally': 1, 'Totango': 1 };
const painCounts = { 'Slow response to churn signals': 3, 'Manual cross-team coordination': 2, 'Poor feature adoption visibility': 2, 'No clear playbooks': 1 };
const sizeCounts = { '1-50': 2, '51-200': 2, '201-500': 2, '500+': 2 };

const toolColors = {
  'Gainsight': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'ChurnZero': 'bg-orange-50 text-orange-700 border-orange-200',
  'Vitally': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Totango': 'bg-purple-50 text-purple-700 border-purple-200',
  'Salesforce only': 'bg-blue-50 text-blue-700 border-blue-200',
  'Spreadsheets/manual': 'bg-yellow-50 text-yellow-700 border-yellow-200',
};

const sizeColors = {
  '1-50': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  '51-200': 'bg-teal-50 text-teal-700 border-teal-200',
  '201-500': 'bg-blue-50 text-blue-700 border-blue-200',
  '500+': 'bg-violet-50 text-violet-700 border-violet-200',
};

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function PainPointBar({ label, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-muted-foreground truncate max-w-[70%]">{label}</p>
        <span className="text-xs font-semibold text-foreground">{count} <span className="text-muted-foreground font-normal">({pct}%)</span></span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function AdminDemoView() {
  const total = sampleSignups.length;
  const thisWeek = 5;

  return (
    <div>
      {/* Demo banner */}
      <div className="mb-6 px-4 py-3 rounded-2xl bg-primary/8 border border-primary/20 flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary shrink-0" />
        <p className="text-xs text-primary font-medium">This is a demo view — showing sample waitlist data to illustrate the admin dashboard.</p>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total Signups" value={total} sub="All time" color="bg-primary/10 text-primary" />
        <StatCard icon={TrendingUp} label="This Week" value={thisWeek} sub="Last 7 days" color="bg-blue-50 text-blue-600" />
        <StatCard icon={Building2} label="With Company" value={7} sub="88% provided company info" color="bg-violet-50 text-violet-600" />
        <StatCard icon={Zap} label="Top Tool" value="Gainsight" sub="Most common current tool" color="bg-orange-50 text-orange-600" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Biggest Pain Points</p>
              <p className="text-xs text-muted-foreground">Self-reported by signups</p>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(painCounts).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
              <PainPointBar key={k} label={k} count={v} total={total} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <BarChart2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Company Size</p>
                <p className="text-xs text-muted-foreground">Distribution of signups</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(sizeCounts).map(([k, v]) => (
                <div key={k} className={`px-3 py-1.5 rounded-xl border text-xs font-medium ${sizeColors[k]}`}>
                  {k} employees · <span className="font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Current Tools</p>
                <p className="text-xs text-muted-foreground">What they're replacing</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(toolCounts).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                <div key={k} className={`px-3 py-1.5 rounded-xl border text-xs font-medium ${toolColors[k] || 'bg-secondary text-secondary-foreground border-border'}`}>
                  {k} · <span className="font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Sample Signups</p>
          <p className="text-xs text-muted-foreground mt-0.5">{total} total · newest first</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/60 border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Size</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Tool</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pain Point</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sampleSignups.map((s, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-3.5 font-medium text-foreground">{s.name || <span className="text-muted-foreground">—</span>}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[160px] text-xs">{s.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="text-sm">{s.company || <span className="text-muted-foreground">—</span>}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg border text-xs font-medium ${sizeColors[s.size]}`}>{s.size}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg border text-xs font-medium ${toolColors[s.tool] || 'bg-secondary text-secondary-foreground border-border'}`}>{s.tool}</span>
                  </td>
                  <td className="px-4 py-3.5 max-w-[180px]">
                    <span className="text-xs text-muted-foreground truncate block">{s.pain}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      {s.date}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}