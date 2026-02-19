"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar"; 
import DiscoveryGrid from "./DiscoveryGrid";
import ProfileModal from "./ProfileModal"; // ✅ Filename match kar raha hai
import DetailedInsights from "./DetailedInsights";

export default function DiscoveryPage() {
  const [view, setView] = useState("grid"); 
  const [selected, setSelected] = useState(null);

  return (
    <main className="min-h-screen bg-[#F8F9FB]">
      <Sidebar />  
      
      {/* 1. GRID VIEW */}
      {view === "grid" && (
        <div className="pt-20 pb-20">  
          <div className="max-w-5xl mx-auto px-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="Search influencers..." 
                  className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
                />
              </div>
              <button className="bg-[#FBBF24] hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-md transition-all flex items-center gap-2">
                <span>⬆</span> Upload Influencers
              </button>
            </div>
          </div>

          <DiscoveryGrid 
            onSelect={(inf: any) => { 
              setSelected(inf); 
              setView("modal"); // ProfileModal kholne ke liye
            }} 
          />
        </div>
      )}

      {/* 2. PROFILE VIEW (Using your ProfileModal.tsx) */}
      {view === "modal" && selected && (
        <div className="fixed inset-0 z-[150] bg-white overflow-y-auto">
          <ProfileModal 
            influencer={selected} 
            onClose={() => setView("grid")} 
            onViewDetailed={() => setView("insights")} 
          />
        </div>
      )}

      {/* 3. DETAILED INSIGHTS VIEW */}
      {view === "insights" && (
        <div className="animate-in fade-in duration-500">
          <DetailedInsights onBack={() => setView("modal")} />
        </div>
      )}
    </main>
  );
}