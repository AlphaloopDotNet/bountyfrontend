'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // useRouter को इम्पोर्ट किया
import styles from './signth1.module.css';

export default function SignTh1Page() {
  const router = useRouter(); // router इंस्टेंस बनाया

  // क्लिक हैंडलर फंक्शन
  const handleSelection = (role: string) => {
    // अगर आप चाहते हैं कि यूजर का चुनाव याद रहे, तो यहाँ localStorage यूज कर सकते हैं
    localStorage.setItem("signup_sub_role", role); 
    
    // signth2 पेज पर नेविगेट करना
    router.push('/influencer-dashboard/signth2');
  };

  return (
    <main className={styles.pageContainer}>
      
      <div className={styles.logoHeader}>
        <div className={styles.logoWrapper}>
          <Image 
            src="/images/download.png" 
            alt="Bounty Logo" 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      <div className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Sign Up As</h1>

        <div className={styles.buttonStack}>
          {/* Brand Manager बटन */}
          <button 
            className={styles.redActionBtn} 
            onClick={() => handleSelection('brand_manager')}
          >
            <div className={styles.iconContainer}>
               <img src="/images/user.png" alt="" className={styles.innerIcon} />
            </div>
            <span className={styles.btnText}>Brand manager</span>
          </button>

          {/* Company बटन */}
          <button 
            className={styles.redActionBtn} 
            onClick={() => handleSelection('company')}
          >
            <div className={styles.iconContainer}>
               <img src="/images/building.png" alt="" className={styles.innerIcon} />
            </div>
            <span className={styles.btnText}>Company</span>
          </button>

          {/* Agency बटन */}
          <button 
            className={styles.redActionBtn} 
            onClick={() => handleSelection('agency')}
          >
            <div className={styles.iconContainer}>
               <img src="/images/target.png" alt="" className={styles.innerIcon} />
            </div>
            <span className={styles.btnText}>Agency</span>
          </button>
        </div>

        <footer className={styles.formFooter}>
          <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
          <span className={styles.divider}>|</span>
          <Link href="/terms" className={styles.footerLink}>Terms & Conditions</Link>
        </footer>
      </div>
    </main>
  );
}