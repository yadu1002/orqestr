import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, BookOpen, Users, Plug, BarChart2, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { id: 'signals', label: 'Signals', icon: Zap, badge: 6 },
  { id: 'accounts', label: 'Accounts', icon: Users },
  { id: 'playbooks', label: 'Playbooks', icon: BookOpen },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
];

const adminItems = [
  { id: 'admin', label: 'Waitlist Admin', icon: ShieldCheck },
];

function NavButton({ id, label, icon: Icon, badge, active, collapsed, onClick }) {
  return (
    <div className="relative group">
      <button
        onClick={() => onClick(id)}
        className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          collapsed ? 'justify-center' : 'justify-between'
        } ${active
          ? 'bg-primary/10 text-primary border border-primary/20'
          : 'text-muted-foreground border border-transparent hover:bg-secondary hover:text-foreground'
        }`}
      >
        <div className={`flex items-center ${collapsed ? '' : 'gap-2.5'}`}>
          <Icon className="w-4 h-4 shrink-0" />
          {!collapsed && <span>{label}</span>}
        </div>
        {!collapsed && badge && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-destructive text-white">
            {badge}
          </span>
        )}
        {collapsed && badge && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
        )}
      </button>
      {collapsed && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg bg-foreground text-background border border-border">
            {label}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DemoSidebar({ activeView, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: collapsed ? 56 : 220 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="shrink-0 flex flex-col overflow-hidden bg-card border-r border-border"
      style={{ minWidth: collapsed ? 56 : 220 }}
    >
      {/* Logo + collapse toggle */}
      <div className="h-14 flex items-center px-3 shrink-0 border-b border-border">
        <div className={`flex items-center gap-2 flex-1 min-w-0 ${collapsed ? 'justify-center' : ''}`}>
          {collapsed ? (
            <img src="https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/76d337b2b_OrqestrLogo.jpg" alt="Orqestr" className="h-8 w-8 object-contain rounded" />
          ) : (
            <>
              <img src="https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/76d337b2b_OrqestrLogo.jpg" alt="Orqestr" className="h-9 w-auto object-contain" />
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1 bg-secondary text-muted-foreground border border-border">
                DEMO
              </span>
            </>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="w-6 h-6 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="w-6 h-6 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1 mt-1">
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            {...item}
            active={activeView === item.id}
            collapsed={collapsed}
            onClick={onNavigate}
          />
        ))}
      </nav>

      {/* Admin section */}
      <div className="px-2 pb-3">
        {!collapsed && (
          <p className="text-[9px] font-bold uppercase tracking-widest px-2 mb-1 text-muted-foreground">Admin</p>
        )}
        {adminItems.map((item) => (
          <NavButton
            key={item.id}
            {...item}
            active={activeView === item.id}
            collapsed={collapsed}
            onClick={onNavigate}
          />
        ))}
      </div>

      {/* User */}
      <div className="p-2 border-t border-border">
        <div className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg ${collapsed ? 'justify-center px-0' : ''}`}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-primary/10 text-primary border border-primary/20">
            SC
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate text-foreground">Sarah Chen</p>
              <p className="text-[9px] text-muted-foreground">VP Customer Success</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}