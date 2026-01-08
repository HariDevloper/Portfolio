import { z } from "zod";

// Type definitions
export interface Profile {
  id: number;
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
}

export interface Education {
  id: number;
  degree: string;
  school: string;
  location: string;
  year: string;
}

export interface Skill {
  id: number;
  category: string;
  items: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string;
  link?: string | null;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
}

// Zod schemas for validation
export const insertProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  summary: z.string(),
  email: z.string().email(),
  phone: z.string(),
  location: z.string(),
});

export const insertEducationSchema = z.object({
  degree: z.string(),
  school: z.string(),
  location: z.string(),
  year: z.string(),
});

export const insertSkillSchema = z.object({
  category: z.string(),
  items: z.string(),
});

export const insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  techStack: z.string(),
  link: z.string().optional(),
});

export const insertContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

// Insert types
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertContactMessage = z.infer<typeof insertContactSchema>;
