'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
}

export default function LazySection({
  children,
  className = '',
  id,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Once loaded, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={sectionRef} className={className} id={id}>
      {isVisible || hasLoaded ? children : fallback}
    </div>
  );
}
