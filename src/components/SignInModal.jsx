import React, { useState } from 'react';
import { X, LockKeyhole, Mail, User as UserIcon, FileText } from 'lucide-react';

export default function SignInModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState('');
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const base = import.meta.env.VITE_BACKEND_URL;
    if (!base) {
      setError('Backend URL is not configured. Set VITE_BACKEND_URL in the environment.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      if (name) formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (preferences) formData.append('preferences', preferences);
      if (resume) formData.append('resume', resume);

      const res = await fetch(`${base}/auth/signin`, {
        method: 'POST',
        // Important: do NOT set Content-Type when sending FormData
        body: formData,
        mode: 'cors',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || `Sign in failed (${res.status})`);
      }
      const data = await res.json();
      onSubmit?.(data);
      onClose?.();
    } catch (err) {
      const message = err?.message || 'Sign in failed';
      // Network errors from fetch often surface as TypeError: Failed to fetch
      if (message.toLowerCase().includes('failed to fetch')) {
        setError('Could not reach the server. Check your internet, backend URL, and CORS.');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[92vw] max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-6 text-white shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Sign in to Inter-India</div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        <p className="mb-4 text-sm text-white/70">
          New here? Enter your name, preferences, and upload your resume. Returning users can sign in with email and password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-white/70">Full name (for new users)</label>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2">
              <UserIcon size={16} className="text-white/50" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/70">Email</label>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2">
              <Mail size={16} className="text-white/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                autoFocus
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/70">Password</label>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2">
              <LockKeyhole size={16} className="text-white/50" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/70">Preferences (comma separated)</label>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2">
              <FileText size={16} className="text-white/50" />
              <input
                type="text"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="e.g. react, python, data, security"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/70">Upload resume (PDF/DOC)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="w-full text-sm text-white/80 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-500"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Processing…' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
