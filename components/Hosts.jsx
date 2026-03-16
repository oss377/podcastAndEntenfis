"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const Hosts = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isAmharic = language === 'am';

  const hosts = [
    {
      name: "Sarah Johnson",
      role: "Host & Producer",
      bio: "Award-winning journalist with a passion for storytelling.",
      image: "https://images.unsplash.com/photo-1494790108777-233ef743aeed?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      social: { twitter: "#", linkedin: "#", instagram: "#" }
    },
    {
      name: "Michael Chen",
      role: "Co-Host & Editor",
      bio: "Tech enthusiast and creative storyteller.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      social: { twitter: "#", linkedin: "#", instagram: "#" }
    },
    {
      name: "Emma Davis",
      role: "Guest Host",
      bio: "Cultural critic and author of 'Modern Voices'.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      social: { twitter: "#", linkedin: "#", instagram: "#" }
    }
  ];

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-dark-card' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 md:px-6">
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
            {isAmharic ? (
              <>
                የፖድካስቱን <span className="text-brand-900 dark:text-brand-400">እንባቂዎች</span> ይውቁ
              </>
            ) : (
              <>
                Meet Your <span className="text-brand-900 dark:text-brand-400">Hosts</span>
              </>
            )}
          </h2>
          <p className={`max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isAmharic
              ? 'እውነተኛ ታሪኮችን እና አስደናቂ ውይይቶችን ወደ እርስዎ የሚያመጡ ድምጾች ናቸው።'
              : 'The voices behind the microphone bringing you amazing content'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {hosts.map((host, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <div className="relative mb-6 inline-block">
                <Image
                  src={host.image}
                  alt={host.name}
                  width={200}
                  height={200}
                  className="rounded-full w-48 h-48 object-cover border-4 border-brand-800"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-1 rounded-full border-2 border-brand-700/40"
                />
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>{host.name}</h3>
              <p className="text-brand-700 dark:text-brand-400 mb-3">{host.role}</p>
              <p className={`mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>{host.bio}</p>
              <div className="flex justify-center gap-4">
                <a href={host.social.twitter} className={`transition-colors ${
                  theme === 'dark' ? 'text-gray-400 hover:text-brand-400' : 'text-gray-600 hover:text-brand-800'
                }`}>
                  <Twitter size={20} />
                </a>
                <a href={host.social.linkedin} className={`transition-colors ${
                  theme === 'dark' ? 'text-gray-400 hover:text-brand-400' : 'text-gray-600 hover:text-brand-800'
                }`}>
                  <Linkedin size={20} />
                </a>
                <a href={host.social.instagram} className={`transition-colors ${
                  theme === 'dark' ? 'text-gray-400 hover:text-brand-400' : 'text-gray-600 hover:text-brand-800'
                }`}>
                  <Instagram size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hosts;