"use client";
import React from 'react';
import FilterComponent from './filter/page';
import ReportsComponent from './reports/page';
import Sidebar from "../../components/Sidebar";

// Yahan koi extra CSS import karne ki zaroorat nahi hai 
// kyunki Filter aur Reports apne andar apni CSS handle kar rahe hain.

export default function ContentFilterMain() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Sidebar />
      <main className="mt-[70px] p-4 max-w-[500px] mx-auto w-full space-y-10">
        
        {/* Filter Section - Iske andar filter.module.css automatically chalega */}
        <section className="pb-8 border-b border-gray-100">
           <FilterComponent />
        </section>
        
        {/* Reports Section - Iske andar report.module.css automatically chalega */}
        <section className="pb-10">
           <ReportsComponent />
        </section>

      </main>
    </div>
  );
}