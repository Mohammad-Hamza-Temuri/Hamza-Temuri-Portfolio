import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    location: { type: String, required: true },
    position: { type: String, required: true },
    type: { type: String, enum: ['remote', 'hybrid', 'onsite'], default: 'onsite' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    responsibilities: [{ type: String }],
    achievements: [{ type: String }],
    companyUrl: { type: String },
    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

experienceSchema.index({ isPublished: 1, displayOrder: 1, startDate: -1 });

export default mongoose.model('Experience', experienceSchema);
