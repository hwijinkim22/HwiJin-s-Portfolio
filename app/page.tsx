"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
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

  return {ref, isVisible};
};

const Section = ({ id, title, children }: SectionProps) => {
  const {ref, isVisible} = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-100px',
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen p-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
  const [activeSection, setActiveSection] = useState('about');
  const sections = ['about', 'skills', 'archiving', 'projects'];
  
  const navigationItems = [
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'archiving', label: 'Archiving' },
    { id: 'projects', label: 'Projects' },
  ];

  // 스킬 데이터
  const skillsData = {
    frontend: [
      { name: 'HTML/CSS', level: 95 },
      { name: 'JavaScript', level: 100 },
      { name: 'React', level: 100 },
      { name: 'TypeScript', level: 85 },
    ],
    backend: [
      { name: 'Supabase', level: 75 },
    ],
  };

  // 프로젝트 데이터
  const projectsData = [
    {
      title: 'Voyage X',
      description: '미래 우주 여행에 대한 다양한 정보 및 여행 상품/굿즈 결제',
      technologies: ['React', 'TypeScript', 'Tailwind'],
      image: '/api/placeholder/400/300',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 네비바 */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold">Portfolio</div>
            <div className="flex space-x-8">
              {navigationItems.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`transition-colors duration-300 hover:text-blue-600 ${
                    activeSection === id ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 text-black">
        {/* About Section */}
        <Section id="about" title="About Me">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="/api/placeholder/120/120"
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                />
                <div>
                  <h3 className="text-3xl font-black text-black">김휘진</h3>
                  <p className="text-xl text-gray-800">Frontend Developer</p>
                </div>
              </div>
              <p className="text-black text-base font-medium">
                안녕하세요. 사용자를 최우선으로 생각하는 개발자 김휘진입니다.<br/>
                사용자가 없다면 개발자도 없다는 마인드로 임합니다.
              </p>
            </div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title="Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-600">Frontend</h3>
              <div className="space-y-4">
                {skillsData.frontend.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
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
              <h3 className="text-xl font-semibold mb-4 text-gray-600">Backend</h3>
              <div className="space-y-4">
                {skillsData.backend.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
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

        {/* Archiving Section */}
        <Section id="archiving" title="Archiving">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">GitHub</h3>
              <p className="text-gray-600 mb-2">소스 코드 저장소</p>
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                github.com/hwijinkim22
              </a>
              <ul className="mt-4 space-y-2">
                <li>• 레포지토리 20개</li>
                <li>• 100개 이상의 커밋</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Blog</h3>
              <p className="text-gray-600 mb-2">개발 관련 블로그</p>
              <a
                href="https://your-blog.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://velog.io/@hwijinkim22/posts
              </a>
              <ul className="mt-4 space-y-2">
                <li>• TIL 작성</li>
                <li>• 90개 이상의 포스트 작성</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
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
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
};

export default Portfolio;