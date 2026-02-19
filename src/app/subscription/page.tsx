"use client";
import React from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import styles from "./subscription.module.css";

export default function SubscriptionPage() {
  const plans = [
    { name: "SME", slug: "sme" },
    { name: "SME SPECIAL", slug: "sme-special" },
    { name: "PRO PLAN", slug: "pro" },
    { name: "ENTERPRISE", slug: "enterprise" },
  ];

  return (
    <div className={styles.mainWrapper}>
      <Sidebar />
      
      <div className={styles.contentArea}>
        {/* Top Navbar logic already in your global/sidebar, but following image style */}
        <div className={styles.topNavbar}>
          <div className={styles.menuBtn}>☰</div>
          <div className={styles.navLogoCenter}>Thre@ds</div>
          <div className={styles.navRightIcons}></div>
        </div>

        <div className={styles.container}>
          <h1 className={styles.mainTitle}>Manage Profile & Subscription</h1>
          <p className={styles.subTitle}>Affordable pricing for companies of all sizes</p>

          <div className={styles.planList}>
            {plans.map((plan) => (
              <Link key={plan.slug} href={`/subscription/${plan.slug}`} className={styles.planButton}>
                {plan.name}
              </Link>
            ))}
          </div>

          <Link href="/contact" className={styles.contactLink}>
            Contact Us
          </Link>

          <footer className={styles.footer}>
            <Link href="#">Privacy Policy</Link>
            <span>|</span>
            <Link href="#">Terms & Conditions</Link>
          </footer>
        </div>
      </div>
    </div>
  );
}