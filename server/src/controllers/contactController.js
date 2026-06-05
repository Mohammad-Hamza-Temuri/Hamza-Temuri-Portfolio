import Contact from '../models/Contact.js';
import { sendContactNotification, sendAutoReply } from '../utils/sendEmail.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const submitContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      ipAddress: req.ip,
    });
    try {
      await sendContactNotification(contact);
      await sendAutoReply(contact);
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr);
    }
    return successResponse(res, null, "Message sent! I'll get back to you within 24 hours.", 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    return successResponse(res, contacts, 'Contacts fetched', 200, {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!contact) return errorResponse(res, 'Contact not found', 404);
    return successResponse(res, contact, 'Status updated');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    return successResponse(res, null, 'Contact deleted');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
