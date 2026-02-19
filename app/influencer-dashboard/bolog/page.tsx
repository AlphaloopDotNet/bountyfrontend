'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import Link from 'next/link';
import styles from './bolog.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // --- 1. Hydration aur Auth Check ---
  useEffect(() => {
    setMounted(true);
    
    // Check URL params for Social Login Success (Backend redirects here)
    const params = new URLSearchParams(window.location.search);
    const urlEmail = params.get('email');
    const status = params.get('status');

    if (status === 'success' && urlEmail) {
        localStorage.setItem('user_email', urlEmail);
        localStorage.setItem('user_type', 'bounty'); // Influencer type
        // URL clean karo taaki query params na dikhen
        window.history.replaceState({}, document.title, window.location.pathname);
        router.replace('/influencer-dashboard');
        return;
    }

    // Normal Session Check
    const userEmail = localStorage.getItem('user_email');
    const userType = localStorage.getItem('user_type');

    if (userEmail && userType === 'bounty') {
      router.replace('/influencer-dashboard');
    }
  }, [router]);

  if (!mounted) return null;

  // --- 2. Manual Email/Password Login ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user_email', data.email || email);
        localStorage.setItem('user_type', 'bounty');
        localStorage.setItem('token', data.access);

        alert("Login Success ✅");
        router.replace('/influencer-dashboard');
      } else {
        alert(data.error || "Login failed! Kripya credentials check karein.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Backend server se connect nahi ho paya!");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. Social Login Bridge Logic ---
  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setLoading(true);
    
    // Kahan wapas aana hai
    const finalPath = "/influencer-dashboard";
    // Hamara Backend Bridge URL
    const backendBridge = `http://127.0.0.1:8000/api/social/redirect/`;
    
    // Nested redirection logic for clean flow
    const url = `http://127.0.0.1:8000/accounts/${provider}/login/?next=${encodeURIComponent(backendBridge + '?next=' + finalPath)}`;
    
    window.location.href = url;
  };

  return (
    <main className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.logoWrapper}>
          <Image 
            src="/images/download.png" 
            alt="Bounty Logo" 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      <div className={styles.loginCard}>
        <h1 className={styles.signTitle}>Influencer Sign In</h1>

        <form className={styles.formStack} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <div className={styles.iconBox}>
              <img src="/images/user.png" alt="User" className={styles.fieldIcon} />
            </div>
            <input 
              type="email" 
              placeholder="Email" 
              className={styles.inputField} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.iconBox}>
              <img src="/images/lock.png" alt="Lock" className={styles.fieldIcon} />
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              className={styles.inputField} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className={styles.centerLinks}>
          <Link href="/influencer-dashboard/forgetpass" className={styles.forgotPass}>
            Forgot Password?
          </Link>
          <p className={styles.registerText}>
            Don't have an account?{' '}
            <Link href="/influencer-dashboard/signth1" className={styles.registerLink}>
              Register here
            </Link>
          </p>
        </div>

        <div className={styles.socialSection}>
          <p className={styles.signUpWith}>Or sign in with</p>
          <div className={styles.socialBtns}>
            <button 
              type="button" 
              className={styles.socialBtn}
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
            >
              Google
            </button>
            <button 
              type="button" 
              className={styles.socialBtn}
              onClick={() => handleSocialLogin('facebook')}
              disabled={loading}
            >
              Facebook
            </button>
          </div>
        </div>

        <footer className={styles.footer}>
          <Link href="#" className={styles.fLink}>Privacy Policy</Link>
          <span className={styles.divider}>|</span>
          <Link href="#" className={styles.fLink}>Terms & Conditions</Link>
        </footer>
      </div>
    </main>
  );
}