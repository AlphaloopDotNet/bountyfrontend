'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // If already logged in, go to dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status]);

  // Show success message if coming from registration
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMsg('Account created! Please log in.');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,   // we handle redirect manually
    });

    if (result?.error) {
      setErrorMsg(result.error || 'Login failed. Check your credentials.');
      setLoading(false);
      return;
    }

    // Success — go to dashboard
    router.push('/dashboard');
  };

  // ===================== SOCIAL LOGIN — V2 =====================
  // const handleGoogleLogin = () => signIn('google', { callbackUrl: '/dashboard' });
  // const handleFacebookLogin = () => signIn('facebook', { callbackUrl: '/dashboard' });
  // =============================================================

  if (status === 'loading') return null; // Prevent flash before redirect

  return (
    <main className={styles.container}>

      <div className={styles.headerSection}>
        <div className={styles.logoWrapper}>
          <Image src="/images/threadlogo.jpg" alt="Logo" fill priority />
        </div>
      </div>

      <div className={styles.loginCard}>
        <h1 className={styles.signTitle}>Sign In</h1>

        {successMsg && <p className={styles.successMsg}>{successMsg}</p>}
        {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

        <form className={styles.formStack} onSubmit={handleLogin}>

          <div className={styles.inputGroup}>
            <div className={styles.iconBox}>
              <img src="/images/user.png" className={styles.fieldIcon} alt="user" />
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
              <img src="/images/lock.png" className={styles.fieldIcon} alt="lock" />
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
            {loading ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        <div className={styles.centerLinks}>
          <Link href="/forgot-password" className={styles.forgotPass}>
            Forgot Password?
          </Link>
          <p className={styles.registerText}>
            Don't have an account?{' '}
            <Link href="/register-role" className={styles.registerLink}>
              Register here
            </Link>
          </p>
        </div>

        {/* SOCIAL LOGIN — DISABLED FOR NOW (V2)
        <div className={styles.socialSection}>
          <p className={styles.signUpWith}>or sign in with</p>
          <div className={styles.socialBtns}>
            <button type="button" onClick={handleGoogleLogin} className={styles.socialBtn}>
              <img src="/images/google.png" alt="" width={20} /> Google
            </button>
            <button type="button" onClick={handleFacebookLogin} className={styles.socialBtn}>
              <img src="/images/facebook.png" alt="" width={20} /> Facebook
            </button>
          </div>
        </div>
        */}

        <footer className={styles.footer}>
          <Link href="#" className={styles.fLink}>Privacy Policy</Link>
          <span className={styles.divider}>|</span>
          <Link href="#" className={styles.fLink}>Terms & Conditions</Link>
        </footer>
      </div>
    </main>
  );
}