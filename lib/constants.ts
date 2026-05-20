// Brand Constants
export const BRAND = {
  name: 'NDcreations',
  tagline: 'Engineering the Future',
  description: 'Where Creativity Meets Intelligence',
} as const;

// Color Palette
export const COLORS = {
  deepNavy: '#0a0e27',
  charcoalBlack: '#0f0f0f',
  electricBlue: '#0066ff',
  neonCyan: '#00d9ff',
  purpleGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
} as const;

// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
] as const;

// Product Categories
export const PRODUCT_CATEGORIES = ['All', 'Apps', 'AI', 'Websites', 'Games'] as const;

// Service Types
export const SERVICE_TYPES = [
  'AI Development',
  'App Development',
  'Website Development',
  'SaaS Development',
  'UI/UX Design',
  'Game Development',
  'Automation Systems',
  'AI Agents',
] as const;

// Order Status
export const ORDER_STATUS = ['Pending', 'In Progress', 'Completed'] as const;

// Admin Password
export const ADMIN_PASSWORD = 'NDowner2025';
