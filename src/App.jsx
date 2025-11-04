import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import DashboardPreviews from './components/DashboardPreviews';
import ChatbotWidget from './components/ChatbotWidget';
import SignInModal from './components/SignInModal';

function App() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('ii_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [matches, setMatches] = useState([]);

  const backend = import.meta.env.VITE_BACKEND_URL;

  const handleSignedIn = async (data) => {
    setUser(data);
    localStorage.setItem('ii_user', JSON.stringify(data));
    setSignInOpen(false);
    try {
      // Ensure internships are present
      await fetch(`${backend}/seed/internships`, { method: 'POST' });
      // Fetch matches for the user
      const res = await fetch(`${backend}/match/top`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, limit: 5 }),
      });
      if (res.ok) {
        const m = await res.json();
        setMatches(m);
      }
    } catch (_) {
      // ignore
    }
  };

  const signOut = () => {
    setUser(null);
    setMatches([]);
    localStorage.removeItem('ii_user');
  };

  useEffect(() => {
    // If user exists on load, refresh matches
    (async () => {
      if (user?.email) {
        try {
          const res = await fetch(`${backend}/match/top`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, limit: 5 }),
          });
          if (res.ok) setMatches(await res.json());
        } catch {}
      }
    })();
  }, []);

  return {
    /* Top-level container */
  } && (
    <div className="min-h-screen w-full bg-slate-950">
      {/* Top navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
          <a href="#" className="text-lg font-semibold tracking-tight">Inter-India</a>
          <nav className="hidden gap-6 text-sm text-white/80 sm:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#dashboards" className="hover:text-white">Dashboards</a>
            <a href="#matches" className="hover:text-white">Matches</a>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white">{user.name || user.email}</span>
                <button onClick={signOut} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white hover:bg-white/10">Sign out</button>
              </div>
            ) : (
              <button onClick={() => setSignInOpen(true)} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white hover:bg-white/10">Sign in</button>
            )}
            <a href="#dashboards" className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-500">Get Started</a>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <DashboardPreviews />
        <FeaturesGrid />

        {user && (
          <section id="matches" className="relative w-full bg-slate-950 py-16 text-white">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Top Matches</h2>
                  <p className="mt-2 max-w-2xl text-white/70">Curated internships based on your preferences and profile.</p>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {matches.length === 0 && (
                  <div className="col-span-full rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">No matches yet. Update your preferences and try again.</div>
                )}
                {matches.map((m, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{m.internship.title}</h3>
                      <span className="rounded-md bg-indigo-600/20 px-2 py-1 text-xs text-indigo-300">Score {Math.round(m.score * 100)}%</span>
                    </div>
                    <p className="mt-1 text-sm text-white/70">{m.internship.company} • {m.internship.location || 'Remote'}</p>
                    <p className="mt-3 line-clamp-3 text-sm text-white/80">{m.internship.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(m.internship.skills || []).map((s) => (
                        <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-white/10 bg-slate-950 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="text-xs text-white/60">© {new Date().getFullYear()} Inter-India. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>

      <ChatbotWidget />
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} onSubmit={handleSignedIn} />
    </div>
  );
}

export default App;
