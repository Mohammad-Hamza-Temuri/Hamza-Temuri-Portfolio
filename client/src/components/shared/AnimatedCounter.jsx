import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const AnimatedCounter = ({ to, suffix = '', prefix = '', label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 'clamp(2rem, 5vw, 2.75rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        color: 'var(--text-primary)',
        lineHeight: 1,
      }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      {label && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontWeight: 500 }}>
          {label}
        </p>
      )}
    </div>
  );
};

export default AnimatedCounter;
