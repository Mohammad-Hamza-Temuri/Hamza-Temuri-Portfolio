import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'database', 'cms', 'ecommerce', 'tools'],
      required: true,
    },
    icon: { type: String, default: '' },
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
    displayOrder: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
