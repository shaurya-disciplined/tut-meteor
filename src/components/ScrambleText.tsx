'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARS = '!<>-_\\/[]{}—=+*^?#_0123456789';

export default function ScrambleText({
  text,
  speed = 0.3,
  delay = 0,
  className = '',
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  // Start with invisible text of the exact same length to preserve layout
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const startScramble = () => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText((current) =>
          current
            .split('')
            .map((letter, index) => {
              // If we've passed this letter's iteration, show the actual text character
              if (index < iteration) {
                return text[index];
              }
              // Skip spaces
              if (text[index] === ' ') return ' ';
              // Otherwise show a random hacker character
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += speed;
      }, 30); // 30ms per tick is a good cinematic speed
    };

    const timeout = setTimeout(startScramble, delay * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
