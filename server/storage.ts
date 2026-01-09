import fs from 'fs';
import path from 'path';
import {
  type Profile, type Education, type Skill, type Project,
  type InsertContactMessage
} from "../shared/schema";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  getEducation(): Promise<Education[]>;
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
  createContactMessage(message: InsertContactMessage): Promise<void>;

  // Seed methods
  createProfile(data: any): Promise<void>;
  createEducation(data: any): Promise<void>;
  createSkill(data: any): Promise<void>;
  createProject(data: any): Promise<void>;
}

interface JsonData {
  profile?: Profile;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  contactMessages: InsertContactMessage[];
}

export class JsonStorage implements IStorage {
  private dataPath: string;
  private data: JsonData;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'data.json');
    this.data = this.loadData();
  }

  private loadData(): JsonData {
    // Default hardcoded data to ensure Vercel always has content
    const defaultData: JsonData = {
      education: [
        {
          id: 1,
          degree: "B.Tech. Artificial Intelligence and Data Science",
          school: "Sir Issac Newton College of Engineering and Technology",
          location: "Nagapattinam, Tamilnadu, India",
          year: "2022-2026"
        },
        {
          id: 2,
          degree: "Higher Secondary Education",
          school: "Government Higher Secondary School, Pudur",
          location: "Thiruvarur, Tamilnadu, India",
          year: "2020-2022"
        }
      ],
      skills: [
        { id: 1, category: "Programming Languages", items: "Python, Java, SQL, C" },
        { id: 2, category: "Operating Systems", items: "Linux OS, Windows OS" },
        { id: 3, category: "Frameworks & Tools", items: "Flask, Streamlit, Git, Jupyter Notebook, Postgresql, Firebase, Spring Boot, Jhipster, React, MongoDB, Flutter Development" },
        { id: 4, category: "SEO & Analytics", items: "Google Analytics, Screaming Frog, Semrush" },
        { id: 5, category: "Data Visualization", items: "Power BI, Matplotlib, Seaborn, Excel, Numpy, Pandas" },
        { id: 6, category: "AI Tools", items: "Copilot, Cursor, Windsurf, Google Anti-Gravity" },
        { id: 7, category: "Methodologies", items: "SDLC, OOP, Data Structures & Algorithms" }
      ],
      projects: [
        {
          id: 2,
          title: "SEO Dashboard AI",
          description: "AI-powered SEO dashboard for monitoring and optimizing website performance.",
          techStack: "React, Flask, BeautifulSoup4, TextBlob, TF-IDF, scikit-learn",
          githubLink: "https://github.com/HariDevloper/SEO-Dashboard-AI",
          link: "https://seo-dashboard-ai.vercel.app/"
        },
        {
          id: 1,
          title: "DrawToGather",
          description: "A collaborative real-time drawing application for teams and friends.",
          techStack: "React, Socket.io, Canvas API, Google OAuth, MongoDB",
          githubLink: "https://github.com/HariDevloper/DrawToGather",
          link: "https://draw-to-gather-1qii.vercel.app/"
        },
        {
          id: 3,
          title: "FLOPS Landing Page",
          description: "A professional landing page for FLOPS project with modern UI and smooth animations.",
          techStack: "React, Tailwind CSS, Framer Motion",
          githubLink: "https://github.com/HariDevloper/FLOPS-landingpage",
          link: "https://flops-technologies.vercel.app/"
        }
      ],
      contactMessages: [],
      profile: {
        id: 1,
        name: "HariKrishnan",
        title: "Aspiring Developer",
        summary: "Motivated and adaptable aspiring engineer seeking opportunities in development and analysis. Experienced in building practical solutions across software, web, and data workflows, with a strong focus on clean execution, problem-solving, and continuous learning. Eager to contribute to real-world projects and support team objectives through a proactive and detail-driven approach.",
        email: "Harikrishnan10125@gmail.com",
        phone: "+91 9597937366",
        location: "Thiruvarur, Tamilnadu, India"
      }
    };

    // Try to load from file for local development persistence
    // On Vercel, we prefer the hardcoded data to guarantee stability
    if (!process.env.VERCEL) {
      try {
        if (fs.existsSync(this.dataPath)) {
          const fileContent = fs.readFileSync(this.dataPath, 'utf-8');
          return JSON.parse(fileContent);
        }
      } catch (error) {
        console.error('Error loading data.json:', error);
      }
    }

    return defaultData;
  }

  private saveData(): void {
    try {
      if (!process.env.VERCEL) {
        fs.writeFileSync(this.dataPath, JSON.stringify(this.data, null, 2), 'utf-8');
      }
    } catch (error) {
      console.error('Error saving data.json:', error);
    }
  }

  async getProfile(): Promise<Profile | undefined> {
    return this.data.profile;
  }

  async getEducation(): Promise<Education[]> {
    return this.data.education;
  }

  async getSkills(): Promise<Skill[]> {
    return this.data.skills;
  }

  async getProjects(): Promise<Project[]> {
    return this.data.projects;
  }

  async createContactMessage(message: InsertContactMessage): Promise<void> {
    const newMessage = {
      id: this.data.contactMessages.length + 1,
      ...message
    };
    this.data.contactMessages.push(newMessage);
    this.saveData();
  }

  async createProfile(data: any): Promise<void> {
    this.data.profile = {
      id: 1,
      ...data
    };
    this.saveData();
  }

  async createEducation(data: any): Promise<void> {
    const newEducation = {
      id: this.data.education.length + 1,
      ...data
    };
    this.data.education.push(newEducation);
    this.saveData();
  }

  async createSkill(data: any): Promise<void> {
    const newSkill = {
      id: this.data.skills.length + 1,
      ...data
    };
    this.data.skills.push(newSkill);
    this.saveData();
  }

  async createProject(data: any): Promise<void> {
    const newProject = {
      id: this.data.projects.length + 1,
      ...data
    };
    this.data.projects.push(newProject);
    this.saveData();
  }
}

export const storage = new JsonStorage();
