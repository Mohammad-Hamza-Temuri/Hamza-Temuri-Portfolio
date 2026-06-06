import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: [{ type: String, enum: ['mern', 'wordpress', 'shopify', 'custom', 'saas'] }],
    excerpt: { type: String, maxlength: 200 },
    description: { type: String },
    problem: { type: String },
    solution: { type: String },
    features: [{ type: String }],
    techStack: [{ type: String }],
    projectUrl: { type: String },
    githubUrl: { type: String },
    featuredImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    gallery: [
      {
        url: { type: String },
        publicId: { type: String },
        caption: { type: String },
      },
    ],
    challenges: { type: String },
    results: { type: String },
    isFeatured: { type: Boolean, default: false },
    isCaseStudy: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  },
  { timestamps: true }
);

projectSchema.index({ status: 1, displayOrder: 1 });
projectSchema.index({ slug: 1 });

export default mongoose.model('Project', projectSchema);
