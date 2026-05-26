import Image from "next/image";
import NavBar from "./components/UI/NavBar";
import Ready from "./components/Home/Ready";
import Hero from "./components/Home/Hero";
import Companies from "./components/Home/Companies"
import UserTypes from "./components/Home/UserTypes";
import {  BriefcaseBusiness, GraduationCap, MoveRight, Search } from 'lucide-react'
import ColorStyleGuide from "./components/ColorGuide";
  

export default function Home() {
  const userTypesData = [
    {
      icon: <GraduationCap size={60} className=' bg-primary/60 rounded p-2 text-primary' />,
      title: "For Job Seekers",
      description: "Kickstart your career with opportunities tailored to your unique skill set and professional aspirations.",
      points: [
        "AI-Powered Skill Matching",
        "Direct Networking With Recruiters",
        "Editorial Resume Reviews"
      ],
      actionText: "Find an Opportunity"
    },
    {
      icon: <BriefcaseBusiness size={60} className=' bg-secondary/60 rounded p-2 text-secondary' />,
      title: "For Employers",
      description: "Discover top-tier talent and streamline your hiring process with our AI-driven recruitment solutions.",
      points: [
        "Access to a Diverse Talent Pool",
        "Advanced Candidate Screening",
        "Seamless Interview Scheduling"
      ],
      actionText: "Post a Vacancy"
    }
  ]
  return (
    <main className="min-h-screen">
      <NavBar/>
      <ColorStyleGuide/>
      <Hero/>
      <Companies />
      <div className="usertypes grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* put two usertype components */}
      {userTypesData.map((userData, index) => (
        <UserTypes
          key={index}
          icon={userData.icon}
          title={userData.title}
          description={userData.description}
          points={userData.points}
          actionText={userData.actionText}
        />
      ))}
      </div>
      
      <Ready/>
    </main>
  );
}
