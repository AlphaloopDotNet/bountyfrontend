"use client";
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import styles from './trendsForm.module.css';

const TrendsForm = ({ onCreate }: { onCreate: () => void }) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState('');
  const [granularity, setGranularity] = useState('Month');

  const handleLocationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && locationInput.trim() !== '') {
      e.preventDefault();
      if (!locations.includes(locationInput.trim())) {
        setLocations([...locations, locationInput.trim()]);
      }
      setLocationInput('');
    }
  };

  const removeLocation = (indexToRemove: number) => {
    setLocations(locations.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Sidebar Component yahan add kar diya */}
      <Sidebar />

      {/* 2. Form ka content is div mein rahega */}
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <h2 className={styles.title}>Create trends dashboards</h2>
          
          <div className={styles.field}>
            <label>Brands <span className={styles.info}>ⓘ</span></label>
            <input type="text" className={styles.input} placeholder="Enter brand name" />
          </div>

          <div className={styles.field}>
            <label>Hashtag or caption <span className={styles.info}>ⓘ</span></label>
            <input type="text" className={styles.input} placeholder="Eg. #ootd or gardensbythebay" />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>From</label>
              <div className={styles.dateInput}>
                <input type="text" defaultValue="18/08/2024" />
                <span className={styles.calendarIcon}>📅</span>
              </div>
            </div>
            <div className={styles.field}>
              <label>To</label>
              <div className={styles.dateInput}>
                <input type="text" defaultValue="17/08/2025" />
                <span className={styles.calendarIcon}>📅</span>
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label>Metric <span className={styles.info}>ⓘ</span></label>
            <select className={styles.input}>
              <option>Select metric</option>
              <option>Engagement</option>
              <option>Reach</option>
              <option>Posts</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Locations (Country or City)</label>
            <div className={styles.tagInputWrapper}>
              <div className={styles.tagsArea}>
                {locations.map((loc, index) => (
                  <span key={index} className={styles.tag}>
                    {loc} <button type="button" onClick={() => removeLocation(index)}>×</button>
                  </span>
                ))}
              </div>
              <input 
                type="text" 
                className={styles.locationInput} 
                placeholder="Type and press Enter..." 
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={handleLocationKeyDown}
              />
              {locations.length > 0 && (
                <button className={styles.clearAll} onClick={() => setLocations([])}>×</button>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label>Granularity</label>
            <div className={styles.switch}>
              {['Month', 'Week', 'Day'].map((option) => (
                <div 
                  key={option}
                  className={`${styles.option} ${granularity === option ? styles.active : ''}`}
                  onClick={() => setGranularity(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label>Sponsored <span className={styles.info}>ⓘ</span></label>
            <div className={styles.sponsoredRow}>
                 <input type="checkbox" id="sponsored" className={styles.checkbox} />
                 <label htmlFor="sponsored" className={styles.subLabel}>Only show sponsored</label>
            </div>
          </div>

          <button className={styles.submitBtn} onClick={onCreate}>Create Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default TrendsForm;