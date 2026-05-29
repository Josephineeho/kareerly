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
