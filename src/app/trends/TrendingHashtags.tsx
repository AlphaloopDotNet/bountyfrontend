"use client";
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  LabelList 
} from 'recharts';
import styles from './TrendingHashtags.module.css';

const data = [
  { name: '#independenceday', posts: 14 },
  { name: '#roadtofreedom', posts: 8 },
  { name: '#indianbike', posts: 8 },
  { name: '#outfitdetails', posts: 7 },
  { name: '#stylemepretty', posts: 6 },
];

const TrendingHashtags = () => {
  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.title}>Trending Hashtags</h3>
      <p className={styles.yAxisLabel}>Hashtags</p>
      
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            {/* Design match karne ke liye grid lines sirf vertical (X-axis) */}
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
            
            <XAxis 
              type="number" 
              domain={[0, 15]} 
              ticks={[0, 3, 6, 9, 12, 15]} 
              axisLine={{stroke: '#000', strokeWidth: 2}}
              // Yahan font-family add kar di hai error se bachne ke liye
              tick={{
                fontSize: 12, 
                fontWeight: 700, 
                fontFamily: 'Comfortaa, sans-serif',
                fill: '#000'
              }}
            />
            
            <YAxis 
              dataKey="name" 
              type="category" 
              hide={true} 
            />

            <Bar 
              dataKey="posts" 
              fill="#F97316" 
              barSize={32}
              radius={[0, 2, 2, 0]}
            >
              {/* Labels bar ke andar */}
              <LabelList 
                dataKey="name" 
                position="insideLeft" 
                offset={10}
                style={{ 
                  fill: '#000', 
                  fontSize: '13px', 
                  fontWeight: '600',
                  fontFamily: 'Comfortaa, sans-serif'
                }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p className={styles.xAxisLabel}>Number of Posts</p>
    </div>
  );
};

export default TrendingHashtags;