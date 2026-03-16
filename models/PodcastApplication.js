import mongoose from 'mongoose';

const PodcastSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: Date,
  country: String,
  city: String,
  occupation: String,
  expertise: [String],
  experience: String,
  
  // Social Media
  website: String,
  youtube: String,
  linkedin: String,
  twitter: String,
  instagram: String,
  
  // Media
  imageUrl: String,
  videoUrl: String,
  videoLink: String,
  
  // Podcast Details
  podcastTitle: { type: String, required: true },
  podcastDescription: { type: String, required: true },
  targetAudience: String,
  previousExperience: String,
  
  // Story
  storyTitle: { type: String, required: true },
  storyContent: { type: String, required: true },
  storyHighlights: String,
  
  // Additional
  availability: String,
  equipment: String,
  references: String,
  
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Podcast || mongoose.model('Podcast', PodcastSchema);