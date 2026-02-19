"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function BountyThreadsApp() {
  const router = useRouter();
  const [screen, setScreen] = useState("splash");

  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => {
        const savedSession = localStorage.getItem("user_session");

        if (savedSession) {
          const session = JSON.parse(savedSession);

          if (session.role === "influencer") {
            router.push("/influencer-dashboard");
          } else {
            router.push("/dashboard");
          }
        } else {
          setScreen("roleSelection");
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [screen, router]);

  // Splash Screen
  if (screen === "splash") {
    return (
      <div className={styles.splashContainer}>
        <img 
          src="/images/thredbontyopening.png" 
          alt="ThredBonty Opening Logo"
          className={styles.splashLogo} 
        />
      </div>
    );
  }

  // Role Selection Screen
  if (screen === "roleSelection") {
    return (
      <div className={styles.container}>
        {/* 1. Threads Logo */}
        <img src="/images/threadlogo.jpg" alt="Threads" className={styles.logoImage} />

        {/* 2. Heading */}
        <h2 className={styles.pageHeading} style={{ margin: '20px 0' }}>Sign Up/ Log In As</h2>

        {/* 3. Buttons Group */}
        <div className={styles.selectionWrapper}>
          <button
            className={styles.brandBtn}
            onClick={() => {
              localStorage.setItem("selected_role", "brand");
              // YAHAN CHANGE KIYA HAI: Brand click par thred1 par jayega
              router.push("/dashboard/thred1");
            }}
          >
            BRAND
          </button>

          <div
            className={styles.influencerRibbon}
            onClick={() => {
              localStorage.setItem("selected_role", "influencer");
              // Influencer abhi bhi purane path par hi hai
              router.push("/auth/first-page");
            }}
          >
            INFLUENCER
          </div>
        </div>

        {/* 4. Bounty Logo */}
        <img src="/images/bountylogo.jpg" alt="Bounty" className={styles.logoImageSmall} />

        {/* 5. Privacy Footer */}
        <footer className={styles.footerLinks}>
          <a href="/privacy-policy" className={styles.link}>Privacy Policy</a>
          <span className={styles.divider}>|</span>
          <a href="/terms-conditions" className={styles.link}>Terms & Conditions</a>
        </footer>
      </div>
    );
  }
  return null;
}