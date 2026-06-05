"use client"
import React, { useState } from 'react'
import { signUpEmployer, signUpJobSeeker } from '@/services/auth';
import Link from 'next/link';
import { Eye, EyeOff, InfoIcon, Loader, ArrowRight, Sparkles, CheckCircle2, GraduationCap, BriefcaseBusiness } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Employer fields
  const [employerEmail, setEmployerEmail] = useState('');
  const [employerPassword, setEmployerPassword] = useState('');
  const [employerFullName, setEmployerFullName] = useState('');
  const [employerConfirmPassword, setEmployerConfirmPassword] = useState("");
  const [employerCompanyName, setEmployerCompanyName] = useState("")
  const [employerIndustry, setEmployerIndustry] = useState("")
  const [showEmployerPassword, setShowEmployerPassword] = useState(false);

  const [role] = useState("seeker");
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"seeker" | "employer">("seeker");
  const router = useRouter();
  const [formError, setFormError] = useState<string>("")
  const [agreed, setAgreed] = useState(false);

  const handleSignUpJobSeeker = async () => {
    setLoading(true);
    setFormError("");
    if (!agreed) { setFormError("Please accept the Terms of Service to continue."); setLoading(false); return; }
    if (password !== confirmPassword) { setFormError("Passwords do not match."); setLoading(false); return; }
    const { data, error } = await signUpJobSeeker({ full_name, email, password, role });
    if (error) { setFormError(error); } else { router.push("/dashboard"); }
    setLoading(false);
  }

  const handleSignUpEmployer = async () => {
    setLoading(true);
    setFormError("");
    if (!agreed) { setFormError("Please accept the Terms of Service to continue."); setLoading(false); return; }
    if (employerPassword !== employerConfirmPassword) { setFormError("Passwords do not match."); setLoading(false); return; }
    const { data, error } = await signUpEmployer({ email: employerEmail, password: employerPassword, full_name: employerFullName, role, company_name: employerCompanyName, industry: employerIndustry });
    if (error) { setFormError(error); } else { router.push("/dashboard"); }
    setLoading(false);
  }

  const seekerHighlights = ["AI-Powered Job Matching", "Career Path Guidance", "Direct Recruiter Access"];
  const employerHighlights = ["Access to Diverse Talent Pool", "Smart Candidate Screening", "Easy Interview Scheduling"];
  const highlights = activeTab === "seeker" ? seekerHighlights : employerHighlights;

  const inputClass = "w-full bg-surface-container-low border border-slate-200 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all";
  const labelClass = "text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5";

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between flex-1 relative overflow-hidden p-12 bg-primary">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all">
              <span className="text-white font-black text-sm">K</span>
            </div>
            <span className="font-black tracking-tighter text-xl text-white">Kareerly</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
              <Sparkles size={12} />
              Join the network
            </div>
            <h1 className="font-black text-5xl xl:text-6xl leading-tight tracking-tighter text-white">
              Design your<br />
              <span className="text-white/60">professional<br />future.</span>
            </h1>
            <p className="mt-4 text-white/70 text-lg leading-relaxed max-w-sm">
              An elite network where talent meets opportunity. Start your journey today.
            </p>
          </div>

          <div className="space-y-3">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-white/60 shrink-0" />
                <p className="text-white/80 text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
              <p className="font-black text-3xl text-white">1K+</p>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mt-1">Active Jobs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
              <p className="font-black text-3xl text-white">100+</p>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mt-1">Top Employers</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white/40 text-xs">
          © {new Date().getFullYear()} Kareerly. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-surface overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-black text-sm">K</span>
              </div>
              <span className="font-black tracking-tighter text-xl text-on-surface">
                Kare<span className="text-primary">erly</span>
              </span>
            </Link>
          </div>

          <div className="mb-6">
            <h2 className="font-black text-3xl text-on-surface tracking-tight">Create your account</h2>
            <p className="text-on-surface-variant mt-1.5 text-sm">Step into a curated career experience</p>
          </div>

          {/* Tab Toggle */}
          <div className="grid grid-cols-2 gap-2 bg-surface-container-highest rounded-2xl p-1.5 mb-6">
            <button
              onClick={() => setActiveTab("seeker")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === "seeker" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              <GraduationCap size={16} />
              Job Seeker
            </button>
            <button
              onClick={() => setActiveTab("employer")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === "employer" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              <BriefcaseBusiness size={16} />
              Employer
            </button>
          </div>

          {/* Job Seeker Form */}
          {activeTab === "seeker" && (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" placeholder="John Doe" value={full_name} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pr-11`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-on-surface-variant transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass}>Confirm Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${inputClass} pr-11`} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-on-surface-variant transition-colors">
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Employer Form */}
          {activeTab === "employer" && (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" placeholder="John Doe" value={employerFullName} onChange={(e) => setEmployerFullName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Company Name</label>
                <input type="text" placeholder="Acme Inc." value={employerCompanyName} onChange={(e) => setEmployerCompanyName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Work Email</label>
                <input type="email" placeholder="john@acme.com" value={employerEmail} onChange={(e) => setEmployerEmail(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Industry</label>
                <input type="text" placeholder="Technology" value={employerIndustry} onChange={(e) => setEmployerIndustry(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <input type={showEmployerPassword ? "text" : "password"} placeholder="••••••••" value={employerPassword} onChange={(e) => setEmployerPassword(e.target.value)} className={`${inputClass} pr-11`} />
                  <button type="button" onClick={() => setShowEmployerPassword(!showEmployerPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-on-surface-variant transition-colors">
                    {showEmployerPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass}>Confirm Password</label>
                <input type="password" placeholder="••••••••" value={employerConfirmPassword} onChange={(e) => setEmployerConfirmPassword(e.target.value)} className={inputClass} />
              </div>
            </div>
          )}

          <div className="flex items-start gap-2 mt-4">
            <InfoIcon size={14} className="text-muted shrink-0 mt-0.5" />
            <p className="text-xs text-on-surface-variant">At least 8 characters with a number and a symbol.</p>
          </div>

          <label className="flex items-start gap-3 mt-4 cursor-pointer group">
            <div className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${agreed ? 'bg-primary border-primary' : 'border-slate-300 group-hover:border-primary/50'}`} onClick={() => setAgreed(!agreed)}>
              {agreed && <CheckCircle2 size={10} className="text-white" />}
            </div>
            <input type="checkbox" className="hidden" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              I agree to the{' '}
              <Link href="/terms" className="text-primary font-bold hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-primary font-bold hover:underline">Privacy Policy</Link>
            </p>
          </label>

          {formError && (
            <div className="mt-4 bg-error/8 border border-error/20 rounded-xl px-4 py-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-error rounded-full shrink-0" />
              <p className="text-error text-sm font-medium">{formError}</p>
            </div>
          )}

          <button
            onClick={() => activeTab === "seeker" ? handleSignUpJobSeeker() : handleSignUpEmployer()}
            disabled={loading}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_14px_rgba(0,64,161,0.3)] hover:shadow-[0_6px_20px_rgba(0,64,161,0.4)] disabled:opacity-70 disabled:cursor-not-allowed text-sm"
          >
            {loading ? <Loader size={18} className="animate-spin" /> : <><ArrowRight size={16} />Create Account</>}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-semibold text-on-surface-variant/60 uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low hover:border-slate-300 transition-all duration-200 active:scale-95">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low hover:border-slate-300 transition-all duration-200 active:scale-95">
              <img src="https://www.github.com/favicon.ico" className="w-4 h-4" alt="GitHub" />
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-on-surface-variant mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
