"use client";
import { useState } from "react";
import styles from '../influencer.module.css';
import { useRouter } from 'next/navigation'; // Router import karein
import { signOut } from "next-auth/react";

interface SidebarContentProps {
  onNavigate: (path: string) => void;
  onLogout?: () => void;
  onClose: () => void;
}

export default function SidebarContent({ onNavigate, onLogout, onClose }: SidebarContentProps) {
  const router = useRouter(); // Router initialize karein
const [isLoggingOut, setIsLoggingOut] = useState(false);
  // Logout function jo storage clear karke role selection par bhej dega
  const handleLogoutAction = async () => {
    // 1. Session clear karein
    localStorage.removeItem("user_session");
    localStorage.removeItem("access_token"); 
    localStorage.removeItem("selected_role");

    // 2. Agar koi custom onLogout prop diya hai toh use chalayein
    if (onLogout) onLogout();
    setIsLoggingOut(true);
    await signOut({ redirect: false });
    // 3. Main page par bhejein jahan Brand/Influencer buttons hain
    router.push('/'); 
    
    // 4. Sidebar band karein
    onClose();
  };

  const menuItems = [
    { label: 'DASHBOARD', path: '/influencer-dashboard' },
    { label: 'ABOUT', path: '/influencer-dashboard/about' },
    { label: 'PLATFORM', path: '/influencer-dashboard/platform' },
    { label: 'HOW IT WORKS', path: '/influencer-dashboard/how' },
    { label: 'BRANDS', path: '/influencer-dashboard/brands' },
    { label: 'PROFILE', path: '/influencer-dashboard/profile' },
    { label: 'LINK PROFILE', path: '/influencer-dashboard/link-profile' },
  ];

  return (
    <div className={styles.sidebarInner}>
      <button className={styles.closeSidebar} onClick={onClose}>
        <div className={styles.burgerLine}></div>
        <div className={styles.burgerLine}></div>
        <div className={styles.burgerLine}></div>
      </button>
      
      <nav className={styles.linksContainer}>
        {menuItems.map((item) => (
          <div key={item.label} className={styles.navLinkItem}>
            <div className={styles.navLink} onClick={() => onNavigate(item.path)}>
              {item.label}
            </div>
            <div className={styles.sidebarDivider}></div>
          </div>
        ))}

        {/* Updated LOGOUT Section */}
        <div className={styles.navLinkItem}>
          <div 
            className={`${styles.navLink} ${styles.logoutText}`} 
            onClick={handleLogoutAction} // Naya function yahan attach kiya
          >
            LOGOUT
          </div>
          <div className={styles.sidebarDivider}></div>
        </div>
      </nav>
    </div>
  );
}