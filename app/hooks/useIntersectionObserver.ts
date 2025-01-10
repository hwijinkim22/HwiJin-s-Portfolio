import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: options.threshold || 0.2,
      rootMargin: options.rootMargin || "-50px"
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    // 초기 로딩 상태 처리
    setTimeout(() => {
      setFirstLoading(false);
    }, 200);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible, firstLoading };
};