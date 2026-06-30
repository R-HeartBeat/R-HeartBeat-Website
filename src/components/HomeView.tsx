/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, CaseStudy } from '../types';
import { CASE_STUDIES, PRODUCTS } from '../data';
import { 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  ShieldAlert, 
  Users, 
  Activity, 
  Cpu, 
  Layers, 
  Sparkles,
  Server,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  setCurrentPage: (page: PageId) => void;
}

export default function HomeView({ setCurrentPage }: HomeViewProps) {
  // Telemetry simulator states
  const [networkLoad, setNetworkLoad] = useState<number>(68);
  const [latency, setLatency] = useState<number>(14);
  const [activeNodes, setActiveNodes] = useState<number>(182);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  
  // Case Studies slider states
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);
  
  // Custom parallax for hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulator interval loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // Create natural heartbeat fluctuations
      setNetworkLoad(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const next = prev + delta;
        return Math.min(Math.max(next, 40), 95);
      });

      setLatency(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return Math.min(Math.max(next, 8), 24);
      });

      setActiveNodes(prev => {
        const delta = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return prev + delta;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const activeCase: CaseStudy = CASE_STUDIES[activeCaseIdx];

  return (
    <div id="home-view" className="bg-[#f8f9ff] text-[#0b1c30]">
      {/* Interactive Hero Section */}
      <section 
        id="hero-section" 
        className="relative py-24 md:py-32 px-4 md:px-10 bg-[#020617] overflow-hidden border-b border-white/5"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Colorful gradient blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#b80035]/15 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#006855]/10 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto z-10 flex flex-col items-center text-center">
          <span 
            id="hero-overline"
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/80 font-mono text-[11px] font-medium tracking-widest uppercase mb-6"
          >
            Precision Product Engineering
          </span>
          
          <h1 
            id="hero-title"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.1s ease-out' }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] max-w-4xl tracking-tight mb-8"
          >
            Architecting <span className="text-[#e11d48]">High-Scale</span> Digital Powerhouses
          </h1>
          
          <p 
            id="hero-description"
            className="font-sans text-base sm:text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10"
          >
            R-HeartBeat merges high-integrity enterprise consultancy with a cutting-edge proprietary software incubation lab. We build the infrastructure that powers global industries.
          </p>

          <div id="hero-actions" className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              id="hero-btn-primary"
              onClick={() => setCurrentPage('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-[#e11d48] hover:bg-[#b80035] text-white font-sans font-bold rounded-lg shadow-xl shadow-[#e11d48]/20 transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              Consult with our Architects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              id="hero-btn-secondary"
              onClick={() => setCurrentPage('solutions')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-sans font-bold rounded-lg border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Explore Proprietary Suite
            </button>
          </div>
        </div>
      </section>

      {/* Live System Sandbox Component (TELEMETRY SIMULATOR) */}
      <section id="telemetry-sandbox" className="py-20 px-4 md:px-10 max-w-[1280px] mx-auto -mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0px_8px_30px_rgba(15,23,42,0.06)] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                  R-HeartBeat Active Telemetry Simulator
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-950">
                Witness Precision Performance
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-sans text-xs text-slate-500 font-medium">
                {isSimulating ? 'Live Stream Active' : 'Simulation Paused'}
              </span>
              <button 
                onClick={() => setIsSimulating(!isSimulating)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  isSimulating 
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                    : 'bg-[#e11d48] text-white hover:bg-[#b80035] shadow-md shadow-[#e11d48]/10'
                }`}
              >
                {isSimulating ? 'Pause Live Loop' : 'Resume Live Loop'}
              </button>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* Metric 1 */}
            <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3">
                <span className="font-sans text-sm font-semibold text-slate-600">Simulated Network Load</span>
                <TrendingUp className="w-4 h-4 text-[#e11d48]" />
              </div>
              <div>
                <span className="font-mono text-4xl font-extrabold text-slate-900">{networkLoad}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#b80035] to-[#e11d48] h-full transition-all duration-1000" 
                    style={{ width: `${networkLoad}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3">
                <span className="font-sans text-sm font-semibold text-slate-600">Avg Transaction Latency</span>
                <Zap className="w-4 h-4 text-[#006855]" />
              </div>
              <div>
                <span className="font-mono text-4xl font-extrabold text-slate-900">{latency} ms</span>
                <p className="font-sans text-[11px] text-slate-500 mt-2">
                  Optimized by R-HeartBeat Core compilation
                </p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3">
                <span className="font-sans text-sm font-semibold text-slate-600">Decentralized Active Nodes</span>
                <Users className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <span className="font-mono text-4xl font-extrabold text-slate-900">{activeNodes}</span>
                <p className="font-sans text-[11px] text-slate-500 mt-2">
                  Global server endpoints deployed
                </p>
              </div>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60">
            <h4 className="font-display text-sm font-bold text-slate-900 mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#e11d48]" />
              Interactive Load Injector (Tweak performance metrics)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex justify-between font-sans text-xs font-semibold text-slate-600 mb-2">
                  <span>Adjust Simulated Grid Traffic Volume</span>
                  <span className="font-mono text-[#b80035]">{networkLoad}%</span>
                </label>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={networkLoad} 
                  onChange={(e) => {
                    setNetworkLoad(Number(e.target.value));
                    // Intelligently correlate latency with load
                    const calcLatency = Math.floor(8 + (Number(e.target.value) / 10) * 1.5 + Math.random() * 2);
                    setLatency(calcLatency);
                  }}
                  className="w-full accent-[#e11d48] h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="flex justify-between font-sans text-xs font-semibold text-slate-600 mb-2">
                  <span>Set Allocated Virtual Nodes Count</span>
                  <span className="font-mono text-[#006855]">{activeNodes} Nodes</span>
                </label>
                <input 
                  type="range" 
                  min="50" 
                  max="500" 
                  value={activeNodes} 
                  onChange={(e) => setActiveNodes(Number(e.target.value))}
                  className="w-full accent-[#006855] h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Value proposition Bento Grid */}
      <section id="values-bento" className="py-16 px-4 md:px-10 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-bold text-[#e11d48] uppercase tracking-widest block mb-3">
            Ecosystem Synergy
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-950 mb-4">
            The Dual-Model Advantage
          </h2>
          <p className="font-sans text-slate-600 max-w-xl mx-auto text-sm md:text-base">
            We bypass the compromise between standard software agencies and internal R&D teams by executing on both concurrently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-[0px_4px_20px_rgba(15,23,42,0.02)] hover:shadow-[0px_10px_30px_rgba(15,23,42,0.06)] hover:border-[#e11d48]/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-[#e11d48] mb-6">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-[#b80035] transition-colors mb-3">
              Elite Enterprise Consulting
            </h3>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              We engineer global infrastructure for massive industries. Scaled legacy modernization, transactional integrity audits, and private secure topologies.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-[0px_4px_20px_rgba(15,23,42,0.02)] hover:shadow-[0px_10px_30px_rgba(15,23,42,0.06)] hover:border-[#e11d48]/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#006855] mb-6">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-[#006855] transition-colors mb-3">
              Proprietary SaaS Incubation
            </h3>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              Our lab builds and releases active, defense-grade SaaS programs like Acuity AI and Sentinel Edge, keeping our developers hands-on and ahead of industry changes.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-[0px_4px_20px_rgba(15,23,42,0.02)] hover:shadow-[0px_10px_30px_rgba(15,23,42,0.06)] hover:border-[#e11d48]/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-3">
              Artisan Engineering Talent
            </h3>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              No middle-managers or outsourced resources. We have a cohesive team of dedicated computer science leaders, cloud architects, and product designers.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Carousel Section */}
      <section id="interactive-cases" className="py-20 bg-[#020617] text-white border-y border-white/5 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#e11d48] block mb-2">
                Proven Executions
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
                Case Studies in Action
              </h2>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-2">
              {CASE_STUDIES.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveCaseIdx(idx)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                    activeCaseIdx === idx 
                      ? 'bg-[#e11d48] text-white font-bold' 
                      : 'bg-white/10 text-white/60 hover:bg-white/15'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Slider Box */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Text column */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 font-mono text-[10px] tracking-wider text-slate-300 uppercase">
                        {activeCase.category}
                      </span>
                      <span className="text-white/40 text-xs font-mono">
                        Client: {activeCase.client}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-4">
                      {activeCase.title}
                    </h3>
                    
                    <p className="font-sans text-sm md:text-base text-white/70 mb-6 leading-relaxed">
                      {activeCase.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <h5 className="font-display text-xs font-bold text-[#e11d48] uppercase tracking-wider mb-2">The Challenge</h5>
                        <p className="font-sans text-xs text-white/60 leading-relaxed">{activeCase.challenge}</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <h5 className="font-display text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">The Solution</h5>
                        <p className="font-sans text-xs text-white/60 leading-relaxed">{activeCase.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-display text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Technology Used</h5>
                    <div className="flex flex-wrap gap-2">
                      {activeCase.techStack.map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded bg-white/5 font-mono text-xs text-white/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics / Visual display column */}
                <div className="lg:col-span-5 flex flex-col justify-center bg-white/5 border border-white/5 p-6 md:p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#e11d48]/10 rounded-full filter blur-xl" />
                  
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/80 mb-6 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#e11d48]" />
                    Verified Project Impact Metrics
                  </h4>

                  <div className="space-y-6">
                    {activeCase.metrics.map((metric, i) => (
                      <div key={i} className="border-b border-white/5 pb-4 last:border-none last:pb-0">
                        <div className="font-mono text-3xl font-extrabold text-white tracking-tight mb-1">
                          {metric.value}
                        </div>
                        <div className="font-sans text-xs text-white/60 uppercase tracking-wide">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setCurrentPage('solutions')}
                    className="mt-8 w-full py-3 bg-white text-[#020617] font-sans font-bold text-xs rounded-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    View All Case Studies
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Dynamic CTA */}
      <section id="cta-section" className="py-24 px-4 md:px-10 max-w-[1280px] mx-auto">
        <div className="bg-[#b80035] rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-[#b80035]/20">
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-white/10 rounded-full filter blur-xl" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-white/10 rounded-full filter blur-xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.15]">
              Let's align your systems on a new frequency.
            </h2>
            <p className="font-sans text-base md:text-lg text-white/85 mb-10 leading-relaxed">
              Connect with our master consulting architects to blueprint high-availability infrastructure or deploy our custom SaaS prototypes inside your pipeline.
            </p>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-4 bg-white text-[#b80035] hover:bg-slate-50 font-sans font-bold rounded-lg shadow-xl transition-all cursor-pointer inline-flex items-center gap-2 group"
            >
              Start Technical Scoping
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
