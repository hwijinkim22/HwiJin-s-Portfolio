import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const threshold = options.threshold ?? 0.2;
  const rootMargin = options.rootMargin ?? "-50px";

  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold,
      rootMargin
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible, firstLoading };
};