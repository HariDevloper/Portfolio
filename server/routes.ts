import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";

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

  // Setup nodemailer transporter
  // Note: We use environment variables for security. 
  // If not set, it will log a warning but won't crash, allowing the app to run without email for development.
  const transporter = (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
    ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
    : null;

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createContactMessage(input);

      // Email sending logic
      if (transporter && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        try {
          await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Send to yourself
            replyTo: input.email, // Allow replying to the sender
            subject: `New Contact Form Message from ${input.name}`,
            text: `
              Name: ${input.name}
              Email: ${input.email}
              
              Message:
              ${input.message}
            `,
            html: `
              <div style="background-color: #09090b; color: #e5e5e5; font-family: 'Courier New', Courier, monospace; padding: 40px; border: 1px solid #27272a; max-width: 600px; margin: 0 auto;">
                <div style="border-bottom: 2px solid #00F3FF; padding-bottom: 20px; margin-bottom: 30px;">
                  <h2 style="color: #00F3FF; margin: 0; font-size: 24px; letter-spacing: 2px;">// INCOMING_TRANSMISSION</h2>
                  <div style="color: #52525b; font-size: 12px; margin-top: 5px;">SECURE_CHANNEL_ESTABLISHED</div>
                </div>
                
                <div style="margin-bottom: 25px; border-left: 2px solid #00F3FF; padding-left: 15px; background-color: #18181b; padding: 15px;">
                  <div style="margin-bottom: 8px;">
                    <span style="color: #52525b; font-size: 12px; letter-spacing: 1px;">[SOURCE_IDENTITY]</span><br/>
                    <strong style="color: #fff; font-size: 16px;">${input.name}</strong>
                  </div>
                  
                  <div>
                    <span style="color: #52525b; font-size: 12px; letter-spacing: 1px;">[CONTACT_POINT]</span><br/>
                    <a href="mailto:${input.email}" style="color: #00F3FF; text-decoration: none; font-size: 16px;">${input.email}</a>
                  </div>
                </div>
                
                <div style="margin-top: 30px;">
                  <div style="color: #52525b; margin-bottom: 10px; font-size: 12px; letter-spacing: 1px;">>>> DECODING_PAYLOAD...</div>
                  <div style="border: 1px dashed #27272a; background-color: #18181b; padding: 20px; color: #d4d4d8; line-height: 1.6;">
                    ${input.message.replace(/\n/g, '<br/>')}
                  </div>
                </div>
                
                <div style="margin-top: 40px; border-top: 1px solid #27272a; padding-top: 15px; font-size: 10px; color: #52525b; text-align: right;">
                  SYSTEM_TIMESTAMP: ${new Date().toISOString()}<br/>
                  STATUS: MESSAGE_LOGGED
                </div>
              </div>
            `,
          });

          // AUTO-REPLY TO VISITOR
          await transporter.sendMail({
            from: `"HariKrishnan Portfolio System" <${process.env.GMAIL_USER}>`,
            to: input.email,
            subject: `// AUTO-REPLY: Transmission Received`,
            text: `Hi ${input.name}, I have received your message. I will get back to you shortly.`,
            html: `
              <div style="background-color: #09090b; color: #e5e5e5; font-family: 'Courier New', Courier, monospace; padding: 40px; border: 1px solid #27272a; max-width: 600px; margin: 0 auto;">
                <div style="border-bottom: 2px solid #00F3FF; padding-bottom: 20px; margin-bottom: 30px;">
                  <h2 style="color: #00F3FF; margin: 0; font-size: 24px; letter-spacing: 2px;">// TRANSMISSION_RECEIVED</h2>
                  <div style="color: #52525b; font-size: 12px; margin-top: 5px;">AUTOMATED_RESPONSE_SYSTEM</div>
                </div>
                
                <div style="margin-bottom: 25px;">
                  <p style="font-size: 16px; line-height: 1.6;">
                    Greetings <strong style="color: #00F3FF;">${input.name}</strong>,
                  </p>
                  <p style="color: #d4d4d8; line-height: 1.6;">
                    This is an automated acknowledgment to confirm that your transmission has been successfully logged in the system.
                  </p>
                  <p style="color: #d4d4d8; line-height: 1.6;">
                    I will analyze the payload and establish a connection via the provided secure channel shortly.
                  </p>
                </div>
                
                <div style="margin-top: 30px; border: 1px dashed #27272a; background-color: #18181b; padding: 15px;">
                  <div style="color: #52525b; font-size: 12px; letter-spacing: 1px; margin-bottom: 5px;">[REFERENCE_PAYLOAD]</div>
                  <div style="color: #a1a1aa; font-style: italic;">"${input.message.length > 50 ? input.message.substring(0, 50) + '...' : input.message}"</div>
                </div>
                
                <div style="margin-top: 40px; border-top: 1px solid #27272a; padding-top: 15px; font-size: 10px; color: #52525b; text-align: right;">
                  SYSTEM_TIMESTAMP: ${new Date().toISOString()}<br/>
                  STATUS: PENDING_REVIEW
                </div>
              </div>
            `,
          });

          console.log('Email notifications sent successfully');
        } catch (emailErr) {
          console.error('Failed to send email notification:', emailErr);
          // We don't fail the request if email fails, as the message is saved in DB
        }
      } else {
        console.log('Skipping email notification: GMAIL_USER or GMAIL_APP_PASSWORD not set');
      }

      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Seed data (skip on Vercel as it's read-only)
  if (!process.env.VERCEL) {
    await seedDatabase();
  }

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
