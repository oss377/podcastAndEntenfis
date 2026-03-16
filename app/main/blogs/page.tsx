"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, Clock, Search, Tag, BookOpen, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function BlogsPage() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Inspiration', 'Creativity', 'Interviews', 'News'];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Podcasting: AI and Beyond",
      excerpt: "Explore how artificial intelligence is shaping the future of content creation and podcast production.",
      author: "Sarah Johnson",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      authorImage: "https://images.unsplash.com/photo-1494790108777-233ef743aeed?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 2,
      title: "10 Tips for Better Audio Quality at Home",
      excerpt: "Learn how to produce professional-sounding podcasts from the comfort of your home studio.",
      author: "Michael Chen",
      date: "Mar 12, 2024",
      readTime: "7 min read",
      category: "Creativity",
      image: "https://images.unsplash.com/photo-1590602847861-f3579eaf58f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 3,
      title: "Stories That Changed Our Perspective",
      excerpt: "A collection of listener stories that touched our hearts and changed how we see the world.",
      author: "Emma Davis",
      date: "Mar 10, 2024",
      readTime: "6 min read",
      category: "Inspiration",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      title: "Interview with Award-Winning Producer",
      excerpt: "We sit down with Mark Thompson to discuss his journey in the podcasting industry.",
      author: "Sarah Johnson",
      date: "Mar 8, 2024",
      readTime: "8 min read",
      category: "Interviews",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
      authorImage: "https://images.unsplash.com/photo-1494790108777-233ef743aeed?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 5,
      title: "Podcasting Trends to Watch in 2024",
      excerpt: "From interactive content to community building, here's what's shaping the podcasting landscape.",
      author: "Michael Chen",
      date: "Mar 5, 2024",
      readTime: "4 min read",
      category: "News",
      image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 6,
      title: "Building a Community Around Your Podcast",
      excerpt: "Strategies for engaging with listeners and building a loyal community.",
      author: "Emma Davis",
      date: "Mar 3, 2024",
      readTime: "6 min read",
      category: "Creativity",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'} transition-colors duration-300`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-brand-900/10 via-dark-bg to-dark-bg' 
            : 'bg-gradient-to-br from-brand-100 via-light-bg to-light-bg'
        }`}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
              theme === 'dark' ? 'bg-brand-900/30' : 'bg-brand-100'
            }`}>
              <BookOpen className={`w-4 h-4 ${theme === 'dark' ? 'text-brand-400' : 'text-brand-700'}`} />
              <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-brand-400' : 'text-brand-700'}`}>
                Our Blog
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Insights & <span className="text-brand-700 dark:text-brand-500">Stories</span>
            </h1>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Thoughts, tutorials, and updates from the manyazewal eshetu team
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-dark-card/50 backdrop-blur-md border border-dark-border text-dark-text placeholder-gray-500 focus:border-brand-500'
                    : 'bg-white border border-light-border text-light-text placeholder-gray-400 focus:border-brand-700 shadow-sm'
                }`}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className={`py-8 border-y ${
        theme === 'dark' ? 'border-dark-border' : 'border-light-border'
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-brand-700 dark:bg-brand-600 text-white'
                    : theme === 'dark'
                    ? 'bg-dark-card text-gray-300 hover:bg-dark-hover'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === 'All' && searchTerm === '' && (
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-2">Featured <span className="text-brand-700 dark:text-brand-500">Article</span></h2>
              <div className="w-20 h-1 bg-brand-700 dark:bg-brand-500"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
            >
              <div className={`grid md:grid-cols-2 gap-8 items-center rounded-3xl overflow-hidden border ${
                theme === 'dark'
                  ? 'bg-dark-card border-dark-border'
                  : 'bg-white border-light-border shadow-xl'
              }`}>
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-8">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                    theme === 'dark'
                      ? 'bg-brand-900/30 text-brand-400'
                      : 'bg-brand-100 text-brand-700'
                  }`}>
                    {featuredPost.category}
                  </span>
                  <h3 className={`text-3xl md:text-4xl font-bold mb-4 group-hover:text-brand-700 dark:group-hover:text-brand-500 transition-colors ${
                    theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                  }`}>
                    {featuredPost.title}
                  </h3>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={featuredPost.authorImage}
                      alt={featuredPost.author}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className={`font-semibold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>
                        {featuredPost.author}
                      </p>
                      <div className={`flex items-center gap-3 text-sm ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {featuredPost.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {featuredPost.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/blogs/${featuredPost.id}`}
                    className="inline-flex items-center gap-2 bg-brand-700 dark:bg-brand-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-800 dark:hover:bg-brand-700 transition-colors group/link"
                  >
                    Read Full Article
                    <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`group cursor-pointer rounded-2xl overflow-hidden border ${
                  theme === 'dark'
                    ? 'bg-dark-card border-dark-border hover:border-brand-700/50'
                    : 'bg-white border-light-border hover:border-brand-700/30 shadow-md hover:shadow-xl'
                } transition-all`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    theme === 'dark'
                      ? 'bg-brand-700/90 text-white'
                      : 'bg-brand-600 text-white'
                  }`}>
                    {post.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 group-hover:text-brand-700 dark:group-hover:text-brand-500 transition-colors line-clamp-2 ${
                    theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                  }`}>
                    {post.title}
                  </h3>
                  <p className={`mb-4 text-sm line-clamp-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className={`text-sm font-semibold ${
                        theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                      }`}>{post.author}</p>
                      <div className={`flex items-center gap-2 text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blogs/${post.id}`}
                    className={`inline-flex items-center text-brand-700 dark:text-brand-500 hover:text-brand-800 dark:hover:text-brand-400 font-semibold text-sm group/link`}
                  >
                    Read More 
                    <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Tag className={`w-16 h-16 mx-auto mb-4 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>No posts found</h3>
              <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-brand">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Never Miss an Update</h2>
            <p className="text-white/90 mb-8">
              Subscribe to our newsletter and get the latest articles delivered to your inbox
            </p>
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
              />
              <button className="bg-dark-bg text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition-colors">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}