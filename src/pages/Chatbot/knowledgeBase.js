// ─── Real Estate AI Knowledge Base & Mock Response Engine ─────────────────────
// Comprehensive mock dataset tailored for Barbaranne Hill-Irving - Luxury Real Estate Consultant

export const INITIAL_MESSAGES = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: "Hello! Welcome to **Barbaranne Hill-Irving** Luxury Real Estate Consulting. I'm Barbaranne's AI Concierge — here to assist you with your property journey.\n\nHow can I help you today?",
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
  'Property Tax help',
  'Looking to buy a luxury home',
  'Selling my property',
  'Contact Barbaranne',
];

// Knowledge base entries with keywords, regex patterns, and curated responses
const KB_ENTRIES = [
  {
    category: 'consultation',
    keywords: ['book', 'consultation', 'free consultation', 'appointment', 'schedule', 'meeting', 'session', 'time slot', 'calendar', '1 hr', '1-hr', 'strategy session', 'free session'],
    response: "You can book a **complimentary 1-Hour Strategy Consultation** directly with Barbaranne Hill-Irving.\n\nDuring this private one-on-one session, Barbaranne reviews:\n- Your property goals & objectives\n- Current market trends & opportunities\n- Portfolio valuation strategies\n- Tailored next steps for your situation\n\nSchedule your session today — it's completely free and confidential.",
    actions: [
      { label: 'Schedule Free Consultation', path: '/booking' },
      { label: 'Reach Out via Contact Page', path: '/contact' },
    ],
  },
  {
    category: 'services',
    keywords: ['services', 'what do you do', 'offer', 'solutions', 'guidance', 'capabilities', 'help with', 'assist with'],
    response: "Barbaranne Hill-Irving provides three specialized luxury real estate services:\n\n- **Investment Planning** — Strategic wealth creation, ROI forecasts, and portfolio diversification in premier properties\n- **Real Estate Guidance** — Personalized buying, selling, and relocation counsel for luxury estates and villas\n- **Property Tax Valuation** — Expert assessment reviews, appeal guidance, and strategic tax minimization\n\nEach service is backed by deep local market expertise across Clearwater Beach and Tampa Bay.",
    actions: [
      { label: 'View All Services', path: '/services' },
      { label: 'Book Consultation', path: '/booking' },
    ],
  },
  {
    category: 'investment',
    keywords: ['investment', 'invest', 'portfolio', 'roi', 'yield', 'wealth', 'planning', 'capital appreciation', 'real estate investment', 'rental income', 'vacation rental', 'multi-family'],
    response: "Our **Investment Planning** service helps high-net-worth individuals, families, and investors identify high-performing real estate assets.\n\nBarbaranne analyzes:\n- Micro-market appreciation trends\n- Luxury short-term vacation rental yields\n- Multi-family & portfolio diversification opportunities\n- Wealth preservation & generational transfer strategies\n\nMaximize your return with expert-guided real estate investments.",
    actions: [
      { label: 'Explore Investment Service', path: '/services' },
      { label: 'Discuss Investments', path: '/booking' },
    ],
  },
  {
    category: 'tax',
    keywords: ['tax', 'property tax', 'valuation', 'appeal', 'assessment', 'property tax valuation', 'reassessment', 'over-assessed', 'tax savings', 'tax reduction'],
    response: "Our **Property Tax Valuation** service assists homeowners and investors in verifying if their property is over-assessed.\n\nBarbaranne provides:\n- Comprehensive assessment reviews\n- Comparative valuation analyses\n- Documentation preparation for appeals\n- Strategic guidance to lower your tax burden\n\nMany clients save **thousands of dollars annually** through proper valuation defense.",
    actions: [
      { label: 'Learn More on Services', path: '/services' },
      { label: 'Request Valuation Review', path: '/booking' },
    ],
  },
  {
    category: 'selling',
    keywords: ['sell', 'seller', 'selling', 'list my', 'listing', 'cma', 'market analysis', 'worth', 'value of my home', 'sell my', 'home valuation', 'appraisal', 'how much is my'],
    response: "Planning to sell your luxury property? Barbaranne provides a **complimentary Comparative Market Analysis (CMA)** along with:\n\n- Bespoke staging & presentation guidance\n- International marketing & premium placement\n- Discreet, skilled negotiations\n- Full support from listing to closing\n\nSecure the optimal value for your estate with expert representation.",
    actions: [
      { label: 'Request Property Valuation', path: '/booking' },
      { label: 'Contact Barbaranne', path: '/contact' },
    ],
  },
  {
    category: 'buying',
    keywords: ['buy', 'buyer', 'buying', 'purchase', 'looking for a home', 'looking to buy', 'property search', 'find a home', 'viewing', 'acquire', 'dream home', 'new home', 'first time buyer', 'relocate', 'relocation', 'move to florida'],
    response: "Looking to acquire your dream estate or secondary residence? Barbaranne offers:\n\n- Exclusive access to off-market & pre-market listings\n- Private viewings & property tours\n- Comprehensive neighborhood analytics\n- Expert negotiation & closing support\n\nWhether it's beachfront condos, waterfront estates, or new construction — discover your perfect property.",
    actions: [
      { label: 'Schedule Buyer Consultation', path: '/booking' },
      { label: 'Message Barbaranne', path: '/contact' },
    ],
  },
  {
    category: 'about',
    keywords: ['about', 'barbaranne', 'barbaranne hill-irving', 'who is barbaranne', 'experience', 'credentials', 'background', 'bio', 'story', 'realtor', 'agent', 'bhhs', 'berkshire', 'who are you', 'tell me about'],
    response: "**Barbaranne Hill-Irving** is a licensed REALTOR® and **Certified New Home Specialist (CNHS)** with Berkshire Hathaway HomeServices Florida Properties Group (BHHS).\n\nAfter relocating from Ohio to Clearwater Beach in April 2016, she dedicated her career to guiding buyers, sellers, and investors across:\n- Clearwater Beach\n- Belleair Bluffs\n- Indian Rocks Beach\n- St. Petersburg & Tampa Bay\n\nShe brings bespoke advisory, skilled negotiation, and unparalleled local market knowledge to every client relationship.",
    actions: [
      { label: "Read Barbaranne's Story", path: '/about' },
      { label: 'Schedule Consultation', path: '/booking' },
    ],
  },
  {
    category: 'contact',
    keywords: ['contact', 'phone', 'call', 'email', 'address', 'reach', 'number', 'telephone', 'where are you located', 'office', 'cell', 'get in touch', 'speak to', 'talk to'],
    response: "You can reach **Barbaranne Hill-Irving** directly:\n\n- **Cell / Direct:** [513-319-0581](tel:5133190581)\n- **Work Phone:** [727-461-1700](tel:7274611700)\n- **Email:** [barbaranne@bfrealtygroup.com](mailto:barbaranne@bfrealtygroup.com)\n- **Office:** 125 Indian Rocks Road North, Suite 200, Belleair Bluffs, FL 33770\n- **Brokerage:** Berkshire Hathaway HomeServices Florida Properties Group",
    actions: [
      { label: 'Go to Contact Page', path: '/contact' },
      { label: 'Book 1-Hr Free Consultation', path: '/booking' },
    ],
  },
  {
    category: 'pricing',
    keywords: ['cost', 'price', 'fee', 'charge', 'rate', 'commission', 'how much', 'pricing', 'affordable', 'expensive'],
    response: "Great question! Here's how Barbaranne's advisory works:\n\n- **Initial Consultation:** 100% complimentary (Free for 1 hour)\n- **Advisory & Brokerage Fees:** Vary depending on scope of representation\n- **Full Transparency:** Fee structures are always clearly disclosed during your initial consultation\n\nThere's absolutely no cost to start the conversation.",
    actions: [
      { label: 'Book Free 1-Hr Session', path: '/booking' },
    ],
  },
  {
    category: 'testimonials',
    keywords: ['review', 'reviews', 'testimonial', 'testimonials', 'client feedback', 'reputation', 'ratings', 'trust', 'trusted'],
    response: "Our clients include luxury homeowners, high-net-worth investors, and prominent families.\n\nClient testimonial:\n*\"Barbaranne provided exceptional guidance through every step of our luxury estate purchase. Her professionalism and responsiveness are unmatched.\"*\n— **Sheila Patel**, Luxury Estate Client\n\nBarbaranne's commitment to excellence and personalized service sets her apart.",
    actions: [
      { label: 'View Testimonials on Home', path: '/' },
      { label: 'Work with Barbaranne', path: '/booking' },
    ],
  },
  {
    category: 'areas',
    keywords: ['clearwater', 'tampa', 'belleair', 'indian rocks', 'st pete', 'st. pete', 'st petersburg', 'gulf coast', 'florida', 'pinellas', 'area', 'location', 'where do you serve', 'coverage'],
    response: "Barbaranne serves Florida's premier Gulf Coast communities:\n\n- **Clearwater Beach** — Beachfront luxury living\n- **Belleair Bluffs** — Exclusive residential neighborhoods\n- **Indian Rocks Beach** — Coastal charm & investment potential\n- **St. Petersburg** — Vibrant waterfront community\n- **Tampa Bay Region** — Diverse real estate opportunities\n\nEach area offers unique advantages for buyers, sellers, and investors.",
    actions: [
      { label: 'Discuss Your Ideal Location', path: '/booking' },
      { label: 'Contact Barbaranne', path: '/contact' },
    ],
  },
  {
    category: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'namaste', 'howdy', 'sup', 'what\'s up'],
    response: "Hello! It's a pleasure to connect with you. Whether you're exploring prime residential investments, seeking expert property valuation, or looking for your next luxury residence — I'm here to assist.\n\nWhat can I help you with today?",
    actions: [
      { label: 'Book Free Consultation', path: '/booking' },
      { label: 'View Services', path: '/services' },
    ],
  },
  {
    category: 'thanks',
    keywords: ['thank', 'thanks', 'thank you', 'appreciate', 'great', 'awesome', 'perfect', 'wonderful', 'excellent', 'amazing'],
    response: "You're very welcome! If you'd like to dive deeper into your real estate goals, scheduling a **complimentary 1-hour consultation** with Barbaranne is the best next step.\n\nWe're here whenever you're ready!",
    actions: [
      { label: 'Schedule Consultation', path: '/booking' },
      { label: 'Contact Directly', path: '/contact' },
    ],
  },
  {
    category: 'goodbye',
    keywords: ['bye', 'goodbye', 'see you', 'later', 'good night', 'take care', 'farewell'],
    response: "Thank you for chatting with us! Remember, Barbaranne is always just a call away at **513-319-0581**.\n\nWishing you the very best on your property journey. We look forward to connecting again soon!",
    actions: [
      { label: 'Book Before You Go', path: '/booking' },
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
      reply: `Thank you for sharing your contact details (**${contactInfo}**)! Barbaranne Hill-Irving's team has noted this and will reach out to you within 24 hours.\n\nYou can also lock in an immediate calendar slot below:`,
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
    text: `Thank you for your question! As Barbaranne Hill-Irving's AI Concierge, I can provide specialized guidance on:\n\n- **Investment Planning** — Real estate wealth strategies\n- **Real Estate Guidance** — Buying, selling & relocation\n- **Property Tax Valuation** — Assessment reviews & appeals\n\nWould you like to explore any of these, or speak directly with Barbaranne during a complimentary 1-hour consultation?`,
    actions: [
      { label: 'Book 1-Hr Free Consultation', path: '/booking' },
      { label: 'Explore Services', path: '/services' },
      { label: 'Contact Us', path: '/contact' },
    ],
  };
}
