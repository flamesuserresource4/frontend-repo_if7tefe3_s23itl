import React from 'react';
import { User, Building2, Shield } from 'lucide-react';

const cards = [
  {
    icon: <User className="h-5 w-5 text-indigo-400" />,
    title: 'Student Dashboard',
    desc: 'Manage profile, set preferences, and view top AI-recommended internships.'
  },
  {
    icon: <Building2 className="h-5 w-5 text-indigo-400" />,
    title: 'Organization Dashboard',
    desc: 'Post internships, define skill requirements, and review matched candidates.'
  },
  {
    icon: <Shield className="h-5 w-5 text-indigo-400" />,
    title: 'Admin Dashboard',
    desc: 'Monitor analytics, approve allocations, ensure fairness and compliance.'
  },
];

export default function DashboardPreviews() {
  return (
    <section id="dashboards" className="relative w-full bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Dashboards for everyone</h2>
            <p className="mt-2 max-w-2xl text-white/70">
              Purpose-built views for students, organizations, and administrators to keep the process simple, fair, and fast.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500">Get Started</button>
            <button className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">Live Demo</button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-indigo-500/10 p-3">
                {c.icon}
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-white/70">{c.desc}</p>
              <div className="mt-4 h-28 w-full rounded-lg bg-gradient-to-tr from-indigo-500/20 via-fuchsia-400/10 to-cyan-400/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
