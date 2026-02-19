'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './forgetpass.module.css';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email Input, 2: OTP & New Password
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Input States
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- 1. OTP BHEJNE KA FUNCTION ---
  const handleSendOTP = async () => {
    if (!email) return alert("Kripya email address bharein!");
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/password-reset-request/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("OTP aapki email par bhej diya gaya hai! ✅");
        setStep(2);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "User nahi mila. Kripya sahi email dalein.");
      }
    } catch (error) {
      alert("Backend server se connection fail ho gaya!");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. PASSWORD RESET CONFIRM FUNCTION ---
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords match nahi ho rahe hain!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/password-reset-confirm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          otp: otp,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        alert("Password successfully change ho gaya! 🎉");
        router.push("/influencer-dashboard/bolog"); // Influencer login page par redirect
      } else {
        const data = await response.json();
        alert(data.error || "OTP galat hai ya expire ho chuka hai.");
      }
    } catch (error) {
      alert("Kuch galat hua. Kripya dobara koshish karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      {/* Top Header Bounty Logo Section */}
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
        <h1 className={styles.signTitle}>
          {step === 1 ? 'Forgot Password' : 'Reset Password'}
        </h1>

        <form className={styles.formStack} onSubmit={step === 2 ? handleResetPassword : (e) => e.preventDefault()}>
          {step === 1 ? (
            <>
              <p className={styles.instruction}>Enter your email to receive an OTP</p>
              <div className={styles.inputGroup}>
                <div className={styles.iconBox}>
                   <img src="/images/user.png" alt="" className={styles.fieldIcon} />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className={styles.inputField} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button 
                type="button" 
                className={styles.loginBtn} 
                onClick={handleSendOTP}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <p className={styles.instruction}>Enter OTP and your new password</p>
              
              {/* OTP Field */}
              <div className={styles.inputGroup}>
                <div className={styles.iconBox}>
                   <span style={{color: '#d1212a', fontWeight: 'bold'}}>#</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  className={styles.inputField} 
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              {/* New Password */}
              <div className={styles.inputGroup}>
                <div className={styles.iconBox}>
                   <img src="/images/lock.png" alt="" className={styles.fieldIcon} />
                </div>
                <input 
                  type="password" 
                  placeholder="New Password" 
                  className={styles.inputField} 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className={styles.inputGroup}>
                <div className={styles.iconBox}>
                   <img src="/images/lock.png" alt="" className={styles.fieldIcon} />
                </div>
                <input 
                  type="password" 
                  placeholder="Confirm New Password" 
                  className={styles.inputField} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className={styles.loginBtn} disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
              <button 
                type="button" 
                className={styles.resendBtn} 
                onClick={() => setStep(1)}
              >
                Back to Email
              </button>
            </>
          )}
        </form>

        <Link href="/influencer-dashboard/bolog" className={styles.backToLogin}>
            Back to Login
        </Link>

        {/* Footer Links */}
        <footer className={styles.footer}>
          <Link href="#" className={styles.fLink}>Privacy Policy</Link>
          <span className={styles.divider}>|</span>
          <Link href="#" className={styles.fLink}>Terms & Conditions</Link>
        </footer>
      </div>
    </main>
  );
}