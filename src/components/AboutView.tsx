/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, Leader } from '../types';
import { LEADERS, IMAGES } from '../data';
import { 
  Rocket, 
  Eye, 
  Users, 
  CheckCircle2, 
  Heart, 
  Share2, 
  Mail, 
  ArrowRight,
  Sparkles,
  Award,
  X,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutViewProps {
  setCurrentPage: (page: PageId) => void;
}

export default function AboutView({ setCurrentPage }: AboutViewProps) {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [shareStatus, setShareStatus] = useState<string>('');

  const handleShare = (leaderName: string) => {
    setShareStatus(`Copied shareable link for ${leaderName}!`);
    setTimeout(() => setShareStatus(''), 4000);
  };

  return (
    <div id="about-view" className="bg-[#f8f9ff] text-[#0b1c30]">
      {/* Toast Alert for share action */}
      <AnimatePresence>
        {shareStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-6 z-50 bg-[#020617] text-white border border-white/10 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-sans text-xs font-semibold">{shareStatus}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="about-hero" className="relative py-20 md:py-24 px-4 md:px-10 bg-[#020617] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#b80035_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto z-10">
          <span 
            id="about-hero-overline"
            className="inline-block px-4 py-1 rounded-full bg-[#b80035]/20 text-[#ffb3b6] font-sans text-xs font-semibold uppercase tracking-widest mb-6 border border-[#b80035]/30"
          >
            Global Consultancy &amp; Labs
          </span>
          <h1 id="about-hero-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            The Pulse of Innovation
          </h1>
          <p id="about-hero-desc" className="font-sans text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            We bridge the gap between visionary strategy and technical precision. R-HeartBeat is where global scale meets artisan software craft.
          </p>
        </div>
      </section>

      {/* Our Story Grid */}
      <section id="our-story" className="py-20 px-4 md:px-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h2 id="story-title" className="font-display text-3xl md:text-4xl font-extrabold text-[#0b1c30] mb-6">
              Our Story
            </h2>
            <div id="story-content" className="font-sans text-slate-600 leading-relaxed text-sm md:text-base space-y-6">
              <p>
                Founded at the intersection of enterprise reliability and startup agility, R-HeartBeat began with a simple observation: most organizations are forced to choose between massive service firms that lack soul, or boutique labs that lack scale.
              </p>
              <p>
                We built a third way. By integrating a high-performance consultancy model with an internal product innovation lab, we don't just solve today's problems—we build the tools for tomorrow's opportunities.
              </p>
            </div>

            {/* Quick stats */}
            <div id="story-stats" className="grid grid-cols-2 gap-8 mt-10 pt-8 border-t border-slate-200">
              <div>
                <div className="text-[#b80035] font-display text-4xl md:text-5xl font-extrabold mb-1">
                  10+
                </div>
                <div className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Years of Precision
                </div>
              </div>
              <div>
                <div className="text-[#b80035] font-display text-4xl md:text-5xl font-extrabold mb-1">
                  150+
                </div>
                <div className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Global Deployments
                </div>
              </div>
            </div>
          </div>

          {/* Atrium sunset image */}
          <div className="lg:col-span-5">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-200 p-4 bg-white">
              <img 
                src={IMAGES.atriumSunset} 
                alt="Sophisticated structural sunset atrium"
                className="w-full h-full object-cover rounded-xl shadow-inner transition-transform duration-500 hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission-vision" className="py-20 bg-[#eff4ff]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 md:p-10 bg-white rounded-2xl shadow-[0px_4px_2px_rgba(15,23,42,0.01)] border border-slate-200/60 hover:border-[#b80035]/20 hover:shadow-[0px_8px_30px_rgba(15,23,42,0.04)] transition-all group">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-[#b80035] mb-6">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-[#0b1c30] mb-4">
                Our Mission
              </h3>
              <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                To deliver unparalleled excellence in service delivery while pioneering proprietary products that redefine industry benchmarks. We empower enterprises to pulse with new life through technology.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 md:p-10 bg-white rounded-2xl shadow-[0px_4px_2px_rgba(15,23,42,0.01)] border border-slate-200/60 hover:border-[#b80035]/20 hover:shadow-[0px_8px_30px_rgba(15,23,42,0.04)] transition-all group">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-[#b80035] mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-[#0b1c30] mb-4">
                Our Vision
              </h3>
              <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                To become the global standard for the "Dual-Model" software powerhouse—where consulting and creation feed into one another to produce the world's most resilient digital ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Model Section: Software Powerhouse */}
      <section id="software-powerhouse" className="py-20 px-4 md:px-10 max-w-[1280px] mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0b1c30] mb-4">
            A Software Powerhouse
          </h2>
          <p className="font-sans text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            The synergy of our two core pillars creates an ecosystem of continuous improvement and rapid deployment.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-4">
          {/* Pillar 01 */}
          <div className="flex-1 p-8 md:p-10 bg-white rounded-2xl border border-slate-200/80 shadow-md transition-all group z-10 hover:shadow-xl hover:border-[#b80035]/20">
            <div className="mb-6 flex justify-between items-start">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-[#b80035]">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Pillar 01
              </span>
            </div>
            
            <h4 className="font-display text-xl font-bold text-[#0b1c30] mb-4 group-hover:text-[#b80035] transition-colors">
              Service Excellence
            </h4>
            <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6">
              Strategic consultancy and custom engineering services for Fortune 500 enterprises. We handle the complexity of global infrastructure with surgical precision.
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#b80035]" />
                Enterprise Architecture
              </li>
              <li className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#b80035]" />
                Legacy Modernization
              </li>
              <li className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#b80035]" />
                Managed Cloud Services
              </li>
            </ul>
          </div>

          {/* The "Heart" Pulse - separating node on desktop */}
          <div className="hidden md:flex shrink-0 w-20 h-20 bg-[#b80035] rounded-full items-center justify-center z-20 shadow-lg animate-pulse-slow border-4 border-[#f8f9ff]">
            <Heart className="text-white w-8 h-8 fill-white" />
          </div>

          {/* Pillar 02 */}
          <div className="flex-1 p-8 md:p-10 bg-white rounded-2xl border border-slate-200/80 shadow-md transition-all group z-10 hover:shadow-xl hover:border-[#b80035]/20">
            <div className="mb-6 flex justify-between items-start">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-[#b80035]">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Pillar 02
              </span>
            </div>
            
            <h4 className="font-display text-xl font-bold text-[#0b1c30] mb-4 group-hover:text-[#b80035] transition-colors">
              Product Innovation
            </h4>
            <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6">
              Our internal R&amp;D lab builds proprietary SaaS solutions that anticipate market shifts. We don't just use tools; we invent them.
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#b80035]" />
                AI-Powered Analytics
              </li>
              <li className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#b80035]" />
                Edge Security Prototypes
              </li>
              <li className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#b80035]" />
                Next-Gen DevTools
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 px-4 md:px-10 bg-slate-100/50">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 id="leadership-title" className="font-display text-3xl md:text-4xl font-extrabold text-[#0b1c30] mb-4">
                Architects of Progress
              </h2>
              <p id="leadership-desc" className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                Our leadership team combines decades of experience in global finance, defense-grade cybersecurity, and Silicon Valley product design.
              </p>
            </div>
            
            <button 
              onClick={() => setCurrentPage('contact')}
              className="flex items-center gap-2 text-[#b80035] hover:text-[#e11d48] font-sans font-bold text-sm tracking-wide group cursor-pointer"
            >
              Join the team 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div id="leadership-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERS.map((leader) => (
              <div 
                key={leader.id} 
                className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 p-3 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedLeader(leader)}
              >
                <div className="aspect-[4/5] rounded-lg bg-slate-200 mb-4 overflow-hidden relative border border-slate-100">
                  <img 
                    src={leader.avatar} 
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle hover overlay hint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="font-sans text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#e11d48]" />
                      View Portfolio
                    </span>
                  </div>
                </div>
                
                <h5 className="font-display text-base font-extrabold text-[#0b1c30]">
                  {leader.name}
                </h5>
                <p className="font-sans text-xs text-[#b80035] font-semibold mb-3">
                  {leader.role}
                </p>

                {/* Social Share / Contacts inside card */}
                <div className="flex gap-4 border-t border-slate-100 pt-3 text-slate-400">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(leader.name);
                    }}
                    className="hover:text-[#b80035] transition-colors cursor-pointer"
                    title="Share Profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <a 
                    href={`mailto:${leader.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-[#b80035] transition-colors"
                    title={`Email ${leader.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Portfolio Detail Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeader(null)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 hover:text-slate-800 transition-colors cursor-pointer z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12">
                {/* Photo column */}
                <div className="sm:col-span-5 bg-slate-100 aspect-[4/5] sm:aspect-auto">
                  <img 
                    src={selectedLeader.avatar} 
                    alt={selectedLeader.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Detail column */}
                <div className="sm:col-span-7 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <span className="font-sans text-[10px] font-bold text-[#b80035] uppercase tracking-widest block mb-1">
                      Architect Profile
                    </span>
                    <h3 className="font-display text-2xl font-extrabold text-[#0b1c30]">
                      {selectedLeader.name}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 font-semibold mb-4">
                      {selectedLeader.role}
                    </p>

                    <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                      {selectedLeader.bio}
                    </p>

                    <h5 className="font-display text-xs font-bold text-[#0b1c30] uppercase tracking-wider mb-3">
                      Key Contributions
                    </h5>
                    <ul className="space-y-2 mb-6">
                      {selectedLeader.contributions.map((contr, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-normal">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{contr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer contacts */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex gap-3 text-slate-500">
                      <a 
                        href={selectedLeader.linkedin} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 hover:text-[#b80035] transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a 
                        href={`mailto:${selectedLeader.email}`}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 hover:text-[#b80035] transition-all"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedLeader(null);
                        setCurrentPage('contact');
                      }}
                      className="px-4 py-2 bg-[#b80035] hover:bg-[#e11d48] text-white font-sans font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Book Scoping Meeting
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About CTA */}
      <section id="about-cta" className="py-24 px-4 md:px-10 max-w-[1280px] mx-auto">
        <div className="bg-[#b80035] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-6">
              Ready to pulse at a new frequency?
            </h2>
            <p className="font-sans text-sm md:text-lg mb-10 max-w-2xl mx-auto text-white/80 leading-relaxed">
              Whether you need custom solutions for your enterprise or want to leverage our proprietary product suite, we are ready to innovate with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-white text-[#b80035] hover:bg-slate-100 px-8 py-4 rounded-xl font-sans font-bold transition-all shadow-lg text-sm cursor-pointer"
              >
                Start a Partnership
              </button>
              <button 
                onClick={() => setCurrentPage('solutions')}
                className="bg-[#e11d48] border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-sans font-bold transition-all text-sm cursor-pointer"
              >
                Explore Our Lab
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
