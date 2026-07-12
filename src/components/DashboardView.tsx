import React, { useEffect, useMemo, useState } from 'react';
import { RegistrationRequest, PageId } from '../types';
import { Table, RefreshCw, Database, Search, Filter, Send } from 'lucide-react';

interface DashboardViewProps {
  setCurrentPage: (page: PageId) => void;
}

export default function DashboardView({ setCurrentPage }: DashboardViewProps) {
  const [registrations, setRegistrations] = useState<RegistrationRequest[]>([]);
  const [filterText, setFilterText] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState('');
  const [error, setError] = useState('');

  const loadRegistrations = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/registrations');
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || 'Unable to load registrations.');
      }
      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unable to load registration records.');
    } finally {
      setIsLoading(false);
    }
  };

  const testEmail = async () => {
    setIsTestingEmail(true);
    setTestEmailStatus('Sending test email...');

    try {
      const response = await fetch('/api/test-email');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Test email failed.');
      }
      setTestEmailStatus('Test email sent successfully. Check your inbox.');
    } catch (err) {
      console.error(err);
      setTestEmailStatus(err instanceof Error ? err.message : 'Unable to send test email.');
    } finally {
      setIsTestingEmail(false);
      setTimeout(() => setTestEmailStatus(''), 7000);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const serviceOptions = useMemo(() => {
    const uniqueServices = Array.from(new Set(registrations.map((item) => item.serviceInterest)));
    return ['All', ...uniqueServices];
  }, [registrations]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((registration) => {
      const matchesService = serviceFilter === 'All' || registration.serviceInterest === serviceFilter;
      const matchesSearch = [
        registration.fullName,
        registration.email,
        registration.company,
        registration.serviceInterest,
        registration.message,
      ].some((field) => field.toLowerCase().includes(filterText.toLowerCase()));

      return matchesService && matchesSearch;
    });
  }, [registrations, filterText, serviceFilter]);

  return (
    <div id="dashboard-view" className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen py-16 px-4 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <span className="font-mono text-xs font-bold text-[#b80035] uppercase tracking-widest block mb-2">
              CRM Dashboard
            </span>
            <h1 className="font-display text-4xl font-extrabold text-slate-950">
              Registration Records
            </h1>
            <p className="font-sans text-sm text-slate-500 mt-3 max-w-2xl">
              View all registration submissions stored by the CRM backend. This dashboard fetches the latest records from the server and displays them in a searchable-ready table.
            </p>
          </div>

          <button
            type="button"
            onClick={loadRegistrations}
            className="inline-flex items-center gap-2 rounded-full bg-[#020617] text-white px-4 py-3 text-xs font-bold shadow-lg shadow-[#020617]/20 transition hover:bg-slate-900"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Records
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto] mb-10 items-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-slate-700 mb-3">
              <Database className="w-5 h-5 text-[#e11d48]" />
              <span className="font-display text-sm font-bold">Total Registrations</span>
            </div>
            <p className="text-4xl font-extrabold text-slate-950">{registrations.length}</p>
            <p className="mt-2 text-xs text-slate-500">Latest records are displayed below.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 border border-slate-200 rounded-full px-3 py-2 text-slate-600 bg-slate-50">
                <Search className="w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Search registrations..."
                  className="bg-transparent text-sm outline-none w-full"
                />
              </div>
              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-slate-500" />
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                >
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
          <button
            type="button"
            onClick={testEmail}
            disabled={isTestingEmail}
            className="inline-flex items-center gap-2 rounded-full bg-[#b80035] text-white px-4 py-3 text-xs font-bold shadow-lg shadow-[#b80035]/20 transition hover:bg-[#e11d48] disabled:opacity-60"
          >
            <Send className="w-4 h-4" />
            {isTestingEmail ? 'Sending Test Email...' : 'Send Test Email'}
          </button>
          {testEmailStatus && (
            <p className="text-sm text-slate-600">{testEmailStatus}</p>
          )}
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-xs font-sans text-slate-700">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Company</th>
                <th className="px-4 py-4">Service Interest</th>
                <th className="px-4 py-4">Preferred Slot</th>
                <th className="px-4 py-4">Message</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                    Loading registration records...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-red-600">
                    {error}
                  </td>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                    No registrations match the current search or filter.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 align-top text-[11px] text-slate-500 font-medium">{new Date(registration.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-4 align-top font-semibold text-slate-900">{registration.fullName}</td>
                    <td className="px-4 py-4 align-top text-slate-600">{registration.email}</td>
                    <td className="px-4 py-4 align-top text-slate-600">{registration.company}</td>
                    <td className="px-4 py-4 align-top text-slate-600">{registration.serviceInterest}</td>
                    <td className="px-4 py-4 align-top text-slate-600">{registration.preferredDate} · {registration.preferredTime}</td>
                    <td className="px-4 py-4 align-top text-slate-600 max-w-xl break-words">{registration.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
