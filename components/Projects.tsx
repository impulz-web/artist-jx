
import React from 'react';
import { Project } from '../types';
import { PlayCircle } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 border-l-4 border-gold-500 pl-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">Latest Drops</h2>
          <p className="text-neutral-400 mt-2 text-lg">Featured projects, albums, and collaborations.</p>
        </div>

        {projects.length === 0 ? (
           <div className="text-neutral-600 text-center py-12 border border-dashed border-neutral-800">
              No projects added yet.
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group relative h-[400px] overflow-hidden bg-neutral-900 cursor-pointer">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1 block">
                    {project.type}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    {project.links.spotify && (
                      <a href={project.links.spotify} target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors">
                        <PlayCircle size={24} />
                      </a>
                    )}
                    {project.links.youtube && (
                      <a href={project.links.youtube} target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">
                        <PlayCircle size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
