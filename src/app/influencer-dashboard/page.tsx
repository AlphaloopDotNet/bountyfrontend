// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./influencer.module.css";
// import SidebarContent from "./components/SidebarContent";

// const campaigns = [
//   {
//     brandLogo: "/slice.jpeg",
//     campaignImg: "/katrina.jpeg",
//     hashtag: "#SLICEKIPETI",
//     description: "Required influencers with a minimum of 2000 followers to repost this video.",
//     validity: "20/08/20",
//     prize: "  ",
//     fbLink: "https://facebook.com/sliceindia",
//     instaLink: "https://instagram.com/slice_india"
//   },
//   {
//     brandLogo: "/layslogo.jpeg", 
//     campaignImg: "/heartwork.jpeg",
//     hashtag: "#HEARTWORK",
//     description: "Join the tribute to our unsung heroes. Share the heart-work of India.",
//     validity: "25/08/20",
//     prize: "  ",
//     fbLink: "https://facebook.com/laysindia",
//     instaLink: "https://instagram.com/lays_india"
//   }
// ];

// export default function InfluencerDashboard() {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [currentIdx, setCurrentIdx] = useState(0);
//   const [activeFilter, setActiveFilter] = useState<string | null>(null);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [authorized, setAuthorized] = useState(false); // Security check state

// // ✅ DYNAMIC AUTH CHECK: Catch Social Login & Storage & API
// useEffect(() => {
//   const checkInfluencerAuth = async () => {
//     if (typeof window !== "undefined") {
//       const params = new URLSearchParams(window.location.search);
//       const urlEmail = params.get('email');
//       const urlStatus = params.get('status');

//       // 1. Agar Social Login se redirected hai (Priority 1)
//       if (urlStatus === 'success' && urlEmail) {
//         localStorage.setItem("user_email", urlEmail);
//         localStorage.setItem("user_type", "bounty");
//         setAuthorized(true);
//         // Clean URL without refresh
//         window.history.replaceState({}, document.title, "/influencer-dashboard");
//         return;
//       }

//       // 2. Agar already logged in hai (Priority 2)
//       let user = localStorage.getItem("user_email") || localStorage.getItem("userEmail");
//       let type = localStorage.getItem("user_type") || localStorage.getItem("userType");

//       if (user && type === "bounty") {
//         setAuthorized(true);
//         return;
//       }

//       // 3. Agar kuch nahi mila, toh Backend se pucho (Priority 3)
//       try {
//         const res = await fetch("http://127.0.0.1:8000/api/current-user/", {
//           credentials: 'include'
//         });
//         const data = await res.json();

//         if (res.ok && data.email) {
//           localStorage.setItem("user_email", data.email);
//           localStorage.setItem("user_type", "bounty");
//           setAuthorized(true);
//         } else {
//           // Sab fail ho gaya, ab hi login pe bhejo
//           router.replace("/influencer-dashboard/bolog");
//         }
//       } catch (err) {
//         console.log("Auth check failed");
//         router.replace("/influencer-dashboard/bolog");
//       }
//     }
//   };

//   checkInfluencerAuth();
// }, [router]);
//   useEffect(() => {
//     if (!authorized) return;
//     const interval = setInterval(() => {
//       if (!isTransitioning) {
//         setCurrentIdx((prev) => (prev + 1) % campaigns.length);
//       }
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [isTransitioning, authorized]);

//   // Transition Helpers
//   const nextCamp = () => {
//     setIsTransitioning(true);
//     setCurrentIdx((prev) => (prev + 1) % campaigns.length);
//   };

//   const prevCamp = () => {
//     setIsTransitioning(true);
//     setCurrentIdx((prev) => (prev - 1 + campaigns.length) % campaigns.length);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsTransitioning(false);
//     }, 800);
//     return () => clearTimeout(timer);
//   }, [currentIdx]);

//   const navigateTo = (path: string) => {
//     setIsMenuOpen(false);
//     router.push(path);
//   };
// const handleLogout = () => {
//     // सारी पुरानी और नई keys साफ़ करें
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("user_email");
//     localStorage.removeItem("userType");
//     localStorage.removeItem("user_type");
    
//     setAuthorized(false);
//     router.replace("/influencer-dashboard/bolog"); 
//   };
//   const toggleFilter = (filter: string) => {
//     setActiveFilter(activeFilter === filter ? null : filter);
//   };

//   // Jab tak check chal raha hai, screen blank rakhein ya loader dikhayein
//   if (!authorized) return null;

//   const current = campaigns[currentIdx];

//   return (
//     <div className={styles.paperBody}>
//       {/* NAVBAR */}
//       <nav className={styles.navbar}>
//         <div className={styles.navLeft}>
//           <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
//             <div className={styles.burgerLine}></div>
//             <div className={styles.burgerLine} style={{ width: "16px" }}></div>
//             <div className={styles.burgerLine}></div>
//           </button>
//         </div>
//         <div className={styles.navCenter}>
//           <img 
//             src="/images/download.png" 
//             alt="Bounty Logo"
//             className={styles.logoMain}
//             onClick={() => router.push("/influencer-dashboard")}
//           />
//         </div>
//         <div className={styles.navRight}>
//           <div className={styles.profileCircle} onClick={() => navigateTo("/influencer-dashboard/profile")}>
//             <img src="/icon/user.jfif" alt="Profile" />
//           </div>
//         </div>
//       </nav>

//       {/* FILTERS SECTION */}
//       <div className={styles.filterBar}>
//         <div className={styles.filterTab} style={{ position: 'relative' }} onClick={() => toggleFilter('brand')}>
//           BRANDS ▾
//           {activeFilter === 'brand' && (
//             <div className={styles.vintageDropdown} style={{ left: '0', top: '100%' }}>
//               <p onClick={() => setActiveFilter(null)}>LAY'S</p>
//               <p onClick={() => setActiveFilter(null)}>PEPSICO</p>
//               <p onClick={() => setActiveFilter(null)}>SLICE</p>
//             </div>
//           )}
//         </div>

//         <div className={styles.filterTab} style={{ position: 'relative' }} onClick={() => toggleFilter('type')}>
//           TYPE ▾
//           {activeFilter === 'type' && (
//             <div className={styles.vintageDropdown} style={{ left: '50%', transform: 'translateX(-50%)', top: '100%', width: '180px' }}>
//               <p>BARTER</p>
//               <p>PAID</p>
//               <p>GIVEAWAYS</p>
//             </div>
//           )}
//         </div>

//         <div className={styles.filterTab} style={{ position: 'relative' }} onClick={() => toggleFilter('platform')}>
//           PLATFORM ▾
//           {activeFilter === 'platform' && (
//             <div className={styles.vintageDropdown} style={{ right: '0', top: '100%' }}>
//               <p onClick={() => router.push("/influencer-dashboard/platform")}>INSTAGRAM</p>
//               <p onClick={() => router.push("/influencer-dashboard/platform")}>FACEBOOK</p>
//               <p>YOUTUBE</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <main className={`${styles.mainContainer} ${isTransitioning ? styles.transitioning : ''}`} onClick={() => setActiveFilter(null)}>
//         <div className={`${styles.bountyCard} ${isTransitioning ? styles.slideOut : ''}`}>
          
//           <div className={styles.brandBranding}>
//             <img src={current.brandLogo} alt="Brand" className={`${styles.brandIcon} ${isTransitioning ? styles.fadeOut : ''}`} />
//           </div>

//           <div className={styles.imageFrame}>
//             <img src={current.campaignImg} alt="Campaign" className={`${styles.campaignImg} ${isTransitioning ? styles.imageSlide : ''}`} />
//           </div>

//           <h2 className={`${styles.titleHashtag} ${isTransitioning ? styles.hashtagSlide : ''}`}>
//             {current.hashtag}
//           </h2>

//           {/* ACTIONS */}
//           <div className={styles.actionsRow}>
//             <div className={styles.socialGroup} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <a href={current.fbLink} target="_blank" rel="noopener noreferrer">
//                 <img src="/icon/facebook.png" alt="Facebook" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
//               </a>
//               <a href={current.instaLink} target="_blank" rel="noopener noreferrer">
//                 <img src="/icon/insta.png" alt="Instagram" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
//               </a>
//             </div>
            
//             <div className={styles.mainBtns}>
//               <button 
//                 className={`${styles.faqBtn} ${isTransitioning ? styles.pulse : ''}`}
//                 onClick={(e) => { 
//                   e.stopPropagation(); 
//                   router.push(`/influencer-dashboard/faq?id=${currentIdx}`); 
//                 }}
//               >
//                 FAQ
//               </button>
//               <button 
//                 className={`${styles.applyBtn} ${isTransitioning ? styles.shine : ''}`}
//                 onClick={(e) => { 
//                   e.stopPropagation(); 
//                   router.push(`/influencer-dashboard/apply?id=${currentIdx}`); 
//                 }}
//               >
//                 APPLY NOW
//               </button>
//             </div>
//           </div>

//           <div className={styles.infoText}>
//             <p className={isTransitioning ? styles.textFade : ''}>{current.description}</p>
//             <p className={`${styles.dateInfo} ${isTransitioning ? styles.dateSlide : ''}`}>
//               Barter Deal valid till <span>{current.validity}</span>
//             </p>
//           </div>

//           <div className={`${styles.prizeContainer} ${isTransitioning ? styles.prizeBounce : ''}`}>
//             PRIZE: {current.prize}
//           </div>
//         </div>

//         {/* SWIPE CONTROLS */}
//         <div className={styles.swipeControls}>
//           <button className={`${styles.arrowBtn} ${isTransitioning ? styles.arrowGlow : ''}`} onClick={prevCamp}>《</button>
//           <div className={`${styles.counter} ${isTransitioning ? styles.counterPulse : ''}`}>
//             {currentIdx + 1} / {campaigns.length}
//           </div>
//           <button className={`${styles.arrowBtn} ${isTransitioning ? styles.arrowGlow : ''}`} onClick={nextCamp}>》</button>
//         </div>
//       </main>

//       {/* SIDEBAR */}
//       <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.sidebarActive : ""}`}>
//         <SidebarContent 
//           onNavigate={navigateTo}
//           onLogout={handleLogout}
//           onClose={() => setIsMenuOpen(false)}
//         />
//       </div>
//       {isMenuOpen && <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} />}
//     </div> 
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import styles from "./influencer.module.css";
import SidebarContent from "./components/SidebarContent";

const campaigns = [
  {
    brandLogo: "/slice.jpeg",
    campaignImg: "/katrina.jpeg",
    hashtag: "#SLICEKIPETI",
    description: "Required influencers with a minimum of 2000 followers to repost this video.",
    validity: "20/08/20",
    prize: "  ",
    fbLink: "https://facebook.com/sliceindia",
    instaLink: "https://instagram.com/slice_india"
  },
  {
    brandLogo: "/layslogo.jpeg", 
    campaignImg: "/heartwork.jpeg",
    hashtag: "#HEARTWORK",
    description: "Join the tribute to our unsung heroes. Share the heart-work of India.",
    validity: "25/08/20",
    prize: "  ",
    fbLink: "https://facebook.com/laysindia",
    instaLink: "https://instagram.com/lays_india"
  }
];

export default function InfluencerDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance campaigns
  useEffect(() => {
    if (status !== "authenticated") return;
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentIdx((prev) => (prev + 1) % campaigns.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isTransitioning, status]);

  // Transition reset
  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [currentIdx]);

  const nextCamp = () => { setIsTransitioning(true); setCurrentIdx((prev) => (prev + 1) % campaigns.length); };
  const prevCamp = () => { setIsTransitioning(true); setCurrentIdx((prev) => (prev - 1 + campaigns.length) % campaigns.length); };
  const navigateTo = (path: string) => { setIsMenuOpen(false); router.push(path); };
  const toggleFilter = (filter: string) => { setActiveFilter(activeFilter === filter ? null : filter); };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace("/");
  };

  // ── Auth states ───────────────────────────────────────────
  if (status === "loading") return null;

  if (status === "unauthenticated") {
    router.replace("/login");
    return null;
  }

  const current = campaigns[currentIdx];

  return (
    <div className={styles.paperBody}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
            <div className={styles.burgerLine}></div>
            <div className={styles.burgerLine} style={{ width: "16px" }}></div>
            <div className={styles.burgerLine}></div>
          </button>
        </div>
        <div className={styles.navCenter}>
          <img 
            src="/images/download.png" 
            alt="Bounty Logo"
            className={styles.logoMain}
            onClick={() => router.push("/influencer-dashboard")}
          />
        </div>
        <div className={styles.navRight}>
          <div className={styles.profileCircle} onClick={() => navigateTo("/influencer-dashboard/profile")}>
            <img src="/icon/user.jfif" alt="Profile" />
          </div>
        </div>
      </nav>

      {/* FILTERS SECTION */}
      <div className={styles.filterBar}>
        <div className={styles.filterTab} style={{ position: 'relative' }} onClick={() => toggleFilter('brand')}>
          BRANDS ▾
          {activeFilter === 'brand' && (
            <div className={styles.vintageDropdown} style={{ left: '0', top: '100%' }}>
              <p onClick={() => setActiveFilter(null)}>LAY'S</p>
              <p onClick={() => setActiveFilter(null)}>PEPSICO</p>
              <p onClick={() => setActiveFilter(null)}>SLICE</p>
            </div>
          )}
        </div>

        <div className={styles.filterTab} style={{ position: 'relative' }} onClick={() => toggleFilter('type')}>
          TYPE ▾
          {activeFilter === 'type' && (
            <div className={styles.vintageDropdown} style={{ left: '50%', transform: 'translateX(-50%)', top: '100%', width: '180px' }}>
              <p>BARTER</p>
              <p>PAID</p>
              <p>GIVEAWAYS</p>
            </div>
          )}
        </div>

        <div className={styles.filterTab} style={{ position: 'relative' }} onClick={() => toggleFilter('platform')}>
          PLATFORM ▾
          {activeFilter === 'platform' && (
            <div className={styles.vintageDropdown} style={{ right: '0', top: '100%' }}>
              <p onClick={() => router.push("/influencer-dashboard/platform")}>INSTAGRAM</p>
              <p onClick={() => router.push("/influencer-dashboard/platform")}>FACEBOOK</p>
              <p>YOUTUBE</p>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className={`${styles.mainContainer} ${isTransitioning ? styles.transitioning : ''}`} onClick={() => setActiveFilter(null)}>
        <div className={`${styles.bountyCard} ${isTransitioning ? styles.slideOut : ''}`}>
          
          <div className={styles.brandBranding}>
            <img src={current.brandLogo} alt="Brand" className={`${styles.brandIcon} ${isTransitioning ? styles.fadeOut : ''}`} />
          </div>

          <div className={styles.imageFrame}>
            <img src={current.campaignImg} alt="Campaign" className={`${styles.campaignImg} ${isTransitioning ? styles.imageSlide : ''}`} />
          </div>

          <h2 className={`${styles.titleHashtag} ${isTransitioning ? styles.hashtagSlide : ''}`}>
            {current.hashtag}
          </h2>

          <div className={styles.actionsRow}>
            <div className={styles.socialGroup} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a href={current.fbLink} target="_blank" rel="noopener noreferrer">
                <img src="/icon/facebook.png" alt="Facebook" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              </a>
              <a href={current.instaLink} target="_blank" rel="noopener noreferrer">
                <img src="/icon/insta.png" alt="Instagram" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              </a>
            </div>
            
            <div className={styles.mainBtns}>
              <button 
                className={`${styles.faqBtn} ${isTransitioning ? styles.pulse : ''}`}
                onClick={(e) => { e.stopPropagation(); router.push(`/influencer-dashboard/faq?id=${currentIdx}`); }}
              >
                FAQ
              </button>
              <button 
                className={`${styles.applyBtn} ${isTransitioning ? styles.shine : ''}`}
                onClick={(e) => { e.stopPropagation(); router.push(`/influencer-dashboard/apply?id=${currentIdx}`); }}
              >
                APPLY NOW
              </button>
            </div>
          </div>

          <div className={styles.infoText}>
            <p className={isTransitioning ? styles.textFade : ''}>{current.description}</p>
            <p className={`${styles.dateInfo} ${isTransitioning ? styles.dateSlide : ''}`}>
              Barter Deal valid till <span>{current.validity}</span>
            </p>
          </div>

          <div className={`${styles.prizeContainer} ${isTransitioning ? styles.prizeBounce : ''}`}>
            PRIZE: {current.prize}
          </div>
        </div>

        <div className={styles.swipeControls}>
          <button className={`${styles.arrowBtn} ${isTransitioning ? styles.arrowGlow : ''}`} onClick={prevCamp}>《</button>
          <div className={`${styles.counter} ${isTransitioning ? styles.counterPulse : ''}`}>
            {currentIdx + 1} / {campaigns.length}
          </div>
          <button className={`${styles.arrowBtn} ${isTransitioning ? styles.arrowGlow : ''}`} onClick={nextCamp}>》</button>
        </div>
      </main>

      {/* SIDEBAR */}
      <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.sidebarActive : ""}`}>
        <SidebarContent 
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
      {isMenuOpen && <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} />}
    </div> 
  );
}