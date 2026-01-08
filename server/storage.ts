import fs from 'fs';
import path from 'path';
import {
  type Profile, type Education, type Skill, type Project,
  type InsertContactMessage
} from "@shared/schema";

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
    // On Vercel, if process.cwd() is not where data.json is, try finding it relative to __dirname
    if (!fs.existsSync(this.dataPath)) {
      this.dataPath = path.join(process.cwd(), 'api', 'data.json');
    }
    if (!fs.existsSync(this.dataPath) && process.env.VERCEL) {
      // Fallback for Vercel: sometimes files are in the root
      this.dataPath = path.join(process.cwd(), 'data.json');
    }

    this.data = this.loadData();
  }

  private loadData(): JsonData {
    try {
      if (fs.existsSync(this.dataPath)) {
        const fileContent = fs.readFileSync(this.dataPath, 'utf-8');
        return JSON.parse(fileContent);
      } else {
        console.warn(`Warning: data.json not found at ${this.dataPath}. Initializing with empty data.`);
        // Try to look in one more place relative to the current file location
        const backupPath = path.resolve(__dirname, '..', 'data.json');
        if (fs.existsSync(backupPath)) {
          console.log(`Found data.json at backup path: ${backupPath}`);
          return JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
        }
      }
    } catch (error) {
      console.error('Error loading data.json:', error);
    }

    return {
      education: [],
      skills: [],
      projects: [],
      contactMessages: []
    };
  }

  private saveData(): void {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.data, null, 2), 'utf-8');
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
