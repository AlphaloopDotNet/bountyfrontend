"use client"; // Next.js Client Component zaroori hai
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    // 3 second ka timer splash screen ke liye
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // --- 1. Splash Screen UI (Bounty & Threads) ---
  if (isSplash) {
    return (
      <div className={styles.splashMain}>
        <div className={styles.splashContent}>
          <div className={styles.bountyLogo}>B<span>🎯</span>unty</div>
          <div className={styles.ampersand}>&</div>
          <div className={styles.threadsLogo}>Thre@ds</div>
        </div>
        <footer className={styles.miniFooter}>
          Privacy Policy | Terms & Conditions
        </footer>
      </div>
    );
  }

  // --- 2. Role Selection UI (Sign Up / Log In As) ---
  return (
    <div className={styles.roleMain}>
      <header className={styles.headerLogo}>Thre@ds</header>
      
      <h2 className={styles.pageTitle}>Sign Up/ Log In As</h2>

      <div className={styles.buttonContainer}>
        {/* Brand Button */}
        <button className={styles.brandBtn}>BRAND</button>

        {/* Influencer Ribbon */}
        <div className={styles.ribbonWrapper}>
          <div className={styles.influencerRibbon}>INFLUENCER</div>
        </div>
      </div>

      <div className={styles.bottomBounty}>B<span>🎯</span>unty</div>

      <footer className={styles.miniFooter}>
        Privacy Policy | Terms & Conditions
      </footer>
    </div>
  );
}