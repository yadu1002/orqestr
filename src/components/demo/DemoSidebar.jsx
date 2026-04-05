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
          className={`w-full flex items-center px-3 py-2 rounded text-xs font-mono font-semibold transition-all ${
          collapsed ? 'justify-center' : 'justify-between'
        }`}
        style={active
          ? { background: 'rgba(0,200,83,0.12)', color: '#00C853', border: '1px solid rgba(0,200,83,0.25)' }
          : { color: '#8B949E', border: '1px solid transparent' }
        }
        onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#F0F6FC'; e.currentTarget.style.background = '#30363D'; } }}
        onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#8B949E'; e.currentTarget.style.background = 'transparent'; } }}
      >
        <div className={`flex items-center ${collapsed ? '' : 'gap-2.5'}`}>
          <Icon className="w-4 h-4 shrink-0" />
          {!collapsed && <span>{label}</span>}
        </div>
        {!collapsed && badge && (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: '#FF3B30', color: '#fff' }}>
            {badge}
          </span>
        )}
        {collapsed && badge && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#FF3B30' }} />
        )}
      </button>
      {collapsed && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-xs font-mono font-semibold px-2.5 py-1.5 rounded whitespace-nowrap shadow-lg" style={{ background: '#0D1117', color: '#F0F6FC', border: '1px solid #30363D' }}>
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
      className="shrink-0 flex flex-col overflow-hidden"
      style={{ background: '#161B22', borderRight: '1px solid #30363D' }}
      style={{ minWidth: collapsed ? 56 : 220 }}
    >
      {/* Logo + collapse toggle */}
      <div className="h-14 flex items-center px-3 shrink-0" style={{ borderBottom: '1px solid #30363D' }}>
        <div className={`flex items-center gap-2 flex-1 min-w-0 ${collapsed ? 'justify-center' : ''}`}>
          <Zap className="w-4 h-4 shrink-0 fill-current" style={{ color: '#00C853' }} />
          {!collapsed && (
            <motion.span
              initial={false}
              animate={{ opacity: collapsed ? 0 : 1 }}
              className="font-mono text-sm font-bold whitespace-nowrap tracking-widest"
              style={{ color: '#00C853' }}
            >
              ORQESTR
            </motion.span>
          )}
          {!collapsed && (
            <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ml-1 whitespace-nowrap tracking-wider" style={{ color: '#8B949E', background: '#0D1117', border: '1px solid #30363D' }}>
              DEMO
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="w-6 h-6 flex items-center justify-center rounded transition-colors shrink-0"
            style={{ color: '#8B949E' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#30363D'; e.currentTarget.style.color = '#F0F6FC'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B949E'; }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="w-6 h-6 flex items-center justify-center rounded transition-colors"
            style={{ color: '#8B949E' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#30363D'; e.currentTarget.style.color = '#F0F6FC'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B949E'; }}
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
          <p className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 mb-1" style={{ color: '#8B949E' }}>Admin</p>
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
      <div className="p-2" style={{ borderTop: '1px solid #30363D' }}>
        <div className={`flex items-center gap-2.5 px-2 py-1.5 rounded ${collapsed ? 'justify-center px-0' : ''}`}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0" style={{ background: 'rgba(0,200,83,0.15)', color: '#00C853', border: '1px solid rgba(0,200,83,0.25)' }}>
            SC
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-mono text-xs font-semibold truncate" style={{ color: '#F0F6FC' }}>Sarah Chen</p>
              <p className="font-mono text-[9px]" style={{ color: '#8B949E' }}>VP Customer Success</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}