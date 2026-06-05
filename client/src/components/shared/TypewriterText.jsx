import { useState, useEffect } from 'react';

const TypewriterText = ({ phrases, speed = 80, deleteSpeed = 40, pause = 2000 }) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases?.length) return;
    const current = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, speed, deleteSpeed, pause]);

  return (
    <span>
      <span className="gradient-text">{text}</span>
      <span style={{ color: 'var(--accent)', animation: 'blink 1s step-end infinite' }}>|</span>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </span>
  );
};

export default TypewriterText;
