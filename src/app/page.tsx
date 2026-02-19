"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";

export default function BountyThreadsApp() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [screen, setScreen] = useState("splash");

  useEffect(() => {
    if (screen !== "splash") return;

    const timer = setTimeout(() => {
      if (status === "loading") return; // wait for session to resolve

      if (status === "authenticated") {
        // Already logged in — redirect based on role
        if (session.user.role === "influencer") {
          router.push("/influencer-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        // Not logged in — show role selection
        setScreen("roleSelection");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [screen, status, session, router]);

  // ── Splash Screen ─────────────────────────────────────────
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

  // ── Role Selection Screen ─────────────────────────────────
  if (screen === "roleSelection") {
    return (
      <div className={styles.container}>
        <img
          src="/images/threadlogo.jpg"
          alt="Threads"
          className={styles.logoImage}
        />

        <h2 className={styles.pageHeading} style={{ margin: "20px 0" }}>
          Sign Up / Log In As
        </h2>

        <div className={styles.selectionWrapper}>
          {/* ── Brand ───────────────────────────────────── */}
          <button
            className={styles.brandBtn}
            onClick={() => {
              // Store intent so register-role page knows context
              sessionStorage.setItem("auth_intent", "brand");
              router.push("/register-role");
            }}
          >
            BRAND
          </button>

          {/* ── Influencer ──────────────────────────────── */}
          <div
            className={styles.influencerRibbon}
            onClick={() => {
              sessionStorage.setItem("reg_role", "influencer");
              sessionStorage.setItem("reg_subtype", "");
              router.push("/register"); // ← skip register-role entirely
            }}
          >
            INFLUENCER
          </div>
        </div>

        <img
          src="/images/bountylogo.jpg"
          alt="Bounty"
          className={styles.logoImageSmall}
        />

        <footer className={styles.footerLinks}>
          <a href="/privacy-policy" className={styles.link}>
            Privacy Policy
          </a>
          <span className={styles.divider}>|</span>
          <a href="/terms-conditions" className={styles.link}>
            Terms & Conditions
          </a>
        </footer>
      </div>
    );
  }

  return null;
}
