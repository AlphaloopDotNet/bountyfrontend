"use client";
import React, { useState } from 'react';
import styles from './report.module.css';

export default function ReportsComponent() {
  // State for all inputs
  const [reportTitle, setReportTitle] = useState("Dyson Stories Report");
  const [hashtag, setHashtag] = useState("");
  const [mentions, setMentions] = useState("");
  const [usernames, setUsernames] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);

  const handleGetReport = () => {
    alert(`Generating Report: ${reportTitle}\nScheduled: ${isScheduled}`);
    // Yahan aap apna API call logic daal sakte hain
  };

  return (
    <div className={styles.reportWrapper}>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Report Title</label>
        <input 
          type="text" 
          value={reportTitle} 
          onChange={(e) => setReportTitle(e.target.value)}
          className={styles.textInput} 
        />
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label className={styles.label}>Hashtag</label>
          <span className={styles.infoCircle}>ⓘ</span>
        </div>
        <textarea 
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          placeholder="#dyson (one on each line)" 
          className={styles.textArea} 
        />
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label className={styles.label}>Mentions</label>
          <span className={styles.infoCircle}>ⓘ</span>
        </div>
        <textarea 
          value={mentions}
          onChange={(e) => setMentions(e.target.value)}
          placeholder="@username (one on each line)" 
          className={styles.textArea} 
        />
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label className={styles.label}>Influencer Usernames</label>
          <span className={styles.infoCircle}>ⓘ</span>
        </div>
        <textarea 
          value={usernames}
          onChange={(e) => setUsernames(e.target.value)}
          placeholder="@username (one on each line)" 
          className={styles.textArea} 
        />
      </div>

      {/* Working Checkbox */}
      <div className={styles.checkboxContainer} onClick={() => setIsScheduled(!isScheduled)}>
        <div className={`${styles.customCheck} ${isScheduled ? styles.checked : ""}`}>
          {isScheduled && "✓"}
        </div>
        <span className={styles.checkboxLabel}>Schedule this report over a period of time</span>
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.getReportBtn} onClick={handleGetReport}>
          📊 GET REPORT
        </button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.scheduleSection}>
        <h3 className={styles.scheduleHeading}>Schedule Reports</h3>
        <p className={styles.noReportsMsg}>There are no scheduled reports at the moment</p>
      </div>
    </div>
  );
}