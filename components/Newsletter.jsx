"use client";
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const Newsletter = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isAmharic = language === 'am';

  return (
    <section className="py-20 bg-gradient-to-r from-brand-800 to-brand-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Mail className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isAmharic ? 'ከእኛ ጋር ይቆዩ' : 'Stay Updated'}
          </h2>
          <p className="text-white/90 text-lg mb-8">
            {isAmharic
              ? 'ዜናታችንን በኢሜይል በመቀበል ከክፍል አትቆሙ።'
              : 'Subscribe to our newsletter and never miss an episode'}
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder={isAmharic ? 'ኢሜይልዎን ያስገቡ' : 'Enter your email'}
              className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
            />
            <button className="bg-dark-bg text-white px-8 py-4 rounded-full font-semibold hover:bg-black transition-colors duration-300">
              {isAmharic ? 'ለመመዝገብ' : 'Subscribe'}
            </button>
          </form>
          <p className="text-white/70 text-sm mt-4">
            {isAmharic
              ? 'ግላዊነትዎን እናከብራለን። ማቋረጥ በማንኛውም ጊዜ ይችላሉ።'
              : 'We respect your privacy. Unsubscribe at any time.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;