import Link from 'next/link'
import Image from 'next/image'
import { Project } from '../types/project'

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link 
      href={`/projects/${project.id}`}
      className="block transition-transform duration-300 hover:scale-105"
    >
      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
        <div className="relative h-48">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <h4 className='text-base text-blue-300'>{project.date}</h4>
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
  )
}