"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.css"; 

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); 
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("user_session");
    setTimeout(() => {
      router.push("/"); 
    }, 800);
  };

  const menuLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Campaigns", href: "/campaign" },
    { name: "Influencer Discovery", href: "/discovery" },
    { name: "Brand Ambassador", href: "/ambassador" },
    { name: "Content Filter", href: "/dashboard/contentfilter" },
    { name: "Trends", href: "/trends" },
    { name: "Manage Subscription", href: "/subscription" },
  ];

  return (
    <>
      {/* TOP NAVBAR */}
      <header className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <button onClick={() => setIsOpen(!isOpen)} className={styles.hamburger}>
            ☰
          </button>
        </div>
        
        <div className={styles.headerCenter}>
          <Link href="/dashboard">
            <Image 
              src="/images/thd.png" 
              alt="Threads Logo" 
              width={140} 
              height={40} 
              className="object-contain"
              priority
            />
          </Link>
        </div>
        
        <div className={styles.headerRight}>
          <Link href="/reports" className={styles.headerIcon}>📈</Link>
          <div className={styles.notifBadge}>
            <Image 
              src="/images/mail-2.png" 
              alt="Mail Icon" 
              width={26} 
              height={26} 
              className={styles.mailIcon}
              priority
            />
            <span className={styles.badgeCount}>3</span>
          </div>
        </div>
      </header>

      {/* SIDEBAR DRAWER */}
      <div className={`${styles.sidebarContainer} ${!isOpen ? styles.sidebarHidden : ""}`}>
        <div className="h-full flex flex-col">
          <nav className={styles.navStack}>
            {menuLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={idx} 
                  href={link.href} 
                  onClick={closeSidebar}
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className={styles.logoutWrapper}>
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={styles.logoutBtn}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && <div onClick={closeSidebar} className={styles.overlay} />}
    </>
  );
}