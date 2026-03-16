"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mic, Headphones, Youtube } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

const HeroSection = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [isImageHovered, setIsImageHovered] = useState(false);
  const isAmharic = language === 'am';

  const copy = {
    titleHighlight: isAmharic ? 'ታሪኮች በሕይወት የሚመሰጡበት' : 'Come Alive',
    badge: isAmharic ? '🎙️ እንኳን በሰላም መጡ ወደ manyazewal eshetu Podcast' : '🎙️ Welcome to manyazewal eshetu Podcast',
    description: isAmharic
      ? 'ህይወታዊ ውይይቶችን፣ ተነሳሽ ታሪኮችን እና ልብዎን የሚነኩ ውይይቶችን ይሰሙ።'
      : 'Dive into captivating conversations, inspiring stories, and thought-provoking discussions that matter.',
    applyPodcast: isAmharic ? 'ለፖድካስት ያመልክቱ' : 'Apply for Podcast',
    applyEntenfis: isAmharic ? 'ለየእንተንፍ ስያመልክቱ' : 'Apply for Entenfis',
    visitAccount: isAmharic ? 'አካውንታችንን ጎብኙ' : 'Visit Our Account',
    watchYoutube: isAmharic ? 'በYouTube ይመልከቱ' : 'Watch on YouTube',
    statsEpisodes: isAmharic ? 'ክፍልዎች' : 'Episodes',
    statsListeners: isAmharic ? 'ሰሚዎች' : 'Listeners',
    statsRating: isAmharic ? 'ደረጃ' : 'Rating',
  };

  const handlePodcastClick = () => {
    router.push('/podcast');
  };

  const handleEntenfisClick = () => {
    router.push('/Entenfis');
  };

  const handleVisitAccount = () => {
    window.open('https://youtube.com/@manyazewaleshetu', '_blank');
  };

  const handleYoutubeClick = () => {
    window.open('https://youtube.com/@manyazewaleshetu', '_blank');
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-black to-purple-900/40' 
        : 'bg-gradient-to-br from-gray-100 via-white to-purple-100'
    }`}>
      {/* Simple Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className={`absolute inset-0 bg-[url('/grid.svg')] opacity-20 ${theme === 'dark' ? 'invert' : ''}`}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={theme === 'dark' ? 'text-dark-text' : 'text-light-text'}>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-purple-900/10 rounded-full text-purple-700 dark:text-purple-300 font-semibold text-sm">
                {copy.badge}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {isAmharic ? 'በዚህ የፖድካስት መድረክ' : 'Where Stories'}
              <span className="block text-purple-600 dark:text-purple-400">
                {copy.titleHighlight}
              </span>
            </h1>
            
            <p className={`text-lg mb-8 max-w-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {copy.description}
            </p>
            
            {/* Application Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                onClick={handlePodcastClick}
                className="bg-purple-700 dark:bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-800 dark:hover:bg-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/30"
              >
                <Mic size={20} />
                {copy.applyPodcast}
              </button>
              
              <button 
                onClick={handleEntenfisClick}
                className="bg-purple-700 dark:bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-800 dark:hover:bg-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/30"
              >
                <Headphones size={20} />
                {copy.applyEntenfis}
              </button>
            </div>

            {/* Visit Account Button */}
            <button 
              onClick={handleVisitAccount}
              className={`border-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 mb-12 ${
                theme === 'dark'
                  ? 'border-white/30 text-white hover:border-purple-400 hover:text-purple-400'
                  : 'border-gray-300 text-gray-700 hover:border-purple-900 hover:text-purple-900'
              }`}>
              {copy.visitAccount}
            </button>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold text-purple-900 dark:text-purple-400">1.1K+</div>
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  {copy.statsEpisodes}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-900 dark:text-purple-400">600K+</div>
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  {copy.statsListeners}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-900 dark:text-purple-400">4.99</div>
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  {copy.statsRating}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image with YouTube Button on Hover */}
          <div 
            className="relative"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/podcastimage.png"
                alt="Podcast"
                width={600}
                height={400}
                className="w-full h-auto transition-transform duration-500 hover:scale-105"
              />
              
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent transition-opacity duration-300 ${
                isImageHovered ? 'opacity-100' : 'opacity-0'
              }`} />
              
              {/* YouTube Button */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isImageHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}>
                <button
                  onClick={handleYoutubeClick}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-2xl transform hover:scale-110"
                >
                  <Youtube size={24} />
                  {copy.watchYoutube}
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-full blur-3xl -z-10 ${
              theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-300/30'
            }`} />
            <div className={`absolute -top-4 -left-4 w-32 h-32 rounded-full blur-3xl -z-10 ${
              theme === 'dark' ? 'bg-purple-800/30' : 'bg-purple-200/30'
            }`} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          theme === 'dark' ? 'border-white/30' : 'border-gray-400'
        }`}>
          <div className="w-1 h-3 bg-purple-500 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;