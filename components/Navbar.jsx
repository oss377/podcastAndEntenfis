"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mic, Users, Youtube } from 'lucide-react';
import ThemeToggle from '@/context/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import LanguageToggle from '@/context/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showApplyMenu, setShowApplyMenu] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close apply menu when clicking outside
    const handleClickOutside = (e) => {
      if (!e.target.closest('.apply-menu-container')) {
        setShowApplyMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isAmharic = language === 'am';

  const navItems = [
    { nameEn: 'Home', nameAm: 'መነሻ', href: '/' },
    { nameEn: 'Contact', nameAm: 'አግኙን', href: '/main/contact' },
  ];

  const handleApplyClick = (e) => {
    e.preventDefault();
    setShowApplyMenu(!showApplyMenu);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? theme === 'dark' 
            ? 'bg-dark-card/80 backdrop-blur-md py-4 border-b border-dark-border' 
            : 'bg-white/80 backdrop-blur-md py-4 shadow-lg border-b border-light-border'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            manyazewal eshetu<span className="text-purple-700 dark:text-purple-500">Podcast</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-purple-700 dark:hover:text-purple-500 transition-colors duration-300 font-medium ${
                  theme === 'dark' ? 'text-dark-text/90' : 'text-light-text/80'
                }`}
              >
                {isAmharic ? item.nameAm : item.nameEn}
              </Link>
            ))}
            
            {/* Apply with Dropdown */}
            <div className="relative apply-menu-container">
              <button
                onClick={handleApplyClick}
                className="bg-purple-700 dark:bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-800 dark:hover:bg-purple-700 transition-colors duration-300 font-medium flex items-center gap-2"
              >
                {isAmharic ? 'አመልክት' : 'Apply'}
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${showApplyMenu ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Apply Dropdown Menu */}
              <AnimatePresence>
                {showApplyMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-72 rounded-2xl overflow-hidden shadow-2xl border ${
                      theme === 'dark' 
                        ? 'bg-dark-card border-dark-border' 
                        : 'bg-white border-light-border'
                    }`}
                  >
                    {/* Header */}
                    <div className={`p-4 border-b ${
                      theme === 'dark' ? 'border-dark-border' : 'border-light-border'
                    }`}>
                      <h3 className={`font-bold text-lg ${
                        theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                      }`}>
                        {isAmharic ? 'የማመልከቻ አይነት ይምረጡ' : 'Select Application Type'}
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {isAmharic ? 'የትኛውን ፕሮግራም መቀላቀል ይፈልጋሉ?' : 'Which program would you like to join?'}
                      </p>
                    </div>

                    {/* Apply Options */}
                    <div className="p-3 space-y-2">
                      {/* Podcast Apply */}
                      <Link
                        href="/podcast"
                        onClick={() => setShowApplyMenu(false)}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                          theme === 'dark'
                            ? 'hover:bg-purple-900/30'
                            : 'hover:bg-purple-100'
                        }`}
                      >
                        <div className={`p-3 rounded-xl ${
                          theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-200'
                        } group-hover:scale-110 transition-transform duration-300`}>
                          <Mic size={24} className="text-purple-700 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold ${
                            theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                          }`}>
                            {isAmharic ? 'ፖድካስት' : 'Podcast'}
                          </h4>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {isAmharic ? 'እንደ እንግዳ ይሳተፉ' : 'Participate as a guest'}
                          </p>
                        </div>
                        <div className={`text-purple-700 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity`}>
                          →
                        </div>
                      </Link>

                      {/* Entenfis Apply */}
                      <Link
                        href="/Entenfis"
                        onClick={() => setShowApplyMenu(false)}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                          theme === 'dark'
                            ? 'hover:bg-purple-900/30'
                            : 'hover:bg-purple-100'
                        }`}
                      >
                        <div className={`p-3 rounded-xl ${
                          theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-200'
                        } group-hover:scale-110 transition-transform duration-300`}>
                          <Users size={24} className="text-purple-700 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold ${
                            theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                          }`}>
                            {isAmharic ? 'እንጥፍስ' : 'Entenfis'}
                          </h4>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {isAmharic ? 'ልዩ ዝግጅት ይመዝገቡ' : 'Register special event'}
                          </p>
                        </div>
                        <div className={`text-purple-700 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity`}>
                          →
                        </div>
                      </Link>
                    </div>

                    {/* YouTube Link */}
                    <div className={`p-4 border-t ${
                      theme === 'dark' ? 'border-dark-border' : 'border-light-border'
                    }`}>
                      <a
                        href="https://youtube.com/@manyazewaleshetu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400'
                            : 'bg-red-100 hover:bg-red-200 text-red-700'
                        }`}
                      >
                        <Youtube size={20} />
                        <span className="font-medium">
                          {isAmharic ? 'የYouTube ቻናላችንን ይጎብኙ' : 'Visit Our YouTube Channel'}
                        </span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center space-x-4 ml-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-3 space-y-3">
            {navItems.map((item) => (
              <Link 
                key={item.nameEn}
                href={item.href}
                className={`block hover:text-purple-700 dark:hover:text-purple-500 transition-colors duration-300 py-2 ${
                  theme === 'dark' ? 'text-dark-text/90' : 'text-light-text/80'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {isAmharic ? item.nameAm : item.nameEn}
              </Link>
            ))}
            
            {/* Mobile Apply Options */}
            <div className="pt-4 space-y-3">
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-dark-card/50 border-dark-border' : 'bg-purple-50 border-purple-200'
              }`}>
                <h3 className={`font-bold mb-3 ${
                  theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                }`}>
                  {isAmharic ? 'የማመልከቻ አይነት ይምረጡ' : 'Select Application Type'}
                </h3>
                
                <Link
                  href="/podcast"
                  className={`flex items-center gap-3 p-3 rounded-xl mb-2 transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-purple-900/30'
                      : 'hover:bg-purple-200'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Mic size={20} className="text-purple-700 dark:text-purple-400" />
                  <span className="font-medium">
                    {isAmharic ? 'ፖድካስት' : 'Podcast'}
                  </span>
                </Link>

                <Link
                  href="/Entenfis"
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-purple-900/30'
                      : 'hover:bg-purple-200'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Users size={20} className="text-purple-700 dark:text-purple-400" />
                  <span className="font-medium">
                    {isAmharic ? 'እንተንፍስ' : 'Entenfis'}
                  </span>
                </Link>
              </div>

              <a
                href="https://youtube.com/@manyazewaleshetu"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-colors ${
                  theme === 'dark'
                    ? 'bg-red-600/20 text-red-400'
                    : 'bg-red-100 text-red-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Youtube size={20} />
                <span>{isAmharic ? 'YouTube ቻናል' : 'YouTube Channel'}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;