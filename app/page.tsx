"use client";
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedEpisodes from '@/components/FeaturedEpisodes';
import Hosts from '@/components/Hosts';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();

  return (
    <main
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'
      }`}
    >
      <Navbar />
      <HeroSection />
      <FeaturedEpisodes />
      
    </main>
  );
}