'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './thlog.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ URL check karega agar user social login se wapas aaya hai
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error) {
      alert("Social Login Failed! Please try again.");
    }
  }, []);

  // ================= EMAIL PASSWORD LOGIN =================
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
        // Data Save karein
        localStorage.setItem("userEmail", data.email || email);
        localStorage.setItem("user_type", "thread"); 
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh", data.refresh);

        alert("Login Success ✅");
        router.push("/dashboard"); 
      } else {
        alert(data.error || "Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
      alert("Backend server not responding!");
    } finally {
      setLoading(false);
    }
  };

  // ================= SOCIAL LOGIN (THE FIX) =================
  const handleSocialLogin = (provider: "google" | "facebook") => {
    setLoading(true);
    
    // 🔥 Backend ka woh path jo humne urls.py mein banaya hai
    const backendRedirectBridge = "http://127.0.0.1:8000/api/social/redirect/";
    
    // Allauth ka login endpoint with 'next' parameter
    const url = `http://127.0.0.1:8000/accounts/${provider}/login/?next=${encodeURIComponent(backendRedirectBridge)}`;
    
    // Pure page ko redirect karo
    window.location.href = url;
  };

  return (
    <main className={styles.container}>
      
      {/* LOGO */}
      <div className={styles.headerSection}>
        <div className={styles.logoWrapper}>
          <Image src="/images/threadlogo.jpg" alt="Threads Logo" fill priority />
        </div>
      </div>

      <div className={styles.loginCard}>
        <h1 className={styles.signTitle}>Sign In</h1>

        {/* LOGIN FORM */}
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
            {loading ? "Please wait..." : "Log In"}
          </button>
        </form>

        {/* LINKS */}
        <div className={styles.centerLinks}>
          <Link href="/dashboard/forgetpass" className={styles.forgotPass}>Forgot Password?</Link>
          <p className={styles.registerText}>
            Don't have an account?{' '}
            <Link href="/dashboard/signth1" className={styles.registerLink}>
              Register here
            </Link>
          </p>
        </div>

        {/* SOCIAL LOGIN SECTION */}
        <div className={styles.socialSection}>
          <p className={styles.signUpWith}>or sign in with</p>
          <div className={styles.socialBtns}>
            <button 
                type="button"
                onClick={() => handleSocialLogin("google")} 
                className={styles.socialBtn}
                disabled={loading}
            >
              <img src="/images/google.png" alt="" width={20} /> Google
            </button>
            <button 
                type="button"
                onClick={() => handleSocialLogin("facebook")} 
                className={styles.socialBtn}
                disabled={loading}
            >
              <img src="/images/facebook.png" alt="" width={20} /> Facebook
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <Link href="#" className={styles.fLink}>Privacy Policy</Link>
          <span className={styles.divider}>|</span>
          <Link href="#" className={styles.fLink}>Terms & Conditions</Link>
        </footer>

      </div>
    </main>
  );
}