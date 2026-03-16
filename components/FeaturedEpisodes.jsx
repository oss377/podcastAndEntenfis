"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Clock, Calendar, Youtube, Cloud, Upload, Info, ExternalLink, Eye, Link as LinkIcon, CheckCircle, XCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

const FeaturedEpisodes = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isAmharic = language === 'am';
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoLinks, setVideoLinks] = useState({
    youtube: '',
    google: ''
  });
  const [linkStatus, setLinkStatus] = useState({});

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to get YouTube thumbnail
  const getYouTubeThumbnail = (videoId, quality = 'maxresdefault') => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  const handleVideoLinkChange = (platform, value) => {
    setVideoLinks(prev => ({ ...prev, [platform]: value }));
    const videoId = getYouTubeVideoId(value);
    setLinkStatus(prev => ({ 
      ...prev, 
      [platform]: videoId ? 'valid' : value ? 'invalid' : null 
    }));
  };

  // Episodes with specific YouTube video links
  const episodes = [
    {
      id: 1,
      title: "The Future of Technology",
      host: "Bahiru Abas",
      duration: "45 min",
      date: "Mar 15, 2024",
      videoUrl: "https://youtu.be/bJjMC8EelvI",
      videoId: "bJjMC8EelvI",
      category: "Technology",
      description: "Exploring the latest trends in technology and how they shape our future.",
      views: "45K views",
      likes: "2.3K"
    },
    {
      id: 2,
      title: "Stories of Resilience",
      host: "Sinework Taye",
      duration: "52 min",
      date: "Mar 12, 2024",
      videoUrl: "https://youtu.be/Il0DcbEpZXo",
      videoId: "Il0DcbEpZXo",
      category: "Inspiration",
      description: "Inspiring stories of people who overcame incredible challenges.",
      views: "38K views",
      likes: "1.8K"
    },
    {
      id: 3,
      title: "Creative Minds",
      host: "Yohanis Getnet",
      duration: "38 min",
      date: "Mar 10, 2024",
      videoUrl: "https://youtu.be/tzgPov2Da2Y",
      videoId: "tzgPov2Da2Y",
      category: "Creativity",
      description: "How creative thinking is changing the way we live and work.",
      views: "52K views",
      likes: "3.1K"
    },
    {
      id: 4,
      title: "Innovation in Africa",
      host: "Abele Melaku",
      duration: "48 min",
      date: "Mar 8, 2024",
      videoUrl: "https://youtu.be/e8mcZk9YtT8",
      videoId: "e8mcZk9YtT8",
      category: "Innovation",
      description: "How African innovation is changing the continent and the world.",
      views: "67K views",
      likes: "4.2K"
    },
    {
      id: 5,
      title: "Ethiopian Business",
      host: "Yonas Moh",
      duration: "55 min",
      date: "Mar 5, 2024",
      videoUrl: "https://youtu.be/LmsfesE4TRY",
      videoId: "LmsfesE4TRY",
      category: "Business",
      description: "Exploring the rich Ethiopian business landscape and opportunities.",
      views: "89K views",
      likes: "5.7K"
    },
    {
      id: 6,
      title: "Music Production Tips",
      host: "Asnie Zumbara",
      duration: "42 min",
      date: "Mar 3, 2024",
      videoUrl: "https://youtu.be/BDi-AQ3Cy30",
      videoId: "BDi-AQ3Cy30",
      category: "Music",
      description: "Professional tips and tricks for music production and beat making.",
      views: "33K views",
      likes: "2.1K"
    }
  ];

  const uploadGuides = [
    {
      id: 'youtube',
      title: isAmharic ? 'በYouTube አማካኝነት መጫን' : 'Upload via YouTube',
      description: isAmharic 
        ? 'ቪዲዮዎን በYouTube ላይ ይስቀሉ እና አገናኝ ያጋሩ'
        : 'Upload your video to YouTube and share the link',
      icon: Youtube,
      color: 'text-red-600',
      bgColor: theme === 'dark' ? 'bg-red-600/20' : 'bg-red-100',
      videoUrl: "https://youtu.be/BDi-AQ3Cy30",
      videoId: "BDi-AQ3Cy30",
      duration: "10 min",
      category: "Tutorial",
      description: "Step-by-step guide to upload your videos to YouTube",
      steps: [
        isAmharic ? 'ወደ YouTube ይግቡ' : 'Sign in to YouTube',
        isAmharic ? 'የመጫኛ አዝራሩን ጠቅ ያድርጉ' : 'Click the upload button',
        isAmharic ? 'ቪዲዮዎን ይምረጡ' : 'Select your video',
        isAmharic ? 'ዝርዝሮችን ይሙሉ' : 'Fill in the details',
        isAmharic ? 'አገናኙን ይቅዱ እና ያጋሩ' : 'Copy and share the link'
      ]
    },
    {
      id: 'google',
      title: isAmharic ? 'በGoogle Cloud መጫን' : 'Upload via Google Cloud',
      description: isAmharic 
        ? 'ቪዲዮዎን በGoogle Cloud ላይ ያስቀምጡ እና ይጋሩ'
        : 'Store your video on Google Cloud and share securely',
      icon: Cloud,
      color: 'text-blue-600',
      bgColor: theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100',
      videoUrl: "https://youtu.be/BDi-AQ3Cy30",
      videoId: "BDi-AQ3Cy30",
      duration: "12 min",
      category: "Tutorial",
      description: "Complete guide for Google Cloud video storage",
      steps: [
        isAmharic ? 'ወደ Google Cloud ይግቡ' : 'Sign in to Google Cloud',
        isAmharic ? 'አዲስ ባልዲ ይፍጠሩ' : 'Create a new bucket',
        isAmharic ? 'ፋይሎችን ይስቀሉ' : 'Upload files',
        isAmharic ? 'የማጋራት ፈቃድ ይስጡ' : 'Set sharing permissions',
        isAmharic ? 'አገናኙን ያጋሩ' : 'Share the link'
      ]
    }
  ];

  const handleViewAllEpisodes = () => {
    window.open('https://youtube.com/@manyazewaleshetu', '_blank');
  };

  const handlePlayVideo = (videoId) => {
    setPlayingVideo(videoId);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  const VideoThumbnail = ({ videoId, title, duration, onClick }) => (
    <div 
      className="relative cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <img
          src={getYouTubeThumbnail(videoId)}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = getYouTubeThumbnail(videoId, 'hqdefault');
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
            <Play size={32} className="text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isAmharic ? 'ለማየት ነክክ' : 'Click to play'}
        </div>
        {/* Video duration badge */}
        <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
    </div>
  );

  const GuideCard = ({ guide }) => {
    const Icon = guide.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`rounded-2xl overflow-hidden border ${
          theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border shadow-lg'
        }`}
      >
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-4 rounded-xl ${guide.bgColor}`}>
              <Icon size={32} className={guide.color} />
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                {guide.title}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {guide.description}
              </p>
            </div>
          </div>

          {/* Tutorial Video with Thumbnail */}
          <div className="mb-6">
            <VideoThumbnail
              videoId={guide.videoId}
              title={guide.title}
              duration={guide.duration}
              onClick={() => handlePlayVideo(guide.videoId)}
            />
          </div>

          {/* Video Link Display */}
          <div className={`mb-4 p-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
          }`}>
            <p className={`text-xs flex items-center gap-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <LinkIcon size={12} />
              {isAmharic ? 'የቪዲዮ አገናኝ' : 'Video link'}:
            </p>
            <a 
              href={guide.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm truncate block hover:text-purple-600 transition-colors ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}
            >
              {guide.videoUrl}
            </a>
          </div>

          {/* Guide Information */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-purple-700 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {guide.category}
            </span>
            <span className={`text-xs flex items-center gap-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Clock size={12} /> {guide.duration}
            </span>
          </div>

          {/* Steps */}
          <div className="space-y-3 mt-4">
            <h4 className={`font-semibold flex items-center gap-2 ${
              theme === 'dark' ? 'text-dark-text' : 'text-light-text'
            }`}>
              <Info size={18} />
              {isAmharic ? 'ደረጃዎች' : 'Steps:'}
            </h4>
            <ol className={`list-decimal list-inside space-y-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {guide.steps.map((step, index) => (
                <li key={index} className="text-sm">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Upload Application Guide Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <Upload className="text-purple-600" size={32} />
              <h2 className={`text-4xl md:text-5xl font-bold ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                {isAmharic ? 'የመጫኛ መመሪያ' : 'Upload Guide'}
              </h2>
            </div>
            <p className={`max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {isAmharic
                ? 'ቪዲዮዎን እንዴት መጫን እንደሚችሉ ደረጃ በደረጃ ይማሩ'
                : 'Learn how to upload your videos step by step with our comprehensive guides'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {uploadGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </motion.div>

        {/* Featured Episodes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-dark-text' : 'text-light-text'
          }`}>
            {isAmharic ? 'ተለይተው የተመረጡ ክፍሎች' : (
              <>
                Featured <span className="text-purple-600 dark:text-purple-400">Episodes</span>
              </>
            )}
          </h2>
          <p className={`max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isAmharic
              ? 'በጣም የሚወዱአቸውን ክፍሎች ይገኙ እና ይስሙ።'
              : "Discover our most popular episodes that listeners can't get enough of"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-dark-card border-dark-border hover:shadow-xl hover:shadow-purple-900/20' 
                  : 'bg-white border-light-border shadow-lg hover:shadow-xl hover:shadow-purple-500/20'
              }`}
            >
              {/* Episode Video Thumbnail */}
              <VideoThumbnail
                videoId={episode.videoId}
                title={episode.title}
                duration={episode.duration}
                onClick={() => handlePlayVideo(episode.videoId)}
              />

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors ${
                    theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                  }`}>
                    {episode.title}
                  </h3>
                  <span className="bg-purple-700 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {episode.category}
                  </span>
                </div>
                
                <p className={theme === 'dark' ? 'text-gray-400 mb-2' : 'text-gray-600 mb-2'}>
                  with {episode.host}
                </p>
                
                <p className={`text-sm mb-3 line-clamp-2 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {episode.description}
                </p>

                {/* Video Link Display */}
                <div className={`mb-3 p-2 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-100'
                }`}>
                  <a 
                    href={episode.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs flex items-center gap-1 truncate hover:text-purple-600 transition-colors ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    <LinkIcon size={12} />
                    {episode.videoUrl}
                  </a>
                </div>
                
                <div className={`flex items-center justify-between text-sm ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {episode.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {episode.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{episode.views}</span>
                    <span className="text-xs">•</span>
                    <span className="text-xs">{episode.likes} ❤️</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={handleViewAllEpisodes}
            className={`border-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 group mx-auto ${
              theme === 'dark'
                ? 'border-purple-500 text-purple-300 hover:bg-purple-900 hover:text-white'
                : 'border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white'
            }`}
          >
            {isAmharic ? 'ሁሉንም ክፍሎች በYouTube ይመልከቱ' : 'View All Episodes on YouTube'}
            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
          onClick={handleCloseVideo}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white hover:text-purple-400 transition-colors text-lg flex items-center gap-2"
            >
              <span>{isAmharic ? 'ዝጋ' : 'Close'}</span>
              <XCircle size={20} />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
                title="YouTube video player"
                className="absolute inset-0 w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Video Link in Modal */}
            <div className={`mt-4 p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <p className={`text-sm mb-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {isAmharic ? 'የቪዲዮ አገናኝ' : 'Video link'}:
              </p>
              <a 
                href={`https://youtu.be/${playingVideo}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm break-all hover:text-purple-600 transition-colors ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                https://youtu.be/{playingVideo}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedEpisodes;