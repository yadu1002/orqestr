import React from 'react';

const GREEN = '#16a34a';
const GAP_DEG = 140;
const ARC_DEG = 360 - GAP_DEG; // 220
const START_DEG = 90 + GAP_DEG / 2; // 160

const toRad = (d) => (d * Math.PI) / 180;
const polarX = (cx, angle, r) => cx + r * Math.cos(toRad(angle));
const polarY = (cy, angle, r) => cy + r * Math.sin(toRad(angle));

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = { x: polarX(cx, startAngle, r), y: polarY(cy, startAngle, r) };
  const end = { x: polarX(cx, endAngle, r), y: polarY(cy, endAngle, r) };
  const largeArc = (endAngle - startAngle + 360) % 360 > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

// pct: 0-100 value to show on gauge
// If pct is null/undefined, show raw `value` text instead of a gauge
export default function GaugeCard({ label, value, pct, accentColor, topColor }) {
  const size = 110;
  const cx = size / 2;
  const cy = size / 2;
  const r = 40;

  const fillEnd = START_DEG - (Math.min(pct ?? 0, 100) / 100) * ARC_DEG;
  const trackPath = describeArc(cx, cy, r, START_DEG, START_DEG - ARC_DEG);
  const fillPath = pct != null ? describeArc(cx, cy, r, START_DEG, fillEnd) : null;

  const strokeColor = accentColor || GREEN;
  const borderTopColor = topColor || strokeColor;

  return (
    <div style={{
      background: '#F8F9FA',
      border: '1px solid #E5E7EB',
      borderTop: `3px solid ${borderTopColor}`,
      borderRadius: 8,
      padding: '16px 12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', marginBottom: 10, textAlign: 'center' }}>{label}</p>
      <div style={{ position: 'relative', width: size, height: size * 0.76 }}>
        <svg width={size} height={size} style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
          <path d={trackPath} fill="none" stroke="#E5E7EB" strokeWidth="9" strokeLinecap="round" />
          {fillPath && <path d={fillPath} fill="none" stroke={strokeColor} strokeWidth="9" strokeLinecap="round" />}
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>{value}</span>
        </div>
      </div>
    </div>
  );
}