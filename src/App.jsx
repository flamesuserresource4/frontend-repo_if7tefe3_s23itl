import React, { useState } from 'react';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import DashboardPreviews from './components/DashboardPreviews';
import ChatbotWidget from './components/ChatbotWidget';
import SignInModal from './components/SignInModal';

function App() {
  const [signInOpen, setSignInOpen] = useState(false);

  const handleSignIn = async ({ email, password }) => {
    // Placeholder client-side handler. Backend auth will be wired up via FastAPI + JWT.
    // For now, simulate a short delay and close the modal.
    await new Promise((r) => setTimeout(r, 700));
    setSignInOpen(false);
    // You can surface a toast/notification library here if desired.
  };

  return (
    <div className="min-h-screen w-full bg-slate-950">
      {/* Top navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
          <a href="#" className="text-lg font-semibold tracking-tight">Inter-India</a>
          <nav className="hidden gap-6 text-sm text-white/80 sm:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#dashboards" className="hover:text-white">Dashboards</a>
            <a href="#" className="hover:text-white">Docs</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setSignInOpen(true)} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white hover:bg-white/10">Sign in</button>
            <a href="#dashboards" className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-500">Get Started</a>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <DashboardPreviews />
        <FeaturesGrid />
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
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} onSubmit={handleSignIn} />
    </div>
  );
}

export default App;
