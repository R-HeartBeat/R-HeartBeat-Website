/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, CaseStudy, ProductShowcase } from '../types';
import { PRODUCTS, CASE_STUDIES, SERVICE_OFFERINGS } from '../data';
import { 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  ShieldAlert, 
  Activity, 
  Database, 
  Sliders, 
  HelpCircle,
  FileText,
  BadgeAlert,
  ServerCrash,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SolutionsViewProps {
  setCurrentPage: (page: PageId) => void;
}

export default function SolutionsView({ setCurrentPage }: SolutionsViewProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'products'>('services');
  
  // Scoping estimator states
  const [selectedService, setSelectedService] = useState<string>('Enterprise Architecture');
  const [orgScale, setOrgScale] = useState<string>('Mid-Market Enterprise');
  const [complianceRequirement, setComplianceRequirement] = useState<string>('Standard Secure');
  
  // Product simulator states
  const [selectedProductIdx, setSelectedProductIdx] = useState<number>(0);
  const [simulatedLoad, setSimulatedLoad] = useState<number>(50); // slider 0-100

  // Case study filters
  const [caseFilter, setCaseFilter] = useState<'All' | 'Service Excellence' | 'Product Innovation'>('All');

  const selectedProduct: ProductShowcase = PRODUCTS[selectedProductIdx];

  // Scoping calculator logic
  const calculateScopingDetails = () => {
    let baseTimelineWeeks = 12;
    let complexityRating = 'Medium';
    let baseCostIndex = '$$$';
    let suggestedArch = 'Decoupled Serverless REST / WebSockets';

    if (selectedService === 'Enterprise Architecture') {
      baseTimelineWeeks = 16;
      complexityRating = 'High';
      baseCostIndex = '$$$$';
      suggestedArch = 'Distributed Event Sourcing (Apache Kafka + PostgreSQL)';
    } else if (selectedService === 'Legacy Modernization') {
      baseTimelineWeeks = 24;
      complexityRating = 'Critical';
      baseCostIndex = '$$$$$';
      suggestedArch = 'Parallel Shadow Ledger (Event-Driven Gateway proxying)';
    } else {
      // Managed Cloud
      baseTimelineWeeks = 8;
      complexityRating = 'Low';
      baseCostIndex = '$$';
      suggestedArch = 'Kubernetes Multi-Region Serverless Clusters (Terraform)';
    }

    // Scale adjustments
    if (orgScale === 'Fortune 500') {
      baseTimelineWeeks = Math.round(baseTimelineWeeks * 1.5);
      baseCostIndex += ' (Enterprise Core)';
    } else if (orgScale === 'Startup') {
      baseTimelineWeeks = Math.round(baseTimelineWeeks * 0.7);
      baseCostIndex = baseCostIndex.slice(0, Math.max(1, baseCostIndex.length - 1));
    }

    // Compliance adjustments
    if (complianceRequirement === 'Military/HIPAA/Fintech') {
      baseTimelineWeeks += 4;
      complexityRating = 'Ultra High';
      suggestedArch += ' with HSM encryption & zero-trust private subnetting';
    }

    return {
      timelineWeeks: baseTimelineWeeks,
      complexityRating,
      costIndex: baseCostIndex,
      suggestedArch
    };
  };

  const scopeResult = calculateScopingDetails();

  // Filtered case studies
  const filteredCases = CASE_STUDIES.filter(cs => {
    if (caseFilter === 'All') return true;
    return cs.category === caseFilter;
  });

  return (
    <div id="solutions-view" className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen">
      {/* Hero Header */}
      <section id="solutions-hero" className="relative py-16 px-4 md:px-10 bg-[#020617] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#b80035]/10 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto z-10 text-center">
          <span className="font-mono text-[11px] font-bold text-[#e11d48] uppercase tracking-widest block mb-4">
            Interactive Catalog
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Capabilities &amp; Core Systems
          </h1>
          <p className="font-sans text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Toggle between our bespoke engineering advisory services and our suite of modular SaaS products designed in-house.
          </p>

          {/* Large custom selector tabs */}
          <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-xl max-w-md mx-auto mt-10">
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-3 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-white text-[#020617] shadow-lg shadow-white/5'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Pillar 01: Consulting Services
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-3 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-white text-[#020617] shadow-lg shadow-white/5'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Pillar 02: SaaS Products
            </button>
          </div>
        </div>
      </section>

      {/* Main interactive Tab Content */}
      <section className="py-16 px-4 md:px-10 max-w-[1280px] mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'services' ? (
            <motion.div
              key="services-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Services list */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="font-mono text-xs font-bold text-[#b80035] uppercase tracking-wider block mb-2">
                    Architectural Advisory
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#0b1c30] mb-4">
                    High-Assurance Service Offerings
                  </h3>
                  <p className="font-sans text-slate-600 text-sm leading-relaxed mb-6">
                    Our master engineers partner directly with your internal leadership teams to design, audit, and build the foundation for your next 10 years of business scale.
                  </p>
                </div>

                {SERVICE_OFFERINGS.map((offering) => (
                  <div 
                    key={offering.title}
                    onClick={() => setSelectedService(offering.title)}
                    className={`p-6 rounded-xl border transition-all cursor-pointer ${
                      selectedService === offering.title
                        ? 'bg-white border-[#e11d48] shadow-md shadow-[#e11d48]/5'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <h4 className="font-display text-base font-bold text-[#0b1c30] mb-2 flex items-center justify-between">
                      {offering.title}
                      {selectedService === offering.title && (
                        <span className="w-2 h-2 rounded-full bg-[#e11d48]"></span>
                      )}
                    </h4>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed mb-4">
                      {offering.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {offering.details.map(det => (
                        <span key={det} className="px-2 py-0.5 rounded bg-slate-100 font-sans text-[10px] font-bold text-slate-600">
                          {det}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Dynamic Project Scope Estimator */}
              <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xl sticky top-20">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                  <Sliders className="w-5 h-5 text-[#b80035]" />
                  <h4 className="font-display text-lg font-bold text-slate-900">
                    Bespoke Project Scoping Calculator
                  </h4>
                </div>

                <p className="font-sans text-xs text-slate-500 leading-relaxed mb-6">
                  Estimate target delivery metrics by selecting project scope attributes below. Our calculator utilizes simulated metrics derived from 150+ successful launches.
                </p>

                {/* Form controls */}
                <div className="space-y-5 mb-8">
                  {/* Service selection */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-600 mb-2">
                      Selected Advisory Domain
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-sans font-semibold text-slate-800 outline-none focus:border-[#e11d48]"
                    >
                      {SERVICE_OFFERINGS.map(o => (
                        <option key={o.title} value={o.title}>{o.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Company scale */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-600 mb-2">
                      Target Organizational Scale
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Startup', 'Mid-Market', 'Fortune 500'].map(scale => (
                        <button
                          key={scale}
                          type="button"
                          onClick={() => setOrgScale(scale)}
                          className={`py-2 text-center rounded-lg border font-sans text-[11px] font-bold transition-all cursor-pointer ${
                            orgScale === scale
                              ? 'bg-[#020617] text-white border-[#020617]'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {scale}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Compliance check */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-600 mb-2">
                      Infrastructure Compliance Audit Requirements
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Standard Secure', 'Military/HIPAA/Fintech'].map(comp => (
                        <button
                          key={comp}
                          type="button"
                          onClick={() => setComplianceRequirement(comp)}
                          className={`py-2 px-1 text-center rounded-lg border font-sans text-[11px] font-bold transition-all cursor-pointer ${
                            complianceRequirement === comp
                              ? 'bg-[#e11d48] text-white border-[#e11d48]'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {comp}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Score results showcase */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h5 className="font-display text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Simulated Scope Estimation Output
                  </h5>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div className="bg-white p-3 rounded-lg border border-slate-100">
                      <div className="font-sans text-[10px] font-semibold text-slate-400 uppercase">Weeks</div>
                      <div className="font-mono text-xl font-extrabold text-slate-900 mt-1">
                        ~{scopeResult.timelineWeeks}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-100">
                      <div className="font-sans text-[10px] font-semibold text-slate-400 uppercase">Cost Index</div>
                      <div className="font-mono text-xs font-extrabold text-[#b80035] mt-2.5">
                        {scopeResult.costIndex}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-100">
                      <div className="font-sans text-[10px] font-semibold text-slate-400 uppercase">Complexity</div>
                      <div className="font-mono text-xs font-extrabold text-slate-800 mt-2.5">
                        {scopeResult.complexityRating}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-100 text-left">
                    <div className="font-sans text-[10px] font-semibold text-slate-400 uppercase mb-1">Recommended Stack Arch</div>
                    <div className="font-mono text-[11px] text-slate-700 font-bold leading-normal">
                      {scopeResult.suggestedArch}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage('contact')}
                  className="mt-6 w-full py-4 bg-[#e11d48] hover:bg-[#b80035] text-white font-sans font-bold text-xs rounded-lg shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Schedule Scoping Appointment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="products-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Left Column: Product Selector Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#b80035] uppercase tracking-wider block mb-2">
                    Proprietary Software Lab
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#0b1c30] mb-4">
                    Off-the-shelf High Performance SaaS
                  </h3>
                  <p className="font-sans text-slate-600 text-sm leading-relaxed">
                    We incubator proprietary developer libraries, threat segmenters, and predictive analytics tools internally, and ship them as ready-to-run SaaS programs.
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  {PRODUCTS.map((prod, idx) => (
                    <div
                      key={prod.id}
                      onClick={() => setSelectedProductIdx(idx)}
                      className={`p-5 rounded-xl border transition-all cursor-pointer text-left ${
                        selectedProductIdx === idx
                          ? 'bg-white border-[#e11d48] shadow-lg shadow-[#e11d48]/5'
                          : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-display text-base font-extrabold text-[#0b1c30]">
                          {prod.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                          prod.status === 'Production'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : prod.status === 'Beta'
                            ? 'bg-sky-55 text-sky-600 border border-sky-100'
                            : 'bg-rose-50 text-[#b80035] border border-rose-100'
                        }`}>
                          {prod.status}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-slate-500 font-semibold mb-2">
                        {prod.tagline}
                      </p>
                      <p className="font-sans text-xs text-slate-600 leading-normal line-clamp-2">
                        {prod.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Selected Product Interactive Dashboard Sandbox */}
              <div className="lg:col-span-7 bg-slate-950 text-white rounded-2xl p-6 md:p-8 shadow-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#e11d48]/5 rounded-full filter blur-[50px] pointer-events-none" />

                <div className="flex justify-between items-start border-b border-white/10 pb-5 mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-teal-400 font-bold uppercase tracking-widest block mb-1">
                      Interactive Product Sandbox
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold text-white">
                      {selectedProduct.name} Telemetry Sandbox
                    </h3>
                  </div>

                  <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 font-mono text-[10px] text-white/80 font-bold">
                    ID: {selectedProduct.id.toUpperCase()}_v2.4
                  </span>
                </div>

                <p className="font-sans text-xs text-white/60 leading-relaxed mb-6">
                  Adjust inputs below to simulate active workload strain on {selectedProduct.name} core kernels. Watch target performance benchmarks respond.
                </p>

                {/* Simulated Metrics panel */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {selectedProduct.demoMetrics.map((met) => {
                    // Intelligently calculate custom outputs based on slider simulatedLoad
                    let adjustedValue = met.value;
                    if (met.name.includes('Speed') || met.name.includes('Time')) {
                      adjustedValue = Math.max(1, Math.round(met.value * (0.5 + simulatedLoad / 100)));
                    } else if (met.name.includes('Cost') || met.name.includes('Throughput') || met.name.includes('Time (s)')) {
                      adjustedValue = Math.round(met.value * (0.8 + simulatedLoad / 200));
                    } else if (met.name.includes('Accuracy')) {
                      adjustedValue = Number((met.value - (simulatedLoad / 150)).toFixed(1));
                    }

                    return (
                      <div key={met.name} className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <span className="font-sans text-[9px] font-bold text-white/40 uppercase block mb-1">
                          {met.name}
                        </span>
                        <span className="font-mono text-base md:text-lg font-extrabold text-white">
                          {adjustedValue}
                          {met.name.includes('Accuracy') || met.name.includes('Reduction') ? '%' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Slider control */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10 mb-6">
                  <div className="flex justify-between font-mono text-[11px] text-white/80 mb-3">
                    <span>Simulated Global Query Load</span>
                    <span className="text-[#e11d48] font-bold">{simulatedLoad * 10} Requests / Sec</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={simulatedLoad}
                    onChange={(e) => setSimulatedLoad(Number(e.target.value))}
                    className="w-full accent-[#e11d48] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-white/40 mt-1">
                    <span>Low Load</span>
                    <span>Optimized Peak Load</span>
                  </div>
                </div>

                {/* Features list */}
                <div>
                  <h5 className="font-display text-xs font-bold text-white/70 uppercase tracking-wider mb-3">
                    Included Core Capabilities
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProduct.features.map(feat => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-[#e11d48] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="flex-1 py-3 bg-[#e11d48] hover:bg-[#b80035] text-white font-sans font-bold text-xs rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Request Sandbox Key
                  </button>
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/15 text-white font-sans font-bold text-xs rounded-lg transition-colors cursor-pointer text-center border border-white/10"
                  >
                    Schedule Demo Call
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Case studies database list */}
      <section id="solutions-case-studies" className="py-20 bg-slate-100 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs font-bold text-[#b80035] uppercase tracking-widest block mb-2">
              Verified Outcomes
            </span>
            <h2 className="font-display text-3xl font-extrabold text-slate-950">
              Impact Delivery Library
            </h2>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['All', 'Service Excellence', 'Product Innovation'].map(filter => (
              <button
                key={filter}
                onClick={() => setCaseFilter(filter as any)}
                className={`px-4 py-2 rounded-full font-sans text-xs font-bold border transition-all cursor-pointer ${
                  caseFilter === filter
                    ? 'bg-[#b80035] text-white border-[#b80035] shadow-md shadow-[#b80035]/15'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Filtered grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCases.map(cs => (
              <div 
                key={cs.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wide">
                      {cs.category}
                    </span>
                    <span className="font-sans text-[11px] text-slate-400">
                      {cs.client}
                    </span>
                  </div>

                  <h4 className="font-display text-base font-extrabold text-slate-900 mb-3 line-clamp-1">
                    {cs.title}
                  </h4>

                  <p className="font-sans text-xs text-slate-600 leading-relaxed mb-6 line-clamp-4">
                    {cs.description}
                  </p>
                </div>

                <div>
                  <div className="border-t border-slate-100 pt-4 mb-4">
                    <div className="font-mono text-2xl font-extrabold text-[#b80035]">
                      {cs.metrics[0].value}
                    </div>
                    <div className="font-sans text-[10px] font-semibold text-slate-400 uppercase">
                      {cs.metrics[0].label}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {cs.techStack.slice(0, 3).map(tech => (
                      <span key={tech} className="px-1.5 py-0.5 rounded bg-slate-50 font-mono text-[10px] text-slate-500">
                        {tech}
                      </span>
                    ))}
                    {cs.techStack.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-50 font-mono text-[10px] text-slate-400">
                        +{cs.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
