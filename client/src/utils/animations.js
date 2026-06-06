// Shared animation variants — subtle, fast, professional
export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.35, ease: 'easeOut' },
};

// Delay capped at 0.4s so late items in large grids don't lag excessively
export const staggerChild = (index) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.35, delay: Math.min(index * 0.06, 0.4), ease: [0.4, 0, 0.2, 1] },
});

// Functions so callers can pass mobile=true to drop x-axis travel on narrow viewports
export const slideInLeft = (mobile = false) => ({
  initial: { opacity: 0, x: mobile ? 0 : -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
});

export const slideInRight = (mobile = false) => ({
  initial: { opacity: 0, x: mobile ? 0 : 20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
});
