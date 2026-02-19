"use client"; // Hook use karne ke liye zaroori hai
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Router import kiya
import styles from './signth1.module.css';

export default function SignTh1Page() {
  const router = useRouter(); // Router initialize kiya

  // Ek common function redirection ke liye
  const handleSelection = () => {
    router.push('/dashboard/signth2');
  };

  return (
    <main className={styles.pageContainer}>
      
      <div className={styles.logoHeader}>
        <div className={styles.logoWrapper}>
          <Image 
            src="/images/threadlogo.jpg" 
            alt="Threads Logo" 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      <div className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Sign Up As</h1>

        <div className={styles.buttonStack}>
          {/* Brand Manager */}
          <button className={styles.redActionBtn} onClick={handleSelection}>
            <div className={styles.iconContainer}>
               <img src="/images/user.png" alt="" className={styles.innerIcon} />
            </div>
            <span className={styles.btnText}>Brand manager</span>
          </button>

          {/* Company */}
          <button className={styles.redActionBtn} onClick={handleSelection}>
            <div className={styles.iconContainer}>
               <img src="/images/building.png" alt="" className={styles.innerIcon} />
            </div>
            <span className={styles.btnText}>Company</span>
          </button>

          {/* Agency */}
          <button className={styles.redActionBtn} onClick={handleSelection}>
            <div className={styles.iconContainer}>
               <img src="/images/target.png" alt="" className={styles.innerIcon} />
            </div>
            <span className={styles.btnText}>Agency</span>
          </button>
        </div>

        <footer className={styles.formFooter}>
          <Link href="#" className={styles.footerLink}>Privacy Policy</Link>
          <span className={styles.divider}>|</span>
          <Link href="#" className={styles.footerLink}>Terms & Conditions</Link>
        </footer>
      </div>
    </main>
  );
}