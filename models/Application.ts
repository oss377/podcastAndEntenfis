import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // Common fields
  applicationType: {
    type: String,
    enum: ['podcast', 'intenfis'],
    required: true
  },
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
  
  // Story
  storyTitle: String,
  storyContent: String,
  storyHighlights: String,
  
  // Podcast specific fields
  podcastTitle: String,
  podcastDescription: String,
  
  // Intenfis specific fields
  influenceArea: String,
  followersCount: String,
  platform: String,
  pastCollaborations: String,
  
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

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);