"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mic, Users, Globe, Award, Heart, Headphones, Clock, Target, Zap } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AboutPage() {
  const { theme } = useTheme();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { icon: Mic, value: "100+", label: "Episodes" },
    { icon: Users, value: "50K+", label: "Listeners" },
    { icon: Globe, value: "30+", label: "Countries" },
    { icon: Award, value: "12", label: "Awards" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Authentic Stories",
      description: "We share real stories from real people, bringing you authentic experiences and perspectives.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Target,
      title: "Quality Content",
      description: "Every episode is carefully crafted to deliver the highest quality audio and engaging content.",
      color: "from-brand-600 to-brand-800"
    },
    {
      icon: Zap,
      title: "Community First",
      description: "Our listeners are at the heart of everything we do. We build together, learn together.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "manyazewal eshetu Podcast started as a passion project in a small home studio."
    },
    {
      year: "2021",
      title: "First Milestone",
      description: "Reached 10,000 listeners and expanded to weekly episodes."
    },
    {
      year: "2022",
      title: "Award Winning",
      description: "Won 'Best Independent Podcast' at the Digital Media Awards."
    },
    {
      year: "2023",
      title: "Global Reach",
      description: "Expanded to 30+ countries with listeners from around the world."
    },
    {
      year: "2024",
      title: "New Chapter",
      description: "Launched our mobile app and community platform."
    }
  ];

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'} transition-colors duration-300`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-brand-900/20 via-dark-bg to-dark-bg' 
              : 'bg-gradient-to-br from-brand-100 via-light-bg to-light-bg'
          }`}></div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl ${
              theme === 'dark' ? 'bg-brand-800/20' : 'bg-brand-200/40'
            }`}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className={`inline-block px-4 py-2 rounded-full font-semibold text-sm mb-6 ${
              theme === 'dark' 
                ? 'bg-brand-900/30 text-brand-400' 
                : 'bg-brand-100 text-brand-700'
            }`}>
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About <span className="text-brand-700 dark:text-brand-500">manyazewal eshetu</span>
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              We're on a mission to bring you the most inspiring stories and meaningful conversations from around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-brand">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-10 h-10 text-white mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-brand-700 dark:text-brand-500">Mission</span>
              </h2>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                At manyazewal eshetu Podcast, we believe in the power of stories to connect, inspire, and transform. Our mission is to create a platform where diverse voices can be heard and meaningful conversations can flourish.
              </p>
              <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Whether it's exploring technology, sharing personal journeys, or discussing cultural phenomena, we're dedicated to bringing you content that matters.
              </p>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-brand-700 dark:bg-brand-500 rounded-full"></div>
                <div className="w-2 h-2 bg-brand-500/60 rounded-full"></div>
                <div className="w-2 h-2 bg-brand-500/30 rounded-full"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="vercel.svg"
                alt="vercel.svg"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`absolute -bottom-6 -left-6 backdrop-blur-md p-6 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-dark-card/80 border-dark-border'
                    : 'bg-white/80 border-light-border shadow-lg'
                }`}
              >
                <p className="text-brand-700 dark:text-brand-500 font-bold text-lg">"Stories that matter"</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-dark-card' : 'bg-brand-50'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-brand-700 dark:text-brand-500">Values</span>
            </h2>
            <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`relative group cursor-pointer ${
                  theme === 'dark' ? 'bg-dark-bg' : 'bg-white'
                } rounded-2xl p-8 border ${
                  theme === 'dark' ? 'border-dark-border' : 'border-light-border'
                } shadow-lg hover:shadow-xl transition-all overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <value.icon className={`w-12 h-12 text-brand-700 dark:text-brand-500 mb-4 relative z-10`} />
                <h3 className={`text-2xl font-bold mb-3 relative z-10 ${
                  theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                }`}>{value.title}</h3>
                <p className={`relative z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-brand-700 dark:text-brand-500">Journey</span>
            </h2>
            <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              The milestones that shaped who we are today
            </p>
          </motion.div>

          <div className="relative">
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b ${
              theme === 'dark'
                ? 'from-brand-900/20 via-brand-700 to-brand-900/20'
                : 'from-brand-200 via-brand-500 to-brand-200'
            }`}></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="hidden md:block w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-700 dark:bg-brand-500 rounded-full"></div>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-dark-card' : 'bg-white shadow-lg'
                  }`}>
                    <span className="text-brand-700 dark:text-brand-500 font-bold text-lg">{item.year}</span>
                    <h3 className={`text-xl font-bold mt-2 mb-2 ${
                      theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                    }`}>{item.title}</h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}