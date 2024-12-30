"use client";
import { useParams } from "next/navigation";
import React from "react";
import { projectsData } from "../data";
import Link from "next/link";
import { Github } from 'lucide-react'

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
					<img
						src={project.image}
						alt={project.title}
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
									<p className="text-gray-700 whitespace-pre-line">{project.details.overview}</p>
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
											className="flex bg-black text-white px-6 py-2 rounded-full"
										>
											Github <Github size={20}/>
										</Link>
									)}
								</div>
							</>
						)}

					</div>

				</div>

			</div>

		</div>
	);
};

export default ProjectDetail;
