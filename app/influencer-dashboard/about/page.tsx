"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../influencer.module.css";
import SidebarContent from "../components/SidebarContent";

export default function AboutPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userImage, setUserImage] = useState("/icon/user.jfif");

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (!session) {
      router.push("/auth/login");
    }
    const userProfile = localStorage.getItem("user_profile");
    if (userProfile) {
      setUserImage(userProfile);
    }
  }, [router]);

  const navigateTo = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    localStorage.removeItem("user_profile");
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.paperBody}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button className={styles.burgerBtn} onClick={toggleMenu}>
            <div className={styles.burgerLine}></div>
            <div className={styles.burgerLine}></div>
            <div className={styles.burgerLine}></div>
          </button>
        </div>

        <div className={styles.navCenter}>
          <img 
            src="/images/download.png" 
            alt="Bounty Logo"
            className={styles.logoMain}
          />
        </div>

        <div className={styles.navRight}>
          <div 
            className={styles.profileCircle}
            onClick={() => navigateTo("/influencer-dashboard/profile")}
            title="My Profile"
          >
            <img src={userImage} alt="User Profile" />
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      {isMenuOpen && (
        <>
          <div className={`${styles.sidebarMenu} ${styles.sidebarActive}`}>
            <SidebarContent 
              onNavigate={navigateTo}
              onLogout={handleLogout}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
          <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} />
        </>
      )}

      {/* MAIN CONTENT */}
      <main className={`${styles.mainContainer} pt-32 max-w-6xl mx-auto px-4`}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <h1 className={`${styles.sectionTitle} font-blacklisted`}>
            THE ART OF INFLUENCE
          </h1>
          <p className="font-comfortaa" style={{ 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#654321',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginTop: '10px'
          }}>
            Bridging the gap between storytelling and branding
          </p>
        </div>

        <div className={styles.formHeaderRibbon}>
          ESTABLISHED 2024 • THE BOUNTY GAZETTE
        </div>

        <div className={styles.vintageForm}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            
            {/* Philosophy */}
            <section className={styles.detailSection}>
              <h3 className={`${styles.detailTitle} font-blacklisted`}>
                OUR PHILOSOPHY
              </h3>
              <p className={`${styles.detailText} font-comfortaa`}>
                We believe that every creator is a modern-day artisan. In an era of digital noise, 
                <strong style={{color: '#D2691E', fontWeight: '700'}}>Bounty</strong> stands as a curated marketplace 
                where authentic voices meet legendary brands. We don't just facilitate transactions; 
                we cultivate relationships that turn simple posts into cultural moments.
              </p>
            </section>

            {/* ✅ WHY CHOOSE BOUNTY - Paragraph Style */}
            <section className={styles.detailSection}>
              <h3 className={`${styles.detailTitle} font-blacklisted`}>
                WHY CHOOSE BOUNTY?
              </h3>
              <p className={`${styles.detailText} font-comfortaa`}>
                Bounty offers creators unparalleled opportunities through <strong style={{color: '#D2691E', fontWeight: '700'}}>exclusive</strong> 
                hand-picked campaigns from top-tier brands like PepsiCo and Slice. Say goodbye to endless email chains with our 
                <strong style={{color: '#D2691E', fontWeight: '700'}}>streamlined platform</strong> that lets you apply, track, and earn in one place. 
                Whether you have 2K or 2M followers, <strong style={{color: '#D2691E', fontWeight: '700'}}>your creativity is your currency</strong>—empowering creators of all sizes.
              </p>
            </section>

            {/* Statistics */}
            <div className={styles.mainStatsBar}>
              <div style={{ textAlign: 'center', padding: '15px' }}>
                <span className="font-blacklisted" style={{ fontSize: '28px', fontWeight: '900', color: '#FFD700' }}>
                  10K+
                </span>
                <br />
                <small className="font-comfortaa" style={{ fontSize: '12px', fontWeight: '700', color: '#8B4513' }}>
                  CURATED CREATORS
                </small>
              </div>
              <div style={{ textAlign: 'center', padding: '15px' }}>
                <span className="font-blacklisted" style={{ fontSize: '28px', fontWeight: '900', color: '#D2691E' }}>
                  500+
                </span>
                <br />
                <small className="font-comfortaa" style={{ fontSize: '12px', fontWeight: '700', color: '#CD853F' }}>
                  SUCCESSFUL MISSIONS
                </small>
              </div>
              <div style={{ textAlign: 'center', padding: '15px' }}>
                <span className="font-blacklisted" style={{ fontSize: '28px', fontWeight: '900', color: '#8B4513' }}>
                  50+
                </span>
                <br />
                <small className="font-comfortaa" style={{ fontSize: '12px', fontWeight: '700', color: '#A0522D' }}>
                  GLOBAL PARTNERS
                </small>
              </div>
            </div>

            {/* Quote */}
            <section className={styles.detailSection}>
              <blockquote className="font-comfortaa" style={{ 
                fontSize: '24px', 
                fontStyle: 'italic',
                color: '#8B4513',
                textAlign: 'center',
                margin: '0',
                lineHeight: '1.4'
              }}>
                "The future belongs to those who create."
              </blockquote>
              <p className="font-blacklisted" style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                marginTop: '15px',
                color: '#654321',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textAlign: 'center'
              }}>
                — THE BOUNTY COLLECTIVE
              </p>
            </section>
          </div>

          {/* CENTERED BUTTON */}
          <div className={styles.formActions} style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginTop: '50px' 
          }}>
            <button 
              className={styles.greenRibbonBtn}
              onClick={() => navigateTo("/influencer-dashboard")}
              style={{ 
                minWidth: '280px',
                padding: '20px 40px',
                fontSize: '18px'
              }}
            >
              RETURN TO DASHBOARD
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
