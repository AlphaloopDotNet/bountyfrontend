"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import styles from "./platform.module.css";
// Sidebar ko import karein (path check kar lein apne folder structure ke hisab se)
import SidebarContent from "../components/SidebarContent"; 

const platformDetails = [
  { 
    title: "INSTAGRAM", 
    tagline: "The Visual Storyteller", 
    req: "Min. 2K Followers", 
    icon: <FaInstagram className="text-pink-500 text-3xl" />,
    url: "https://www.instagram.com" 
  },
  { 
    title: "YOUTUBE", 
    tagline: "The Deep Diver", 
    req: "Min. 1K Subscribers", 
    icon: <FaYoutube className="text-red-500 text-3xl" />,
    url: "https://www.youtube.com"
  },
  { 
    title: "FACEBOOK", 
    tagline: "The Community Builder", 
    req: "Active Community", 
    icon: <FaFacebook className="text-blue-600 text-3xl" />,
    url: "https://www.facebook.com"
  },
  { 
    title: "TWITTER / X", 
    tagline: "The Conversation Starter", 
    req: "Verified Profile Preferred", 
    icon: <FaTwitter className="text-sky-500 text-3xl" />,
    url: "https://x.com"
  }
];

export default function PlatformPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className={styles.paperBody}>
      
      {/* ========== NAVBAR ========== */}
      <nav className={styles.navbar} style={{ padding: '12px 20px' }}>
        <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
          <div className={styles.burgerLine}></div>
          <div className={styles.burgerLine} style={{ width: "16px" }}></div>
          <div className={styles.burgerLine}></div>
        </button>
        
        <img 
          src="/images/download.png" 
          alt="Bounty Logo"
          className={styles.logoMain}
          style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
          onClick={() => navigateTo("/influencer-dashboard")}
        />

        <div className={styles.profileCircleSmall} onClick={() => navigateTo("/influencer-dashboard/profile")}>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" />
        </div>
      </nav>

      {/* ========== SIDEBAR COMPONENT ========== */}
      <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.sidebarActive : ""}`}>
        <SidebarContent 
            onNavigate={navigateTo} 
            onClose={() => setIsMenuOpen(false)} 
            onLogout={handleLogout}
        />
      </div>
      
      {isMenuOpen && <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} />}

      {/* ========== MAIN CONTENT ========== */}
      <main style={{ paddingTop: '100px', maxWidth: '800px', margin: '0 auto', paddingBottom: '50px', paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ background: '#2c1810', color: 'white', padding: '10px 25px', borderRadius: '50px', display: 'inline-block', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1.5px' }}>
                OFFICIAL MEDIA CHANNELS
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '20px', fontFamily: "'Bebas Neue', sans-serif" }}>WHERE DO YOU INFLUENCE?</h2>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          {platformDetails.map((item, index) => (
            <div key={index} className={styles.platformCard} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', marginBottom: '15px', borderRadius: '16px', background: '#f9fafb' }}>
              <div style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '0.8rem' }}>{item.tagline}</p>
                <span style={{ fontSize: '10px', background: '#ffedd5', color: '#9a3412', padding: '2px 10px', borderRadius: '10px', fontWeight: 'bold' }}>{item.req}</span>
              </div>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.visitBtn} style={{ padding: '10px 25px', borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none' }}>
                VISIT
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}