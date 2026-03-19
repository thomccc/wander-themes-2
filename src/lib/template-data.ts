import type { BackgroundRole } from './color-engine';

// --- Section types ---

export type SectionId =
  | 'nav'
  | 'hero'
  | 'features'
  | 'property-cards'
  | 'testimonials'
  | 'gallery'
  | 'faq'
  | 'cta'
  | 'footer';

export const SECTION_ORDER: SectionId[] = [
  'hero',
  'features',
  'property-cards',
  'testimonials',
  'gallery',
  'faq',
  'cta',
  'footer',
];

// --- Site templates (layout variant per section) ---

export interface SiteTemplate {
  name: string;
  layouts: Partial<Record<SectionId, string>>;
}

export const SITE_TEMPLATES: Record<string, SiteTemplate> = {
  Classic: {
    name: 'Classic',
    layouts: {
      hero: 'centered',
      features: '3col-cards',
      'property-cards': 'wide-grid',
      testimonials: '2col-cards',
      gallery: '3col-grid',
      faq: 'split',
      cta: 'split',
      footer: 'columns',
    },
  },
  Editorial: {
    name: 'Editorial',
    layouts: {
      hero: 'split-right',
      features: 'alternating',
      'property-cards': '4col-grid',
      testimonials: 'featured',
      gallery: '2x2-grid',
      faq: 'centered',
      cta: 'centered',
      footer: 'simple',
    },
  },
  Iconic: {
    name: 'Iconic',
    layouts: {
      hero: 'full-bleed',
      features: 'accordion',
      'property-cards': 'wide-grid',
      testimonials: 'stats',
      gallery: '2x2-grid',
      faq: 'centered',
      cta: 'newsletter',
      footer: 'columns',
    },
  },
};

// --- Layout variant descriptions (for the modal picker) ---

export interface LayoutVariant {
  id: string;
  name: string;
  description: string;
}

export const SECTION_VARIANTS: Record<SectionId, LayoutVariant[]> = {
  nav: [{ id: 'standard', name: 'Standard', description: 'Logo, links, CTA button' }],
  hero: [
    { id: 'centered', name: 'Centered', description: 'Centered text, search bar, background image' },
    { id: 'split-right', name: 'Editorial', description: 'Full-screen image, bottom-aligned oversized text' },
    { id: 'full-bleed', name: 'Full Bleed', description: 'Full viewport image, large uppercase centered text' },
  ],
  features: [
    { id: '3col-cards', name: '3-Column Cards', description: 'Three equal cards in a row' },
    { id: 'alternating', name: 'Interactive Split', description: 'Clickable list left, image shuffles right' },
    { id: 'accordion', name: 'Accordion', description: 'Expandable feature list, minimal' },
  ],
  'property-cards': [
    { id: 'wide-grid', name: 'Wide Grid', description: '5 cards per row, DS PropertyCard component' },
    { id: '4col-grid', name: '4-Column Grid', description: '4 DS PropertyCards per row' },
    { id: '2col-full', name: '2-Column Large', description: '2 large DS PropertyCards per row' },
  ],
  testimonials: [
    { id: '2col-cards', name: '2-Column Cards', description: 'Two quote cards side by side' },
    { id: 'featured', name: 'Featured Quote', description: 'Single large centered testimonial' },
    { id: 'stats', name: 'Stats Bar', description: 'Trust numbers — properties, guests, rating' },
  ],
  gallery: [
    { id: '3col-grid', name: '3-Column Grid', description: '6 images in a uniform 3×2 grid' },
    { id: '2x2-grid', name: 'Asymmetric', description: '1 large image + 2 stacked smaller' },
  ],
  faq: [
    { id: 'split', name: 'Split', description: 'Headline left, accordion right' },
    { id: 'centered', name: 'Centered', description: 'Narrow centered accordion' },
  ],
  cta: [
    { id: 'split', name: 'Split', description: 'Text left, buttons right' },
    { id: 'centered', name: 'Centered', description: 'Centered text and buttons' },
    { id: 'newsletter', name: 'Newsletter', description: 'Centered with email signup input' },
  ],
  footer: [
    { id: 'columns', name: 'Columns', description: 'Logo + 4 link columns' },
    { id: 'simple', name: 'Simple', description: 'Centered logo, inline links' },
  ],
};

// --- Color sub-themes (background role per section) ---

export interface ColorSubTheme {
  name: string;
  roles: Record<SectionId, BackgroundRole>;
  heroImage: boolean;
}

export const COLOR_SUBTHEMES: Record<string, ColorSubTheme> = {
  'Alternating Light': {
    name: 'Alternating Light',
    heroImage: true,
    roles: {
      nav: 'white',
      hero: 'theme-dark',
      features: 'white',
      'property-cards': 'theme-light',
      testimonials: 'white',
      gallery: 'theme-light',
      faq: 'white',
      cta: 'theme-solid',
      footer: 'theme-dark',
    },
  },
  'Bold Accent': {
    name: 'Bold Accent',
    heroImage: true,
    roles: {
      nav: 'white',
      hero: 'acc1-solid',
      features: 'white',
      'property-cards': 'acc2-light',
      testimonials: 'acc2-dark',
      gallery: 'white',
      faq: 'theme-light',
      cta: 'acc1-solid',
      footer: 'black',
    },
  },
  'Warm Gradient': {
    name: 'Warm Gradient',
    heroImage: false,
    roles: {
      nav: 'white',
      hero: 'theme-light',
      features: 'white',
      'property-cards': 'theme-light',
      testimonials: 'theme-solid',
      gallery: 'theme-dark',
      faq: 'white',
      cta: 'theme-dark',
      footer: 'black',
    },
  },
  'Mono Elegant': {
    name: 'Mono Elegant',
    heroImage: true,
    roles: {
      nav: 'white',
      hero: 'black',
      features: 'white',
      'property-cards': 'white',
      testimonials: 'black',
      gallery: 'white',
      faq: 'white',
      cta: 'theme-solid',
      footer: 'black',
    },
  },
  'Multi-Hue': {
    name: 'Multi-Hue',
    heroImage: true,
    roles: {
      nav: 'white',
      hero: 'theme-dark',
      features: 'acc1-light',
      'property-cards': 'white',
      testimonials: 'acc2-solid',
      gallery: 'acc1-light',
      faq: 'white',
      cta: 'theme-solid',
      footer: 'theme-dark',
    },
  },
};

// --- Placeholder content ---

export const CONTENT = {
  nav: {
    logo: 'BnB Breeze',
    links: ['Destinations', 'How It Works', 'For Hosts', 'About'],
    cta: 'Explore Properties',
  },
  hero: {
    eyebrow: 'Direct Booking Platform',
    headline: 'Book Direct.\nSave More.\nTravel Better.',
    subheadline:
      'Skip the middleman. Book vacation rentals directly from verified hosts and save up to 20% on every stay.',
    primaryCta: 'Explore Properties',
    secondaryCta: 'How It Works',
  },
  features: {
    eyebrow: 'Why BnB Breeze',
    headline: 'Everything You Need for the Perfect Stay',
    items: [
      {
        icon: '🛡',
        title: 'Verified Hosts',
        description:
          'Every property is personally vetted by our team before it goes live.',
      },
      {
        icon: '💲',
        title: 'No Hidden Fees',
        description:
          'The price you see is the price you pay. No service fees, no surprises.',
      },
      {
        icon: '📅',
        title: 'Flexible Booking',
        description:
          'Free cancellation up to 48 hours before check-in on most properties.',
      },
    ],
  },
  propertyCards: {
    eyebrow: 'Featured Properties',
    headline: 'Find Your Perfect Getaway',
    description:
      'Hand-picked properties in the most sought-after destinations.',
    items: [
      {
        name: 'Oceanview Villa',
        location: 'Malibu, California',
        price: '$320',
        rating: '4.9',
        reviews: 128,
        tags: ['Beachfront', 'Pool'],
        guests: 8,
        beds: 4,
        baths: 3,
        image: '/sample%20images/DTS%20By%20Water%20Daniel%20Far%C3%B2.jpg',
      },
      {
        name: 'Mountain A-Frame',
        location: 'Big Bear, California',
        price: '$185',
        rating: '4.8',
        reviews: 94,
        tags: ['Fireplace', 'Hot Tub'],
        guests: 6,
        beds: 3,
        baths: 2,
        image: '/sample%20images/Daniel%20Far%C3%B2%20Photos%20(1).jpg',
      },
      {
        name: 'Downtown Loft',
        location: 'Austin, Texas',
        price: '$145',
        rating: '4.7',
        reviews: 215,
        tags: ['City Center', 'Walkable'],
        guests: 4,
        beds: 2,
        baths: 1,
        image: '/sample%20images/Daniel%20Far%C3%B2%20Photos%20(5).jpg',
      },
      {
        name: 'Desert Retreat',
        location: 'Scottsdale, Arizona',
        price: '$275',
        rating: '4.9',
        reviews: 67,
        tags: ['Pool', 'Desert View'],
        guests: 6,
        beds: 3,
        baths: 2,
        image: '/sample%20images/DTS%20By%20Water%20Daniel%20Far%C3%B2%20ID%207924.jpg',
      },
      {
        name: 'Lakeside Cabin',
        location: 'Lake Tahoe, California',
        price: '$210',
        rating: '4.8',
        reviews: 156,
        tags: ['Lakefront', 'Fireplace'],
        guests: 8,
        beds: 4,
        baths: 2,
        image: '/sample%20images/Pali%20Mendez%20Photos.jpg',
      },
    ],
  },
  testimonials: {
    eyebrow: 'What Our Guests Say',
    headline: 'Loved by Travelers and Hosts',
    items: [
      {
        quote:
          "We booked a cottage in the Keys through BnB Breeze and couldn't believe the value. The owner had it spotless, all the amenities were there, and customer support answered our question same-day.",
        author: 'David Martinez',
        role: 'Family vacationer, Texas',
      },
      {
        quote:
          "I list three properties on BnB Breeze. The direct booking model saves me commission money, and I love that I have full control over my calendar and pricing. It's how rentals should work.",
        author: 'Rachel Thompson',
        role: 'Multi-property host, Miami',
      },
    ],
  },
  stats: [
    { number: '500+', label: 'Verified Properties' },
    { number: '10,000+', label: 'Happy Guests' },
    { number: '4.9', label: 'Average Rating' },
    { number: '98%', label: 'Booking Satisfaction' },
  ],
  gallery: {
    eyebrow: 'Explore Destinations',
    headline: "Places You'll Love",
    items: [
      { caption: 'Minimalist Architecture', image: '/sample%20images/Philia%20Daniel%20Faro%20Photo%20(2).jpg' },
      { caption: 'Crystal Waters', image: '/sample%20images/Philia%20Daniel%20Faro%20Photo%20(1).jpg' },
      { caption: 'Window to Paradise', image: '/sample%20images/Daniel%20Far%C3%B2%20Photos%20(1).jpg' },
      { caption: 'Golden Hour Escape', image: '/sample%20images/My%20Own%20Summer%20by%20Daniel%20Far%C3%B2.jpg' },
      { caption: 'Luxury Bath', image: '/sample%20images/Solitude%20by%20Daniel%20Far%C3%B2.jpg' },
      { caption: 'Travel Ready', image: '/sample%20images/Franco%20Dupuy%20Photos.jpg' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Frequently Asked Questions',
    description:
      'Everything you need to know about booking with BnB Breeze.',
    items: [
      {
        question: 'How is BnB Breeze different from Airbnb?',
        answer:
          'We connect you directly with property owners — no service fees, no middleman. You save money and hosts earn more.',
      },
      {
        question: 'How do I cancel a booking?',
        answer:
          'Most properties offer free cancellation up to 48 hours before check-in. Check the specific policy on each listing.',
      },
      {
        question: 'Are the properties verified?',
        answer:
          'Yes. Every property goes through a vetting process before listing, including photo verification and host identity checks.',
      },
      {
        question: 'Can I contact the host before booking?',
        answer:
          'Absolutely. Every listing has a message button so you can ask questions before you commit.',
      },
      {
        question: 'How do payments work?',
        answer:
          'You pay securely through our platform. Funds are held until 24 hours after check-in, then released to the host.',
      },
    ],
  },
  cta: {
    headline: 'Ready to Book Your Next Adventure?',
    description:
      'Join thousands of travelers who book direct and save up to 20%.',
    primaryCta: 'Explore Properties',
    secondaryCta: 'Learn More',
  },
  footer: {
    logo: 'BnB Breeze',
    tagline: 'Book direct. Travel better.',
    columns: [
      {
        heading: 'Company',
        links: ['About', 'Careers', 'Press', 'Blog'],
      },
      {
        heading: 'Support',
        links: ['Help Center', 'Contact', 'Cancellation Policy', 'Safety'],
      },
      {
        heading: 'Destinations',
        links: ['California', 'Florida', 'Texas', 'Colorado'],
      },
      {
        heading: 'Hosts',
        links: ['List Your Property', 'Host Resources', 'Pricing', 'Host FAQ'],
      },
    ],
    legal: '© 2026 BnB Breeze. All rights reserved.',
  },
} as const;
