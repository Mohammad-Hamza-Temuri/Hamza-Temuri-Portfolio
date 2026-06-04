import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: { user: config.email.user, pass: config.email.pass },
});

export const sendContactNotification = async (contact) => {
  try {
    await transporter.sendMail({
      from: config.email.from,
      to: config.email.user,
      subject: `New Inquiry: ${contact.subject}`,
      html: `
        <h2>New Portfolio Inquiry</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Project Type:</strong> ${contact.projectType || 'N/A'}</p>
        <p><strong>Budget:</strong> ${contact.budget || 'N/A'}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      `,
    });
  } catch (err) {
    console.error('Email notification failed:', err.message);
  }
};

export const sendAutoReply = async (contact) => {
  try {
    await transporter.sendMail({
      from: config.email.from,
      to: contact.email,
      subject: `Thanks for reaching out, ${contact.name.split(' ')[0]}!`,
      html: `
        <h2>Hi ${contact.name.split(' ')[0]},</h2>
        <p>Thank you for getting in touch! I've received your message and will get back to you within 24 hours.</p>
        <p>Here's a summary of your inquiry:</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong> ${contact.message}</p>
        <hr/>
        <p>Best regards,<br/><strong>Muhammad Hamza Temuri</strong><br/>Full Stack Developer</p>
      `,
    });
  } catch (err) {
    console.error('Auto-reply failed:', err.message);
  }
};
