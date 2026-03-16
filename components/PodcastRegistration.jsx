"use client";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Upload, User, Mail, Phone, Link as LinkIcon, Music, Video, MapPin, Users } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

const PodcastRegistration = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const router = useRouter();
  const isAmharic = language === 'am';
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    videoLink: '',
    audioLink: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Add language to form data
      const submissionData = {
        ...formData,
        language: language // 'en' or 'am'
      };
      
      console.log('Submitting podcast form data:', submissionData);
      
      const response = await fetch('/api/podcast-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();
      console.log('Podcast response data:', data);

      if (data.success) {
        setSubmitStatus('success');
        
        // Show appropriate message based on email status
        let message = isAmharic 
          ? 'መረጃዎ በተሳካ ሁኔታ ተመዝግቧል!' 
          : 'Your information has been registered successfully!';
        
        if (data.emailSent) {
          message += isAmharic 
            ? ' የማረጋገጫ ኢሜይል ተልኳል። እባክዎ የኢሜይል መልዕክት ሳጥንዎን ይመልከቱ።' 
            : ' A confirmation email has been sent. Please check your inbox.';
        } else {
          message += isAmharic 
            ? ' ነገር ግን የማረጋገጫ ኢሜይል መላክ አልተቻለም። በቅርቡ እናገናዎታለን።' 
            : ' But the confirmation email could not be sent. We will contact you soon.';
        }
        
        alert(message);
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          gender: '',
          videoLink: '',
          audioLink: ''
        });
        
        // Optional: Redirect after successful submission
        // setTimeout(() => router.push('/'), 3000);
      } else if (data.alreadyRegistered) {
        // Handle duplicate registration
        setSubmitStatus('error');
        alert(isAmharic 
          ? 'ይቅርታ፣ አስቀድመው ተመዝግበዋል! እባክዎ የኢሜይል መልዕክት ሳጥንዎን ይመልከቱ።' 
          : 'Sorry, you have already registered! Please check your email inbox for confirmation.');
      } else {
        setSubmitStatus('error');
        alert(data.message || (isAmharic ? 'እባክዎ እንደገና ይሞክሩ' : 'Please try again'));
      }
    } catch (error) {
      console.error('Error submitting podcast form:', error);
      setSubmitStatus('error');
      alert(isAmharic ? 'ስህተት ተከስቷል: ' + error.message : 'An error occurred: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeeGuide = () => {
    router.push('/#featured-episodes');
  };

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Podcast Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="text-center mb-10">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-dark-text' : 'text-light-text'
            }`}>
              {isAmharic ? 'ለፖድካስት ይመዝገቡ' : 'Register for Podcast'}
            </h2>
            <p className={`max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {isAmharic
                ? 'የግል መረጃዎን ይሙሉ እና ቪዲዮ/ኦዲዮ አገናኝዎን ያስገቡ'
                : 'Fill in your personal information and submit your video/audio link'}
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className={`rounded-2xl p-8 border ${
              theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border shadow-xl'
            }`}
          >
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                <User size={20} />
                {isAmharic ? 'የግል መረጃ' : 'Personal Information'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'ሙሉ ስም' : 'Full Name'} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        theme === 'dark' 
                          ? 'bg-dark-bg border-dark-border text-dark-text' 
                          : 'bg-gray-50 border-gray-300 text-light-text'
                      }`}
                      placeholder={isAmharic ? 'ስምዎን ያስገቡ' : 'Enter your full name'}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'ኢሜይል' : 'Email'} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        theme === 'dark' 
                          ? 'bg-dark-bg border-dark-border text-dark-text' 
                          : 'bg-gray-50 border-gray-300 text-light-text'
                      }`}
                      placeholder={isAmharic ? 'ኢሜይልዎን ያስገቡ' : 'Enter your email'}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'ስልክ ቁጥር' : 'Phone Number'} *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        theme === 'dark' 
                          ? 'bg-dark-bg border-dark-border text-dark-text' 
                          : 'bg-gray-50 border-gray-300 text-light-text'
                      }`}
                      placeholder={isAmharic ? 'ስልክ ቁጥርዎን ያስገቡ' : 'Enter your phone number'}
                    />
                  </div>
                </div>

                {/* Gender Selection */}
                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'ጾታ' : 'Gender'} *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none ${
                        theme === 'dark' 
                          ? 'bg-dark-bg border-dark-border text-dark-text' 
                          : 'bg-gray-50 border-gray-300 text-light-text'
                      }`}
                    >
                      <option value="">{isAmharic ? 'ጾታ ይምረጡ' : 'Select gender'}</option>
                      <option value="male">{isAmharic ? 'ወንድ' : 'Male'}</option>
                      <option value="female">{isAmharic ? 'ሴት' : 'Female'}</option>
                    </select>
                  </div>
                </div>

                {/* Address - Full Width */}
                <div className="md:col-span-2">
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'አድራሻ' : 'Address'} *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        theme === 'dark' 
                          ? 'bg-dark-bg border-dark-border text-dark-text' 
                          : 'bg-gray-50 border-gray-300 text-light-text'
                      }`}
                      placeholder={isAmharic ? 'አድራሻዎን ያስገቡ' : 'Enter your full address'}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* See Guide Button - Redirects to Home Page */}
            <div className="mb-8">
              <button
                type="button"
                onClick={handleSeeGuide}
                className={`w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed transition-colors hover:bg-opacity-10 ${
                  theme === 'dark'
                    ? 'border-purple-500 text-purple-400 hover:bg-purple-900/20'
                    : 'border-purple-900 text-purple-900 hover:bg-purple-100'
                }`}
              >
                <Video size={20} />
                {isAmharic ? 'የመጫኛ መመሪያ ለማየት ወደ መነሻ ገጽ ይሂዱ' : 'Go to Home Page to See Upload Guide'}
              </button>
            </div>

            {/* Video/Audio Links */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                <LinkIcon size={20} />
                {isAmharic ? 'የቪዲዮ/ኦዲዮ አገናኝ' : 'Video/Audio Link'}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Video size={16} />
                      {isAmharic ? 'የቪዲዮ አገናኝ' : 'Video Link'} *
                    </div>
                  </label>
                  <input
                    type="url"
                    name="videoLink"
                    value={formData.videoLink}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                    placeholder={isAmharic ? 'የቪዲዮ አገናኝ ያስገቡ' : 'Enter video link (YouTube, Google Cloud, etc.)'}
                  />
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Music size={16} />
                      {isAmharic ? 'የኦዲዮ አገናኝ' : 'Audio Link'}
                    </div>
                  </label>
                  <input
                    type="url"
                    name="audioLink"
                    value={formData.audioLink}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                    placeholder={isAmharic ? 'የኦዲዮ አገናኝ ያስገቡ (አማራጭ)' : 'Enter audio link (optional)'}
                  />
                </div>
                
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {isAmharic 
                    ? '* ቪዲዮ ማስገባት ግዴታ ነው። ኦዲዮ አማራጭ ነው።'
                    : '* Video link is required. Audio link is optional.'}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Upload size={20} />
              {isSubmitting 
                ? (isAmharic ? 'በመመዝገብ ላይ...' : 'Submitting...') 
                : (isAmharic ? 'መረጃ ይመዝገቡ' : 'Register Information')}
            </button>

            {submitStatus === 'success' && (
              <p className={`text-center mt-4 text-sm text-green-600 dark:text-green-400`}>
                {isAmharic ? 'በተሳካ ሁኔታ ተመዝግቧል!' : 'Successfully registered!'}
              </p>
            )}
            
            {submitStatus === 'error' && (
              <p className={`text-center mt-4 text-sm text-red-600 dark:text-red-400`}>
                {isAmharic ? 'ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ።' : 'An error occurred. Please try again.'}
              </p>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default PodcastRegistration;