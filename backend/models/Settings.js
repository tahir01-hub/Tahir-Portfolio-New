import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Portfolio'
  },
  siteTitle: {
    type: String,
    default: 'My Portfolio'
  },
  siteDescription: {
    type: String,
    default: 'Professional Portfolio Website'
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    facebook: String,
    behance: String,
    dribbble: String
  },
  seo: {
    metaKeywords: String,
    metaDescription: String,
    ogImage: String
  }
}, {
  timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
