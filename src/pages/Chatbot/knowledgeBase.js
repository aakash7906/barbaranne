// ─── Real Estate AI Knowledge Base & Mock Response Engine ─────────────────────
// Comprehensive mock dataset tailored for Barbaranne Hill-Irving - Luxury Real Estate Consultant

export const INITIAL_MESSAGES = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: "Hello! Welcome to Barbaranne Hill-Irving Luxury Real Estate Consulting. I am Barbaranne's AI Concierge. How can I assist you with your property journey today?",
    timestamp: 'Just now',
    actions: [
      { label: 'Book 1-Hr Free Consultation', path: '/booking' },
      { label: 'Explore Our Services', path: '/services' },
      { label: 'About Barbaranne Hill-Irving', path: '/about' },
    ],
  },
];

export const QUICK_PROMPTS = [
  'Book Free Consultation',
  'What services do you offer?',
  'Property Tax Valuation help',
  'Looking to buy a luxury home',
  'Selling my property',
  'How to contact Barbaranne directly',
];

// Knowledge base entries with keywords, regex patterns, and curated responses
const KB_ENTRIES = [
  {
    category: 'consultation',
    keywords: ['book', 'consultation', 'free consultation', 'appointment', 'schedule', 'meeting', 'session', 'time slot', 'calendar', '1 hr'],
    response: "You can book a complimentary 1-Hour Strategy Consultation directly with Barbaranne Hill-Irving. During this one-on-one session, Barbaranne reviews your property goals, market trends, portfolio valuation, and tailored strategies.",
    actions: [
      { label: 'Schedule Free Consultation', path: '/booking' },
      { label: 'Reach Out via Contact Page', path: '/contact' },
    ],
  },
  {
    category: 'services',
    keywords: ['services', 'what do you do', 'offer', 'solutions', 'guidance', 'capabilities'],
    response: "Barbaranne Hill-Irving provides three specialized luxury real estate services:\n\n1. 📈 **Investment Planning** — Strategic wealth creation, ROI forecasts, and portfolio diversification in premier properties.\n2. 🏡 **Real Estate Guidance** — Personalized buying, selling, and relocation counsel for luxury estates and villas.\n3. 📊 **Property Tax Valuation** — Expert assessment reviews, appeal guidance, and strategic tax minimization.",
    actions: [
      { label: 'View All Services', path: '/services' },
      { label: 'Book Consultation', path: '/booking' },
    ],
  },
  {
    category: 'investment',
    keywords: ['investment', 'invest', 'portfolio', 'roi', 'yield', 'wealth', 'planning', 'capital appreciation', 'real estate investment'],
    response: "Our **Investment Planning** service helps high-net-worth individuals, families, and investors identify high-performing real estate assets. Barbaranne analyzes micro-market appreciation trends, rental yields, and wealth preservation strategies to maximize your return.",
    actions: [
      { label: 'Explore Investment Service', path: '/services' },
      { label: 'Discuss Investments', path: '/booking' },
    ],
  },
  {
    category: 'tax',
    keywords: ['tax', 'property tax', 'valuation', 'appeal', 'assessment', 'property tax valuation', 'reassessment'],
    response: "Our **Property Tax Valuation** service assists homeowners and investors in verifying if their property is over-assessed. Barbaranne conducts comparative valuation analyses and provides structured documentation for tax assessment appeals, potentially saving you thousands annually.",
    actions: [
      { label: 'Learn More on Services', path: '/services' },
      { label: 'Request Valuation Review', path: '/booking' },
    ],
  },
  {
    category: 'selling',
    keywords: ['sell', 'seller', 'selling', 'list my', 'listing', 'cma', 'market analysis', 'worth', 'value of my home', 'sell my', 'home valuation', 'appraisal'],
    response: "Planning to sell your luxury property? Barbaranne provides a complimentary Comparative Market Analysis (CMA) along with bespoke staging, international marketing placement, and discreet negotiations to secure the optimal value for your estate.",
    actions: [
      { label: 'Request Property Valuation', path: '/booking' },
      { label: 'Contact Barbaranne', path: '/contact' },
    ],
  },
  {
    category: 'buying',
    keywords: ['buy', 'buyer', 'buying', 'purchase', 'looking for a home', 'looking to buy', 'property search', 'find a home', 'viewing', 'acquire'],
    response: "Looking to acquire your dream estate or secondary residence? Barbaranne offers exclusive access to off-market listings, private viewings, and comprehensive neighborhood analytics across premier luxury communities.",
    actions: [
      { label: 'Schedule Buyer Consultation', path: '/booking' },
      { label: 'Message Barbaranne', path: '/contact' },
    ],
  },
  {
    category: 'about',
    keywords: ['about', 'barbaranne', 'barbaranne hill-irving', 'who is barbaranne', 'experience', 'credentials', 'background', 'bio', 'story', 'realtor', 'agent'],
    response: "Barbaranne Hill-Irving is a renowned Luxury Real Estate Consultant with years of distinguished experience in prime residential and investment markets. Known for her analytical acumen, integrity, and bespoke client service, she advises clients on multi-million dollar real estate transactions.",
    actions: [
      { label: 'Read Barbaranne’s Story', path: '/about' },
      { label: 'Book a Meeting', path: '/booking' },
    ],
  },
  {
    category: 'contact',
    keywords: ['contact', 'phone', 'call', 'email', 'address', 'reach', 'number', 'telephone', 'where are you located'],
    response: "You can reach Barbaranne Hill-Irving directly:\n\n📞 **Phone:** 123-456-7890\n✉️ **Email:** info@mysite.com\n📍 **Office:** 500 Terry Francine Street, San Francisco, CA 94158\n🕒 **Hours:** Mon – Fri: 9:00 AM – 6:00 PM",
    actions: [
      { label: 'Go to Contact Form', path: '/contact' },
      { label: 'Book an Appointment', path: '/booking' },
    ],
  },
  {
    category: 'pricing',
    keywords: ['cost', 'price', 'fee', 'charge', 'rate', 'commission', 'how much'],
    response: "Initial strategic consultations are 100% complimentary (Free for 1 hour). Advisory and brokerage fee structures vary depending on the scope of representation (buying, selling, or portfolio tax advisory) and are always transparently disclosed during your initial consultation.",
    actions: [
      { label: 'Book Free 1-Hr Session', path: '/booking' },
    ],
  },
  {
    category: 'testimonials',
    keywords: ['review', 'reviews', 'testimonial', 'testimonials', 'client feedback', 'reputation', 'ratings'],
    response: "Our clients include luxury homeowners, high-net-worth investors, and prominent families. For instance, Sheila Patel shares: *“Barbaranne provided exceptional guidance through every step of our luxury estate purchase. Her professionalism and responsiveness are unmatched.”*",
    actions: [
      { label: 'View Testimonials on Home', path: '/' },
      { label: 'Work with Barbaranne', path: '/booking' },
    ],
  },
  {
    category: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'namaste'],
    response: "Hello! It's a pleasure to connect with you. Whether you're exploring prime residential investments, seeking expert property valuation, or looking for your next luxury residence, I'm here to assist.",
    actions: [
      { label: 'Book Free Consultation', path: '/booking' },
      { label: 'View Services', path: '/services' },
    ],
  },
  {
    category: 'thanks',
    keywords: ['thank', 'thanks', 'thank you', 'appreciate', 'great', 'awesome', 'perfect'],
    response: "You are very welcome! If you'd like to dive deeper into your real estate goals, scheduling a quick 1-hour free consultation with Barbaranne is the best next step.",
    actions: [
      { label: 'Schedule Consultation', path: '/booking' },
      { label: 'Contact Directly', path: '/contact' },
    ],
  },
];

// Lead capture detector (checks if user message contains email or phone number)
export function checkLeadCapture(text) {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/;

  const emailMatch = text.match(emailRegex);
  const phoneMatch = text.match(phoneRegex);

  if (emailMatch || phoneMatch) {
    const contactInfo = emailMatch ? emailMatch[0] : phoneMatch[0];
    return {
      isLead: true,
      info: contactInfo,
      reply: `Thank you for sharing your contact details (${contactInfo})! Barbaranne Hill-Irving’s team has noted this and will reach out to you within 24 hours. You can also lock in an immediate calendar slot below:`,
      actions: [
        { label: 'Book Free Consultation Now', path: '/booking' },
      ],
    };
  }
  return { isLead: false };
}

// Main AI Matching Function
export function getAIResponse(userText) {
  const normalized = userText.toLowerCase().trim();

  // 1. Check if user provided contact information
  const leadCheck = checkLeadCapture(userText);
  if (leadCheck.isLead) {
    return {
      text: leadCheck.reply,
      actions: leadCheck.actions,
    };
  }

  // 2. Score knowledge base matches based on keywords
  let bestMatch = null;
  let highestScore = 0;

  for (const entry of KB_ENTRIES) {
    let score = 0;
    for (const kw of entry.keywords) {
      // Escape special regex characters
      const escaped = kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(^|\\b|\\s)${escaped}(\\b|\\s|$)`, 'i');
      if (regex.test(normalized)) {
        // Multi-word exact matches get higher weight
        score += kw.split(' ').length * 3;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && highestScore > 0) {
    return {
      text: bestMatch.response,
      actions: bestMatch.actions || [],
    };
  }

  // 3. Fallback AI response for arbitrary questions
  return {
    text: `Thank you for your question! As Barbaranne Hill-Irving's AI Assistant, I can provide specialized guidance on **Investment Planning**, **Real Estate Guidance**, and **Property Tax Valuation**.\n\nWould you like to speak directly with Barbaranne during a complimentary 1-hour consultation, or browse our services?`,
    actions: [
      { label: 'Book 1-Hr Free Consultation', path: '/booking' },
      { label: 'Explore Services', path: '/services' },
      { label: 'Contact Us', path: '/contact' },
    ],
  };
}
