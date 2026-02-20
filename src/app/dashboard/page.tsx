"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  

  if (status === "loading") {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loader}></div>
        <p>Verifying Brand Access...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.replace("/login");
    return null;
  }

  const campaigns = [
    { id: 1, name: "HeartWork", image: "/images/heartwork.jpeg" },
    { id: 2, name: "Smile Deke Dekho", image: "/images/lays6.jfif" },
    { id: 3, name: "HeartWork Reels", image: "/images/heartwork.jpeg" },
  ];

  const ambassadors = [
    { id: 1, name: "Ranbir Kapoor", image: "/images/ranveer.jfif" },
    { id: 2, name: "Alia Bhatt", image: "/images/alia.jfif" },
    { id: 3, name: "M.S. Dhoni", image: "/images/dhoni.jpeg" },
  ];

  const fans = [
    { id: 1, name: "Rohan", image: "/images/fan1.jfif" },
    { id: 2, name: "Priya", image: "/images/fan2.jfif" },
    { id: 3, name: "Amit", image: "/images/fan3.jfif" },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace("/login");
  };

  return (
    <div className={styles.mainWrapper}>
      <Sidebar />
      
      <main className={styles.contentArea}>
        {/* --- TOP NAVBAR --- */}
        <header className={styles.topNavbar}>
          <div className={styles.menuBtn}>☰</div>
          <div className={styles.navLogoCenter}>
            <Image 
              src="/images/thd.png"
              alt="Threads Logo" 
              width={140} 
              height={70} 
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.navRightIcons}>
            <span onClick={handleLogout} className={styles.navIcon} title="Logout">Logout 🚪</span>
            <span className={styles.navIcon}>📈</span>
            <span className={styles.navIcon}>✉️</span>
          </div>
        </header>

        {/* --- HERO BANNER --- */}
        <section className={styles.heroContainer}>
          <Image 
            src="/images/lays2.jfif" 
            alt="Hero Banner" 
            fill 
            className={styles.heroImg} 
            priority 
          />
          <div className={styles.laysLogoWrapper}>
            <Image 
              src="/images/layslogo.jpeg" 
              alt="Lays Logo" 
              width={140} 
              height={140} 
              className={styles.laysLogo} 
            />
          </div>
        </section>

        {/* --- ACTION BAR --- */}
        <div className={styles.actionBar}>
          <div className={styles.socialIcons}>
            <Image src="/icon/facebook.png" alt="FB" width={24} height={24} />
            <Image src="/icon/twitter.png" alt="TW" width={24} height={24} />
            <Image src="/icon/insta.png" alt="IG" width={24} height={24} />
          </div>
          
          <div className={styles.actionButtons}>
            <button className={styles.createBtn} onClick={() => router.push('/dashboard/create-campaign')}>
              + Create Campaign
            </button>
            <button className={styles.searchIcon}>🔍</button>
          </div>
        </div>

        {/* --- CONTENT GRIDS --- */}
        <div className={styles.sectionsWrapper}>
          
          <section className={styles.dataSection}>
            <h2 className={styles.sectionTitle}>ACTIVE CAMPAIGNS</h2>
            <div className={styles.horizontalScroll}>
              {campaigns.map((camp) => (
                <div key={camp.id} className={styles.cardItem}>
                  <div className={styles.imageFrame}>
                    <Image src={camp.image} alt={camp.name} fill className="object-cover" />
                  </div>
                  <p className={styles.itemName}>{camp.name}</p>
                </div>
              ))}
              <div className={styles.nextArrow}>❯</div>
            </div>
          </section>

          <section className={styles.dataSection}>
            <h2 className={styles.sectionTitle}>BRAND AMBASSADORS</h2>
            <div className={styles.horizontalScroll}>
              {ambassadors.map((person) => (
                <div key={person.id} className={styles.cardItem}>
                  <div className={styles.avatarCircle}>
                    <Image src={person.image} alt={person.name} fill />
                  </div>
                  <p className={styles.itemName}>{person.name}</p>
                </div>
              ))}
              <div className={styles.nextArrow}>❯</div>
            </div>
          </section>

          <section className={styles.dataSection}>
            <h2 className={styles.sectionTitle}>TOP FANS</h2>
            <div className={styles.horizontalScroll}>
              {fans.map((fan) => (
                <div key={fan.id} className={styles.cardItem}>
                  <div className={styles.avatarCircle}>
                    <Image src={fan.image} alt={fan.name} fill />
                  </div>
                  <p className={styles.itemName}>{fan.name}</p>
                </div>
              ))}
              <div className={styles.nextArrow}>❯</div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}