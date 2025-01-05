"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { projectsData } from "../data";
import Link from "next/link";
import { Github } from "lucide-react";
import Image from "next/image";

const useIntersectionObserver = (options: { threshold?: number, rootMargin?: string } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

	// const memoOptions = useMemo(() => options, [options]);
	const memoOptions = useMemo(() => {
		return {
			threshold:options.threshold || 0.2,
			rootMargin: options.rootMargin || "-50px"
		}
	}, [options])

  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
		const currentRef = ref.current; 
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, memoOptions);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [memoOptions]);

  return { ref, isVisible, firstLoading };
};

const ProjectDetail = () => {
  const params = useParams();
  const projectId = params.id as string;
  const project = projectsData[projectId];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        프로젝트를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href={"/"}
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          ← 메인으로 돌아가기
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={400}
            className="w-full h-64 object-cover"
          />

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <p className="text-blue-600 mb-4">{project.date}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.details && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">프로젝트 개요</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {project.details.overview}
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">주요 기능</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {project.details.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-700">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  {project.details.github && (
                    <Link
                      href={project.details.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex bg-black text-white px-6 py-2 rounded-full hover:bg-blue-400 items-center gap-2"
                    >
                      Github <Github size={20} />
                    </Link>
                  )}

                  {project.details.demo && (
                    <Link
                      href={project.details.demo}
                      target="_blank"
                      rel="noopener foreferrer"
                      className="flex bg-black text-white px-6 py-2 rounded-full hover:bg-blue-400 items-center gap-2"
                    >
                      사이트 링크
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {project.details?.screenshots && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 pb-2 inline-block">
              프로젝트 둘러보기
            </h2>

            {project.details.screenshots.map((screenshot, idx) => {
							const { ref, isVisible, firstLoading } = useIntersectionObserver({
								threshold: 0.2,
								rootMargin: "-50px",
							});
              return (
                <div
                  ref={ref}
                  key={idx}
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
                        <h3 className="text-xl font-bold mb-4">
                          {screenshot.title}
                        </h3>
                        <p className="text-gray=700 whitespace-pre-line">
                          {screenshot.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2">
                        <h3 className="text-xl font-bold mb-4">
                          {screenshot.title}
                        </h3>
                        <p className=" text-gray-700 whitespace-pre-line">
                          {screenshot.description}
                        </p>
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
            })}
          </div>
        )}

        {project.details?.screenshots && (
          <div className="mt-16">
            <h2 className="font-bold text-3xl border-blue-500 border-b-2 mb-8 inline-block">
              개선 경험
            </h2>
            <li className="font-semibold mb-8">
              GSAP 라이브러리를 활용한 스크롤 기반 애니메이션 및 행성 슬라이드를
              구현하여 사용자 경험을 향상,
              <br />
              이로 인해 유저테스트 참여율이 25% 증가
            </li>
						<li className="font-semibold mb-8">
							Next.js와 TypeScript를 활용한 SSR 구현으로 SEO 최적화 및 Tailwind CSS를 이용한 효율적인 반응형 디자인 적용
						</li>
						<li className="font-semibold mb-24">
							Zustand와 Tanstack Query를 활용한 상태관리 및 데이터 패칭 최적화
							 <br/>
							웹사이트 성능 테스트 결과, 페이지 로딩 시간 20% 가량 단축
						</li>

						<h2 className="font-bold text-3xl border-blue-500 border-b-2 mb-8 inline-block">
							트러블슈팅
						</h2>

						<h3 className="font-bold text-xl">문제 발생</h3>
						<li className="font-semibold mb-16">
							GSAP 스크롤 애니메이션과 SSR 간의 충돌 문제: Next.js의 SSR 환경에서 GSAP 애니메이션이 초기 렌더링 시 오작동
						</li>

						<h3 className="font-bold text-xl">문제 접근</h3>
						<li className="font-semibold mb-16">
							사용자 경험 저하를 방지하기 위해 CSR에서만 GSAP 애니메이션을 초기화하는 방안 모색
						</li>

						<h3 className="font-bold text-xl">해결 방법</h3>
						<li className="font-semibold mb-8">
							useEffect 훅을 사용해 CSR에서 GSAP 애니메이션을 초기화 <br/> ➡️
							GSAP 라이브러리의 ScrollTrigger.refresh() 메서드를 통해 페이지 로드 후, 애니메이션 재작동 <br/> ➡️
							조건부 렌더링을 적용하여 SSR에서는 정적 레이아웃을 제공함으로써 부드러운 스크롤 기반 애니메이션을 구현하고, <br/>
							초기 로딩 시 사용자 경험을 개선
						</li>
						<p className="font-bold text-xl">✅ 이 과정을 통한 웹사이트 성능 테스트: 페이지의 초기 로딩 속도 20% 개선 + <br/> 유저테스트 피드백에서 긍정적인 반응</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
