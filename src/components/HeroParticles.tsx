import { useEffect, useRef } from 'react';

/**
 * Brighter, more "alive" particle field for the Vaymo hero.
 * - Particles glow in primary blue, lines blend toward white
 * - Mouse acts as a soft attractor (light gravity) + connects with rays
 * - Subtle drift + tiny pulse so it feels organic, not mechanical
 * - Respects prefers-reduced-motion
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    type P = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; baseR: number;
      phase: number; speed: number;
    };
    let particles: P[] = [];

    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(180, Math.floor((width * height) / 8500));
      particles = Array.from({ length: target }, () => {
        const baseR = Math.random() * 1.6 + 0.7;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: baseR,
          baseR,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 0.8,
        };
      });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);

    const css = getComputedStyle(document.documentElement);
    const primary = css.getPropertyValue('--primary').trim() || '212 90% 58%';
    const soft = css.getPropertyValue('--gold-soft').trim() || '210 95% 75%';

    const MAX_DIST = 140;
    const MOUSE_DIST = 220;

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Update
      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;

          // soft drift wobble
          p.vx += (Math.random() - 0.5) * 0.004;
          p.vy += (Math.random() - 0.5) * 0.004;
          p.vx = Math.max(-0.5, Math.min(0.5, p.vx));
          p.vy = Math.max(-0.5, Math.min(0.5, p.vy));

          if (p.x < 0) { p.x = 0; p.vx *= -1; }
          if (p.x > width) { p.x = width; p.vx *= -1; }
          if (p.y < 0) { p.y = 0; p.vy *= -1; }
          if (p.y > height) { p.y = height; p.vy *= -1; }

          if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < MOUSE_DIST * MOUSE_DIST && d2 > 0.01) {
              const d = Math.sqrt(d2);
              // gentle attraction toward cursor
              const f = (1 - d / MOUSE_DIST) * 0.35;
              p.vx += (dx / d) * f * 0.05;
              p.vy += (dy / d) * f * 0.05;
            }
          }

          // breathing radius
          p.r = p.baseR + Math.sin(t * p.speed + p.phase) * 0.4;
        }
      }

      // Lines first (so dots sit on top, brighter)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST * MAX_DIST) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / MAX_DIST) * 0.35;
            ctx.strokeStyle = `hsla(${soft}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_DIST * MOUSE_DIST) {
            const alpha = (1 - Math.sqrt(d2) / MOUSE_DIST) * 0.7;
            ctx.strokeStyle = `hsla(${primary}, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Glowing dots
      for (const p of particles) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `hsla(${soft}, 0.95)`);
        grad.addColorStop(0.4, `hsla(${primary}, 0.55)`);
        grad.addColorStop(1, `hsla(${primary}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${soft}, 0.95)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
