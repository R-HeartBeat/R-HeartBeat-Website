/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from './types';
import Header from './components/Header';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import SolutionsView from './components/SolutionsView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('about'); // Start with 'about' to match mockup default, but let users freely explore!

  // Automatically scroll to the top of the page when the tab is changed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutView setCurrentPage={setCurrentPage} />;
      case 'solutions':
        return <SolutionsView setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactView setCurrentPage={setCurrentPage} />;
      default:
        return <AboutView setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div id="app-root" className="min-h-screen flex flex-col bg-[#f8f9ff] selection:bg-[#e11d48] selection:text-white">
      {/* Navigation Top Header & Bottom mobile bar */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onContactClick={() => setCurrentPage('contact')}
      />

      {/* Main Viewport Container */}
      <main id="main-content" className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Corporate Multi-Column Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
