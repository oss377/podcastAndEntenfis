"use client";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Upload, User, Mail, Phone, Link as LinkIcon, Music, Video, MapPin, Users, Calendar, Clock, Tag, Star, Mic } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

const EntenfisRegistration = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const router = useRouter();
  const isAmharic = language === 'am';
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dateOfBirth: '',
    occupation: '',
    
    // Guest Specific Information
    guestBio: '',
    expertise: '',
    achievements: '',
    socialMediaLinks: '',
    
    // Program Preferences
    programTopic: '',
    programDate: '',
    programTime: '',
    interviewLanguage: '',
    specialRequirements: '',
    
    // Media Links
    introductionVideo: ''
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
      
      console.log('Submitting entenfis form data:', submissionData);
      
      const response = await fetch('/api/entenfis-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();
      console.log('Entenfis response data:', data);

      if (data.success) {
        setSubmitStatus('success');
        
        // Show appropriate message based on email status
        let message = isAmharic 
          ? 'ለእንተንፍስ ፕሮግራም ያቀረቡት ማመልከቻ በተሳካ ሁኔታ ደርሶናል! በቅርቡ እናገናዎታለን።' 
          : 'Your application for Entenfis program has been submitted successfully! We will contact you soon.';
        
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
          dateOfBirth: '',
          occupation: '',
          guestBio: '',
          expertise: '',
          achievements: '',
          socialMediaLinks: '',
          programTopic: '',
          programDate: '',
          programTime: '',
          interviewLanguage: '',
          specialRequirements: '',
          introductionVideo: ''
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
      console.error('Error submitting entenfis form:', error);
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
        
        {/* Header with Program Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Mic size={32} className="text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-dark-text' : 'text-light-text'
          }`}>
            {isAmharic ? 'የእንተንፍስ ፕሮግራም እንግዳ ማመልከቻ' : 'Entenfis Program Guest Application'}
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isAmharic
              ? 'በማንያዘዋል እሸቱ የእንተንፍስ ፕሮግራም ላይ እንግዳ ለመሆን ይመዝገቡ'
              : 'Apply to be a guest on Manyazewal Eshetu Entenfis Program'}
          </p>
        </motion.div>

        {/* Guest Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
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
              <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-3 ${
                theme === 'dark' ? 'text-dark-text border-gray-700' : 'text-light-text border-gray-200'
              }`}>
                <User size={20} className="text-purple-600" />
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

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'የትውልድ ቀን' : 'Date of Birth'} *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        theme === 'dark' 
                          ? 'bg-dark-bg border-dark-border text-dark-text' 
                          : 'bg-gray-50 border-gray-300 text-light-text'
                      }`}
                    />
                  </div>
                </div>

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

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'ሙያ' : 'Occupation'} *
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                    placeholder={isAmharic ? 'ሙያዎን ያስገቡ' : 'Enter your occupation'}
                  />
                </div>

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

            {/* Guest Information */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-3 ${
                theme === 'dark' ? 'text-dark-text border-gray-700' : 'text-light-text border-gray-200'
              }`}>
                <Star size={20} className="text-purple-600" />
                {isAmharic ? 'የእንግዳ መረጃ' : 'Guest Information'}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'ስለ እርስዎ' : 'Biography'} *
                  </label>
                  <textarea
                    name="guestBio"
                    value={formData.guestBio}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                    placeholder={isAmharic ? 'ስለ ራስዎ፣ ልምዶችዎ እና ስኬቶችዎ ይንገሩን' : 'Tell us about yourself, your experiences, and achievements'}
                  />
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'የባለሙያ ዘርፍ' : 'Area of Expertise'} *
                  </label>
                  <input
                    type="text"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                    placeholder={isAmharic ? 'ለምሳሌ፡ ቴክኖሎጂ፣ ስራ ፈጠራ፣ ስነ ጥበብ' : 'e.g., Technology, Entrepreneurship, Arts'}
                  />
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'ዋና ዋና ስኬቶች' : 'Key Achievements'} (Optional)
                  </label>
                  <textarea
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                    placeholder={isAmharic ? 'ዋና ዋና ስኬቶችዎን ያጫውቱን' : 'Share your main achievements'}
                  />
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'ማህበራዊ ሚዲያ አገናኞች' : 'Social Media Links'} (Optional)
                  </label>
                  <input
                    type="url"
                    name="socialMediaLinks"
                    value={formData.socialMediaLinks}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                    placeholder={isAmharic ? 'LinkedIn፣ Twitter፣ Facebook ወዘተ' : 'LinkedIn, Twitter, Facebook, etc.'}
                  />
                </div>
              </div>
            </div>

            {/* Program Preferences */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-3 ${
                theme === 'dark' ? 'text-dark-text border-gray-700' : 'text-light-text border-gray-200'
              }`}>
                <Mic size={20} className="text-purple-600" />
                {isAmharic ? 'የፕሮግራም ምርጫዎች' : 'Program Preferences'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'ማንሳት የሚፈልጉት ርዕስ' : 'Topic You Want to Discuss'} *
                  </label>
                  <input
                    type="text"
                    name="programTopic"
                    value={formData.programTopic}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                    placeholder={isAmharic ? 'በፕሮግራሙ ላይ ማንሳት የሚፈልጉት ርዕስ' : 'What topic would you like to discuss?'}
                  />
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'የሚመርጡት ቀን' : 'Preferred Date'} (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      name="programDate"
                      value={formData.programDate}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        theme === 'dark' 
                          ? 'bg-dark-bg border-dark-border text-dark-text' 
                          : 'bg-gray-50 border-gray-300 text-light-text'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'የሚመርጡት ሰዓት' : 'Preferred Time'} (Optional)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="time"
                      name="programTime"
                      value={formData.programTime}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        theme === 'dark' 
                          ? 'bg-dark-bg border-dark-border text-dark-text' 
                          : 'bg-gray-50 border-gray-300 text-light-text'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'የቃለ መጠይቅ ቋንቋ' : 'Interview Language'} *
                  </label>
                  <select
                    name="interviewLanguage"
                    value={formData.interviewLanguage}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                  >
                    <option value="">{isAmharic ? 'ይምረጡ' : 'Select'}</option>
                    <option value="amharic">{isAmharic ? 'አማርኛ' : 'Amharic'}</option>
                    <option value="english">{isAmharic ? 'እንግሊዝኛ' : 'English'}</option>
                    <option value="both">{isAmharic ? 'ሁለቱም' : 'Both'}</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {isAmharic ? 'ልዩ ፍላጎቶች' : 'Special Requirements'} (Optional)
                  </label>
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    rows="2"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                    placeholder={isAmharic ? 'ማንኛውም ልዩ ፍላጎቶች ካሉዎት' : 'Any special requirements you may have'}
                  />
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

            {/* Media Links - Only Introduction Video */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-3 ${
                theme === 'dark' ? 'text-dark-text border-gray-700' : 'text-light-text border-gray-200'
              }`}>
                <Video size={20} className="text-purple-600" />
                {isAmharic ? 'የመግቢያ ቪዲዮ' : 'Introduction Video'}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Video size={16} />
                      {isAmharic ? 'የመግቢያ ቪዲዮ አገናኝ' : 'Introduction Video Link'} *
                    </div>
                  </label>
                  <input
                    type="url"
                    name="introductionVideo"
                    value={formData.introductionVideo}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-dark-bg border-dark-border text-dark-text' 
                        : 'bg-gray-50 border-gray-300 text-light-text'
                    }`}
                    placeholder={isAmharic ? 'ስለ ራስዎ የሚገልጽ ቪዲዮ አገናኝ' : 'Link to a video introducing yourself'}
                  />
                </div>
                
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {isAmharic 
                    ? '* የመግቢያ ቪዲዮ ማስገባት ግዴታ ነው'
                    : '* Introduction video is required'}
                </p>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="mb-6">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {isAmharic 
                    ? 'የሰጠሁት መረጃ ትክክል መሆኑን እና በፕሮግራሙ ላይ ለመሳተፍ ፈቃደኛ መሆኔን አረጋግጣለሁ'
                    : 'I confirm that the information provided is accurate and I am willing to participate in the program'}
                </span>
              </label>
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
                : (isAmharic ? 'ማመልከቻ ያስገቡ' : 'Submit Application')}
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

            <p className={`text-center mt-4 text-sm ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {isAmharic 
                ? 'ማመልከቻዎ ከተመዘገበ በኋላ በቅርቡ እናገናዎታለን'
                : 'We will contact you soon after reviewing your application'}
            </p>
          </motion.form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            {isAmharic 
              ? 'ጥያቄ ካለዎት በኢሜይል ያግኙን፡ entenfis@manyazewal.com'
              : 'For any questions, contact us at: entenfis@manyazewal.com'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EntenfisRegistration;