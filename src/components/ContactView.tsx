/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, AppointmentSlot, ConsultationRequest } from '../types';
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  Loader2,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactViewProps {
  setCurrentPage: (page: PageId) => void;
}

const AVAILABLE_DAYS = [
  { name: 'Monday', label: 'Mon', dateStr: 'July 6' },
  { name: 'Tuesday', label: 'Tue', dateStr: 'July 7' },
  { name: 'Wednesday', label: 'Wed', dateStr: 'July 8' },
  { name: 'Thursday', label: 'Thu', dateStr: 'July 9' },
  { name: 'Friday', label: 'Fri', dateStr: 'July 10' }
];

const INITIAL_TIME_SLOTS: AppointmentSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '01:00 PM', available: false }, // Simulate booked slot
  { time: '02:30 PM', available: true },
  { time: '04:00 PM', available: true }
];

export default function ContactView({ setCurrentPage }: ContactViewProps) {
  // Form values
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Enterprise Architecture');
  const [message, setMessage] = useState('');
  
  // Date / Time slots selection
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(1); // default Tuesday
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');
  
  // Submission flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<ConsultationRequest | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!fullName || !email || !company || !message) {
      setErrorMsg('Please complete all form fields.');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please provide a valid business email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate server side submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRequest({
        fullName,
        email,
        company,
        serviceInterest,
        message,
        preferredDate: `${AVAILABLE_DAYS[selectedDayIdx].name}, ${AVAILABLE_DAYS[selectedDayIdx].dateStr}`,
        preferredTime: selectedTimeSlot
      });
      
      // Clear forms
      setFullName('');
      setEmail('');
      setCompany('');
      setMessage('');
    }, 1500);
  };

  return (
    <div id="contact-view" className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen py-16 px-4 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-bold text-[#b80035] uppercase tracking-widest block mb-2">
            Enterprise Consultation
          </span>
          <h1 className="font-display text-4xl font-extrabold text-slate-950">
            Align Your Engineering Loop
          </h1>
          <p className="font-sans text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-3">
            Schedule a scoping session with our principal engineers or request access keys for our proprietary software sandboxes.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submittedRequest ? (
            <motion.div 
              key="contact-form-grid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              
              {/* Left Column: Information and Scheduler Calendar */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Contact metadata cards */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
                  <h4 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Corporate Access Details
                  </h4>
                  
                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-rose-50 text-[#b80035] rounded-xl shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-display text-xs font-bold text-slate-900">Direct Inbound Email</h5>
                      <p className="font-sans text-xs text-slate-500 mt-1">rheartbeat2026@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-rose-50 text-[#b80035] rounded-xl shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-display text-xs font-bold text-slate-900">Headquarters Hub</h5>
                      <p className="font-sans text-xs text-slate-500 mt-1">Stallion Square, Zürich, CH</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-rose-50 text-[#b80035] rounded-xl shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-display text-xs font-bold text-slate-900">Working SLA Window</h5>
                      <p className="font-sans text-xs text-slate-500 mt-1">08:00 - 18:00 CET (Mon - Fri)</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Calendar Scheduler */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h4 className="font-display text-base font-bold text-slate-900 flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                    <Calendar className="w-4 h-4 text-[#e11d48]" />
                    Consultation Availability Scheduler
                  </h4>

                  <p className="font-sans text-xs text-slate-500 leading-normal mb-5">
                    Select a preferred weekday for our scheduled 30-minute scoping call.
                  </p>

                  {/* 1. Select Day Row */}
                  <div className="grid grid-cols-5 gap-1.5 mb-5">
                    {AVAILABLE_DAYS.map((day, idx) => (
                      <button
                        key={day.name}
                        type="button"
                        onClick={() => setSelectedDayIdx(idx)}
                        className={`py-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                          selectedDayIdx === idx
                            ? 'bg-[#e11d48] border-[#e11d48] text-white shadow-md shadow-[#e11d48]/15'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-sans text-[10px] font-bold uppercase block leading-none">
                          {day.label}
                        </span>
                        <span className="font-mono text-[9px] block mt-1 leading-none opacity-80">
                          {day.dateStr.split(' ')[1]}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* 2. Select Time Grid */}
                  <h5 className="font-display text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3">
                    Available CET Hours:
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {INITIAL_TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`py-2.5 rounded-lg border font-mono text-xs text-center transition-all cursor-pointer ${
                          !slot.available
                            ? 'bg-slate-50 text-slate-300 border-slate-100 line-through cursor-not-allowed'
                            : selectedTimeSlot === slot.time
                            ? 'bg-[#020617] text-white border-[#020617] font-bold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {slot.time}
                        {!slot.available && <span className="text-[8px] font-sans block leading-none text-slate-400 mt-0.5">Booked</span>}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Contact form Questionnaire */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-slate-950 mb-2">
                  Technical Scoping Questionnaire
                </h3>
                <p className="font-sans text-xs text-slate-500 mb-6 leading-relaxed">
                  Provide brief operational context. A principal systems architect will review your submission before our scheduled call.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Name and email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs font-bold text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input 
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alex Johnson"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-sans text-slate-800 outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/5 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-bold text-slate-700 mb-1.5">
                        Business Email *
                      </label>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@enterprise.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-sans text-slate-800 outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/5 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company and service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs font-bold text-slate-700 mb-1.5">
                        Company Name *
                      </label>
                      <input 
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Vanguard Solutions"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-sans text-slate-800 outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/5 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-bold text-slate-700 mb-1.5">
                        Core Service Interest
                      </label>
                      <select
                        value={serviceInterest}
                        onChange={(e) => setServiceInterest(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-sans text-slate-800 outline-none focus:border-[#e11d48] transition-all"
                      >
                        <option value="Enterprise Architecture">Enterprise Architecture</option>
                        <option value="Legacy Modernization">Legacy Modernization</option>
                        <option value="Managed Cloud Services">Managed Cloud Services</option>
                        <option value="Acuity AI Sandbox">Acuity AI Sandbox Key</option>
                        <option value="Sentinel Edge Sandbox">Sentinel Edge Sandbox Key</option>
                        <option value="ApexForge Sandbox">ApexForge Developer Suite</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-700 mb-1.5">
                      How can we optimize your ecosystem? *
                    </label>
                    <textarea 
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly state your current technical obstacles, transaction throughputs, or pipeline goals..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-sans text-slate-800 outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/5 transition-all resize-none"
                    />
                  </div>

                  {/* Scheduled block confirmation inside form */}
                  <div className="bg-[#eff4ff] p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                    <span className="font-sans text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#e11d48]" />
                      Selected Time Slot:
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {AVAILABLE_DAYS[selectedDayIdx].name} ({AVAILABLE_DAYS[selectedDayIdx].dateStr}), {selectedTimeSlot} CET
                    </span>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-xs font-sans">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#b80035] hover:bg-[#e11d48] disabled:bg-slate-300 text-white font-sans font-bold text-xs rounded-lg transition-all shadow-md shadow-[#b80035]/10 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Scoping Request...
                      </>
                    ) : (
                      <>
                        Submit &amp; Schedule Consultation
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

            </motion.div>
          ) : (
            /* Submission success Receipt Panel */
            <motion.div 
              key="contact-success-receipt"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-2xl relative text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="font-display text-2xl font-extrabold text-[#0b1c30] mb-2">
                Consultation Request Confirmed!
              </h2>
              <p className="font-sans text-xs text-slate-500 mb-8 leading-relaxed max-w-sm mx-auto">
                A calendar invitation with private Google Meet credentials has been issued to your business email.
              </p>

              {/* Booking receipt parameters */}
              <div className="bg-slate-50 rounded-xl border border-slate-200/60 p-5 text-left space-y-3 mb-8">
                <h4 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200/50 pb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#e11d48]" />
                  Consultation Booking Details
                </h4>

                <div className="flex justify-between text-xs">
                  <span className="font-sans text-slate-400">Client Representative</span>
                  <span className="font-sans text-slate-800 font-bold">{submittedRequest.fullName}</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="font-sans text-slate-400">Organization</span>
                  <span className="font-sans text-slate-800 font-bold">{submittedRequest.company}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="font-sans text-slate-400">Consultation Focus</span>
                  <span className="font-sans text-slate-800 font-bold text-[#b80035]">{submittedRequest.serviceInterest}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="font-sans text-slate-400">Scheduled CET Slot</span>
                  <span className="font-mono text-slate-800 font-bold">
                    {submittedRequest.preferredDate} at {submittedRequest.preferredTime}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSubmittedRequest(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Schedule Another Call
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('home')}
                  className="flex-1 py-3 bg-[#020617] text-white hover:bg-slate-850 font-sans font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
