'use client';

// ============================================================================
// Hustle Mania — Spatial Auth Modal
// Drops over the 3D canvas for seamless login/register.
// ============================================================================

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

export default function AuthModal() {
  const { isModalOpen, closeModal, view, setView, signIn, signUp, error: authError, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState('');

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError('');
    
    if (view === 'register') {
      if (password !== confirmPassword) {
        setLocalError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setLocalError('Password must be at least 6 characters.');
        return;
      }
    }

    setLoading(true);

    if (view === 'login') {
      const ok = await signIn(email, password);
      // If success, store handles it, modal stays open briefly, or closes. We just close.
      if (ok) closeModal();
    } else {
      const ok = await signUp(email, password, name || 'User');
      if (ok) {
        setSuccess(true);
      }
    }

    setLoading(false);
  };

  const error = localError || authError;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={closeModal}
      />
      
      {/* Modal Body */}
      <div className="relative glass-panel p-8 w-full max-w-md animate-slide-up mx-4 shadow-2xl shadow-hm-brand-red/10">
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-hm-on-surface-variant hover:text-hm-brand-red transition-colors"
        >
          <X size={20} />
        </button>

        {success && view === 'register' ? (
          <div className="text-center flex flex-col items-center gap-6 py-4">
            <div className="w-16 h-16 rounded-full border border-hm-success flex items-center justify-center bg-hm-success/10 text-hm-success mb-2">
              <Check size={32} />
            </div>
            <div>
              <h2 className="text-display-md text-hm-on-surface mb-2">PROFILE CREATED</h2>
              <p className="text-sm text-hm-text-muted">
                Check your email for a confirmation link. Once verified, you can clock in.
              </p>
            </div>
            <button
              onClick={() => {
                setSuccess(false);
                setView('login');
              }}
              className="btn-primary w-full py-4 text-label-lg tracking-widest mt-4"
            >
              GO TO LOGIN
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="text-center pb-2">
              <h1 className="text-display-md text-hm-on-surface mb-2">
                {view === 'login' ? 'CLOCK IN' : 'NEW ACCOUNT'}
              </h1>
              <p className="text-label-sm text-hm-text-muted uppercase">
                {view === 'login' ? 'ACCESS YOUR ACCOUNT' : 'CREATE OS PROFILE'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/30 px-4 py-3">
                  <p className="text-label-sm text-[#FF3B30]">{error}</p>
                </div>
              )}

              {view === 'register' && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="auth-name" className="text-label-sm text-hm-text-muted">
                    FULL NAME
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-[rgba(13,13,13,0.5)] border border-glass-border px-4 text-hm-on-surface font-sans text-sm focus:outline-none focus:border-hm-brand-red transition-colors"
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="auth-email" className="text-label-sm text-hm-text-muted">
                  EMAIL ADDRESS
                </label>
                <input
                  id="auth-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-[rgba(13,13,13,0.5)] border border-glass-border px-4 text-hm-on-surface font-sans text-sm focus:outline-none focus:border-hm-brand-red transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="auth-password" className="text-label-sm text-hm-text-muted">
                  PASSWORD
                </label>
                <input
                  id="auth-password"
                  type="password"
                  placeholder={view === 'register' ? "Min. 6 characters" : "••••••••"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 bg-[rgba(13,13,13,0.5)] border border-glass-border px-4 text-hm-on-surface font-sans text-sm focus:outline-none focus:border-hm-brand-red transition-colors"
                />
              </div>

              {view === 'register' && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="auth-confirm-password" className="text-label-sm text-hm-text-muted">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    id="auth-confirm-password"
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-12 bg-[rgba(13,13,13,0.5)] border border-glass-border px-4 text-hm-on-surface font-sans text-sm focus:outline-none focus:border-hm-brand-red transition-colors"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-label-lg tracking-widest mt-2"
              >
                {loading ? 'PROCESSING...' : view === 'login' ? 'CLOCK IN' : 'CREATE PROFILE'}
              </button>
            </form>

            <div className="flex items-center gap-4 my-2">
              <div className="h-px flex-1 bg-glass-border" />
              <span className="text-label-sm text-hm-text-muted">OR</span>
              <div className="h-px flex-1 bg-glass-border" />
            </div>

            <button
              type="button"
              onClick={() => {
                clearError();
                setLocalError('');
                setView(view === 'login' ? 'register' : 'login');
              }}
              className="btn-ghost w-full py-4 text-label-lg tracking-widest text-center"
            >
              {view === 'login' ? 'CREATE NEW ACCOUNT' : 'ALREADY HAVE AN ACCOUNT?'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
