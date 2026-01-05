export interface Candidate {
  id: string | number; // Ensure ID exists
  filename: string;
  score: number; // Raw ATS score (e.g., 0.52)
  matchScore: number;
  url: string;
  view_url: string;
  text_length: number;
  skills: string[];
  linkedin_url?: string;
  email?: string;
  contact_number?: string;
  position?: string;
  name?: string;
  title?: string;
  total_experience?: number;
  location?: string;
  company?: string;
  avatar?: string;
  linkedin?: string;
}

export interface CandidateResponse {
  success: boolean;
  message: string;
  total_found: number;
  job_description: string;
  candidates: Candidate[];
}

export interface JDRequest {
  job_description: string;
  limit: number;
}

export interface ApiError {
  detail?: string;
  message?: string;
}

export type MatchScoreFilter = "all" | "95+" | "90+" | "85+";
export type ExperienceFilter = "all" | "5+" | "7+" | "10+";
export type LocationFilter = "all" | "sf" | "ny" | "remote";
