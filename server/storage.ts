import { db } from "./db";
import {
  profile, education, skills, projects, contact_messages,
  type Profile, type Education, type Skill, type Project,
  type InsertContactMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [data] = await db.select().from(profile);
    return data;
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createContactMessage(message: InsertContactMessage): Promise<void> {
    await db.insert(contact_messages).values(message);
  }

  async createProfile(data: any): Promise<void> {
    await db.insert(profile).values(data);
  }
  async createEducation(data: any): Promise<void> {
    await db.insert(education).values(data);
  }
  async createSkill(data: any): Promise<void> {
    await db.insert(skills).values(data);
  }
  async createProject(data: any): Promise<void> {
    await db.insert(projects).values(data);
  }
}

export const storage = new DatabaseStorage();
