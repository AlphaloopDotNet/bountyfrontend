import Image from 'next/image';
import Link from 'next/link';
import styles from './threads.module.css';

export default function ThreadsPage() {
  return (
    <div className={styles.threadsBg}>
      
      {/* Logo Section */}
      <div className={styles.logoWrapper}>
        <Image 
          src="/images/thd.png"  
          alt="Threads Logo" 
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      {/* Buttons Section */}
      <div className={styles.buttonContainer}>
        {/* Log In -> dashboard/thlog */}
        <Link href="/dashboard/thlog" className="w-full" style={{ textDecoration: 'none', width: '100%' }}>
          <div className={styles.btnWhite}>Log In</div>
        </Link>

        {/* Sign up -> dashboard/signth1 */}
        <Link href="/dashboard/signth1" className="w-full" style={{ textDecoration: 'none', width: '100%' }}>
          <div className={styles.btnWhite}>Sign up</div>
        </Link>
      </div>

    </div>
  );
}