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
      viewport={{ once: false }}
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
              <span key={i} className="text-xs font-mono px-2 py-0.5 bg-primary/10 text-primary border border-primary/20">
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
          {/* GitHub Icon Button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center border border-border hover:border-primary hover:bg-primary/10 transition-all group"
            title="View on GitHub"
          >
            <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>

          {/* Live Demo Icon Button */}
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-border hover:border-primary hover:bg-primary/10 transition-all group"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ) : (
            <div className="w-9 h-9 flex items-center justify-center border border-border/50 opacity-50 cursor-not-allowed" title="No live demo available">
              <ExternalLink className="w-4 h-4 text-muted-foreground/50" />
            </div>
          )}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
