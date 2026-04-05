import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
  Download, ArrowLeft, Lock, Loader2, Users,
  TrendingUp, AlertTriangle, Zap, BarChart2,
  Building2, Mail, Calendar, Wrench, Target
} from 'lucide-react';

const ADMIN_PASSWORD = 'admin';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-2">Enter your password to view the waitlist dashboard</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === ADMIN_PASSWORD) {
                setAuthenticated(true);
                setError(false);
              } else {
                setError(true);
              }
            }}
            className="space-y-3"
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className={`h-11 rounded-xl border-border bg-background ${error ? 'border-destructive' : ''}`}
            />
            {error && <p className="text-xs text-destructive">Incorrect password. Please try again.</p>}
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

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
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

const toolColors = {
  'Gainsight': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'ChurnZero': 'bg-orange-50 text-orange-700 border-orange-200',
  'Vitally': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Totango': 'bg-purple-50 text-purple-700 border-purple-200',
  'Salesforce only': 'bg-blue-50 text-blue-700 border-blue-200',
  'Spreadsheets/manual': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Other': 'bg-secondary text-secondary-foreground border-border',
};

const sizeColors = {
  '1-50': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  '51-200': 'bg-teal-50 text-teal-700 border-teal-200',
  '201-500': 'bg-blue-50 text-blue-700 border-blue-200',
  '500+': 'bg-violet-50 text-violet-700 border-violet-200',
};

function AdminDashboard() {
  const { data: signups = [], isLoading } = useQuery({
    queryKey: ['waitlist-signups'],
    queryFn: () => base44.entities.WaitlistSignup.list('-created_date', 500),
  });

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Company Size', 'Current Tool', 'Pain Point', 'Signup Date'];
    const rows = signups.map(s => [
      s.full_name || '',
      s.work_email || '',
      s.company_name || '',
      s.company_size || '',
      s.current_tool || '',
      s.biggest_pain_point || '',
      s.created_date ? format(new Date(s.created_date), 'yyyy-MM-dd HH:mm') : ''
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orqestr-waitlist-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Derived stats
  const withCompany = signups.filter(s => s.company_name).length;
  const thisWeek = signups.filter(s => {
    if (!s.created_date) return false;
    const d = new Date(s.created_date);
    const now = new Date();
    return (now - d) / (1000 * 60 * 60 * 24) <= 7;
  }).length;

  const toolCounts = signups.reduce((acc, s) => {
    if (s.current_tool) acc[s.current_tool] = (acc[s.current_tool] || 0) + 1;
    return acc;
  }, {});

  const painCounts = signups.reduce((acc, s) => {
    if (s.biggest_pain_point) acc[s.biggest_pain_point] = (acc[s.biggest_pain_point] || 0) + 1;
    return acc;
  }, {});

  const topTool = Object.entries(toolCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  const sizeCounts = signups.reduce((acc, s) => {
    if (s.company_size) acc[s.company_size] = (acc[s.company_size] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/Landing" className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            </Link>
            <img
              src="https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/76d337b2b_OrqestrLogo.jpg"
              alt="Orqestr"
              className="h-8 w-auto"
            />
            <span className="text-sm text-muted-foreground font-medium">/ Waitlist Admin</span>
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Waitlist Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Overview of all signups and intent signals</p>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Total Signups" value={signups.length} sub="All time" color="bg-primary/10 text-primary" />
          <StatCard icon={TrendingUp} label="This Week" value={thisWeek} sub="Last 7 days" color="bg-blue-50 text-blue-600" />
          <StatCard icon={Building2} label="With Company" value={withCompany} sub={`${signups.length > 0 ? Math.round((withCompany / signups.length) * 100) : 0}% provided company info`} color="bg-violet-50 text-violet-600" />
          <StatCard icon={Zap} label="Top Tool" value={topTool.split('/')[0]} sub="Most common current tool" color="bg-orange-50 text-orange-600" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pain points */}
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
                <PainPointBar key={k} label={k} count={v} total={signups.length} />
              ))}
              {Object.keys(painCounts).length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
            </div>
          </div>

          {/* Company size + tools */}
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
                {Object.entries(sizeCounts).sort().map(([k, v]) => (
                  <div key={k} className={`px-3 py-1.5 rounded-xl border text-xs font-medium ${sizeColors[k] || 'bg-secondary text-secondary-foreground border-border'}`}>
                    {k} employees · <span className="font-bold">{v}</span>
                  </div>
                ))}
                {Object.keys(sizeCounts).length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
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
                {Object.keys(toolCounts).length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Signups table */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">All Signups</p>
              <p className="text-xs text-muted-foreground mt-0.5">{signups.length} total · newest first</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : signups.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground text-sm">No signups yet.</div>
          ) : (
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
                  {signups.map((signup, i) => (
                    <tr key={signup.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-3.5">
                        <p className="font-medium text-foreground">{signup.full_name || <span className="text-muted-foreground">—</span>}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[180px]">{signup.work_email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-foreground">
                          <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          {signup.company_name || <span className="text-muted-foreground">—</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        {signup.company_size ? (
                          <span className={`inline-flex px-2.5 py-1 rounded-lg border text-xs font-medium ${sizeColors[signup.company_size] || 'bg-secondary text-secondary-foreground border-border'}`}>
                            {signup.company_size}
                          </span>
                        ) : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="px-4 py-3.5">
                        {signup.current_tool ? (
                          <span className={`inline-flex px-2.5 py-1 rounded-lg border text-xs font-medium ${toolColors[signup.current_tool] || 'bg-secondary text-secondary-foreground border-border'}`}>
                            {signup.current_tool}
                          </span>
                        ) : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="px-4 py-3.5 max-w-[200px]">
                        <span className="text-muted-foreground text-xs truncate block">{signup.biggest_pain_point || '—'}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {signup.created_date ? format(new Date(signup.created_date), 'MMM d, yyyy') : '—'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}