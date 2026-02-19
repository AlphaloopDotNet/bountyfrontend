'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './signth2.module.css';

export default function RegisterPage() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Function ka naam aur 'async' keyword fix kiya
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // 2. Body mein 'phone_number' ki jagah sirf 'phone' bhejein (jo models.py mein hai)
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,       
          email: email,
          password: password,
          phone: phone, // Models.py ke field name se match karein
          user_type: 'influencer' 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Influencer Account Registered Successfully!");
        // window.location.href = '/influencer-dashboard/bolog'; // Redirect to login
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Backend server se connect nahi ho pa raha! Make sure Django is running.");
      console.error("Connection Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      {/* Logo Section */}
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

      <div className={styles.registerCard}>
        <h1 className={styles.pageTitle}>Register</h1>

        {/* 3. onSubmit handler ka naam update kiya */}
        <form className={styles.formStack} onSubmit={handleRegister}>
          <div className={styles.phoneInputGroup}>
            <div className={styles.countryCode}>
              <img src="https://flagcdn.com/w40/in.png" alt="India" className={styles.flag} />
              <span className={styles.codeText}>+91</span>
              <span className={styles.arrow}>⌄</span>
            </div>
            <div className={styles.verticalDivider}></div>
            <input 
              type="text" 
              placeholder="Phone number" 
              className={styles.inlineInput} 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <input 
            type="email" 
            placeholder="Email Address" 
            className={styles.inputFieldFull} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className={styles.inputFieldFull} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className={styles.inputFieldFull} 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button 
            type="submit" 
            className={styles.registerBtn}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>

        <p className={styles.loginText}>
          Already have an account? <Link href="/influencer-dashboard/bolog" className={styles.loginLink}>Login here</Link>
        </p>
      </div>
    </main>
  );
}