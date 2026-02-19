"use client";
import React from "react";
import styles from "./profile.module.css";

export default function ProfileModal({ influencer, onClose, onViewDetailed }: any) {
  const similarInfluencers = [
    { name: "hardikpandya93", img: "/images/hardik.jpeg" },
    { name: "ranveersingh", img: "/images/rn.jpeg" },
    { name: "dishapatani", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Disha" },
    { name: "sachintendulkar", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sachin" },
    { name: "mahi7781", img: "/images/dhoni.jpeg" },
  ];

  // Engagement metrics data based on your screenshot
  const engagementData = [
    { label: 'Likes', val: '3%', sub: '2,174,757', sim: '2.52%', status: 'Good', deg: 10.8 }, // 3% of 360deg
    { label: 'Comments', val: '0.02%', sub: '13,757', sim: '0.03%', status: 'Good', deg: 2 },
    { label: 'Suspicious Followers', val: '2%', sub: '2%', sim: '3%', status: 'Very Good', deg: 7.2 }
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.imageRing}>
            <img src={influencer.image} alt={influencer.name} className={styles.mainImg} />
          </div>
          
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>{influencer.name}</h2>
            <p className={styles.profileBio}>{influencer.bio}</p>
            
            <div className={styles.statsBadges}>
              <span className={styles.badgeItem}>👥 {influencer.followers}</span> 
              <span className={styles.badgeItem}>📍 India</span> 
              <span className={styles.badgeItem}>💎 Above $5000</span>
            </div>

            <div className={styles.socialIcons}>
              {['facebook', 'instagram', 'tiktok', 'twitter', 'youtube'].map((platform, idx) => (
                <div key={idx} className={styles.iconBox}>
                   {/* Replace with actual SVGs later */}
                  <span className={styles.placeholderIcon}>🔗</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionGrid}>
          <button className={styles.redBtn}>👤 Add To Group</button>
          <button className={styles.redBtn}>📤 Export Selected</button>
          <button className={styles.redBtn}>✉️ Send Mail</button>
        </div>

        <hr className={styles.divider} />
        
        {/* Category Section */}
        <h4 className={styles.sectionTitle}>Category</h4>
        <div className={styles.categoryFlex}>
          {['Fitness', 'Fashion', 'Sports'].map(cat => (
            <div key={cat} className={styles.catBadge}>{cat}</div>
          ))}
        </div>

        <hr className={styles.divider} />

        {/* Engagement Header */}
        <div className={styles.engagementHeader}>
          <h4 className={styles.sectionTitle}>Engagement</h4>
          <button onClick={onViewDetailed} className={styles.yellowInsightsBtn}>
            View Detailed Insights
          </button>
        </div>

        {/* Circular Progress Stats */}
        <div className={styles.statsGrid}>
          {engagementData.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              {/* Dynamic Conic Gradient for the Red Stroke */}
              <div 
                className={styles.progressCircle}
                style={{ background: `radial-gradient(closest-side, white 82%, transparent 0% 100%), conic-gradient(#CC3333 ${stat.deg}deg, #E5E7EB 0deg)` }}
              >
                <span className={styles.progressVal}>{stat.val}</span>
              </div>
              <p className={styles.statSub}>{stat.sub} {stat.label}</p>
              <p className={styles.statSim}>Similar Influencers {stat.sim}</p>
              <p className={styles.statStatus}>
                {stat.label === 'Suspicious Followers' ? 'Audience Quality: ' : 'Engagement: '}
                <span className={styles.statusText}>{stat.status}</span>
              </p>
            </div>
          ))}
        </div>

        <button className={styles.uploadCta}>⬆ Upload Influencers</button>

        {/* Similar Influencers Section */}
        <div className={styles.similarBox}>
          <h4 className={styles.sectionTitle}>Similar Influencers</h4>
          <div className={styles.similarScrollContainer}>
             <div className={styles.similarScroll}>
                {similarInfluencers.map((sim, idx) => (
                  <div key={idx} className={styles.simCard}>
                    <img src={sim.img} className={styles.simImg} alt={sim.name} />
                    <span className={styles.simName}>{sim.name}</span>
                  </div>
                ))}
             </div>
             <button className={styles.scrollArrow}>❯</button>
          </div>
        </div>
        
        <button onClick={onClose} className={styles.backBtn}>
          Back to Search Results
        </button>
      </div>
    </div>
  );
}