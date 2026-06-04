import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date },
    credentialId: { type: String },
    credentialUrl: { type: String },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    isPublished: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Certification', certificationSchema);
