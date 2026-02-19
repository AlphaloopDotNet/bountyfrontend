'use client';

import { useState } from 'react'; // <-- Pehla badlav: useState import kiya
import Image from 'next/image';
import Link from 'next/link';
import styles from './signth2.module.css';

export default function RegisterPage() {
  // 2. Dusra badlav: Saari fields ke liye states banayi
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 3. Tisra badlav: Backend ko data bhejne ka function
 const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,       // Backend email ko hi username ki tarah lega
          email: email,
          password: password,
          phone_number: phone,
          user_type: 'brand'     // Dashboard ke liye 'brand' fix rakha hai
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Brand Registered Successfully!");
        // Safal hone par login page par bhej sakte hain
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Backend server se connection fail ho gaya!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.logoWrapper}>
          <Image 
            src="/images/threadlogo.jpg" 
            alt="Threads Logo" 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      <div className={styles.registerCard}>
        <h1 className={styles.pageTitle}>Register</h1>

        {/* Form onSubmit par handleRegister call hoga */}
        <form className={styles.formStack} onSubmit={handleRegister}>
          <div className={styles.phoneInputGroup}>
            <div className={styles.countryCode}>
              <img src="https://flagcdn.com/w40/in.png" alt="India" className={styles.flag} />
              <span className={styles.codeText}>+91</span>
              <span className={styles.arrow}>⌄</span>
            </div>
            <div className={styles.verticalDivider}></div>
            {/* Input mein value aur onChange add kiya */}
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
          Already have an account?{' '}
          <Link href="/dashboard/thlog" className={styles.loginLink}>
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}