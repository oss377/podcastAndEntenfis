"use client";
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`py-12 border-t ${
      theme === 'dark' 
        ? 'bg-dark-card border-dark-border text-dark-text' 
        : 'bg-white border-light-border text-light-text'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              manyazewal eshetu<span className="text-brand-700 dark:text-brand-500">Podcast</span>
            </h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Bringing you the best stories and conversations from around the world.
            </p>
            <div className="flex items-center gap-1 mt-4">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>in Ethiopia</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-brand-700 dark:text-brand-500">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className={`hover:text-brand-700 dark:hover:text-brand-500 transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>About</Link></li>
              <li><Link href="/blogs" className={`hover:text-brand-700 dark:hover:text-brand-500 transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Blogs</Link></li>
              <li><Link href="/contact" className={`hover:text-brand-700 dark:hover:text-brand-500 transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-brand-700 dark:text-brand-500">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className={`hover:text-brand-700 dark:hover:text-brand-500 transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={`hover:text-brand-700 dark:hover:text-brand-500 transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-brand-700 dark:text-brand-500">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className={`hover:text-brand-700 dark:hover:text-brand-500 transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Facebook size={20} />
              </a>
              <a href="#" className={`hover:text-brand-700 dark:hover:text-brand-500 transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Twitter size={20} />
              </a>
              <a href="#" className={`hover:text-brand-700 dark:hover:text-brand-500 transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Instagram size={20} />
              </a>
              <a href="#" className={`hover:text-brand-700 dark:hover:text-brand-500 transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className={`border-t mt-8 pt-8 text-center ${
          theme === 'dark' ? 'border-dark-border text-gray-400' : 'border-light-border text-gray-600'
        }`}>
          <p>&copy; {new Date().getFullYear()} manyazewal eshetu Podcast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;