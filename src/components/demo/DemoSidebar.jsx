import React from 'react';
import { Bell, BookOpen, Users, Plug, BarChart2, Zap } from 'lucide-react';

const navItems = [
  { id: 'signals', label: 'Signal Feed', icon: Bell, badge: 12 },
  { id: 'playbooks', label: 'Playbooks', icon: BookOpen },
  { id: 'accounts', label: 'Accounts', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
];

export default function DemoSidebar({ activeView, onNavigate }) {
  return (
    <div className="w-56 shrink-0 flex flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-border">
        <img
          src="https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/76d337b2b_OrqestrLogo.jpg"
          alt="Orqestr"
          className="h-7 w-auto"
        />
        <span className="ml-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">Demo</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
              activeView === id
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="w-4 h-4" />
              {label}
            </div>
            {badge && (
              <span className="text-[10px] font-bold bg-destructive text-white px-1.5 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg">
          <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-semibold">
            SC
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Sarah Chen</p>
            <p className="text-[10px] text-muted-foreground">VP Customer Success</p>
          </div>
        </div>
      </div>
    </div>
  );
}