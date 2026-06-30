export function AnimatedBackground() {
  return (
    // No bg-background here — body/html handles the base color.
    // This only adds the slow drifting light on non-hero sections.
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

      <div
        className="absolute rounded-full"
        style={{
          width: '75vw',
          height: '75vw',
          top: '-25%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.028) 0%, transparent 65%)',
          filter: 'blur(32px)',
          animation: 'bgDrift1 32s ease-in-out infinite',
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: '55vw',
          height: '55vw',
          bottom: '-15%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.018) 0%, transparent 65%)',
          filter: 'blur(48px)',
          animation: 'bgDrift2 42s ease-in-out infinite',
        }}
      />

    </div>
  );
}
