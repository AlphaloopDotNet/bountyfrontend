"use client";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";

// CSS Imports
import navStyles from "../influencer.module.css"; 
import styles from "./apply.module.css"; 

// Sidebar Component Import
import SidebarContent from "../components/SidebarContent"; 

function ApplyFormContent() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handlers
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const handleNavigate = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false); // Page change hote hi sidebar close
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={navStyles.paperBody}>
      
      {/* --- 1. SIDEBAR SYSTEM --- */}
      {/* Background overlay jab sidebar khule */}
      {isSidebarOpen && (
        <div className={navStyles.backdrop} onClick={toggleSidebar} />
      )}

      {/* Slide-in Sidebar Container */}
      <div className={`${navStyles.sidebarMenu} ${isSidebarOpen ? navStyles.sidebarActive : ""}`}>
        <SidebarContent 
          onNavigate={handleNavigate} 
          onClose={toggleSidebar} 
          onLogout={() => {
            console.log("User logged out");
            router.push("/login");
          }}
        />
      </div>

      {/* --- 2. NAVBAR --- */}
      <nav className={navStyles.navbar}>
        <button className={navStyles.burgerBtn} onClick={toggleSidebar}>
          <div className={navStyles.burgerLine}></div>
          <div className={navStyles.burgerLine} style={{ width: "16px" }}></div>
          <div className={navStyles.burgerLine}></div>
        </button>
        
        <div className={navStyles.logoContainer}>
          <img src="/images/download.png" alt="Bounty Logo" className={navStyles.logoMain} />
        </div>

        <div 
          className={navStyles.profileCircleSmall} 
          onClick={() => router.push("/influencer-dashboard/profile")}
        >
           <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User" />
        </div>
      </nav>

      {/* --- 3. MAIN FORM CONTENT --- */}
      <main className={styles.applyContainer}>
        {submitted ? (
          /* Thank You Screen */
          <div className={styles.thankYouContainer}>
            <div className={styles.formHeaderRibbon} style={{backgroundColor: '#2c3e50'}}>THANK YOU</div>
            <div className={styles.successCircle}><span className={styles.tickMark}>✓</span></div>
            <p className={styles.thankYouText}>
              Your application is under process.<br/>
              Once approved you will be notified.
            </p>
            <button className={styles.backBtn} onClick={() => router.push(`/influencer-dashboard`)}>
              GO BACK TO DASHBOARD
            </button>
          </div>
        ) : (
          /* Main Form */
          <>
            <div className={styles.formHeaderRibbon}>APPLICATION FORM</div>
            <form onSubmit={handleSubmit} className={styles.vintageForm}>
              
              {/* Name Section */}
              <div className={styles.formGroup}>
                <label className={styles.mainLabel}>NAME<span className={styles.required}>*</span></label>
                <div className={styles.rowInputs}>
                  <div className={styles.inputWrap}>
                    <small className={styles.subLabel}>FIRST</small>
                    <input type="text" className={styles.underlineInput} required />
                  </div>
                  <div className={styles.inputWrap}>
                    <small className={styles.subLabel}>LAST</small>
                    <input type="text" className={styles.underlineInput} required />
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className={styles.formGroup}>
                <label className={styles.mainLabel}>PHONE<span className={styles.required}>*</span></label>
                <input type="tel" className={styles.underlineInput} required />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.mainLabel}>EMAIL<span className={styles.required}>*</span></label>
                <input type="email" className={styles.underlineInput} required />
              </div>

              {/* Address Section */}
              <div className={styles.formGroup}>
                <label className={styles.mainLabel}>ADDRESS<span className={styles.required}>*</span></label>
                <div className={styles.inputWrap}>
                  <small className={styles.subLabel}>STREET ADDRESS</small>
                  <input type="text" className={styles.underlineInput} required />
                </div>
                <div className={styles.rowInputs} style={{marginTop:'20px'}}>
                  <div className={styles.inputWrap}>
                    <small className={styles.subLabel}>CITY</small>
                    <input type="text" className={styles.underlineInput} required />
                  </div>
                  <div className={styles.inputWrap}>
                    <small className={styles.subLabel}>STATE / PROVINCE</small>
                    <input type="text" className={styles.underlineInput} required />
                  </div>
                </div>
                <div className={styles.inputWrap} style={{marginTop:'20px', width: '48%'}}>
                  <small className={styles.subLabel}>ZIP / POSTAL CODE</small>
                  <input type="text" className={styles.underlineInput} required />
                </div>
              </div>

              {/* Social Media Section */}
              <div className={styles.formGroup}>
                <label className={styles.mainLabel}>INSTAGRAM LINK<span className={styles.required}>*</span></label>
                <div className={styles.inputWrap}>
                  <small className={styles.subLabel}>HTTP://</small>
                  <input type="text" className={styles.underlineInput} required />
                </div>
                <div className={styles.inputWrap} style={{marginTop:'20px'}}>
                  <small className={styles.subLabel}>NO. OF FOLLOWERS</small>
                  <input type="text" className={styles.underlineInput} required />
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.faqRibbon} 
                  onClick={() => router.push(`/influencer-dashboard/faq`)}
                >
                  FAQ <span>▾</span>
                </button>
                <button type="submit" className={styles.submitRibbon}>SUBMIT</button>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
}

// Wrapper for Suspense (useSearchParams fix)
export default function ApplyPage() {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <ApplyFormContent />
    </Suspense>
  );
}