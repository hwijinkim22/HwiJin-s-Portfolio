"use client";

import React from "react";
import { useState, useEffect, useRef, RefObject } from "react";
import { Project } from "./types/project";
import Link from "next/link";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  sectionRef: RefObject<HTMLElement>;
}

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isVisible };
};

const Section = ({ id, title, children, sectionRef }: SectionProps) => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "-100px",
  });

  const setRefs = (element: HTMLElement | null) => {
    (ref as any).current = element;
    if (sectionRef) {
      (sectionRef as any).current = element;
    }
  };

  return (
    <section
      id={id}
      ref={setRefs}
      className={`min-h-screen p-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        {children}
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("about");

  const sectionRefs = {
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    archiving: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const options = {
      threshold: 0.5,
      rootMargin: "-50% 0px",
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current;

    if (section) {
      const navHeight = 200;
      const offset =
        section.offsetTop -
        navHeight -
        (window.innerHeight - section.offsetHeight) / 2;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }

    setActiveSection(sectionId);
  };

  const navigationItems = [
    { id: "about", label: "About Me" },
    { id: "skills", label: "Skills" },
    { id: "archiving", label: "Archiving" },
    { id: "projects", label: "Projects" },
  ];

  const skillsData = {
    frontend: [
      { name: "HTML/CSS", level: 100 },
      { name: "JavaScript", level: 100 },
      { name: "React", level: 100 },
      { name: "TypeScript", level: 95 },
      { name: "Next.js", level: 95 },
    ],
    backend: [{ name: "Supabase", level: 95 }],
  };

  const projectsData: Project[] = [
    {
      id: "voyagex",
      title: "Voyage X",
      date: "2024.07 ~ 2024.08",
      description: "미래 우주 여행에 대한 다양한 정보 및 여행 상품/굿즈 결제",
      technologies: ["React", "TypeScript", "Tailwind"],
      image: "/images/VoyageX.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-black">
              Hwijin's Portfolio
            </div>
            <div className="flex space-x-8">
              {navigationItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`transition-colors duration-300 hover:text-blue-600 ${
                    activeSection === id ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 text-black">
        <Section id="about" title="About Me" sectionRef={sectionRefs.about}>
          <div className="relative min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="/images/profile.jpeg"
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-3xl font-black text-black">김휘진</h3>
                  <p className="text-xl font-semibold text-gray-800">
                    Frontend Developer
                  </p>
                </div>
              </div>
              <p className="text-black text-base font-medium">
                안녕하세요 {" "}
                <span className="font-bold text-xl text-blue-600">
                  사용자를 최우선으로 생각하는 개발자
                </span>{" "}
                김휘진입니다.
                <br />
                사용자가 없다면 개발자도 없다는 마인드로 임합니다.
              </p>
            </div>
            </div>
            <div className="absolute bottom-60 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <p className="text-blue-500 animate-bounce">Scroll Down ↓</p>
            </div>
          </div>
        </Section>

        <Section id="skills" title="Skills" sectionRef={sectionRefs.skills}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Frontend
              </h3>
              <div className="space-y-4">
                {skillsData.frontend.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-gray-800">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Backend
              </h3>
              <div className="space-y-4">
                {skillsData.backend.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-gray-800">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="archiving"
          title="Archiving"
          sectionRef={sectionRefs.archiving}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">GitHub</h3>
              <p className="text-gray-800 mb-2">소스 코드 저장소</p>
              <a
                href="https://github.com/hwijinkim22"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                github.com/hwijinkim22
              </a>
              <ul className="mt-4 space-y-2 text-gray-800">
                <li>• 레포지토리 20개</li>
                <li>• 꾸준한 커밋</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Blog</h3>
              <p className="text-gray-800 mb-2">개발 관련 블로그</p>
              <a
                href="https://velog.io/@hwijinkim22/posts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://velog.io/@hwijinkim22/posts
              </a>
              <ul className="mt-4 space-y-2 text-gray-800">
                <li>• TIL 작성</li>
                <li>• 100개 이상의 포스트 작성</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section
          id="projects"
          title="Projects"
          sectionRef={sectionRefs.projects}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <Link
                href={`/projects/${project.id}`}
                key={index}
                className="hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <h4 className="text-base text-blue-600">{project.date}</h4>
                    <p className="text-gray-800 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
};

export default Portfolio;
