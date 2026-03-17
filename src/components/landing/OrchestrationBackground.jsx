import React, { useEffect, useRef } from 'react';

export default function OrchestrationBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let scrollY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll);

    // Nodes representing orchestration points
    const nodeCount = 18;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 4 + 2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle scroll-based gradient shift
      const scrollFactor = scrollY * 0.0003;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsla(${142 + scrollFactor * 20}, 60%, 97%, 1)`);
      gradient.addColorStop(0.5, `hsla(${210 + scrollFactor * 10}, 40%, 98%, 1)`);
      gradient.addColorStop(1, `hsla(${160 + scrollFactor * 15}, 50%, 96%, 1)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update & draw nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(142, 60%, 36%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        const pulseRadius = node.radius + Math.sin(node.pulse) * 1.5;

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(142, 60%, 36%, 0.05)`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(142, 60%, 36%, 0.35)`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}