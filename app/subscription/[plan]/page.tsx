"use client";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import styles from "../subscription.module.css"; // Reuse your module

export default function PlanDetails() {
  const params = useParams();
  const router = useRouter();
  const planSlug = params.plan;

  const planContent: any = {
    "sme": {
      title: "SME PLAN",
      features: [
        { text: "1 Account", active: true },
        { text: "Limited advanced discovery searches", active: true },
        { text: "50 Influencer analytics/ mo", active: true },
        { text: "1 Active Campaign", active: true },
        { text: "FB, YT & TikTok Channel Access", active: false },
        { text: "Data Export as CSV & Powerpoint", active: false },
        { text: "Influencer CRM", active: false },
        { text: "Story Tracking", active: false },
        { text: "Dedicated Account Manager", active: false },
      ]
    },
    "sme-special": {
      title: "SME SPECIAL",
      features: [
        { text: "1 Account", active: true },
        { text: "Advanced discovery searches", active: true },
        { text: "100 Influencer analytics/ mo", active: true },
        { text: "2 Active Campaigns", active: true },
        { text: "FB & YT Channel Access", active: true },
        { text: "Data Export as CSV", active: true },
        { text: "Influencer CRM", active: false },
        { text: "Story Tracking", active: false },
      ]
    },
    "pro": {
      title: "PRO PLAN",
      features: [
        { text: "1 Account", active: true },
        { text: "Access to data for 1 Region", active: true },
        { text: "Unlimited advanced discovery searches", active: true },
        { text: "200 Influencer analytics / mo", active: true },
        { text: "3 Active Campaigns", active: true },
        { text: "Data Export as CSV & Powerpoint", active: true },
        { text: "Influencer CRM", active: true },
        { text: "IG, FB, YT & TikTok available", active: true },
        { text: "Dedicated Account Manager", active: true },
        { text: "Story Tracking (add on)", active: false },
        { text: "Whitelabelled Reports", active: false },
        { text: "Collaboration Accounts", active: false },
      ]
    },
    "enterprise": {
      title: "ENTERPRISE",
      features: [
        { text: "Team Accounts for collaboration", active: true },
        { text: "Team onboarding & Offline Support", active: true },
        { text: "Unlimited advanced discovery searches", active: true },
        { text: "Unlimited Influencer analytics", active: true },
        { text: "Data Export", active: true },
        { text: "Unlimited Active Campaigns", active: true },
        { text: "Influencer CRM", active: true },
        { text: "Story Tracking", active: true },
        { text: "API Access", active: true },
        { text: "Whitelabelled Reports", active: true },
      ]
    }
  };

  const currentPlan = planContent[planSlug as string] || planContent["sme"];

  return (
    <div className={styles.mainWrapper}>
      <Sidebar />
      <div className={styles.contentArea}>
        {/* Navbar */}
        <div className={styles.topNavbar}>
          <div className={styles.menuBtn} onClick={() => router.back()}>☰</div>
          <div className={styles.navLogoCenter}>Thre@ds</div>
          <div className={styles.navRightIcons}></div>
        </div>

        <div className={styles.detailsContainer}>
          <h1 className={styles.planTitleRed}>{currentPlan.title}</h1>

          <ul className={styles.featureList}>
            {currentPlan.features.map((feature: any, idx: number) => (
              <li key={idx} className={styles.featureItem}>
                <span className={feature.active ? styles.dotGreen : styles.dotRed}></span>
                <span className={styles.featureText}>{feature.text}</span>
              </li>
            ))}
          </ul>

          <Link href="/contact" className={styles.contactBtnLarge}>
            CONTACT US
          </Link>

          <footer className={styles.footerSticky}>
            <div className={styles.footerLinks}>
              <Link href="#">Privacy Policy</Link>
              <span>|</span>
              <Link href="#">Terms & Conditions</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}