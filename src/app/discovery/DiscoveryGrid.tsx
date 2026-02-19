"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./discovery.module.css";

const staticInfluencers = [
  { name: "Virat Kohli", handle: "virat.kohli", bio: "Carpediem! @one8world", followers: "266M", image: "/images/vk.jpeg" },
  { name: "Shraddha Kapoor", handle: "shraddhakapoor", bio: "Living the dream! ✨", followers: "91.5M", image: "/images/shraddha.jpeg" },
  { name: "Ranveer Singh", handle: "ranveersingh", bio: "Living life in technicolor 🌈", followers: "47.2M", image: "/images/rn.jpeg" },
  { name: "Alia Bhatt", handle: "aliaabhatt", bio: "Moody, Floaty, Fire and DESIRE !", followers: "85.1M", image: "/images/alia.jpeg" },
  { name: "Deepika Padukone", handle: "deepikapadukone", bio: "To live, love and laugh...", followers: "79.8M", image: "/images/dipika.jpeg" },
  { name: "Hardik Pandya", handle: "hardikpandya93", bio: "Proud Indian 🇮🇳 | World Champion", followers: "30.4M", image: "/images/hardik.jpeg" },
  { name: "MS Dhoni", handle: "mahi7781", bio: "Every moment is a new beginning.", followers: "48.5M", image: "/images/dhoni.jpeg" },
  { name: "Bhuvan Bam", handle: "bhuvan.bam22", bio: "Dhindora peet do! 🎺", followers: "19.8M", image: "/images/bhavan.jpeg" },
  { name: "Prajakta Koli", handle: "mostlysane", bio: "Mostly Sane, Always Grateful.", followers: "8.2M", image: "/images/i.jpeg" },
  { name: "Jacqueline Fernandez", handle: "jacquelinef143", bio: "Actress | Fitness Enthusiast", followers: "44.3M", image: "/images/jaq.jpeg" },
  { name: "Neha Kakkar", handle: "nehakakkar", bio: "Blessed! Living My Dream. 🎤", followers: "43.7M", image: "/images/neha.jpeg" },
  { name: "Kartik Aaryan", handle: "kartikaaryan", bio: "Chandu Champion 🏆", followers: "38.5M", image: "/images/aryan.jpeg" }
];

export default function DiscoveryGrid({ onSelect }: { onSelect: (inf: any) => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInfluencers = staticInfluencers.filter(inf =>
    inf.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <Sidebar />

      <div className={styles.mainContent}>
        {/* Header Title */}
        <p className={styles.subHeaderText}>
          Showing top results, use filters to find relevant influencers
        </p>

        {/* Search Bar Section */}
        <div className={styles.searchSection}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search influencers by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className={styles.clearBtn}>
                ×
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {searchTerm && filteredInfluencers.length === 0 && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <h3>No influencers found</h3>
            <p>Try searching with a different name</p>
            <button onClick={() => setSearchTerm("")} className={styles.resetBtn}>
              Show All Influencers
            </button>
          </div>
        )}

        {/* 2-Column Influencer Grid */}
        <div className={`${styles.grid} ${filteredInfluencers.length === 0 ? styles.hidden : ""}`}>
          {filteredInfluencers.map((inf, idx) => (
            <div 
              key={idx} 
              onClick={() => onSelect(inf)} 
              className={styles.card}
            >
              {/* Profile Image with Red Border */}
              <div className={styles.imageRing}>
                <img 
                  src={inf.image} 
                  alt={inf.name} 
                  className={styles.profileImg}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${inf.handle}`;
                  }}
                />
              </div>

              <h3 className={styles.name}>{inf.name}</h3>
              <p className={styles.handle}>@{inf.handle}</p>
              
              <p className={styles.bio}>"{inf.bio}"</p>

              <div className={styles.followers}>
                <span className={styles.emoji}>👥</span> {inf.followers} followers
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}