"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import navStyles from "../influencer.module.css"; 
import profileStyles from "./profile.module.css";
import SidebarContent from "../components/SidebarContent"; 

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [socialData, setSocialData] = useState<any>(null);
  const [profilePic, setProfilePic] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Data Loading
    const savedData = localStorage.getItem("userProfile");
    if (savedData) setData(JSON.parse(savedData));
    else setData({ name: "NAME SURNAME", email: "EMAIL@XYZ.COM", city: "CITY", category: "LIFESTYLE", phone: "9867453216" });

    const savedLinks = localStorage.getItem("influencerLinks");
    if (savedLinks) setSocialData(JSON.parse(savedLinks));

    const savedPfp = localStorage.getItem("userPfp");
    setProfilePic(savedPfp || "/icon/user.jfif");
  }, []);

  // Profile Picture Upload Handler
  const handlePfpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfilePic(base64);
        localStorage.setItem("userPfp", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  if (!data) return null;

  return (
    <div className={navStyles.paperBody} style={{ backgroundColor: '#e8dcc4', fontFamily: 'var(--font-main)' }}>
      {isSidebarOpen && <div className={navStyles.backdrop} onClick={toggleSidebar} />}
      
      <div className={`${navStyles.sidebarMenu} ${isSidebarOpen ? navStyles.sidebarActive : ""}`}>
        <SidebarContent onNavigate={(path) => { router.push(path); setIsSidebarOpen(false); }} onClose={toggleSidebar} />
      </div>

      <nav className={navStyles.navbar}>
        <button className={navStyles.burgerBtn} onClick={toggleSidebar}>
          <div className={navStyles.burgerLine}></div>
          <div className={navStyles.burgerLine} style={{ width: "16px" }}></div>
          <div className={navStyles.burgerLine}></div>
        </button>
        <img src="/images/download.png" alt="Logo" className={navStyles.logoMain} style={{ margin: '0 auto' }} />
        <div style={{ position: 'absolute', right: '20px', top: '15px' }}>
             <img src="/icon/user.jfif" width="30" alt="target" />
        </div>
      </nav>

      <div className={profileStyles.profileContainer} style={{ padding: '20px 10px' }}>
        
        {/* TOP SECTION: PHOTO & DETAILS */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          {/* PHOTO CLICKABLE AREA */}
          <div className={profileStyles.avatarWrapper} style={{ position: 'relative' }}>
            <label htmlFor="pfpInput" style={{ cursor: 'pointer', display: 'block' }}>
              <img 
                src={profilePic} 
                className={profileStyles.avatarMain} 
                style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ff4757', padding: '3px' }} 
              />
              <div style={plusIconStyle}>+</div>
            </label>
            <input type="file" id="pfpInput" hidden accept="image/*" onChange={handlePfpUpload} />
          </div>

          <div style={{ color: '#2d3436' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', marginBottom: '5px' }}>{data.name}</h2>
            <p style={{ fontSize: '13px' }}>{data.email}</p>
            <p style={{ fontSize: '13px' }}>{data.city}</p>
            <p style={{ fontSize: '13px' }}>{data.category}</p>
            <p style={{ fontSize: '13px' }}>{socialData?.websiteLink || "website.com"}</p>
            <p style={{ fontSize: '13px' }}>{data.phone}</p>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <img src="/icon/insta.png" width="18" alt="IG" />
                <img src="/icon/facebook.png" width="18" alt="FB" />
                <img src="/icon/youtube.png" width="18" alt="YT" />
                <img src="/icon/tiktok.png" width="18" alt="TT" />
                <img src="/icon/twitter.png" width="18" alt="TW" />
            </div>
          </div>
        </div>

        <hr style={{ border: '0.5px solid #2d3436', margin: '20px 0', opacity: 0.3 }} />

        {/* STATS BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', marginBottom: '25px' }}>
          <div><span style={{ fontSize: '11px', textTransform: 'uppercase' }}>Total Followers</span><p style={{ fontWeight: 'bold', fontSize: '18px' }}>2.3M</p></div>
          <div><span style={{ fontSize: '11px', textTransform: 'uppercase' }}>Total Likes</span><p style={{ fontWeight: 'bold', fontSize: '18px' }}>50K</p></div>
          <div><span style={{ fontSize: '11px', textTransform: 'uppercase' }}>Total Comments</span><p style={{ fontWeight: 'bold', fontSize: '18px' }}>2000</p></div>
        </div>

        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', letterSpacing: '2px', marginBottom: '15px' }}>
            BOUNTY LEVEL : ⭐⭐⭐
        </div>

        <div style={{ marginBottom: '15px', display: 'flex', gap: '30px', fontSize: '14px' }}>
            <strong style={{ fontFamily: 'var(--font-heading)' }}>HUNTS:</strong>
            <span>ONGOING - {socialData?.huntsOngoing || "0"}</span>
            <span>COMPLETED - {socialData?.huntsCompleted || "0"}</span>
        </div>

        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', borderBottom: '2px solid #2d3436', paddingBottom: '10px', marginBottom: '30px' }}>
            OVERALL ENGAGEMENT RATE: {socialData?.overallEngagement || "0"}%
        </div>

        {/* FACEBOOK CARD */}
        <div style={platformCardStyle}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ border: '1px solid #2d3436', padding: '3px 10px' }}><img src="/icon/facebook.png" width="14" /></div>
                <div style={{ color: '#ff4757', fontSize: '11px', fontWeight: 'bold' }}>{socialData?.fbViews || "0"} VIEWS</div>
           </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '25px' }}>
                    <div style={miniStat}><strong style={{fontSize:'16px'}}>{socialData?.facebookStats || "0"}</strong><p style={{fontSize:'10px'}}>Followers</p></div>
                    <div style={miniStat}><strong style={{fontSize:'16px'}}>{socialData?.fbReactions || "0"}</strong><p style={{fontSize:'10px'}}>Reactions</p></div>
                    <div style={miniStat}><strong style={{fontSize:'16px'}}>{socialData?.fbComments || "0"}</strong><p style={{fontSize:'10px'}}>Comments</p></div>
                </div>
                <div style={engageBox}>
                    <span style={{ fontSize: '7px', display: 'block' }}>AVERAGE</span>
                    <span style={{ fontSize: '7px', display: 'block' }}>ENGAGEMENT RATE:</span>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{socialData?.fbEngage || "0"}%</div>
                </div>
           </div>
        </div>

        {/* INSTAGRAM CARD */}
        <div style={{ ...platformCardStyle, marginTop: '25px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ border: '1px solid #2d3436', padding: '3px 10px' }}><img src="/icon/insta.png" width="14" /></div>
                <div style={{ color: '#ff4757', fontSize: '11px', fontWeight: 'bold' }}>{socialData?.igViews || "0"} VIEWS</div>
           </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '25px' }}>
                    <div style={miniStat}><strong style={{fontSize:'16px'}}>{socialData?.instagramStats || "0"}</strong><p style={{fontSize:'10px'}}>Followers</p></div>
                    <div style={miniStat}><strong style={{fontSize:'16px'}}>{socialData?.igLikes || "0"}</strong><p style={{fontSize:'10px'}}>Likes</p></div>
                    <div style={miniStat}><strong style={{fontSize:'16px'}}>{socialData?.igComments || "0"}</strong><p style={{fontSize:'10px'}}>Comments</p></div>
                </div>
                <div style={engageBox}>
                    <span style={{ fontSize: '7px', display: 'block' }}>AVERAGE</span>
                    <span style={{ fontSize: '7px', display: 'block' }}>ENGAGEMENT RATE:</span>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{socialData?.igEngage || "0"}%</div>
                </div>
           </div>
        </div>

        {/* SINGLE REDIRECT BUTTON */}
        <button 
            onClick={() => router.push("/influencer-dashboard/link-profile")} 
            style={editBtnStyle}
        >
            E D I T  P R O F I L E
        </button>

      </div>
    </div>
  );
}

// STYLES
const platformCardStyle: React.CSSProperties = {
    border: '1.2px solid #2d3436',
    padding: '15px',
    position: 'relative',
};

const miniStat = { textAlign: 'center' as 'center' };

const engageBox: React.CSSProperties = {
    backgroundColor: '#2d3436',
    color: 'white',
    padding: '8px 5px',
    textAlign: 'center',
    width: '90px',
    position: 'absolute',
    right: '-1px',
    bottom: '-1px'
};

const editBtnStyle = {
    width: '100%',
    padding: '18px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    border: 'none',
    marginTop: '40px',
    fontFamily: 'var(--font-heading)',
    fontSize: '16px',
    letterSpacing: '4px',
    cursor: 'pointer'
};

const plusIconStyle: React.CSSProperties = {
  position: 'absolute', 
  bottom: '5px', 
  right: '5px', 
  background: '#2d3436', 
  color: 'white', 
  borderRadius: '50%', 
  width: '25px', 
  height: '25px', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  fontSize: '16px',
  fontWeight: 'bold',
  border: '2px solid white'
};