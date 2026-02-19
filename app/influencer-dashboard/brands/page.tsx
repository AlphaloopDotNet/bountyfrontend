'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../influencer.module.css";
import SidebarContent from "../components/SidebarContent";

interface BrandType {
  id: number;
  name: string;
  logo: string;
  website?: string;
  link?: string;
}

export default function BrandsPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [brands, setBrands] = useState<BrandType[]>([
    { id: 1, logo: "/images/layslogo.jpeg", name: "Lay's", website: "https://www.lays.com/" },
    { id: 2, logo: "/images/kurkure.jpeg", name: "Kurkure", website: "https://www.pepsicoindia.co.in/brands/kurkure" },
    { id: 3, logo: "/images/pepsi.jpeg", name: "Pepsi", website: "https://www.pepsi.com/" },
    { id: 4, logo: "/images/cadbury.jpeg", name: "Cadbury", website: "https://www.mondelezinternational.com/Our-Brands/Cadbury" },
    { id: 5, logo: "/images/doritos.jpeg", name: "Doritos", website: "https://www.doritos.com/" },
    { id: 6, logo: "/images/chetos.jpeg", name: "Cheetos", website: "https://www.cheetos.com/" },
    { id: 7, logo: "/images/pringles.jpeg", name: "Pringles", website: "https://www.pringles.com/" },
    { id: 8, logo: "/images/kelloggs.jpeg", name: "Kellogg's", website: "https://www.kelloggs.com/" },
  ]);
  const [loading, setLoading] = useState(false);

  // ✅ Hamesha user_type = bounty aur redirect influencer-dashboard
  useEffect(() => {
    localStorage.setItem("user_type", "bounty"); // hamesha bounty
    const userEmail = localStorage.getItem("user_email");
    if (userEmail) {
      router.replace("/influencer-dashboard"); // hamesha redirect
    }
  }, [router]);

  const navigateTo = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  if (loading) {
    return (
      <div className={styles.paperBody} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <h1 style={{ fontSize: '24px', color: '#1a1a1a', fontFamily: 'var(--font-heading)' }}>LOADING BRANDS...</h1>
      </div>
    );
  }

  return (
    <div className={styles.paperBody}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
            <div className={styles.burgerLine}></div>
            <div className={styles.burgerLine} style={{ width: '16px' }}></div>
            <div className={styles.burgerLine}></div>
          </button>
        </div>
        <div className={styles.navCenter}>
          <img 
            src="/images/download.png" 
            alt="Bounty Logo"
            className={styles.logoMain}
            style={{ cursor: 'pointer' }}
            onClick={() => navigateTo("/influencer-dashboard")}
          />
        </div>
        <div className={styles.navRight}><div style={{ width: '40px' }}></div></div>
      </nav>

      {/* SIDEBAR */}
      <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.sidebarActive : ""}`}>
        <SidebarContent 
          onNavigate={navigateTo}
          onClose={() => setIsMenuOpen(false)}
          onLogout={() => router.push("/")}
        />
      </div>
      {isMenuOpen && <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} />}

      {/* PAGE HEADER */}
      <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '50px' }}>
        <h1 style={{
          fontSize: 'clamp(40px, 12vw, 60px)',
          fontFamily: 'var(--font-heading)',
          color: '#1a1a1a',
          margin: '0',
          letterSpacing: '5px',
          borderBottom: '3px solid #1a1a1a',
          display: 'inline-block',
          paddingBottom: '10px'
        }}>
          BRANDS
        </h1>
      </div>

      {/* BRANDS GRID */}
      <main style={{ padding: '0 20px 100px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
          gap: '30px' 
        }}>
          {brands.map((brand) => (
            <a 
              key={brand.id} 
              href={brand.website || brand.link || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                border: '3px solid #1a1a1a',
                background: 'white',
                transition: 'all 0.3s ease',
                height: '160px',
                overflow: 'hidden',
                boxShadow: '8px 8px 0px #000'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                e.currentTarget.style.boxShadow = '12px 12px 0px #000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '8px 8px 0px #000';
              }}
            >
              <img 
                src={brand.logo}
                alt={brand.name} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=" + brand.name; }}
              />
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
