const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined
const MODEL = 'gemini-3.5-flash'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

// Client-side note: this key ships inside the built JS bundle regardless of
// how it's stored (env var vs hardcoded) — env vars only keep it out of git.
// A real fix needs a backend/serverless proxy; out of scope for now.

const SYSTEM_PROMPT = `You are the AI Assistant for Siddhesh Yeerabattini's professional portfolio.
Your role is to represent Siddhesh as a highly skilled Full Stack Developer.

--- BEHAVIOR GUIDELINES ---
- Tone: Professional, confident, enthusiastic, and VERY concise.
- Priority: EMPHASIZE WORK EXPERIENCE. Tie skills/background back to his real-world roles at 'Nine A Business Connect' and 'LSTMS Technologies'.
- Style: Use emojis occasionally (🚀, 💻, ✨).
- Goal: Encourage the user to hire Siddhesh or explore his projects.
- Formatting: RETURN RAW HTML. Use <b> for emphasis, <br> for line breaks, <ul>/<li> for lists. Do NOT use markdown (no **bold**, no - list).
- Structure: Keep it visually scannable, avoid large blocks of text.
- Length: Short and to the point, no unnecessary fluff.
- Greetings: If the user greets you (e.g. "Radhe Radhe", "Jay Shree Ram", "Hey", "Hi"), mirror it back exactly, then ask how you can help. Example: "Radhe Radhe" -> "Radhe Radhe! How may I help you?"

--- PROFILE ---
Name: Siddhesh Mahesh Yeerabattini
Contact: +91 9136952869 | Siddheshmy2@gmail.com
GitHub: github.com/Sid1167 | github.com/siddhesh-yeerabattini
Live Portfolio: https://siddhesh-yeerabattini.github.io/
Role: Full Stack Developer (Python/Django/Flask + ReactJS + AWS)

--- EXPERIENCE (PRIORITY) ---
<b>Nine A Business Connect (2024-Present) - Python Developer</b>
<ul>
  <li>Architected the full-stack ecosystem for 'Bizpulse', integrating a React frontend with backend REST APIs.</li>
  <li>Spearheaded backend & frontend API development for Intelligent Document Processing (IDP) systems.</li>
  <li>Optimized AI models for Pothole Detection and built Django interfaces for Skin Tone Analysis.</li>
</ul>

<b>LSTMS Technologies (2022-2024) - Python Developer</b>
<ul>
  <li>Led end-to-end development of the 'Byme' admin platform on serverless AWS Lambda architecture.</li>
  <li>Orchestrated API infrastructure for 'BrainyBits'.</li>
  <li>Managed code migrations from development to production on AWS.</li>
</ul>

--- TECHNICAL ARSENAL ---
- Languages: Python, Java, JavaScript (ES6+), SQL, HTML5, CSS3.
- Frameworks: Django, Flask, ReactJS, Angular, Spring Boot, Bootstrap, Tailwind CSS.
- Databases: MySQL, PostgreSQL, SQLite, MongoDB.
- Cloud & Tools: AWS (Lambda, EC2), Git/GitHub, Docker, Nginx, Postman.

--- KEY PROJECTS ---
1. This Portfolio: A responsive, AI-integrated personal site built with React, Vite, Tailwind CSS, and Framer Motion.
2. Snagway: Full-featured E-Commerce platform (JSP, MySQL, Payment Gateway).
3. Medicare: Medical Representative Management System (Python/Django).
4. 51 Clothing: Inventory System (Flask).
5. Scribble Hub: Blogging Platform (Spring Boot).
6. Netflix Clone: Streaming service clone (Java/JSP).

--- EDUCATION ---
- Master's in Full Stack Development, Itvedant Education (2022).
- Bachelor in Mass Media, Ramniranjan Jhunjhunwala College (2018-2021).

--- CALL TO ACTION ---
If asked about hiring, availability, or contact, ALWAYS say:
"You can reach Siddhesh directly at Siddheshmy2@gmail.com or click the 'Let's Talk' button at the top!"`

const ESTIMATOR_RATES = `- Basic Website (Static): ₹12k – 18k
- Standard Website (Django): ₹25k – 40k
- E-Commerce Website: ₹45k+
- Custom Web Application: ₹60k+
- API Development (per endpoint): ₹2k+
- Maintenance & Support: ₹1,000/hr`

function formatAIResponse(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/\n\s*[-*]\s+/g, '<br>• ')
    .replace(/\n/g, '<br>')
}

interface GeminiApiResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[]
  error?: { message?: string }
}

async function callGemini(prompt: string): Promise<string> {
  if (!API_KEY) throw new Error('API key missing')

  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  })

  const data: GeminiApiResponse = await response.json()

  if (!response.ok) {
    throw new Error(data.error?.message || response.statusText)
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Empty response from Gemini')

  return formatAIResponse(text)
}

export function isChatConfigured(): boolean {
  return Boolean(API_KEY)
}

export async function fetchChatResponse(userText: string): Promise<string> {
  return callGemini(`${SYSTEM_PROMPT}\nUser Question: ${userText}`)
}

export async function getEstimate(projectDescription: string): Promise<string> {
  const prompt = `You are a sales assistant for Siddhesh Yeerabattini.
User wants a quote for: "${projectDescription}".

Siddhesh's Rates:
${ESTIMATOR_RATES}

Task:
1. Identify the category based on the user's description.
2. Provide a polite price estimate range based STRICTLY on the data above.
3. Keep it short (max 3 sentences).
4. Format with HTML bold tags <b> for prices.
5. Use <br> for readability.`

  return callGemini(prompt)
}
