import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

interface SkillCardProps {
  category: string;
  items: string; // Comma separated
  index: number;
}

export function SkillCard({ category, items, index }: SkillCardProps) {
  const itemList = items.split(",").map(i => i.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative bg-secondary/30 backdrop-blur-sm border border-border/50 p-6 hover:border-primary/50 transition-colors duration-300"
    >
      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
        <Cpu className="w-6 h-6 text-primary" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-primary rounded-full" />
        {category}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {itemList.map((skill, i) => (
          <span 
            key={i} 
            className="px-3 py-1 bg-background border border-border text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
      
      {/* Technical decorative corners */}
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 group-hover:border-primary transition-colors" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 group-hover:border-primary transition-colors" />
    </motion.div>
  );
}
