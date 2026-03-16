import mongoose from 'mongoose';

const IntenfisSchema = new mongoose.Schema({
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
  
  // Intenfis Specific
  influenceArea: { type: String, required: true },
  followersCount: { type: String, required: true },
  platform: { type: String, required: true },
  pastCollaborations: String,
  brandDeals: String,
  contentNiche: String,
  
  // Story
  storyTitle: String,
  storyContent: String,
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

export default mongoose.models.Intenfis || mongoose.model('Intenfis', IntenfisSchema);