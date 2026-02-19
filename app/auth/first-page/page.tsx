'use client';

import Link from 'next/link';
import { useState } from 'react';
import localFont from 'next/font/local';
import styles from './page.module.css';

// Font loading setup
const comfortaa = localFont({
  src: [
    { path: '../../../public/fonts/Comfortaa-Light.ttf', weight: '300' },
    { path: '../../../public/fonts/Comfortaa-Regular.ttf', weight: '400' },
    { path: '../../../public/fonts/Comfortaa-Bold.ttf', weight: '700' },
  ],
  variable: '--font-comfortaa',
});

export default function Home() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <main className={`${styles.container} ${comfortaa.className}`}>

      {/* 1. Logo Section */}
      <div className={styles.logoSection}>
        <img
          src="/images/br.png"
          alt="Bounty & Rewards Logo"
          className={styles.logoImage}
        />
      </div>

      {/* 2. Auth Links Section */}
      <div className={styles.authSection}>
        {/* Login पर क्लिक करने पर 'bolog' वाला पेज खुलेगा */}
        <Link
          href="/influencer-dashboard/bolog"
          className={`${styles.authButton} ${
            hoveredButton === 'login' ? styles.hovered : ''
          }`}
          onMouseEnter={() => setHoveredButton('login')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Login
        </Link>

        <span className={styles.separator}>|</span>

        {/* Register पर क्लिक करने पर 'signth1' वाला पेज खुलेगा */}
        <Link
          href="/influencer-dashboard/signth1"
          className={`${styles.authButton} ${
            hoveredButton === 'register' ? styles.hovered : ''
          }`}
          onMouseEnter={() => setHoveredButton('register')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Register
        </Link>
      </div>

      {/* 3. Footer */}
      <footer className={styles.footer}>
        <Link href="/privacy" className={styles.footerLink}>
          Privacy Policy
        </Link>
        <Link href="/terms" className={styles.footerLink}>
          Terms & Conditions
        </Link>
      </footer>

    </main>
  );
}