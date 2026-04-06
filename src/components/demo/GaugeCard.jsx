import React from 'react';

const GAP_DEG = 150;
const ARC_DEG = 360 - GAP_DEG;
const START_DEG = 90 + GAP_DEG / 2;

const toRad = (d) => (d * Math.PI) / 180;
const polarX = (cx, angle, r) => cx + r * Math.cos(toRad(angle));
const polarY = (cy, angle, r) => cy + r * Math.sin(toRad(angle));

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = { x: polarX(cx, startAngle, r), y: polarY(cy, startAngle, r) };
  const end = { x: polarX(cx, endAngle, r), y: polarY(cy, endAngle, r) };
  const largeArc = (endAngle - startAngle + 360) % 360 > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export default function GaugeCard({ label, value, pct, accentColor, topColor, subLabel }) {
  const size = 130;
  const cx = size / 2;
  const cy = size / 2;
  const r = 46;

  const safePct = Math.min(Math.max(pct ?? 0, 2), 100);
  const fillEnd = START_DEG - (safePct / 100) * ARC_DEG;
  const trackPath = describeArc(cx, cy, r, START_DEG, START_DEG - ARC_DEG);
  const fillPath = pct != null ? describeArc(cx, cy, r, START_DEG, fillEnd) : null;

  const strokeColor = accentColor || '#16a34a';
  const borderTopColor = topColor || strokeColor;

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #E5E7EB',
      borderTop: `4px solid ${borderTopColor}`,
      borderRadius: 12,
      padding: '20px 16px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      gap: 0,
    }}>
      {/* Label */}
      <p style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        color: '#6B7280',
        marginBottom: 12,
        textAlign: 'center',
        lineHeight: 1.4,
      }}>{label}</p>

      {/* Gauge */}
      <div style={{ position: 'relative', width: size, height: Math.round(size * 0.72) }}>
        <svg width={size} height={size} style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
          {/* Shadow/glow on track */}
          <path d={trackPath} fill="none" stroke="#F3F4F6" strokeWidth="12" strokeLinecap="round" />
          <path d={trackPath} fill="none" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
          {fillPath && (
            <path d={fillPath} fill="none" stroke={strokeColor} strokeWidth="10" strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 4px ${strokeColor}55)` }} />
          )}
        </svg>
        {/* Value centered in gauge */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          paddingBottom: 4,
        }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#111827', lineHeight: 1 }}>{value}</span>
          {subLabel && (
            <span style={{ fontSize: 9, fontWeight: 600, color: '#9CA3AF', marginTop: 3, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{subLabel}</span>
          )}
        </div>
      </div>

      {/* Percentage indicator */}
      {pct != null && (
        <p style={{ fontSize: 10, fontWeight: 600, color: strokeColor, marginTop: 4 }}>{pct}%</p>
      )}
    </div>
  );
}