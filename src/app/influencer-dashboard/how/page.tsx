"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../influencer.module.css";
import howStyles from "./how.module.css";
import SidebarContent from "../../influencer-dashboard/components/SidebarContent";

const slides = [
  { title: "REGISTER", content: ["Learn how to become brand ambassador.", "Collaborate with the exciting brand campaigns.", "A go-to place for all influencers where they can learn, grow & collaborate."] },
  { title: "EXPLORE BOUNTIES", content: ["Hunt for the Bounty and love the the rewards!", "Explore from a wide range of brand campaigns, just apply and get working."] },
  { title: "BRAND AMBASSADOR", content: ["Complete a minimum of three brand campaigns with Bounty to become a brand ambassador."] },
  { title: "SHOW REWARDS", content: ["Get ready to show off your rewards and get more work everyday.", "The more reward points, more the chances of you becoming a brand ambassador"] }
];

export default function HowItWorks() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // 1. Automatic Slide Logic (Har 5 second mein)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push("/influencer-dashboard");
    }
  };

  return (
    <div className={styles.paperBody}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button className={styles.burgerBtn} onClick={() => setIsSidebarOpen(true)}>
            <div className={styles.burgerLine}></div>
            <div className={styles.burgerLine} style={{ width: "16px" }}></div>
            <div className={styles.burgerLine}></div>
          </button>
        </div>
        <div className={styles.navCenter}>
          <img src="/images/download.png" alt="Bounty Logo" className={styles.logoMain} onClick={() => router.push("/influencer-dashboard")} />
        </div>
        <div className={styles.navRight}>
  <div 
    className={styles.profileCircle}
    onClick={() => router.push("/influencer-dashboard/profile")}
    title="My Profile"
  >
    <img 
      src="/icons/user.jfif"  // ✅ "icon" को "icons" (plural) करो
      alt="User Profile"      // ✅ Proper alt text
    />
  </div>
</div>

      </nav>

      {/* Clickable Main Area */}
      <main className={howStyles.sliderContainer} onClick={nextSlide}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={howStyles.slideContent}
          >
            <h2 className={howStyles.slideTitle}>{slides[currentSlide].title}</h2>
            
            <div className={howStyles.textWrapper}>
              {slides[currentSlide].content.map((text, i) => (
                <p key={i} className={howStyles.slideText}>{text}</p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots (No Arrows as requested) */}
        <div className={howStyles.pagination}>
          {slides.map((_, i) => (
            <div key={i} className={`${howStyles.dot} ${i === currentSlide ? howStyles.activeDot : ""}`} />
          ))}
        </div>
      </main>

      {/* Sidebar Logic */}
      {isSidebarOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsSidebarOpen(false)} />
          <div className={styles.sidebarMenu} style={{ transform: 'translateX(0)', left: 0 }}>
            <SidebarContent onNavigate={(p) => router.push(p)} onClose={() => setIsSidebarOpen(false)} onLogout={() => router.push("/")} />
          </div>
        </>
      )}
    </div>
  );
}