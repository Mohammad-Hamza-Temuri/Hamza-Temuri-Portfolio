import { useState, useEffect, useRef } from 'react';

const TypewriterText = ({ phrases, speed = 80, deleteSpeed = 40, pause = 2000 }) => {
  const [displayed, setDisplayed] = useState('');
  const state = useRef({ phraseIndex: 0, charIndex: 0, isDeleting: false });

  useEffect(() => {
    if (!phrases?.length) return;

    let timeout;

    const tick = () => {
      const s = state.current;
      const current = phrases[s.phraseIndex];

      if (!s.isDeleting) {
        s.charIndex++;
        setDisplayed(current.slice(0, s.charIndex));

        if (s.charIndex === current.length) {
          timeout = setTimeout(() => {
            s.isDeleting = true;
            timeout = setTimeout(tick, deleteSpeed);
          }, pause);
        } else {
          timeout = setTimeout(tick, speed);
        }
      } else {
        s.charIndex--;
        setDisplayed(current.slice(0, s.charIndex));

        if (s.charIndex === 0) {
          s.isDeleting = false;
          s.phraseIndex = (s.phraseIndex + 1) % phrases.length;
        }
        timeout = setTimeout(tick, s.charIndex === 0 ? speed : deleteSpeed);
      }
    };

    timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [phrases, speed, deleteSpeed, pause]);

  return (
    <span>
      <span className="gradient-text">{displayed}</span>
      <span style={{ color: 'var(--accent)', animation: 'blink 1s step-end infinite' }}>|</span>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </span>
  );
};

export default TypewriterText;
