import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, RefreshCw } from 'lucide-react';

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

function IntegrationCard({ item }) {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(item.status === 'connected');

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => { setConnecting(false); setConnected(true); }, 1500);
  };

  return (
    <div className={`rounded-2xl border p-4 bg-card shadow-sm ${connected ? 'border-primary/20 bg-accent/30' : 'border-border'}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          {connected && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">{item.description}</p>
      {connected && item.lastSync && (
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><RefreshCw className="w-2.5 h-2.5" /> {item.lastSync}</span>
          {item.records && <span>{item.records}</span>}
        </div>
      )}
      {!connected && (
        <button
          onClick={handleConnect}
          disabled={connecting}
          className="mt-2 w-full py-1.5 rounded-xl bg-secondary text-muted-foreground text-xs font-medium hover:bg-muted transition-colors border border-border flex items-center justify-center gap-1.5"
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
          { label: 'Connected', value: connectedCount, color: 'text-primary' },
          { label: 'Available', value: totalCount - connectedCount, color: 'text-muted-foreground' },
          { label: 'Total Sources', value: totalCount, color: 'text-foreground' },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl bg-card border border-border p-4 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {integrations.map(group => (
          <div key={group.category}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{group.category}</p>
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