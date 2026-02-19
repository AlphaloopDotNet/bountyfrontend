"use client";
import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, AreaChart, Area 
} from "recharts";
import styles from "./detailed.module.css";

export default function DetailedInsights({ onBack }: any) {
  // Mock Data
  const ageData = [
    { n: '0-18', v: 8 }, { n: '18-24', v: 30 }, { n: '25-32', v: 55 }, 
    { n: '33-39', v: 18 }, { n: '40-45', v: 5 }, { n: '45+', v: 2 }
  ];
  const genderData = [{ name: 'Male', v: 85 }, { name: 'Female', v: 15 }];
  const followersTimeline = [
    { d: '11/2018', v: 40 }, { d: '3/2019', v: 45 }, { d: '8/2019', v: 55 }, { d: '1/2020', v: 75 }
  ];
  const engagementTimeline = [
    { d: '1/1', v: 20 }, { d: '1/5', v: 35 }, { d: '1/10', v: 15 }, { d: '1/15', v: 45 }, { d: '1/20', v: 30 }
  ];
  const interestData = [
    { name: 'Fashion', v: 50 }, { name: 'Travel', v: 45 }, { name: 'Fitness', v: 40 }, 
    { name: 'Music', v: 35 }, { name: 'Vehicles', v: 25 }
  ];
  const brandAffinity = [
    { name: 'Adidas', v: 75 }, { name: 'Nike', v: 65 }, { name: 'Puma', v: 60 }, 
    { name: 'Manyavar', v: 45 }, { name: 'MRF', v: 35 }
  ];

  return (
    <div className={styles.insightsPage}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Detailed Insights</h1>

        <div className={styles.chartGrid}>
          {/* 1. Age Distribution */}
          <ChartCard title="Audience Age Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f3f3" />
                <XAxis dataKey="n" axisLine={false} tickLine={false} fontSize={10} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="v" fill="#A78BFA" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 2. Gender Distribution */}
          <ChartCard title="Audience Gender Distribution">
            <div className={styles.pieContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={genderData} innerRadius={55} outerRadius={75} dataKey="v" paddingAngle={5}>
                    <Cell fill="#FBBF24" />
                    <Cell fill="#60A5FA" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.pieOverlay}>
                <span className={styles.overlayLabel}>Main</span>
                <span className={styles.overlayValue}>85%</span>
              </div>
            </div>
          </ChartCard>

          {/* 3. Followers Timeline */}
          <ChartCard title="Followers Timeline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={followersTimeline}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="d" hide />
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="#34D399" fill="url(#colorGreen)" strokeWidth={3} />
                <defs>
                  <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 4. Engagement Timeline */}
          <ChartCard title="Engagement Timeline">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementTimeline}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="d" hide />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="#22D3EE" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 5. Location Distribution */}
          <ChartCard title="Audience Location Distribution">
             <div className={styles.mapWrapper}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" className={styles.mapImg} alt="map" />
                <div className={styles.mapPing}></div>
                <div className={styles.mapDot}></div>
             </div>
          </ChartCard>

          {/* 6. Brand Affinity Bar Chart (Interest Style) */}
          <ChartCard title="Audience Interest Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={interestData}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={10} width={60} />
                <Bar dataKey="v" fill="#6EE7B7" radius={[0, 4, 4, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Full Width Brand Affinity */}
          <div className={styles.fullWidth}>
            <ChartCard title="Audience Brand Affinity">
               <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={brandAffinity}>
                    <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                    <Bar dataKey="v" fill="#A78BFA" radius={[4,4,0,0]} barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <button onClick={onBack} className={styles.backButton}>
          Back to Profile
        </button>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <span className={styles.infoIcon}>ⓘ</span>
      </div>
      <div className={styles.cardBody}>
        {children}
      </div>
    </div>
  );
}