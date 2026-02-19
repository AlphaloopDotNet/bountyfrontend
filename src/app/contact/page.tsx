"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";  // app/contact/ से ../components/

export default function ContactUs() {
  const [isCopied, setIsCopied] = useState(false);
  const phoneNumber = "+91 9342117255";

  const copyNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Sidebar />
      
      <div className="pt-24 px-6 md:px-12 max-w-4xl mx-auto py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ready to launch your next campaign? 
            <span className="text-red-600 font-semibold"> Contact us today!</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Call Us Now</h2>
              <div className="space-y-4">
                <div 
                  className="flex items-center p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  onClick={copyNumber}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform">
                    📞
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{phoneNumber}</p>
                    <p className="text-sm opacity-90">Tap to copy</p>
                  </div>
                  {isCopied && (
                    <div className="ml-4 bg-white/30 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      Copied!
                    </div>
                  )}
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-red-500">
                  <p className="text-gray-700 font-medium">
                    <span className="font-bold text-lg">⏱️</span> 
                    Response Time: <span className="text-red-600 font-bold">Within 2 Hours</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Link 
                    href="tel:+919342117255"
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transform hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    📲 Call Now
                  </Link>
                  <Link 
                    href="https://wa.me/919342117255"
                    target="_blank"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    💬 WhatsApp
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Link href="/campaign-form" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">Campaign Form</Link>
                <Link href="/plans/sme" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">View Plans</Link>
                <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">Dashboard</Link>
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">Privacy Policy</Link>
              </div>
            </div>
          </div>

          {/* Right - Hero Image/Graphic */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-500/10 to-blue-500/10 backdrop-blur-xl p-12 rounded-4xl shadow-2xl border border-white/30 h-full min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-red-400 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform rotate-6">
                  <span className="text-4xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Launch Your Campaign</h3>
                <p className="text-lg text-gray-700 max-w-md mx-auto">
                  One call away from your next big influencer marketing success!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-gray-200">
          <div className="text-center text-xs text-gray-500 space-y-2">
            <p>&copy; 2026 Your Company. All rights reserved.</p>
            <div className="flex justify-center items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-red-500 transition-colors">Privacy Policy</Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-red-500 transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
