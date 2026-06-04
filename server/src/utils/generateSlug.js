import slugify from 'slugify';
import Project from '../models/Project.js';

export const generateSlug = async (title, existingId = null) => {
  let slug = slugify(title, { lower: true, strict: true });
  let exists = await Project.findOne({ slug, _id: { $ne: existingId } });
  let counter = 1;
  while (exists) {
    slug = `${slugify(title, { lower: true, strict: true })}-${counter}`;
    exists = await Project.findOne({ slug, _id: { $ne: existingId } });
    counter++;
  }
  return slug;
};
