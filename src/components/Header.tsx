/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';
import { Activity, Home, Info, Cpu, Mail } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onContactClick: () => void;
}

export default function Header({ currentPage, setCurrentPage, onContactClick }: HeaderProps) {
  return (
    <>
      {/* TopAppBar Desktop */}
      <header id="main-header" className="sticky top-0 z-50 w-full bg-[#020617] border-b border-white/10 shadow-md">
        <div className="flex justify-between items-center px-4 md:px-10 h-16 max-w-[1280px] mx-auto">
          {/* Logo */}
          <div 
            id="logo-container" 
            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
            onClick={() => setCurrentPage('home')}
          >
            <Activity id="logo-icon" className="text-[#e11d48] w-7 h-7 animate-pulse" />
            <span id="logo-text" className="font-display text-2xl font-extrabold text-white tracking-tighter">
              R-HeartBeat
            </span>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            <button 
              id="nav-home"
              onClick={() => setCurrentPage('home')}
              className={`font-sans text-[15px] font-semibold transition-colors duration-200 cursor-pointer pb-1 border-b-2 ${
                currentPage === 'home' 
                  ? 'text-[#e11d48] border-[#e11d48]' 
                  : 'text-white/80 border-transparent hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              id="nav-about"
              onClick={() => setCurrentPage('about')}
              className={`font-sans text-[15px] font-semibold transition-colors duration-200 cursor-pointer pb-1 border-b-2 ${
                currentPage === 'about' 
                  ? 'text-[#e11d48] border-[#e11d48]' 
                  : 'text-white/80 border-transparent hover:text-white'
              }`}
            >
              About
            </button>
            <button 
              id="nav-solutions"
              onClick={() => setCurrentPage('solutions')}
              className={`font-sans text-[15px] font-semibold transition-colors duration-200 cursor-pointer pb-1 border-b-2 ${
                currentPage === 'solutions' 
                  ? 'text-[#e11d48] border-[#e11d48]' 
                  : 'text-white/80 border-transparent hover:text-white'
              }`}
            >
              Solutions
            </button>
            <button 
              id="nav-contact"
              onClick={() => setCurrentPage('contact')}
              className={`font-sans text-[15px] font-semibold transition-colors duration-200 cursor-pointer pb-1 border-b-2 ${
                currentPage === 'contact' 
                  ? 'text-[#e11d48] border-[#e11d48]' 
                  : 'text-white/80 border-transparent hover:text-white'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Contact Action Button */}
          <button 
            id="header-cta"
            onClick={onContactClick}
            className="bg-[#b80035] hover:bg-[#e11d48] text-white px-5 py-2 rounded-lg font-sans font-semibold text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-[#b80035]/25 cursor-pointer"
          >
            Get In Touch
          </button>
        </div>
      </header>

      {/* BottomNavBar (Mobile Only) */}
      <nav id="mobile-bottom-nav" className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-white dark:bg-[#020617] md:hidden border-t border-slate-200 shadow-[0px_-4px_20px_rgba(15,23,42,0.06)]">
        <button 
          id="mobile-nav-home"
          onClick={() => setCurrentPage('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            currentPage === 'home' 
              ? 'text-[#b80035] bg-[#ffdada]/30' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="font-sans text-[10px] font-medium">Home</span>
        </button>
        
        <button 
          id="mobile-nav-about"
          onClick={() => setCurrentPage('about')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            currentPage === 'about' 
              ? 'text-[#b80035] bg-[#ffdada]/30' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Info className="w-5 h-5 mb-0.5" />
          <span className="font-sans text-[10px] font-medium">About</span>
        </button>
        
        <button 
          id="mobile-nav-solutions"
          onClick={() => setCurrentPage('solutions')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            currentPage === 'solutions' 
              ? 'text-[#b80035] bg-[#ffdada]/30' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Cpu className="w-5 h-5 mb-0.5" />
          <span className="font-sans text-[10px] font-medium">Solutions</span>
        </button>
        
        <button 
          id="mobile-nav-contact"
          onClick={() => setCurrentPage('contact')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            currentPage === 'contact' 
              ? 'text-[#b80035] bg-[#ffdada]/30' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Mail className="w-5 h-5 mb-0.5" />
          <span className="font-sans text-[10px] font-medium">Contact</span>
        </button>
      </nav>
    </>
  );
}
