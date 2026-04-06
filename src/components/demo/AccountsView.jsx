import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, X, Building2, Users, DollarSign, Calendar, Package, Shield, Phone, Mail, ChevronRight } from 'lucide-react';

const accounts = [
  {
    company: 'Stark Industries', arr: 210000, csm: 'Maria K.', health: 89, trend: 'up',
    renewal: '2026-11-01', tier: 'Enterprise', signals: 1, lastActive: '2h ago', marketUnit: 'North America',
    contractStart: '2024-11-01', industry: 'Manufacturing & Defense',
    products: ['Full Platform', 'Advanced Analytics', 'API Integration Suite', 'Workflow Builder'],
    preSales: { name: 'David Holt', title: 'Solutions Engineer', email: 'd.holt@orqestr.app', phone: '+1 415 555 0101' },
    postSales: { name: 'Maria K.', title: 'Customer Success Manager', email: 'm.k@orqestr.app', phone: '+1 415 555 0202' },
    ae: { name: 'Rachel Torres', title: 'Account Executive', email: 'r.torres@orqestr.app' },
    champion: { name: 'Pepper Potts', title: 'VP Operations', email: 'p.potts@stark.com' },
    sponsor: { name: 'Tony Stark', title: 'CEO', email: 't.stark@stark.com' },
    seats: 80, activeUsers: 71, notes: 'Key expansion candidate — exploring Enterprise+ tier for Q3.',
  },
  {
    company: 'Globex Industries', arr: 120000, csm: 'Maria K.', health: 24, trend: 'down',
    renewal: '2026-05-04', tier: 'Growth', signals: 3, lastActive: '21d ago', marketUnit: 'EMEA',
    contractStart: '2025-05-04', industry: 'Chemicals & Energy',
    products: ['Full Platform', 'Advanced Analytics'],
    preSales: { name: 'Sam Park', title: 'Solutions Engineer', email: 's.park@orqestr.app', phone: '+44 20 5555 0101' },
    postSales: { name: 'Maria K.', title: 'Customer Success Manager', email: 'm.k@orqestr.app', phone: '+1 415 555 0202' },
    ae: { name: 'Ben Walsh', title: 'Account Executive', email: 'b.walsh@orqestr.app' },
    champion: { name: 'Hank Scorpio', title: 'Head of Ops', email: 'h.scorpio@globex.com' },
    sponsor: { name: 'Julius Hibbert', title: 'COO', email: 'j.hibbert@globex.com' },
    seats: 45, activeUsers: 8, notes: 'At critical churn risk — renewal in 30 days, no QBR scheduled.',
  },
  {
    company: 'Acme Corp', arr: 84000, csm: 'Jordan P.', health: 38, trend: 'down',
    renewal: '2026-07-15', tier: 'Growth', signals: 2, lastActive: '14d ago', marketUnit: 'North America',
    contractStart: '2025-07-15', industry: 'Consumer Goods',
    products: ['Core Platform', 'Workflow Builder'],
    preSales: { name: 'Nina Ross', title: 'Solutions Engineer', email: 'n.ross@orqestr.app', phone: '+1 312 555 0303' },
    postSales: { name: 'Jordan P.', title: 'Customer Success Manager', email: 'j.p@orqestr.app', phone: '+1 312 555 0404' },
    ae: { name: 'Chris Lee', title: 'Account Executive', email: 'c.lee@orqestr.app' },
    champion: { name: 'Wile E. Coyote', title: 'Director of Product', email: 'w.coyote@acme.com' },
    sponsor: { name: 'Road Runner', title: 'CTO', email: 'r.runner@acme.com' },
    seats: 30, activeUsers: 6, notes: 'Feature adoption playbook triggered Apr 3. Training sessions scheduled.',
  },
  {
    company: 'Wayne Enterprises', arr: 52000, csm: 'Lisa A.', health: 91, trend: 'up',
    renewal: '2026-09-20', tier: 'Startup', signals: 0, lastActive: 'Today', marketUnit: 'North America',
    contractStart: '2025-09-20', industry: 'Diversified',
    products: ['Core Platform', 'Advanced Analytics'],
    preSales: { name: 'David Holt', title: 'Solutions Engineer', email: 'd.holt@orqestr.app', phone: '+1 415 555 0101' },
    postSales: { name: 'Lisa A.', title: 'Customer Success Manager', email: 'l.a@orqestr.app', phone: '+1 646 555 0505' },
    ae: { name: 'Rachel Torres', title: 'Account Executive', email: 'r.torres@orqestr.app' },
    champion: { name: 'Lucius Fox', title: 'Head of Technology', email: 'l.fox@wayne.com' },
    sponsor: { name: 'Bruce Wayne', title: 'CEO', email: 'b.wayne@wayne.com' },
    seats: 20, activeUsers: 19, notes: 'High health — potential upsell to Growth tier in Q3.',
  },
  {
    company: 'Umbrella Corp', arr: 67000, csm: 'Jordan P.', health: 41, trend: 'down',
    renewal: '2026-08-12', tier: 'Growth', signals: 2, lastActive: '3d ago', marketUnit: 'APAC',
    contractStart: '2025-08-12', industry: 'Pharma & Life Sciences',
    products: ['Full Platform', 'API Integration Suite'],
    preSales: { name: 'Kenji Ito', title: 'Solutions Engineer', email: 'k.ito@orqestr.app', phone: '+81 3 5555 0606' },
    postSales: { name: 'Jordan P.', title: 'Customer Success Manager', email: 'j.p@orqestr.app', phone: '+1 312 555 0404' },
    ae: { name: 'Chris Lee', title: 'Account Executive', email: 'c.lee@orqestr.app' },
    champion: { name: 'Albert Wesker', title: 'VP R&D', email: 'a.wesker@umbrella.com' },
    sponsor: { name: 'Oswell Spencer', title: 'Chairman', email: 'o.spencer@umbrella.com' },
    seats: 25, activeUsers: 10, notes: 'Support escalation pattern detected — API issues unresolved.',
  },
  {
    company: 'Initech LLC', arr: 36000, csm: 'Tom B.', health: 55, trend: 'flat',
    renewal: '2026-10-08', tier: 'Startup', signals: 1, lastActive: '7d ago', marketUnit: 'North America',
    contractStart: '2025-10-08', industry: 'Technology',
    products: ['Core Platform'],
    preSales: { name: 'Nina Ross', title: 'Solutions Engineer', email: 'n.ross@orqestr.app', phone: '+1 312 555 0303' },
    postSales: { name: 'Tom B.', title: 'Customer Success Manager', email: 't.b@orqestr.app', phone: '+1 512 555 0707' },
    ae: { name: 'Ben Walsh', title: 'Account Executive', email: 'b.walsh@orqestr.app' },
    champion: { name: 'Bill Lumbergh', title: 'VP Engineering', email: 'b.lumbergh@initech.com' },
    sponsor: { name: 'Peter Gibbons', title: 'CTO', email: 'p.gibbons@initech.com' },
    seats: 15, activeUsers: 9, notes: 'Stable — snoozed feature adoption signal for 7 days.',
  },
  {
    company: 'Oscorp', arr: 95000, csm: 'Lisa A.', health: 76, trend: 'up',
    renewal: '2026-12-01', tier: 'Growth', signals: 0, lastActive: 'Today', marketUnit: 'EMEA',
    contractStart: '2024-12-01', industry: 'Biotech',
    products: ['Full Platform', 'Workflow Builder', 'Advanced Analytics'],
    preSales: { name: 'Sam Park', title: 'Solutions Engineer', email: 's.park@orqestr.app', phone: '+44 20 5555 0101' },
    postSales: { name: 'Lisa A.', title: 'Customer Success Manager', email: 'l.a@orqestr.app', phone: '+1 646 555 0505' },
    ae: { name: 'Rachel Torres', title: 'Account Executive', email: 'r.torres@orqestr.app' },
    champion: { name: 'Harry Osborn', title: 'Head of Product', email: 'h.osborn@oscorp.com' },
    sponsor: { name: 'Norman Osborn', title: 'CEO', email: 'n.osborn@oscorp.com' },
    seats: 35, activeUsers: 28, notes: 'Healthy and growing — QBR scheduled for May.',
  },
  {
    company: 'Cyberdyne Systems', arr: 155000, csm: 'Tom B.', health: 63, trend: 'flat',
    renewal: '2026-06-30', tier: 'Enterprise', signals: 1, lastActive: '5d ago', marketUnit: 'APAC',
    contractStart: '2024-06-30', industry: 'Defense & AI',
    products: ['Full Platform', 'Advanced Analytics', 'API Integration Suite'],
    preSales: { name: 'Kenji Ito', title: 'Solutions Engineer', email: 'k.ito@orqestr.app', phone: '+81 3 5555 0606' },
    postSales: { name: 'Tom B.', title: 'Customer Success Manager', email: 't.b@orqestr.app', phone: '+1 512 555 0707' },
    ae: { name: 'Chris Lee', title: 'Account Executive', email: 'c.lee@orqestr.app' },
    champion: { name: 'Miles Dyson', title: 'Chief Scientist', email: 'm.dyson@cyberdyne.com' },
    sponsor: { name: 'Serena Kogan', title: 'CEO', email: 's.kogan@cyberdyne.com' },
    seats: 60, activeUsers: 38, notes: 'Renewal in 3 months — QBR not yet scheduled. Monitor closely.',
  },
];

const MARKET_UNITS = ['All', 'North America', 'EMEA', 'APAC'];

function HealthPill({ score }) {
  const cfg = score >= 70 ? 'bg-green-50 text-green-700' : score >= 40 ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600';
  const barColor = score >= 70 ? '#16a34a' : score >= 40 ? '#f97316' : '#ef4444';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, background: barColor }} />
      </div>
      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${cfg}`}>{score}</span>
    </div>
  );
}

function PersonCard({ person, role }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary border border-border">
      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
        {person.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-foreground">{person.name}</p>
        <p className="text-[10px] text-muted-foreground">{person.title}</p>
        <p className="text-[9px] text-primary mt-0.5">{role}</p>
        <p className="text-[10px] text-muted-foreground truncate">{person.email}</p>
        {person.phone && <p className="text-[10px] text-muted-foreground">{person.phone}</p>}
      </div>
    </div>
  );
}

function AccountDrawer({ account, onClose }) {
  if (!account) return null;
  const healthColor = account.health >= 70 ? '#16a34a' : account.health >= 40 ? '#f97316' : '#ef4444';

  return (
    <AnimatePresence>
      <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 z-40 bg-black/30" />
      <motion.div key="drawer"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="fixed top-0 right-0 bottom-0 z-50 w-[420px] bg-white border-l border-border shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base font-bold text-foreground">{account.company}</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-border bg-secondary text-muted-foreground">{account.tier}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{account.industry} · {account.marketUnit}</p>
            </div>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Health bar */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground w-20">Health Score</span>
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${account.health}%`, background: healthColor }} />
            </div>
            <span className="text-xs font-bold w-6 text-right" style={{ color: healthColor }}>{account.health}</span>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* KPIs */}
          <div className="px-5 py-4 border-b border-border">
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: DollarSign, label: 'ARR', value: `$${(account.arr/1000).toFixed(0)}k` },
                { icon: Users, label: 'Seats', value: `${account.activeUsers} / ${account.seats} active` },
                { icon: Calendar, label: 'Contract Start', value: new Date(account.contractStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                { icon: Calendar, label: 'Renewal Date', value: new Date(account.renewal).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg p-3 bg-secondary border border-border">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wide">{label}</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products in use */}
          <div className="px-5 py-4 border-b border-border">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Products In Use</p>
            <div className="flex flex-wrap gap-2">
              {account.products.map(p => (
                <span key={p} className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
                  <Package className="w-3 h-3" /> {p}
                </span>
              ))}
            </div>
          </div>

          {/* People */}
          <div className="px-5 py-4 border-b border-border">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Team & Stakeholders</p>
            <div className="space-y-2">
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Orqestr Team</p>
              <PersonCard person={account.ae} role="Account Executive" />
              <PersonCard person={account.preSales} role="Pre-Sales / Solutions Engineering" />
              <PersonCard person={account.postSales} role="Post-Sales / Customer Success" />
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-3 mb-1">Customer Stakeholders</p>
              <PersonCard person={account.champion} role="Champion" />
              <PersonCard person={account.sponsor} role="Executive Sponsor" />
            </div>
          </div>

          {/* Notes */}
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">CSM Notes</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{account.notes}</p>
            {account.signals > 0 && (
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                <Shield className="w-3.5 h-3.5 shrink-0" />
                {account.signals} active signal{account.signals > 1 ? 's' : ''} requiring attention
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-4 border-t border-border shrink-0 flex gap-2 bg-secondary/40">
          <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            <Phone className="w-3.5 h-3.5" /> Schedule Call
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg border border-border bg-white text-muted-foreground hover:bg-secondary transition-colors">
            <Mail className="w-3.5 h-3.5" /> Send Email
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function AccountsView() {
  const [sort, setSort] = useState('health_asc');
  const [marketUnit, setMarketUnit] = useState('All');
  const [selectedAccount, setSelectedAccount] = useState(null);

  const filtered = accounts.filter(a => marketUnit === 'All' || a.marketUnit === marketUnit);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'health_asc') return a.health - b.health;
    if (sort === 'arr') return b.arr - a.arr;
    if (sort === 'signals') return b.signals - a.signals;
    return 0;
  });

  const atRisk = filtered.filter(a => a.health < 50).length;
  const totalArr = filtered.reduce((s, a) => s + a.arr, 0);
  const atRiskArr = filtered.filter(a => a.health < 50).reduce((s, a) => s + a.arr, 0);

  const statCards = [
    { label: 'TOTAL ACCOUNTS', value: filtered.length,                          numColor: '#1d4ed8', topColor: '#3b82f6' },
    { label: 'AT-RISK ACCOUNTS', value: atRisk,                                 numColor: '#ea580c', topColor: '#f97316' },
    { label: 'TOTAL ARR', value: `$${(totalArr / 1000).toFixed(0)}k`,           numColor: '#1d4ed8', topColor: '#3b82f6' },
    { label: 'AT-RISK ARR', value: `$${(atRiskArr / 1000).toFixed(0)}k`,        numColor: '#ea580c', topColor: '#f97316' },
  ];

  return (
    <div>
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {statCards.map(t => (
          <div key={t.label} style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', borderTop: `3px solid ${t.topColor}`, borderRadius: 8, padding: 20 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', marginBottom: 8 }}>{t.label}</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: t.numColor, lineHeight: 1 }}>{t.value}</p>
          </div>
        ))}
      </div>

      {/* Market unit filter */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1">Market Unit:</span>
        {MARKET_UNITS.map(mu => (
          <button key={mu} onClick={() => setMarketUnit(mu)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
              marketUnit === mu ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground bg-white hover:bg-secondary'
            }`}
          >{mu}</button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-white overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-border bg-white">
          {[
            { label: 'ACCOUNT', sort: null },
            { label: 'ARR', sort: 'arr' },
            { label: 'HEALTH', sort: 'health_asc' },
            { label: 'CSM', sort: null },
            { label: 'RENEWAL', sort: null },
            { label: 'SIGNALS', sort: 'signals' },
            { label: 'LAST ACTIVE', sort: null },
            { label: '', sort: null },
          ].map(col => (
            <button key={col.label} onClick={() => col.sort && setSort(col.sort)}
              className={`text-left flex items-center gap-1 text-[10px] font-bold tracking-wider ${col.sort ? 'cursor-pointer' : 'cursor-default'}`}
              style={{ color: '#374151' }}>
              {col.label}
              {col.sort && <span style={{ color: sort === col.sort ? '#16a34a' : '#9ca3af', fontSize: 9 }}>▲▼</span>}
            </button>
          ))}
        </div>

        {sorted.map((account, i) => (
          <motion.div key={account.company} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
            onClick={() => setSelectedAccount(account)}
            className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3.5 border-b border-border hover:bg-green-50/40 cursor-pointer transition-colors last:border-0 group"
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
              ) : <span className="text-xs text-muted-foreground">—</span>}
            </div>
            <div className="flex items-center gap-1.5 self-center">
              {account.trend === 'up' && <TrendingUp className="w-3 h-3 text-primary" />}
              {account.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
              {account.trend === 'flat' && <Minus className="w-3 h-3 text-muted-foreground" />}
              <span className="text-xs text-muted-foreground">{account.lastActive}</span>
            </div>
            <div className="self-center">
              <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {selectedAccount && <AccountDrawer account={selectedAccount} onClose={() => setSelectedAccount(null)} />}
    </div>
  );
}