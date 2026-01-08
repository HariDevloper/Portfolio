import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import type { Education } from "@shared/schema";

interface EducationItemProps {
  education: Education;
  index: number;
}

export function EducationItem({ education, index }: EducationItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.2 }}
      className="relative pl-8 md:pl-12 border-l border-border pb-12 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-background border-2 border-primary rounded-full z-10" />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
        <h3 className="text-xl font-bold text-white">{education.degree}</h3>
        <span className="inline-block px-3 py-1 bg-secondary text-primary font-mono text-sm border border-border">
          {education.year}
        </span>
      </div>

      <div className="flex items-center gap-2 text-primary/80 font-medium mb-1">
        <GraduationCap className="w-4 h-4" />
        {education.school}
      </div>

      <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
        <MapPin className="w-4 h-4" />
        {education.location}
      </div>
    </motion.div>
  );
}
