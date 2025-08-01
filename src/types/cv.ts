export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  photoUrl: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

export interface Reference {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  references: Reference[];
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  features: string[];
  hasPhoto: boolean;
  columns: 1 | 2;
  color: string;
}