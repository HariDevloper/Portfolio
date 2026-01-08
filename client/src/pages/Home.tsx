import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContactMessage } from "@shared/routes";
import { useProfile, useSkills, useEducation, useProjects, useContactMutation } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { EducationItem } from "@/components/EducationItem";
import { Loader2, Mail, Github, Linkedin, Terminal, Send, ChevronDown, MapPin, Phone, ArrowUp, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HeroGraphic } from "@/components/HeroGraphic";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetClose } from "@/components/ui/sheet";

export default function Home() {
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();
  const { data: skills, isLoading: skillsLoading, error: skillsError } = useSkills();
  const { data: education, isLoading: eduLoading, error: eduError } = useEducation();
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useProjects();

  const { toast } = useToast();
  const contactMutation = useContactMutation();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "TRANSMISSION ESTABLISHED",
          description: "Login credentials verified. Payload delivered to secure server.",
          className: "bg-black border-2 border-primary text-primary font-mono shadow-[0_0_20px_rgba(0,243,255,0.3)]",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Transmission Failed",
          description: error.message,
        });
      },
    });
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Scroll to top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (profileLoading || skillsLoading || eduLoading || projectsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <div className="font-mono text-primary animate-pulse">INITIALIZING SYSTEM...</div>
        </div>
      </div>
    );
  }

  if (profileError || skillsError || eduError || projectsError || !profile) {
    const errorMessage = (profileError || skillsError || eduError || projectsError)?.message || "Unknown Error";
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-red-500 font-mono">
        <div className="text-center p-4 border border-red-500 bg-red-500/10 rounded max-w-lg">
          <h1 className="text-2xl font-bold mb-4">SYSTEM ERROR</h1>
          <p>Failed to load profile data.</p>
          <div className="bg-black/50 p-2 mt-4 rounded text-xs text-left overflow-auto max-h-40">
            <p className="font-bold">Error Details:</p>
            <pre>{errorMessage}</pre>
          </div>
          <p className="text-sm mt-4 text-muted-foreground">Please check the console for details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-background">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* CRT Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat opacity-20" />

      {/* Navigation - Floating */}
      <nav className="fixed top-6 right-6 z-50 flex gap-4 items-center">
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 px-6 py-3 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg">
          {["home", "about", "skills", "projects", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm font-mono uppercase tracking-wider hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-12 h-12 bg-background/80 backdrop-blur-md border border-border rounded-full flex items-center justify-center text-primary shadow-lg hover:border-primary transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l border-border w-[280px] p-8">
              <SheetHeader className="mb-8">
                <SheetTitle className="text-left font-mono text-primary tracking-tighter">NAVIGATION_SYSTEM</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8">
                {["home", "about", "skills", "projects", "contact"].map((item) => (
                  <SheetClose asChild key={item}>
                    <a
                      href={`#${item}`}
                      className="text-2xl font-bold font-mono uppercase tracking-tighter hover:text-primary transition-colors"
                    >
                      <span className="text-primary/30 mr-2">//</span>
                      {item}
                    </a>
                  </SheetClose>
                ))}
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="h-[1px] bg-border mb-6" />
                <div className="flex gap-4 text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        <div className="container max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-primary/30 rounded-full bg-primary/5 text-primary font-mono text-xs md:text-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              SYSTEM ONLINE
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 leading-none">
              {profile.name.split(" ")[0]}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
                {profile.name.split(" ")[1]}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-mono font-light mb-8 max-w-lg">
              {profile.title}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-primary text-background font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                Initialize Contact
              </a>
              <a
                href="#projects"
                className="px-8 py-3 border border-border bg-background hover:border-primary hover:text-primary transition-colors duration-300 uppercase tracking-wider font-mono text-sm flex items-center justify-center"
              >
                View Protocols
              </a>
            </div>

            <div className="mt-12 flex gap-6 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors"><Github className="w-6 h-6" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors"><Mail className="w-6 h-6" /></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <HeroGraphic />

          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.a>
      </section >

      {/* ABOUT SECTION */}
      <section id="about" className="py-16 md:py-24 border-t border-border/30 bg-secondary/5">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading title="System Overview" subtitle="Profile Summary" />

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                {profile.summary}
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-4 bg-background border border-border">
                  <div className="text-primary mb-2"><MapPin className="w-5 h-5" /></div>
                  <div className="font-mono text-sm text-muted-foreground uppercase">Location</div>
                  <div className="font-mono font-bold text-white">{profile.location}</div>
                </div>
                <div className="p-4 bg-background border border-border">
                  <div className="text-primary mb-2"><Terminal className="w-5 h-5" /></div>
                  <div className="font-mono text-sm text-muted-foreground uppercase">Role</div>
                  <div className="font-mono font-bold text-white">{profile.title}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 border-2 border-primary/20 opacity-50" />
              <div className="bg-background p-6 border border-border h-full flex flex-col justify-center">
                <div className="font-mono text-sm text-primary mb-4"> // CORE OBJECTIVES</div>
                <ul className="space-y-4">
                  {["Clean Execution", "Problem Solving", "Continuous Learning", "Team Objectives"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-primary" />
                      <span className="text-sm font-mono font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* SKILLS SECTION */}
      <section id="skills" className="py-16 md:py-24 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading title="Capabilities" subtitle="Technical Proficiency" align="right" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills?.map((skill, index) => (
              <SkillCard
                key={skill.id}
                category={skill.category}
                items={skill.items}
                index={index}
              />
            ))}
          </div>
        </div>
      </section >

      {/* EDUCATION SECTION */}
      <section className="py-16 md:py-24 border-y border-border/30 bg-secondary/5">
        <div className="container max-w-4xl mx-auto px-4">
          <SectionHeading title="Data Logs" subtitle="Education History" align="center" />

          <div className="space-y-8 mt-16">
            {education?.map((edu, index) => (
              <EducationItem key={edu.id} education={edu} index={index} />
            ))}
          </div>
        </div>
      </section >

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-16 md:py-24 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading title="Executables" subtitle="Selected Projects" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section >

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-24 bg-secondary/10 border-t border-border">
        <div className="container max-w-4xl mx-auto px-4">
          <SectionHeading title="Transmission" subtitle="Initiate Contact" align="center" />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12 bg-card border border-border p-5 sm:p-10 md:p-12 relative overflow-hidden">
            {/* Decorative Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-white">Direct Line</h3>
              <p className="text-muted-foreground mb-8">
                Available for development opportunities and technical consultation. Awaiting input.
              </p>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 shrink-0 rounded-none border border-primary/30 flex items-center justify-center bg-primary/5 group-hover:bg-primary group-hover:text-background transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase">Email</div>
                    <a href={`mailto:${profile.email}`} className="font-mono text-sm md:text-base text-white hover:text-primary transition-colors break-all block">{profile.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 shrink-0 rounded-none border border-primary/30 flex items-center justify-center bg-primary/5 group-hover:bg-primary group-hover:text-background transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase">Phone</div>
                    <div className="text-sm md:text-base text-white truncate">{profile.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 shrink-0 rounded-none border border-primary/30 flex items-center justify-center bg-primary/5 group-hover:bg-primary group-hover:text-background transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase">Base</div>
                    <div className="font-mono text-sm md:text-base text-white">{profile.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 relative z-10">
              <div>
                <input
                  {...form.register("name")}
                  placeholder="IDENTIFIER / NAME"
                  className="w-full bg-background/50 border border-border px-4 py-3 md:py-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                />
                {form.formState.errors.name && (
                  <span className="text-xs text-red-500 mt-1 block">{form.formState.errors.name.message}</span>
                )}
              </div>

              <div>
                <input
                  {...form.register("email")}
                  placeholder="RETURN ADDRESS / EMAIL"
                  className="w-full bg-background/50 border border-border px-4 py-3 md:py-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                />
                {form.formState.errors.email && (
                  <span className="text-xs text-red-500 mt-1 block">{form.formState.errors.email.message}</span>
                )}
              </div>

              <div>
                <textarea
                  {...form.register("message")}
                  placeholder="DATA PAYLOAD / MESSAGE"
                  rows={4}
                  className="w-full bg-background/50 border border-border px-4 py-3 md:py-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-mono text-sm resize-none"
                />
                {form.formState.errors.message && (
                  <span className="text-xs text-red-500 mt-1 block">{form.formState.errors.message.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-primary text-background font-bold py-3 px-6 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Transmit Data
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section >

      {/* FOOTER */}
      < footer className="py-8 border-t border-border bg-background text-center" >
        <div className="container mx-auto px-4">
          <div className="font-mono text-xs text-muted-foreground">
            SYSTEM STATUS: OPERATIONAL<br />
            © {new Date().getFullYear()} HARIKRISHNAN. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer >

      {/* Scroll to Top Button */}
      {
        showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-background hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center border-2 border-primary shadow-lg group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </motion.button>
        )
      }
    </div >
  );
}

