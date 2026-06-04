import Project from '../models/Project.js';
import Contact from '../models/Contact.js';
import Experience from '../models/Experience.js';
import Testimonial from '../models/Testimonial.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getAnalytics = async (req, res) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      draftProjects,
      totalInquiries,
      unreadInquiries,
      totalExperiences,
      totalTestimonials,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'published' }),
      Project.countDocuments({ status: 'draft' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'unread' }),
      Experience.countDocuments(),
      Testimonial.countDocuments({ isPublished: true }),
    ]);

    const recentInquiries = await Contact.find().sort({ createdAt: -1 }).limit(5);

    return successResponse(res, {
      projects: { total: totalProjects, published: publishedProjects, draft: draftProjects },
      inquiries: { total: totalInquiries, unread: unreadInquiries },
      experiences: totalExperiences,
      testimonials: totalTestimonials,
      recentInquiries,
    });
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
