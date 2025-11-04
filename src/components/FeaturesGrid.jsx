import React from 'react';
import { ShieldCheck, BarChart3, Bot, Database, LockKeyhole } from 'lucide-react';

const features = [
  {
    icon: <Bot className="h-5 w-5 text-indigo-400" />,
    title: 'AI Matching Engine',
    desc: 'Weighted scoring with skills, academics, domain fit, and preferences. Optimized for maximum satisfaction.'
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-indigo-400" />,
    title: 'Career Insights',
    desc: 'Clustering-driven guidance, skill-gap analysis, and visual analytics for better decisions.'
  },
  {
    icon: <Database className="h-5 w-5 text-indigo-400" />,
    title: 'Scalable & Transparent',
    desc: 'Built for scale with audit trails and clear allocation criteria for fairness and trust.'
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-indigo-400" />,
    title: 'Role-based Security',
    desc: 'JWT auth with RBAC for Students, Organizations, and Admins. Privacy-first data handling.'
  },
  {
    icon: <LockKeyhole className="h-5 w-5 text-indigo-400" />,
    title: 'Compliance & Privacy',
    desc: 'Anonymized matching, encryption for sensitive fields, and GDPR-like principles.'
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="relative w-full bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">Why Inter-India</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/70">
          A modern platform that brings students, organizations, and administrators together with AI at the core.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 shadow-sm transition hover:border-white/20 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-indigo-500/10 p-3">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70">{f.desc}</p>
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
