"use client";
import React from 'react';
import Image from 'next/image';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'; 

interface Screenshot {
  image: string;
  title: string;
  description: string;
}

interface ScreenshotItemProps {
  screenshot: Screenshot;
  idx: number;
}

const Screenshot: React.FC<ScreenshotItemProps> = ({ screenshot, idx }) => {
  const { ref, isVisible, firstLoading } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "-50px",
  });

  return (
    <div
      ref={ref}
      className={`flex gap-8 items-center mb-40 transition-all duration-1000 ${
        firstLoading
          ? "opacity-100 translate-x-0"
          : isVisible
          ? "opacity-100 translate-x-0"
          : idx % 2 === 0
          ? "opacity-0 -translate-x-full"
          : "opacity-0 translate-x-full"
      }`}
    >
      {idx % 2 === 0 ? (
        <>
          <Image
            src={screenshot.image}
            alt={screenshot.title}
            className="w-1/2 rounded-lg shadow-lg"
            width={500}
            height={300}
            priority
          />
          <div className="w-1/2">
            <h3 className="text-xl font-bold mb-4">{screenshot.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{screenshot.description}</p>
          </div>
        </>
      ) : (
        <>
          <div className="w-1/2">
            <h3 className="text-xl font-bold mb-4">{screenshot.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{screenshot.description}</p>
          </div>
          <Image
            src={screenshot.image}
            alt={screenshot.title}
            className="w-1/2 rounded-lg shadow-lg"
            width={500}
            height={300}
            quality={100}
            priority
          />
        </>
      )}
    </div>
  );
};

export default Screenshot;