"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './ActiveBrands.module.css';

const data = [
  { name: 'carandbike', value: 30, color: '#FF9F00' }, // Orange
  { name: 'danielwellington', value: 25, color: '#2196F3' }, // Blue
  { name: 'stylishthamper', value: 15, color: '#E91E63' }, // Pink/Red
  { name: 'dhingli__143', value: 15, color: '#4CAF50' }, // Green
  { name: 'nathabit.in', value: 15, color: '#7986CB' }, // Purple/Indigo
];

const ActiveBrands = () => {
  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.title}>Most Active Brands</h3>
      
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={{ stroke: '#000', strokeWidth: 1 }} // Connector lines
              label={({ name }) => name} // Label text outside
              outerRadius={100}
              dataKey="value"
              stroke="none" // Removes white border between slices
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend Section to match trend2.jpeg */}
      <div className={styles.legendContainer}>
        {data.map((entry, index) => (
          <div key={index} className={styles.legendItem}>
            <div 
              className={styles.colorBox} 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveBrands;