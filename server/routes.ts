import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.profile.get.path, async (_req, res) => {
    const profile = await storage.getProfile();
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  });

  app.get(api.education.list.path, async (_req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createContactMessage(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Seed data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.createProfile({
      name: "HariKrishnan",
      title: "Aspiring Developer",
      summary: "Motivated and adaptable aspiring engineer seeking opportunities in development and analysis. Experienced in building practical solutions across software, web, and data workflows, with a strong focus on clean execution, problem-solving, and continuous learning. Eager to contribute to real-world projects and support team objectives through a proactive and detail-driven approach.",
      email: "Harikrishnan10125@gmail.com",
      phone: "+91 9597937366",
      location: "Nagapattinam, Tamilnadu, India"
    });

    await storage.createEducation({
      degree: "B.Tech. Artificial Intelligence and Data Science",
      school: "Sir Issac Newton College of Engineering and Technology",
      location: "Nagapattinam, Tamilnadu, India",
      year: "2022-2026"
    });

    const skillsData = [
      { category: "Programming Languages", items: "Python, Java, SQL, C" },
      { category: "Operating Systems", items: "Linux OS, Windows OS" },
      { category: "Frameworks & Tools", items: "Flask, Streamlit, Git, Jupyter Notebook, Postgresql, Firebase, Spring Boot, Jhipster, React, MongoDB, Flutter Development" },
      { category: "SEO & Analytics", items: "Google Analytics, Screaming Frog, Semrush" },
      { category: "Data Visualization", items: "Power BI, Matplotlib, Seaborn, Excel, Numpy, Pandas" },
      { category: "AI Tools", items: "Copilot, Cursor, Windsurf, Google Anti-Gravity" },
      { category: "Methodologies", items: "SDLC, OOP, Data Structures & Algorithms" }
    ];

    for (const skill of skillsData) {
      await storage.createSkill(skill);
    }

    // Add placeholder projects since none were provided but are expected in schema
    await storage.createProject({
      title: "Portfolio Website",
      description: "A modern, industrial-themed portfolio website built with React and Node.js.",
      techStack: "React, Node.js, Tailwind CSS, Postgres",
      link: "https://github.com/Harikrishnan10125"
    });
    
    await storage.createProject({
        title: "AI Analysis Tool",
        description: "Data analysis tool using Python and Pandas for processing large datasets.",
        techStack: "Python, Pandas, Matplotlib",
        link: "#"
    });
  }
}
