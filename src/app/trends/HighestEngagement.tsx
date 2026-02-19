"use client";
import React from 'react';
import styles from './HighestEngagement.module.css';

interface Influencer {
  handle: string;
  name: string;
  engagement: string;
  barWidth: string; // Dynamic width based on percentage
}

const influencers: Influencer[] = [
  { handle: 'scoop_n_slice', name: 'scoop and slice', engagement: '25.6%', barWidth: '100%' },
  { handle: 'im anshya', name: 'anshya gupta', engagement: '23.06%', barWidth: '90%' },
  { handle: 'pri_yakshi', name: 'priyakshi gogoi', engagement: '15.51%', barWidth: '60%' },
  { handle: 'aprajithathakur73', name: 'aprajitha thakur', engagement: '15.51%', barWidth: '60%' },
  { handle: 'delhifoodnest', name: 'rituraj & mehak | delhi food', engagement: '15.48%', barWidth: '58%' },
];

const HighestEngagement = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.mainTitle}>Influencers with Highest Engagement</h3>
      
      <div className={styles.listContainer}>
        {influencers.map((item, index) => (
          <div key={index} className={styles.influencerRow}>
            {/* Left Side: Profile Info */}
            <div className={styles.profileBox}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                   {/* Placeholder for image */}
                </div>
              </div>
              <div className={styles.textInfo}>
                <p className={styles.handle}>{item.handle}</p>
                <p className={styles.name}>{item.name}</p>
              </div>
            </div>

            {/* Right Side: Progress Bar */}
            <div className={styles.barArea}>
              <div 
                className={styles.progressBar} 
                style={{ width: item.barWidth }}
              >
                {item.engagement}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighestEngagement;