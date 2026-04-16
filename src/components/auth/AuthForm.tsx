'use client';

// ============================================
// Hustle Mania — Auth Form
// ============================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

type AuthMode = 'signin' | 'signup';

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, loading, error, clearError } = useAuthStore();
  const router = useRouter();

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    clearError();
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;

    if (mode === 'signin') {
      success = await signIn(email, password);
    } else {
      success = await signUp(email, password, name);
    }

    if (success) {
      router.push('/');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Mode Header */}
      <div className="mb-10">
        <h1 className="text-display-md text-hm-on-surface">
          {mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </h1>
        <p className="text-sm text-hm-on-surface-variant mt-3">
          {mode === 'signin'
            ? 'Welcome back. Enter your credentials.'
            : 'Join the syndicate. Access drops first.'}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-hm-error-container text-hm-error text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name (Signup Only) */}
        {mode === 'signup' && (
          <div>
            <label
              htmlFor="auth-name"
              className="block text-label-md text-hm-on-surface-variant mb-2"
            >
              FULL NAME
            </label>
            <input
              id="auth-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="w-full bg-hm-surface-high text-hm-on-surface px-4 py-4 text-sm border-0 border-b-2 border-transparent focus:border-hm-primary focus:outline-none transition-colors placeholder:text-hm-on-surface-variant/50"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label
            htmlFor="auth-email"
            className="block text-label-md text-hm-on-surface-variant mb-2"
          >
            EMAIL
          </label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full bg-hm-surface-high text-hm-on-surface px-4 py-4 text-sm border-0 border-b-2 border-transparent focus:border-hm-primary focus:outline-none transition-colors placeholder:text-hm-on-surface-variant/50"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="auth-password"
            className="block text-label-md text-hm-on-surface-variant mb-2"
          >
            PASSWORD
          </label>
          <div className="relative">
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Min 6 characters"
              className="w-full bg-hm-surface-high text-hm-on-surface px-4 py-4 pr-12 text-sm border-0 border-b-2 border-transparent focus:border-hm-primary focus:outline-none transition-colors placeholder:text-hm-on-surface-variant/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-hm-on-surface-variant transition-colors hover:text-hm-on-surface"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={1.5} />
              ) : (
                <Eye size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          id="auth-submit"
          type="submit"
          disabled={loading}
          className="w-full bg-hm-brand-red text-white py-4 text-label-lg font-bold transition-all hover:bg-hm-on-primary hover:text-hm-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </button>
      </form>

      {/* Toggle Mode */}
      <div className="mt-8 text-center">
        <p className="text-sm text-hm-on-surface-variant">
          {mode === 'signin' ? "Don't have an account?" : 'Already a member?'}
          <button
            onClick={toggleMode}
            className="ml-2 text-hm-primary font-semibold transition-colors hover:text-hm-brand-red"
          >
            {mode === 'signin' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
