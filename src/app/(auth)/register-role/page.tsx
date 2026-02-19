"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./register-role.module.css";

export default function RegisterRolePage() {
  const router = useRouter();

  useEffect(() => {
    // If user clicked Influencer on landing page — skip this screen entirely
    const intent = sessionStorage.getItem("auth_intent");
    if (intent === "influencer") {
      sessionStorage.setItem("reg_role", "influencer");
      sessionStorage.setItem("reg_subtype", "");
      sessionStorage.removeItem("auth_intent");
      router.replace("/register");
    }
  }, []);

  const handleBrandSelection = (
    subType: "brand_manager" | "company" | "agency",
  ) => {
    sessionStorage.setItem("reg_role", "brand");
    sessionStorage.setItem("reg_subtype", subType);
    sessionStorage.removeItem("auth_intent");

    // Confirm it's set before navigating
    console.log("role set:", sessionStorage.getItem("reg_role"));
    console.log("subtype set:", sessionStorage.getItem("reg_subtype"));

    router.push("/register");
  };

  return (
    <main className={styles.pageContainer}>
      <div className={styles.logoHeader}>
        <div className={styles.logoWrapper}>
          <Image
            src="/images/threadlogo.jpg"
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      <div className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Sign Up As</h1>

        <div className={styles.buttonStack}>
          <button
            className={styles.redActionBtn}
            onClick={() => handleBrandSelection("brand_manager")}
          >
            <div className={styles.iconContainer}>
              <img src="/images/user.png" alt="" className={styles.innerIcon} />
            </div>
            <span className={styles.btnText}>Brand Manager</span>
          </button>

          <button
            className={styles.redActionBtn}
            onClick={() => handleBrandSelection("company")}
          >
            <div className={styles.iconContainer}>
              <img
                src="/images/building.png"
                alt=""
                className={styles.innerIcon}
              />
            </div>
            <span className={styles.btnText}>Company</span>
          </button>

          <button
            className={styles.redActionBtn}
            onClick={() => handleBrandSelection("agency")}
          >
            <div className={styles.iconContainer}>
              <img
                src="/images/target.png"
                alt=""
                className={styles.innerIcon}
              />
            </div>
            <span className={styles.btnText}>Agency</span>
          </button>
        </div>

        {/* Already have account — go to login */}
        <p className={styles.loginText}>
          Already have an account?{" "}
          <Link href="/login" className={styles.loginLink}>
            Log in here
          </Link>
        </p>

        <footer className={styles.formFooter}>
          <Link href="#" className={styles.footerLink}>
            Privacy Policy
          </Link>
          <span className={styles.divider}>|</span>
          <Link href="#" className={styles.footerLink}>
            Terms & Conditions
          </Link>
        </footer>
      </div>
    </main>
  );
}
