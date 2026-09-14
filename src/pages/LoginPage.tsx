import React, { useState } from 'react';
import { Cpu, ShieldCheck, ArrowRight, Lock, Mail, Radio } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('demo@transport.ai');
  const [password, setPassword] = useState<string>('demo123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#080d1a] flex flex-col items-center justify-center p-4 relative overflow-hidden text-slate-100 font-sans">
      {/* Decorative Background Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#06b6d4 1px, transparent 1px), radial-gradient(#3b82f6 1px, #080d1a 1px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
        }}
      />

      {/* Main Glassmorphic Login Card */}
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-2 glow-cyan">
            <Cpu className="h-10 w-10 animate-pulse" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            AIoT Transport Safety
          </h1>

          <p className="text-xs font-semibold text-cyan-400 font-mono tracking-wider uppercase">
            Predictive Public Transport Intelligence
          </p>

          <p className="text-xs text-slate-400 pt-1">
            College Presentation Prototype & Intelligent Transit Dashboard
          </p>
        </div>

        {/* Demo Mode Notice Badge */}
        <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-xs text-cyan-300 font-mono flex items-center justify-center gap-2">
          <Radio className="h-4 w-4 text-cyan-400 animate-ping" />
          <span>● DEMO SIMULATION ACTIVE</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 transition"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs font-mono transition border border-slate-700 flex items-center justify-center gap-2"
          >
            <span>Log In</span>
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-[10px] font-mono text-slate-500 uppercase">OR INSTANT DEMO</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* PROMINENT "ENTER DEMO MODE" BUTTON */}
        <button
          onClick={onLogin}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm font-mono tracking-wider shadow-lg transition flex items-center justify-center gap-2 glow-cyan"
        >
          <ShieldCheck className="h-5 w-5" />
          <span>ENTER DEMO MODE</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500 font-mono">
          Demo Credentials: <span className="text-slate-400">demo@transport.ai</span> / <span className="text-slate-400">demo123</span>
        </div>
      </div>
    </div>
  );
};
