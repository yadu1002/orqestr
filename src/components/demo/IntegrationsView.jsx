import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Zap, RefreshCw } from 'lucide-react';

const integrations = [
  {
    category: 'CRM',
    items: [
      { name: 'Salesforce', status: 'connected', description: 'Account data, contacts, opportunities, tasks', lastSync: '2 min ago', records: '847 accounts' },
      { name: 'HubSpot', status: 'available', description: 'Contacts, deals, companies', lastSync: null, records: null },
    ]
  },
  {
    category: 'Product Analytics',
    items: [
      { name: 'Segment', status: 'connected', description: 'User events, session data, feature usage', lastSync: '30 sec ago', records: '2.4M events/mo' },
      { name: 'Amplitude', status: 'connected', description: 'Behavioral analytics, cohorts, funnels', lastSync: '5 min ago', records: '1.1M events/mo' },
      { name: 'Mixpanel', status: 'available', description: 'Event tracking, user flows, retention', lastSync: null, records: null },
    ]
  },
  {
    category: 'Customer Success',
    items: [
      { name: 'Gainsight', status: 'available', description: 'Health scores, CTAs, success plans (read-only)', lastSync: null, records: null },
      { name: 'Vitally', status: 'available', description: 'Account health, notes, tasks (read-only)', lastSync: null, records: null },
      { name: 'ChurnZero', status: 'available', description: 'ChurnScores, journeys, segments (read-only)', lastSync: null, records: null },
    ]
  },
  {
    category: 'Support',
    items: [
      { name: 'Zendesk', status: 'connected', description: 'Tickets, CSAT, escalations, agent activity', lastSync: '1 min ago', records: '12,400 tickets' },
      { name: 'Intercom', status: 'available', description: 'Conversations, contacts, segments', lastSync: null, records: null },
    ]
  },
  {
    category: 'Workflow & Notifications',
    items: [
      { name: 'Slack', status: 'connected', description: 'Alert delivery, one-click playbook actions', lastSync: 'Live', records: '#cs-alerts, #ae-signals' },
      { name: 'Email (SMTP)', status: 'connected', description: 'Automated outreach sequences', lastSync: 'Live', records: '340 emails sent this month' },
      { name: 'Google Calendar', status: 'connected', description: 'QBR and call scheduling via calendar API', lastSync: 'Live', records: null },
    ]
  },
  {
    category: 'Billing & Contract',
    items: [
      { name: 'Stripe', status: 'available', description: 'Subscription data, renewal dates, MRR', lastSync: null, records: null },
      { name: 'Chargebee', status: 'available', description: 'Subscription lifecycle, invoices', lastSync: null, records: null },
    ]
  },
];

const brandColors = {
  Salesforce: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
  HubSpot: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400',
  Segment: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
  Amplitude: 'from-blue-400/20 to-blue-500/10 border-blue-400/30 text-blue-300',
  Mixpanel: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
  Gainsight: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400',
  Vitally: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
  ChurnZero: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
  Zendesk: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400',
  Intercom: 'from-blue-600/20 to-blue-700/10 border-blue-600/30 text-blue-400',
  Slack: 'from-purple-600/20 to-purple-700/10 border-purple-600/30 text-purple-300',
  'Email (SMTP)': 'from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-400',
  'Google Calendar': 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400',
  Stripe: 'from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400',
  Chargebee: 'from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-400',
};

function IntegrationCard({ item }) {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(item.status === 'connected');
  const colors = brandColors[item.name] || 'from-white/10 to-white/5 border-white/20 text-white/50';

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1500);
  };

  return (
    <div className={`rounded-xl border bg-gradient-to-br p-4 ${colors} border`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-white">{item.name}</p>
            {connected && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
          </div>
          <p className="text-xs text-white/40 leading-relaxed mb-2">{item.description}</p>
          {connected && item.lastSync && (
            <div className="flex items-center gap-3 text-[10px] text-white/30">
              <span className="flex items-center gap-1"><RefreshCw className="w-2.5 h-2.5" /> {item.lastSync}</span>
              {item.records && <span>{item.records}</span>}
            </div>
          )}
        </div>
      </div>
      {!connected && (
        <button
          onClick={handleConnect}
          disabled={connecting}
          className="mt-3 w-full py-1.5 rounded-lg bg-white/8 text-white/60 text-xs font-medium hover:bg-white/12 transition-colors border border-white/10 flex items-center justify-center gap-1.5"
        >
          {connecting ? (
            <><RefreshCw className="w-3 h-3 animate-spin" /> Connecting...</>
          ) : (
            <><Zap className="w-3 h-3" /> Connect</>
          )}
        </button>
      )}
    </div>
  );
}

export default function IntegrationsView() {
  const connectedCount = integrations.flatMap(g => g.items).filter(i => i.status === 'connected').length;
  const totalCount = integrations.flatMap(g => g.items).length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Connected', value: connectedCount, color: 'text-emerald-400' },
          { label: 'Available', value: totalCount - connectedCount, color: 'text-white/50' },
          { label: 'Total Sources', value: totalCount, color: 'text-white' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl bg-white/4 border border-white/8 p-4">
            <p className="text-xs text-white/40 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {integrations.map(group => (
          <div key={group.category}>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">{group.category}</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {group.items.map(item => (
                <IntegrationCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}