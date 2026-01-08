import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading({ title, subtitle, className, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 relative", className, {
      "text-left": align === "left",
      "text-center": align === "center",
      "text-right": align === "right",
    })}>
      <motion.div
        initial={{ opacity: 0, x: align === "right" ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/50 relative inline-block z-10">
          {title}
          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary/30" />
          <span className="absolute -bottom-2 left-0 w-1/3 h-[2px] bg-primary animate-pulse" />
        </h2>
        {subtitle && (
          <p className="mt-4 text-muted-foreground font-mono text-sm md:text-base uppercase tracking-widest">
            {`// ${subtitle}`}
          </p>
        )}
      </motion.div>

      {/* Decorative background number */}
      <div className="absolute -top-10 opacity-[0.03] text-9xl font-black select-none pointer-events-none w-full">
        {title.substring(0, 2)}
      </div>
    </div>
  );
}
