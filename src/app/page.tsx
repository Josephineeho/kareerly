import NavBar from "./components/UI/NavBar";
import Ready from "./components/Home/Ready";
import Hero from "./components/Home/Hero";
import Companies from "./components/Home/Companies";
import UserTypes from "./components/Home/UserTypes";
import { BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { RevealSection } from "./components/UI/RevealSection";

export default function Home() {
  const userTypesData = [
    {
      icon: <GraduationCap size={44} className="bg-primary/10 rounded-2xl p-2.5 text-primary" />,
      title: "For Job Seekers",
      description: "Kickstart your career with opportunities tailored to your unique skill set and professional aspirations.",
      points: [
        "AI-Powered Skill Matching",
        "Direct Networking With Recruiters",
        "Editorial Resume Reviews",
      ],
      actionText: "Find an Opportunity",
    },
    {
      icon: <BriefcaseBusiness size={44} className="bg-secondary/10 rounded-2xl p-2.5 text-secondary" />,
      title: "For Employers",
      description: "Discover top-tier talent and streamline your hiring process with our AI-driven recruitment solutions.",
      points: [
        "Access to a Diverse Talent Pool",
        "Advanced Candidate Screening",
        "Seamless Interview Scheduling",
      ],
      actionText: "Post a Vacancy",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      <NavBar />

      {/* Hero — entrances handled inside Hero itself */}
      <Hero />

      {/* Companies ticker */}
      <RevealSection>
        <Companies />
      </RevealSection>

      {/* User type cards */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-7xl mx-auto">
        <RevealSection className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Who It&apos;s For</p>
          <h2 className="font-black text-4xl md:text-5xl text-on-surface tracking-tight">
            Built for Every Side<br />of the Equation
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userTypesData.map((userData, index) => (
            <RevealSection key={index} delay={index * 120}>
              <UserTypes
                icon={userData.icon}
                title={userData.title}
                description={userData.description}
                points={userData.points}
                actionText={userData.actionText}
              />
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <RevealSection>
        <Ready />
      </RevealSection>
    </main>
  );
}
