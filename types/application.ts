import { ObjectId } from 'mongodb';

export interface BaseApplication {
  _id?: ObjectId;
  applicationType: 'podcast' | 'intenfis';
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  occupation?: string;
  expertise: string[];
  experience?: string;
  reasonForApplying: string;
  whatYouCanOffer: string;
  topicsToDiscuss?: string;
  videoLink?: string;
  imageUrl?: string;
  availability?: string;
  additionalInfo?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

export interface PodcastApplication extends BaseApplication {
  applicationType: 'podcast';
  podcastExperience?: string;
  speakingTopics: string;
}

export interface IntenfisApplication extends BaseApplication {
  applicationType: 'intenfis';
  influenceArea: string;
  followersCount: string;
  platform: string;
  brandDeals?: string;
}

export type Application = PodcastApplication | IntenfisApplication;