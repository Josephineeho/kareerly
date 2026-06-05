export interface HeroSidePicProps {
    img:string,
    descriptor: string,
    description: string
}

export interface  SignUpEmployer{
    full_name: string;
    password: string;
    email: string;
    role: string;
    company_name?: string;
    industry?: string;
}
export type SignUpJobSeeker ={
    full_name: string;
    email: string;
    password: string;
    role:string;
}

// types.ts
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  matchPercentage: number;
  logoUrl?: string;
}

export interface SavedOpportunity {
  id: string;
  title: string;
  company: string;
  postedTime: string;
  logoLetter: string;
}

export interface RecentActivity {
  id: string;
  type: 'view' | 'message';
  actor: string;
  content: string;
  time: string;
}


export type ApplicationStatus = 
  | 'applied' 
  | 'reviewing' 
  | 'shortlisted' 
  | 'interviewing' 
  | 'offered' 
  | 'rejected' 
  | 'withdrawn';


export interface ApplicationCardProps {
  jobTitle: string;
  companyName: string;
  appliedDate: string;
  logoUrl?: string;
  status: ApplicationStatus;
  currentStage?: number; // e.g., 3
  totalStages?: number;  // e.g., 5
  statusMetaText?: string; // 
  onPrimaryAction?: () => void;
}