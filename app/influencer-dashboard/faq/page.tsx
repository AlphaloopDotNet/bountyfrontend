"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../influencer.module.css";
import SidebarContent from "../components/SidebarContent";

// 🔥 Campaigns data
const campaigns = [
  {
    brandLogo: "/slice.jpeg",
    campaignImg: "/katrina.jpeg",
    hashtag: "#SLICEKIPETI",
    description: "Required influencers with a minimum of 2000 followers to repost this video.",
    type: "Barter",
    minFollowers: "2000 & above",
    validity: "20/08/2020",
    specialRequirements: "Requirements of Slice",
    fbLink: "https://facebook.com/sliceindia",
    instaLink: "https://instagram.com/slice_india"
  },
  {
    brandLogo: "/layslogo.jpeg", 
    campaignImg: "/heartwork.jpeg",
    hashtag: "#HEARTWORK",
    description: "Join the tribute to our unsung heroes. Share the heart-work of India.",
    type: "Barter",
    minFollowers: "5000 & above",
    validity: "25/08/2020",
    specialRequirements: "Requirements of Lays",
    fbLink: "https://facebook.com/laysindia",
    instaLink: "https://instagram.com/lays_india"
  }
];

export default function BrandDetailPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Get campaign index from query param
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const idx = idParam ? parseInt(idParam) : 0;

  // ✅ Fetch the correct campaign, default to first
  const campaign = campaigns[idx] || campaigns[0];

  return (
    <div className={styles.paperBody}>

      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button
            className={styles.burgerBtn}
            onClick={() => setIsMenuOpen(true)}
          >
            <div className={styles.burgerLine}></div>
            <div className={styles.burgerLine} style={{ width: "15px" }}></div>
            <div className={styles.burgerLine}></div>
          </button>
        </div>

        <div className={styles.navCenter}>
          <img
            src="/images/download.png"
            alt="Bounty"
            className={styles.logoMain}
          />
        </div>

        <div className={styles.navRight}>
          <div className={styles.profileCircleSmall}>
            <img src="/icon/user.jfif" alt="User" />
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className={styles.mainContainer}>
        <div className={styles.bountyCard} style={{ background: "transparent", boxShadow: "none" }}>

          {/* Optional: show campaign image */}
          <img 
            src={campaign.campaignImg} 
            alt={campaign.hashtag} 
            style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }} 
          />

          <section className={styles.detailSection}>
            <h3 className={styles.detailTitle}>BRAND NAME</h3>
            <p className={styles.detailText}>
              {campaign.hashtag.includes("SLICE") ? "Slice" : "Lays"}
            </p>
          </section>

          <section className={styles.detailSection}>
            <h3 className={styles.detailTitle}>BRIEF</h3>
            <p className={styles.detailText}>{campaign.description}</p>
          </section>

          <section className={styles.detailSection}>
            <h3 className={styles.detailTitle}>TYPE</h3>
            <p className={styles.detailText}>{campaign.type}</p>
          </section>

          <section className={styles.detailSection}>
            <h3 className={styles.detailTitle}>MINIMUM FOLLOWERS</h3>
            <p className={styles.detailText}>{campaign.minFollowers}</p>
          </section>

          <section className={styles.detailSection}>
            <h3 className={styles.detailTitle}>VALIDITY</h3>
            <p className={styles.detailText}>Valid till {campaign.validity}</p>
          </section>

          <section className={styles.detailSection}>
            <h3 className={styles.detailTitle}>SPECIAL REQUIREMENTS</h3>
            <p className={styles.detailText}>{campaign.specialRequirements}</p>
          </section>

        </div>
      </main>

      {/* SIDEBAR */}
      {isMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        className={`${styles.sidebarMenu} ${isMenuOpen ? styles.sidebarActive : ""}`}
      >
        <SidebarContent
          onNavigate={(path) => {
            setIsMenuOpen(false);
            router.push(path);
          }}
          onLogout={() => router.push("/")}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </div>
  );
}
