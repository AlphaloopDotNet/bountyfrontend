"use client";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import styles from "./thankyou.module.css"; // Nayi CSS file banayenge

export default function ThankYou() {
  return (
    <div className={styles.container}>
      <Sidebar />
      
      <div className={styles.wrapper}>
        {/* Success Header */}
        <div className={styles.headerStack}>
          <h1 className={styles.title}>
            Thank You!
          </h1>
          <p className={styles.subtitle}>
            Your campaign has been successfully submitted. Our team will review it shortly.
          </p>
        </div>

        {/* Animated Success Check - Project Red Theme */}
        <div className={styles.iconContainer}>
          <div className={styles.iconCircle}>
            <svg 
              className={styles.checkIcon} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="4" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          {/* Decorative Elements */}
          <div className={styles.particle1}></div>
          <div className={styles.particle2}></div>
        </div>

        {/* Action Button */}
        <Link href="/dashboard" className={styles.dashBtn}>
          <span>🏠</span>
          <span>Go back to Dashboard</span>
          <svg className={styles.arrowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}