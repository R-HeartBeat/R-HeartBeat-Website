/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from '../types';
import { Activity, Mail, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter an email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000); // Reset message after 5 seconds
  };

  return (
    <footer id="main-footer" className="w-full py-16 px-4 md:px-10 bg-[#020617] text-white border-t border-white/5 pb-24 md:pb-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Brand & Desc */}
          <div id="footer-brand-col" className="flex flex-col gap-4">
            <div 
              id="footer-logo" 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <Activity className="text-[#e11d48] w-6 h-6 animate-pulse" />
              <span className="font-display text-xl font-bold tracking-tighter">R-HeartBeat</span>
            </div>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              Precision Product Innovation &amp; Global Consultancy for the modern era.
            </p>
          </div>

          {/* Column 2: Explore links */}
          <div id="footer-explore-col">
            <h6 className="font-display text-sm font-bold text-white mb-6 uppercase tracking-wider">Explore</h6>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => setCurrentPage('solutions')} 
                  className="font-sans text-xs text-white/60 hover:text-[#e11d48] transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('solutions')} 
                  className="font-sans text-xs text-white/60 hover:text-[#e11d48] transition-colors cursor-pointer"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('solutions')} 
                  className="font-sans text-xs text-white/60 hover:text-[#e11d48] transition-colors cursor-pointer"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('about')} 
                  className="font-sans text-xs text-white/60 hover:text-[#e11d48] transition-colors cursor-pointer"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support links */}
          <div id="footer-support-col">
            <h6 className="font-display text-sm font-bold text-white mb-6 uppercase tracking-wider">Support</h6>
            <ul className="space-y-4">
              <li>
                <span className="font-sans text-xs text-white/60 hover:text-white transition-colors cursor-default">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="font-sans text-xs text-white/60 hover:text-white transition-colors cursor-default">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="font-sans text-xs text-white/60 hover:text-white transition-colors cursor-default flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Service Status: Live
                </span>
              </li>
              <li>
                <a 
                  href="mailto:rheartbeat2026@gmail.com" 
                  className="font-sans text-xs text-[#e11d48] hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  rheartbeat2026@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div id="footer-newsletter-col" className="flex flex-col">
            <h6 className="font-display text-sm font-bold text-white mb-6 uppercase tracking-wider">Newsletter</h6>
            <p className="font-sans text-xs text-white/60 mb-4 leading-relaxed">
              Stay updated on our latest product drops and market insights.
            </p>
            
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#0d9488]/10 text-[#2dd4bf] border border-[#0d9488]/30 rounded-lg p-3 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-sans text-xs">Subscribed successfully! Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex bg-white/5 rounded-lg p-1 border border-white/10 relative">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Email address"
                  className="bg-transparent border-none text-white text-xs font-sans focus:outline-none flex-1 px-3 py-2 outline-none w-full"
                />
                <button 
                  type="submit"
                  className="bg-[#b80035] hover:bg-[#e11d48] text-white p-2 rounded-md transition-colors cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            {error && (
              <p className="text-[#f87171] font-sans text-[11px] mt-1.5 ml-1">{error}</p>
            )}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div id="footer-copyright" className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="font-sans text-xs text-white/40">
            &copy; {new Date().getFullYear()} R-HeartBeat. Precision Product Innovation &amp; Global Consultancy.
          </p>
        </div>
      </div>
    </footer>
  );
}
