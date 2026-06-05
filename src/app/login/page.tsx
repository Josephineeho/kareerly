"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { Eye, EyeOff, Loader, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("")

  const authenticateUser = async () => {
    setLoading(true);
    setFormError("");
    if (email === "" || password === "") {
      setFormError("All fields are required");
      setLoading(false);
      return;
    }
    const loginResults = await login(email, password);
    if (loginResults.error) {
      setFormError(loginResults.error);
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  }

  const highlights = [
    "AI-matched to your ideal roles",
    "Direct access to top recruiters",
    "Trusted by 2,000+ professionals",
  ];

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between flex-1 relative overflow-hidden p-12 bg-primary">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/3 rounded-full blur-2xl" />
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
              Welcome back
            </div>
            <h1 className="font-black text-5xl xl:text-6xl leading-tight tracking-tighter text-white">
              Your career<br />
              <span className="text-white/60">awaits.</span>
            </h1>
            <p className="mt-4 text-white/70 text-lg leading-relaxed max-w-sm">
              Sign in to continue building your professional future with AI-powered precision.
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
        </div>

        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full bg-white/30 border-2 border-white/50 ${i > 1 ? '-ml-2' : ''} flex items-center justify-center text-xs font-bold text-white`}>
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-white/80 text-sm font-semibold">2,000+ members joined this month</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
              <span className="text-white/60 text-xs ml-1 mt-0.5">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-surface">
        <div className="w-full max-w-md">
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

          <div className="mb-8">
            <h2 className="font-black text-3xl text-on-surface tracking-tight">Welcome back</h2>
            <p className="text-on-surface-variant mt-1.5 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low hover:border-slate-300 transition-all duration-200 active:scale-95">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low hover:border-slate-300 transition-all duration-200 active:scale-95">
              <img src="https://www.linkedin.com/favicon.ico" className="w-4 h-4" alt="LinkedIn" />
              LinkedIn
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-semibold text-on-surface-variant/60 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border border-slate-200 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && authenticateUser()}
                  className="w-full bg-surface-container-low border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-on-surface-variant transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {formError && (
            <div className="mt-4 bg-error/8 border border-error/20 rounded-xl px-4 py-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-error rounded-full shrink-0" />
              <p className="text-error text-sm font-medium">{formError}</p>
            </div>
          )}

          <button
            onClick={authenticateUser}
            disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_14px_rgba(0,64,161,0.3)] hover:shadow-[0_6px_20px_rgba(0,64,161,0.4)] disabled:opacity-70 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-center text-sm text-on-surface-variant mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary font-bold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
