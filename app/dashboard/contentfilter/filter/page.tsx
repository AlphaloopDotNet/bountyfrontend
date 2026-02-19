"use client";
import React, { useState } from 'react';
import styles from './filter.module.css';

export default function FilterComponent() {
  const [activeTab, setActiveTab] = useState("Recency");
  const [location, setLocation] = useState("India");

  const handleSearch = () => {
    console.log("Searching with tab:", activeTab);
  };

  const handleReset = () => {
    setActiveTab("Recency");
    setLocation("");
  };

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Content Filters</h2>
        <span className={styles.infoIcon}>ⓘ</span>
      </div>

      {/* Influencers Input */}
      <div className={styles.field}>
        <label>Influencers or Group</label>
        <input type="text" className={styles.input} placeholder="Enter name..." />
      </div>

      {/* Working Location Tag */}
      <div className={styles.field}>
        <label>Locations (Country or City)</label>
        <div className={styles.tagInput}>
          {location && (
            <span className={styles.tag}>
              {location} <span className={styles.x} onClick={() => setLocation("")}>✕</span>
            </span>
          )}
          <span className={styles.clearX} onClick={() => setLocation("")}>✕</span>
        </div>
      </div>

      {/* From/To Date Inputs */}
      <div className={styles.dateGrid}>
        <div className={styles.field}>
          <label>From</label>
          <div className={styles.dateBox}>
            <input type="date" className={styles.dateInputInvisible} />
          </div>
        </div>
        <div className={styles.field}>
          <label>To</label>
          <div className={styles.dateBox}>
            <input type="date" className={styles.dateInputInvisible} />
          </div>
        </div>
      </div>

      {/* Sponsored Toggle mockup text */}
      <div className={styles.sponsored}>Only show sponsored content <span>ⓘ</span></div>

      {/* Working Tabs */}
      <div className={styles.sortSection}>
        <label>Sort By</label>
        <div className={styles.tabs}>
          {["Recency", "Likes", "Comments"].map((tab) => (
            <button 
              key={tab}
              className={activeTab === tab ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.resetBtn} onClick={handleReset}>RESET</button>
        <button className={styles.searchBtn} onClick={handleSearch}>SEARCH</button>
      </div>
    </div>
  );
}