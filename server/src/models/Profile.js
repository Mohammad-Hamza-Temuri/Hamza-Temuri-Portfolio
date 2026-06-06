import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Muhammad Hamza Temuri' },
    tagline: { type: String, default: 'Full Stack Developer · WordPress · Shopify · MERN' },
    bio: { type: String },
    email: { type: String, default: 'hamzatemuri2001@gmail.com' },
    phone: { type: String, default: '+923368328661' },
    location: { type: String, default: 'Karachi, Pakistan' },
    avatar: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    resume: {
      data: { type: Buffer, select: false },
      contentType: { type: String, default: 'application/pdf' },
      filename: { type: String, default: '' },
      size: { type: Number, default: 0 },
      uploadedAt: { type: Date },
    },
    social: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      twitter: { type: String, default: '' },
      upwork: { type: String, default: '' },
      fiverr: { type: String, default: '' },
      whatsapp: { type: String, default: '+923368328661' },
    },
    stats: {
      yearsExperience: { type: Number, default: 3 },
      projectsCompleted: { type: Number, default: 50 },
      companiesWorked: { type: Number, default: 5 },
      technologiesUsed: { type: Number, default: 20 },
      clientSatisfaction: { type: Number, default: 100 },
    },
    isAvailable: { type: Boolean, default: true },
    availabilityNote: { type: String, default: 'Available for freelance projects' },
    seo: {
      metaTitle: { type: String, default: 'Muhammad Hamza Temuri — Full Stack Developer' },
      metaDescription: {
        type: String,
        default:
          'WordPress & Shopify Developer with 3+ years experience building high-performance websites for international agencies.',
      },
      ogImage: {
        url: { type: String, default: '' },
        publicId: { type: String, default: '' },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
