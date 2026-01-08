import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-card/50 border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Header bar */}
      <div className="h-8 bg-secondary/50 border-b border-border flex items-center px-4 justify-between">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="text-[10px] font-mono text-muted-foreground">PROJ_0{index + 1}</div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-6 line-clamp-3 text-sm">
          {project.description}
        </p>

        <div className="mb-6">
          <div className="text-xs font-mono text-primary/70 mb-2 uppercase tracking-wider">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.split(",").map((tech, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-primary/10 text-primary border border-primary/20">
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
          {project.link ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          ) : (
            <span className="text-xs text-muted-foreground italic">Internal / No Link</span>
          )}
          {/* Assuming there might be a repo link or just decorative */}
          <div className="ml-auto">
             <Code2 className="w-5 h-5 text-muted-foreground opacity-50" />
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
