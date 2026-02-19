"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../influencer.module.css";
import SidebarContent from "../../influencer-dashboard/components/SidebarContent";

export default function LinkProfilePage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [profileData, setProfileData] = useState({
    instagramStats: "", // Will store follower count from API
    isInstaConnected: false,
    facebookLink: "",
    tiktokLink: "",
    youtubeLink: "",
    twitterLink: "",
    websiteLink: "",
    huntsOngoing: "",
    huntsCompleted: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("influencerLinks");
    if (saved) {
      setProfileData(JSON.parse(saved));
    }
  }, []);

  // Corrected Type for 'v'
  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleConnectInstagram = () => {
    // Django Instagram Auth URL
    window.location.href = "http://127.0.0.1:8000/api/instagram/login/";
  };

  const handleSave = () => {
    if (!profileData.instagramStats && !profileData.isInstaConnected) {
      alert("Official Instagram connect karna compulsory hai!");
      return;
    }
    localStorage.setItem("influencerLinks", JSON.stringify(profileData));
    alert("Profile Updated!");
    router.push("/influencer-dashboard/profile");
  };

  return (
    <div className={styles.paperBody} style={{ minHeight: '100vh', backgroundColor: '#e8dcc4' }}>
      
      <nav className={styles.navbar}>
        <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
          <div className={styles.burgerLine}></div>
          <div className={styles.burgerLine}></div>
          <div className={styles.burgerLine}></div>
        </button>
        <img src="/images/download.png" alt="Logo" className={styles.logoMain} style={{ margin: '0 auto' }} />
      </nav>

      <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.sidebarActive : ""}`}>
        <SidebarContent onNavigate={(path) => router.push(path)} onClose={() => setIsMenuOpen(false)} />
      </div>

      <main style={{ padding: '20px', maxWidth: '480px', margin: '0 auto' }}>
        <div style={headerBannerStyle}>L I N K   P R O F I L E</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* --- INSTAGRAM SECTION (API BASED) --- */}
          <section style={{ border: '2px solid #2d3436', padding: '20px', textAlign: 'center' }}>
            <label style={labelStyle}>I N S T A G R A M</label>
            {profileData.instagramStats ? (
                <div style={{ color: '#27ae60', fontWeight: 'bold', margin: '10px 0' }}>
                   ✅ VERIFIED: {profileData.instagramStats} FOLLOWERS
                </div>
            ) : (
                <button onClick={handleConnectInstagram} style={instaBtnStyle}>
                  CONNECT OFFICIAL INSTAGRAM
                </button>
            )}
            <p style={{ fontSize: '10px', opacity: 0.7 }}>Compulsory for brand collaborations</p>
          </section>

          {/* --- OTHER SOCIAL LINKS --- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <SimpleInput label="F A C E B O O K" placeholder="Profile Link" value={profileData.facebookLink} onChange={(v: string) => handleInputChange('facebookLink', v)} />
            <SimpleInput label="T I K T O K" placeholder="Profile Link" value={profileData.tiktokLink} onChange={(v: string) => handleInputChange('tiktokLink', v)} />
            <SimpleInput label="Y O U T U B E" placeholder="Channel Link" value={profileData.youtubeLink} onChange={(v: string) => handleInputChange('youtubeLink', v)} />
            <SimpleInput label="T W I T T E R" placeholder="Profile Link" value={profileData.twitterLink} onChange={(v: string) => handleInputChange('twitterLink', v)} />
            <SimpleInput label="W E B S I T E" placeholder="https://..." value={profileData.websiteLink} onChange={(v: string) => handleInputChange('websiteLink', v)} />
          </div>

          {/* --- PERFORMANCE SUMMARY --- */}
          <div style={{ border: '1px dashed #2d3436', padding: '15px' }}>
            <h4 style={{ fontSize: '12px', marginBottom: '10px', letterSpacing: '2px' }}>P R O F I L E   S U M M A R Y</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
               <input type="text" placeholder="ONGOING" value={profileData.huntsOngoing} onChange={(e) => handleInputChange('huntsOngoing', e.target.value)} style={inputStyle} />
               <input type="text" placeholder="COMPLETED" value={profileData.huntsCompleted} onChange={(e) => handleInputChange('huntsCompleted', e.target.value)} style={inputStyle} />
            </div>
          </div>

        </div>

        <button onClick={handleSave} style={saveBtnStyle}>S A V E   C H A N G E S</button>
      </main>
    </div>
  );
}

// Helper with explicit Types
function SimpleInput({ label, placeholder, value, onChange }: { label: string, placeholder: string, value: string, onChange: (v: string) => void }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
    </div>
  );
}

// --- STYLES ---
const headerBannerStyle: React.CSSProperties = {
  background: '#2d3436', color: 'white', padding: '15px', textAlign: 'center',
  fontSize: '20px', letterSpacing: '6px', margin: '20px 0',
  clipPath: 'polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)'
};

const labelStyle = { display: 'block', fontWeight: 'bold', fontSize: '13px', marginBottom: '5px', letterSpacing: '2px' };

const inputStyle = { 
  width: '100%', padding: '10px 0', border: 'none', borderBottom: '1.5px solid #2d3436', 
  background: 'transparent', outline: 'none', fontSize: '12px', textTransform: 'uppercase' as 'uppercase'
};

const instaBtnStyle = {
  width: '100%', padding: '12px', background: '#e1306c', color: 'white', border: 'none', 
  marginTop: '10px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px'
};

const saveBtnStyle = { 
  width: '100%', padding: '18px', background: '#1a1a1a', color: 'white', border: 'none', 
  marginTop: '40px', cursor: 'pointer', letterSpacing: '5px', fontWeight: 'bold', fontSize: '16px'
};