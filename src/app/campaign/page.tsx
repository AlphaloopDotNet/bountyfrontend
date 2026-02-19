"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./campaigns.module.css"; // CSS Module Import

export default function CampaignForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      console.log('🚀 Form Submitted! Calling Next.js API...');
      
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit campaign');
      }

      console.log('✅ Success! Redirecting...');
      router.push('/thank-you');
      
    } catch (err: any) {
      console.error('💥 Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Campaign Brief Form
        </h1>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formStack}>
            
            {/* Campaign Name */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Name of the Campaign *
              </label>
              <input 
                name="campaignName"
                type="text" 
                required 
                disabled={isPending}
                className={styles.input} 
                placeholder="Enter campaign name"
              />
            </div>

            {/* Hashtag */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Hashtag
              </label>
              <input 
                name="hashtag"
                type="text" 
                disabled={isPending}
                placeholder="#YourCampaign" 
                className={styles.input} 
              />
            </div>

            {/* Brief */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Brief Description
              </label>
              <textarea 
                name="brief"
                rows={5} 
                required
                disabled={isPending}
                className={styles.textarea}
                placeholder="Describe your campaign brief in detail..."
              />
            </div>

            {/* Followers & Type Grid */}
            <div className={styles.grid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Minimum Followers
                </label>
                <select 
                  name="minFollowers"
                  disabled={isPending}
                  className={styles.select}
                >
                  <option value="">Select</option>
                  <option value="10k+">10k+</option>
                  <option value="50k+">50k+</option>
                  <option value="100k+">100k+</option>
                  <option value="500k+">500k+</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Type
                </label>
                <select 
                  name="type"
                  required
                  disabled={isPending}
                  className={styles.select}
                >
                  <option value="">Select</option>
                  <option value="influencer">Influencer</option>
                  <option value="celebrity">Celebrity</option>
                  <option value="creator">Creator</option>
                </select>
              </div>
            </div>

            {/* Date Range Grid */}
            <div className={styles.grid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  From Date
                </label>
                <input 
                  name="fromDate"
                  type="date" 
                  required
                  disabled={isPending}
                  className={styles.input} 
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  To Date
                </label>
                <input 
                  name="toDate"
                  type="date" 
                  required
                  disabled={isPending}
                  className={styles.input} 
                />
              </div>
            </div>

            {/* Post Requirements */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Post/Video Requirements
              </label>
              <input 
                name="postRequirements"
                type="text" 
                required
                disabled={isPending}
                placeholder="e.g., 3 Reels + 1 Carousel + 2 Stories" 
                className={styles.input} 
              />
            </div>

            {/* Special Requirements */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Special Requirements
              </label>
              <textarea 
                name="specialRequirements"
                rows={4} 
                disabled={isPending}
                className={styles.textarea}
                placeholder="Any specific requirements..."
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className={styles.errorAlert}>
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className={styles.buttonGroup}>
              <button 
                type="reset" 
                disabled={isPending}
                className={styles.resetBtn}
              >
                Reset Form
              </button>
              <button 
                type="submit" 
                disabled={isPending}
                className={styles.submitBtn}
              >
                {isPending ? "Submitting..." : "Submit Campaign"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}