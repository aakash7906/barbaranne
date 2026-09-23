// ─── Gemini AI Live Chatbot Service ──────────────────────────────────────────
// Connects to Google's Gemini API with tailored real estate persona for Barbaranne Hill-Irving.

import { getAIResponse as getFallbackResponse } from './knowledgeBase.js';

// Prioritized list of active Gemini models — using current active versions
const GEMINI_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.8-flash',
  'gemini-3.5-flash-lite',
  'gemini-flash-latest',
];

export const SYSTEM_INSTRUCTION = `You are the exclusive AI Concierge for Barbaranne Hill-Irving, an elite licensed REALTOR® and Certified New Home Specialist (CNHS) with Berkshire Hathaway HomeServices Florida Properties Group (BHHS).

=== BARBARANNE'S CREDENTIALS & BACKGROUND ===
- Name: Barbaranne Hill-Irving
- Title: Licensed REALTOR®, Certified New Home Specialist (CNHS), Trusted Real Estate Consultant
- Brokerage: Berkshire Hathaway HomeServices Florida Properties Group (BHHS)
- Office Address: 125 Indian Rocks Road North, Suite 200, Belleair Bluffs, FL 33770
- Direct / Cell Phone: 513-319-0581
- Office Phone: 727-461-1700
- Email: barbaranne@bfrealtygroup.com
- Languages: English
- Geographic Focus: Clearwater Beach, Belleair Bluffs, Indian Rocks Beach, St. Petersburg, Tampa Bay, and Florida's Gulf Coast.
- Relocation Story: Barbaranne relocated from Ohio to Clearwater Beach in April 2016. It was one of the best decisions of her life, and she is passionate about helping others make that same seamless transition to Florida and find their own piece of coastal paradise.

=== SPECIALIZATIONS & PILLARS OF SERVICE ===
1. Investment Planning:
   - Helping high-net-worth individuals, families, and investors identify high-performing real estate assets.
   - Analyzing micro-market appreciation trends, luxury short-term vacation rental yields, and multi-family opportunities to maximize ROI and preserve generational wealth.

2. Real Estate Guidance:
   - Personalized advisory for buying, selling, and luxury coastal relocation.
   - Representing premier beachfront condos, waterfront estates, private villas, and new construction developments.
   - Skilled negotiation, meticulous attention to detail, and a stress-free client experience from contract to closing.

3. Property Tax Valuation:
   - Comprehensive assessment reviews to identify over-assessed commercial and residential properties.
   - Comparative valuation analyses, documentation preparation, and appeals guidance to help clients lower over-assessed property taxes and save thousands annually.

=== COMPLIMENTARY OFFERING ===
- 1-Hour Strategy Consultation: A private one-on-one strategy session with Barbaranne to evaluate property goals, assess market opportunities, review portfolios, or discuss tax valuation defense. Clients can easily schedule this online via the website booking page (/booking) or contact her directly.

=== STRICT CONVERSATION SCOPE & RESTRICTIONS ===
- CRITICAL SCOPE RULE: You MUST ONLY answer questions directly related to:
  1) Barbaranne Hill-Irving (her bio, experience, contact details, brokerage, services)
  2) Real estate services (Investment Planning, Real Estate Guidance, Property Tax Valuation)
  3) Florida properties, neighborhoods (Clearwater Beach, Tampa Bay, Belleair Bluffs, St. Petersburg, Pinellas County), buying, selling, renting, or moving to Florida
  4) Scheduling a complimentary 1-Hour Consultation or contacting Barbaranne
- STRICT REFUSAL FOR OFF-TOPIC QUERIES: If a user asks about anything unrelated (such as general knowledge, history, programming, math, politics, weather outside Florida, recipes, sports, jokes, medical/legal advice, etc.), you MUST politely and gracefully decline. Example response: "I am specifically tailored to assist you with Barbaranne Hill-Irving's luxury real estate services, Florida coastal properties, investments, and property tax valuations. How can I assist you with your real estate goals today?"
- Never answer general trivia, coding questions, homework, or off-topic matters under any circumstances.

=== TONE & CONVERSATION GUIDELINES ===
- Speak with warmth, elegance, sophistication, and consummate professional expertise.
- Keep answers concise, highly informative, and easy to read (use clean bullet points or short paragraphs when helpful).
- Emphasize Barbaranne's personalized, high-touch approach and deep local market mastery.
- Provide direct contact details (513-319-0581 | barbaranne@bfrealtygroup.com) when the user asks how to get in touch.
- Invite the user to book a complimentary 1-Hour Consultation whenever relevant.
- Use markdown formatting: **bold** for emphasis, bullet points with "- " prefix, and [link text](url) for links.
- When suggesting a booking, mention the booking page is at /booking.
- Keep responses under 200 words for conversational flow.`;

/**
 * Validate whether a string looks like a real Gemini API key
 */
function isValidGeminiKey(key) {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  // Valid Google Gemini API keys are at least 30 characters
  return trimmed.length >= 30;
}

/**
 * Get active Gemini API key from environment variable or localStorage
 * Only returns keys that pass basic validation
 */
export function getGeminiApiKey() {
  // 1. Check localStorage first (user-provided override takes priority)
  try {
    if (typeof localStorage !== 'undefined') {
      const localKey = localStorage.getItem('barbaranne_gemini_api_key');
      if (localKey && isValidGeminiKey(localKey)) {
        return localKey.trim();
      }
    }
  } catch {
    // Ignore if localStorage unavailable
  }

  // 2. Check Vite environment variable
  let envKey = null;
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      envKey = import.meta.env.VITE_GEMINI_API_KEY;
    }
  } catch {
    // Ignore in non-vite environments
  }

  if (envKey && isValidGeminiKey(envKey)) {
    return envKey.trim();
  }

  // 3. No valid key found
  return null;
}

/**
 * Save user API key to localStorage for custom overrides
 */
export function saveGeminiApiKey(key) {
  try {
    if (typeof localStorage !== 'undefined') {
      if (key && key.trim()) {
        localStorage.setItem('barbaranne_gemini_api_key', key.trim());
      } else {
        localStorage.removeItem('barbaranne_gemini_api_key');
      }
    }
  } catch {
    // Ignore if localStorage unavailable
  }
}

/**
 * Check whether Gemini AI is currently connected with a valid key
 */
export function isGeminiConnected() {
  return Boolean(getGeminiApiKey());
}

/**
 * Call Gemini API across candidate models with automatic failover
 */
async function callGeminiGenerate(apiKey, contents) {
  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data?.candidates?.[0];
        const parts = candidate?.content?.parts || [];
        const textPart = parts.find((p) => p && typeof p.text === 'string' && p.text.trim());
        const text = textPart ? textPart.text.trim() : null;

        if (text) {
          return { text, model };
        }
        // If response is ok but no text, try next model
        console.warn(`Gemini model ${model} returned empty text, trying next model...`);
        lastError = new Error(`Model ${model} returned empty response`);
      } else {
        const errJson = await response.json().catch(() => ({}));
        const errorMessage = errJson?.error?.message || `HTTP ${response.status}`;
        console.warn(`Gemini model ${model} failed:`, errorMessage);
        
        // If it's an auth error (invalid key), don't try other models
        if (response.status === 400 || response.status === 401 || response.status === 403) {
          throw new Error(`API key error: ${errorMessage}`);
        }
        lastError = new Error(`Model ${model} returned ${response.status}: ${errorMessage}`);
      }
    } catch (err) {
      // Re-throw auth errors immediately
      if (err.message?.startsWith('API key error:')) {
        throw err;
      }
      console.warn(`Error attempting Gemini model ${model}:`, err);
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini candidate models failed.');
}

/**
 * Ask Gemini AI or gracefully fallback to curated real estate knowledge base
 */
export async function askRealEstateAssistant(userQuery, conversationHistory = []) {
  const apiKey = getGeminiApiKey();

  // If no valid key available, use high-quality local real estate engine
  if (!apiKey) {
    const local = getFallbackResponse(userQuery);
    return {
      text: local.text,
      actions: local.actions || [],
      isLiveAI: false,
    };
  }

  try {
    // Format conversation history for Gemini multi-turn format
    // The conversationHistory already includes the latest user message,
    // so we just need to format the last few turns properly
    const recentHistory = conversationHistory
      .slice(-8) // Take last 8 messages for context
      .filter((m) => m.sender === 'user' || m.sender === 'bot');

    // Build contents array ensuring it starts with a user message
    // and alternates properly between user and model
    const contents = [];
    let lastRole = null;

    for (const m of recentHistory) {
      const role = m.sender === 'user' ? 'user' : 'model';
      
      // Skip if same role as last (Gemini requires alternating roles)
      if (role === lastRole) {
        // Replace last message of same role with current one
        contents[contents.length - 1] = {
          role,
          parts: [{ text: m.text }],
        };
      } else {
        contents.push({
          role,
          parts: [{ text: m.text }],
        });
      }
      lastRole = role;
    }

    // Ensure the last message is from the user (the current query)
    // If the history didn't end with the user message, add it
    if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
      contents.push({
        role: 'user',
        parts: [{ text: userQuery }],
      });
    }

    // Ensure contents starts with a user message (Gemini requirement)
    while (contents.length > 0 && contents[0].role !== 'user') {
      contents.shift();
    }

    // If somehow empty, just send the query
    if (contents.length === 0) {
      contents.push({
        role: 'user',
        parts: [{ text: userQuery }],
      });
    }

    const result = await callGeminiGenerate(apiKey, contents);

    // Determine smart relevant action buttons based on query / answer
    const actions = [];
    const lower = (userQuery + ' ' + result.text).toLowerCase();

    if (lower.includes('consultation') || lower.includes('book') || lower.includes('appointment') || lower.includes('schedule') || lower.includes('1-hr') || lower.includes('strategy session')) {
      actions.push({ label: 'Book 1-Hr Free Consultation', path: '/booking' });
    }
    if (lower.includes('service') || lower.includes('investment') || lower.includes('tax') || lower.includes('guidance') || lower.includes('valuation')) {
      actions.push({ label: 'Explore Services', path: '/services' });
    }
    if (lower.includes('contact') || lower.includes('reach') || lower.includes('phone') || lower.includes('email') || lower.includes('address') || lower.includes('office') || lower.includes('call')) {
      actions.push({ label: 'Contact Barbaranne (513-319-0581)', path: '/contact' });
    }
    if (lower.includes('about') || lower.includes('who is') || lower.includes('background') || lower.includes('experience') || lower.includes('berkshire') || lower.includes('story')) {
      actions.push({ label: 'About Barbaranne Hill-Irving', path: '/about' });
    }

    // If no contextual actions matched, add a default booking CTA
    if (actions.length === 0) {
      actions.push({ label: 'Book 1-Hr Free Consultation', path: '/booking' });
    }

    return {
      text: result.text,
      actions,
      isLiveAI: true,
      modelUsed: result.model,
    };
  } catch (error) {
    console.error('Gemini API call failed, falling back to local KB:', error);
    const local = getFallbackResponse(userQuery);
    return {
      text: local.text,
      actions: local.actions || [],
      isLiveAI: false,
    };
  }
}
