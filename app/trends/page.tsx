"use client";
import React, { useState } from 'react';
import TrendsForm from './TrendsForm';
import ActiveBrands from './ActiveBrands';
import HighestEngagement from './HighestEngagement';
import TrendingHashtags from './TrendingHashtags';
import styles from './TrendsPage.module.css';

export default function TrendsPage() {
  // State to toggle between Form (trend1) and Dashboard (trend2, 3, 4)
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className={styles.wrapper}>
      {!showDashboard ? (
        /* Pehle user ko form dikhao */
        <div className={styles.formContainer}>
          <TrendsForm onCreate={() => setShowDashboard(true)} />
        </div>
      ) : (
        /* Form submit hone par dashboard load karo */
        <div className={styles.dashboardContainer}>
          
          {/* Dashboard Header Dropdown - Design Match */}
          <div className={styles.headerSelection}>
            <select className={styles.mainSelect}>
              <option>Influencers trends during last week</option>
              <option>Influencers trends during last month</option>
              <option>Influencers trends during last year</option>
            </select>
          </div>

          {/* Saare charts ko vertical stack mein display karna */}
          <div className={styles.chartsStack}>
            
            <div className={styles.sectionCard}>
              <ActiveBrands />
            </div>

            <div className={styles.sectionCard}>
              <HighestEngagement />
            </div>

            <div className={styles.sectionCard}>
              <TrendingHashtags />
            </div>

          </div>

          {/* Reset karne ka option */}
          <button 
            className={styles.resetBtn} 
            onClick={() => setShowDashboard(false)}
          >
            ← Create New Trend Analysis
          </button>
        </div>
      )}
    </div>
  );
}