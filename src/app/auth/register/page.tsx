'use client';

// ============================================================================
// Hustle Mania — Spatial Register Page
// ============================================================================

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Check } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      setSuccess(true);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative min-h-[100dvh] w-full flex flex-col pointer-events-none z-10 pt-24 pb-12">
        <div className="flex-1 flex items-center justify-center pointer-events-auto px-4">
          <div className="glass-panel p-10 w-full max-w-md animate-slide-up text-center flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full border border-hm-success flex items-center justify-center bg-hm-success/10 text-hm-success mb-2">
              <Check size={32} />
            </div>
            
            <div>
              <h2 className="text-display-md text-hm-on-surface mb-2">PROFILE CREATED</h2>
              <p className="text-sm text-hm-text-muted">
                Check your email for a confirmation link. Once verified, you can clock in.
              </p>
            </div>

            <Link
              href="/auth/login"
              className="btn-primary w-full py-4 text-label-lg tracking-widest mt-4"
            >
              GO TO LOGIN
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col pointer-events-none z-10 pt-24 pb-12">
      <div className="flex-1 flex items-center justify-center pointer-events-auto px-4">
        <div className="glass-panel p-8 w-full max-w-md animate-slide-up flex flex-col gap-6">
          
          <div className="text-center pb-4">
            <h1 className="text-display-md text-hm-on-surface mb-2">NEW ACCOUNT</h1>
            <p className="text-label-sm text-hm-text-muted">
              CREATE OS PROFILE
            </p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            {error && (
              <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/30 px-4 py-3">
                <p className="text-label-sm text-[#FF3B30]">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="register-email" className="text-label-sm text-hm-text-muted">
                EMAIL ADDRESS
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-[rgba(13,13,13,0.5)] border border-glass-border px-4 text-hm-on-surface font-sans text-sm focus:outline-none focus:border-hm-brand-red transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="register-password" className="text-label-sm text-hm-text-muted">
                PASSWORD
              </label>
              <input
                id="register-password"
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-12 bg-[rgba(13,13,13,0.5)] border border-glass-border px-4 text-hm-on-surface font-sans text-sm focus:outline-none focus:border-hm-brand-red transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="register-confirm-password" className="text-label-sm text-hm-text-muted">
                CONFIRM PASSWORD
              </label>
              <input
                id="register-confirm-password"
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="h-12 bg-[rgba(13,13,13,0.5)] border border-glass-border px-4 text-hm-on-surface font-sans text-sm focus:outline-none focus:border-hm-brand-red transition-colors"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-[10px] text-[#FF3B30] mt-1">
                  Passwords do not match.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-label-lg tracking-widest mt-2"
            >
              {loading ? 'CREATING PROFILE...' : 'CREATE OS PROFILE'}
            </button>
          </form>

          <div className="flex items-center gap-4 my-2">
            <div className="h-px flex-1 bg-glass-border" />
            <span className="text-label-sm text-hm-text-muted">OR</span>
            <div className="h-px flex-1 bg-glass-border" />
          </div>

          <Link
            href="/auth/login"
            className="btn-ghost w-full py-4 text-label-lg tracking-widest text-center"
          >
            ALREADY HAVE AN ACCOUNT? CLOCK IN
          </Link>
          
        </div>
      </div>
    </div>
  );
}
