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
        className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all ${
          collapsed ? 'justify-center' : 'justify-between'
        } ${
          active
            ? 'bg-white/10 text-white font-medium'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className={`flex items-center ${collapsed ? '' : 'gap-2.5'}`}>
          <Icon className="w-4 h-4 shrink-0" />
          {!collapsed && <span>{label}</span>}
        </div>
        {!collapsed && badge && (
          <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        {collapsed && badge && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        )}
      </button>
      {collapsed && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-slate-800 text-white text-xs font-medium px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg">
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
      className="shrink-0 flex flex-col bg-[#0F172A] text-white overflow-hidden"
      style={{ minWidth: collapsed ? 56 : 220 }}
    >
      {/* Logo + collapse toggle */}
      <div className="h-14 flex items-center border-b border-white/10 px-3 shrink-0">
        <div className={`flex items-center gap-2 flex-1 min-w-0 ${collapsed ? 'justify-center' : ''}`}>
          <Zap className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />
          {!collapsed && (
            <motion.span
              initial={false}
              animate={{ opacity: collapsed ? 0 : 1 }}
              className="text-sm font-bold text-white whitespace-nowrap"
            >
              Orqestr
            </motion.span>
          )}
          {!collapsed && (
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/15 border border-emerald-400/30 px-1.5 py-0.5 rounded-full ml-1 whitespace-nowrap">
              Demo
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5 mt-1">
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
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30 px-2 mb-1">Admin</p>
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
      <div className="p-2 border-t border-white/10">
        <div className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg ${collapsed ? 'justify-center px-0' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-semibold shrink-0">
            SC
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">Sarah Chen</p>
              <p className="text-[10px] text-white/40">VP Customer Success</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}