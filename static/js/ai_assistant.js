document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURATION LOADING ---
    let GEMINI_API_KEY = "AIzaSyCcNRSqZrxkNUDs5IBVeGfnIJNV8EBoV7Q";
    // let GEMINI_API_KEY = "AIzaSyCLM2JSe0ovOLwM_9s8vS4M5pIp5032jLs";

    // async function loadConfig() {
    //     try {
    //         // Attempt to fetch config.ini from the parent directory
    //         // Note: This requires a local server that serves the root directory
    //         const response = await fetch('./config.ini');
            
    //         if (!response.ok) {
    //             console.warn("Could not load ./config.ini. Checking local ./config.ini just in case...");
    //             // Fallback to local if parent fails (optional safety)
    //             const localResponse = await fetch('./config.ini');
    //             if(!localResponse.ok) throw new Error("Config file not found");
    //             var text = await localResponse.text();
    //         } else {
    //             var text = await response.text();
    //         }
            
    //         // Parse INI format
    //         const lines = text.split('\n');
    //         for (const line of lines) {
    //             // Look for GEMINI_API_KEY=...
    //             const match = line.match(/^\s*GEMINI_API_KEY\s*=\s*(.*)$/);
    //             if (match) {
    //                 // Remove quotes if present and trim whitespace
    //                 GEMINI_API_KEY = match[1].trim().replace(/^["']|["']$/g, "");
    //                 if(GEMINI_API_KEY) console.log("✅ AI Configuration Loaded");
    //                 break; 
    //             }
    //         }
    //     } catch (error) {
    //         console.error("⚠️ Config Error:", error);
    //         // We don't alert immediately, but the bot will complain if you try to use it.
    //     }
    // }

    
    // async function loadConfig() {
    //     try {
    //         const response = await fetch("./config.ini");

    //         if (!response.ok) {
    //             console.error("❌ Could not load config.ini");
    //             return;
    //         }

    //         const text = await response.text();

    //         console.log("📄 Loaded config.ini:\n", text);

    //         const lines = text.split("\n");
    //         for (const line of lines) {
    //             const match = line.match(/^\s*GEMINI_API_KEY\s*=\s*(.*)$/);
    //             if (match) {
    //                 GEMINI_API_KEY = match[1].trim().replace(/^["']|["']$/g, "");
    //                 break;
    //             }
    //         }

    //         console.log("🔑 Parsed GEMINI_API_KEY:", GEMINI_API_KEY || "(EMPTY)");

    //         if (!GEMINI_API_KEY) {
    //             console.warn("⚠️ GEMINI_API_KEY is empty. Chatbot will be offline.");
    //         } else {
    //             console.log("✅ API key loaded successfully.");
    //         }

    //     } catch (err) {
    //         console.error("❌ Config loading failed:", err);
    //     }
    // }

    // // Load config immediately
    // loadConfig();

    // --- 2. CHATBOT UI LOGIC ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const notification = document.getElementById('chat-notification');

    let isChatOpen = false;

    function toggleChat() {
        isChatOpen = !isChatOpen;
        
        if (isChatOpen) {
            // OPEN ANIMATION
            chatWindow.classList.remove('hidden');
            void chatWindow.offsetWidth; // Force reflow
            chatWindow.classList.remove('closed');
            chatWindow.classList.add('open');
            
            // Hide notification dot
            if(notification) notification.classList.add('hidden');
            
            // Focus input field
            setTimeout(() => chatInput.focus(), 300);
        } else {
            // CLOSE ANIMATION
            chatWindow.classList.remove('open');
            chatWindow.classList.add('closed');
            
            setTimeout(() => {
                chatWindow.classList.add('hidden');
            }, 400);
        }
    }

    if(chatbotToggle) {
        chatbotToggle.addEventListener('click', toggleChat);
        closeChat.addEventListener('click', toggleChat);

        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (!message) return;

            // Add User Message
            addMessage('user', message);
            chatInput.value = '';
            
            // Show Typing Indicator
            const typingId = addTypingIndicator();

            try {
                if (!GEMINI_API_KEY) throw new Error("API Key missing");
                
                const response = await fetchGeminiResponse(message);
                removeMessage(typingId);
                addMessage('bot', response);
            } catch (error) {
                removeMessage(typingId);
                const errorMsg = !GEMINI_API_KEY 
                    ? "I'm offline. Please add your API key to `config.ini`." 
                    : "I'm having trouble connecting to the server.";
                addMessage('bot', errorMsg);
                console.error(error);
            }
        });
    }


    // --- 3. PROJECT ESTIMATOR LOGIC ---
    const estimatorBtn = document.getElementById('estimator-btn');
    const estimatorModal = document.getElementById('estimator-modal');
    const closeEstimator = document.getElementById('close-estimator');
    const analyzeBtn = document.getElementById('analyze-btn');
    const projectDesc = document.getElementById('project-desc');
    const estimateResult = document.getElementById('estimate-result');

    if(estimatorBtn) {
        // Open Modal
        estimatorBtn.addEventListener('click', () => {
            estimatorModal.classList.remove('hidden');
            // Small delay for fade-in
            setTimeout(() => {
                estimatorModal.classList.remove('opacity-0');
                estimatorModal.querySelector('div').classList.remove('scale-95');
                estimatorModal.querySelector('div').classList.add('scale-100');
            }, 10);
        });

        // Close Modal Helper
        const closeModal = () => {
            estimatorModal.classList.add('opacity-0');
            estimatorModal.querySelector('div').classList.remove('scale-100');
            estimatorModal.querySelector('div').classList.add('scale-95');
            setTimeout(() => estimatorModal.classList.add('hidden'), 300);
        };

        if(closeEstimator) closeEstimator.addEventListener('click', closeModal);
        
        // Close on backdrop click
        if(estimatorModal) {
            estimatorModal.addEventListener('click', (e) => {
                if(e.target === estimatorModal) closeModal();
            });
        }

        // Analyze Button Click
        if(analyzeBtn) {
            analyzeBtn.addEventListener('click', async () => {
                const desc = projectDesc.value.trim();
                if(!desc) return;

                // Loading State
                analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
                
                try {
                    if (!GEMINI_API_KEY) throw new Error("API Key missing");

                    const result = await getQuoteFromGemini(desc);
                    estimateResult.innerHTML = result;
                    estimateResult.classList.remove('hidden');
                    
                    // Reset Button
                    analyzeBtn.innerHTML = '<span>Analyze Estimate</span><i class="fas fa-calculator"></i>';
                } catch(e) {
                    const errorMsg = !GEMINI_API_KEY 
                    ? "Error: API Key missing in config.ini" 
                    : "Error: Could not connect to AI.";
                    
                    estimateResult.innerHTML = errorMsg;
                    estimateResult.classList.remove('hidden');
                    analyzeBtn.innerHTML = '<span>Analyze Estimate</span><i class="fas fa-calculator"></i>';
                }
            });
        }
    }


    // --- 4. API & HELPER FUNCTIONS ---

    function addMessage(role, text) {
        if (!chatMessages) return;
        
        const div = document.createElement('div');
        div.className = `flex gap-3 items-end message-enter ${role === 'user' ? 'justify-end' : 'justify-start'}`;
        
        let avatarHTML = '';
        if (role === 'bot') {
            // Render the robot avatar for bot messages
            avatarHTML = `
                <div class="w-8 h-8 rounded-full bg-grayBlue flex-shrink-0 flex items-center justify-center text-white text-xs border border-gray-200 shadow-sm overflow-hidden">
                     <div class="robot-container" style="transform: scale(0.5); animation: none;">
                        <div class="robot-antenna"></div>
                        <div class="robot-head">
                            <div class="robot-eyes">
                                <div class="robot-eye"></div>
                                <div class="robot-eye"></div>
                            </div>
                        </div>
                    </div>
                </div>`;
        }

        const bubbleBase = "p-4 rounded-2xl text-sm shadow-sm max-w-[85%] leading-relaxed";
        const userStyle = "bg-brandOrange text-white rounded-br-none";
        const botStyle = "bg-white border border-gray-100 text-gray-600 rounded-bl-none";

        div.innerHTML = `
            ${role === 'bot' ? avatarHTML : ''}
            <div class="${bubbleBase} ${role === 'user' ? userStyle : botStyle}">
                ${text}
            </div>
        `;
        
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addTypingIndicator() {
        if (!chatMessages) return;
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = "flex gap-3 items-end message-enter justify-start";
        
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-grayBlue flex-shrink-0 flex items-center justify-center text-white text-xs border border-gray-200 shadow-sm overflow-hidden">
                 <div class="robot-container" style="transform: scale(0.5); animation: none;">
                    <div class="robot-antenna"></div>
                    <div class="robot-head">
                        <div class="robot-eyes">
                            <div class="robot-eye"></div>
                            <div class="robot-eye"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none text-gray-500 shadow-sm flex gap-1 items-center h-12">
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
        `;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return id;
    }

    function removeMessage(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    // Function to clean up response text for better HTML rendering
    function formatAIResponse(text) {
        if (!text) return "";
        
        // 1. Convert Bold (**text**) -> <b>text</b>
        text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        
        // 2. Convert Italic (*text*) -> <i>text</i>
        text = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
        
        // 3. Convert List Items (- Item) -> • Item with <br>
        // Regex looks for newlines followed by a dash/asterisk and space
        text = text.replace(/\n\s*[-*]\s+/g, '<br>• ');
        
        // 4. Convert remaining Newlines to <br> for spacing
        text = text.replace(/\n/g, '<br>');

        return text;
    }

    // Call Gemini API for General Chat
    async function fetchGeminiResponse(userText) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

        // --- BEHAVIOR GUIDELINES ---
        // - Tone: Professional, confident, enthusiastic, and VERY concise.
        // - Style: Use bullet points for lists. Use emojis occasionally to be friendly (🚀, 💻, ✨).
        // - Goal: Encourage the user to hire Siddhesh or explore his projects.
        // - Formatting: Use HTML bold tags <b> for emphasis. Do NOT use markdown asterisks like **bold**.
        // - Length: Keep responses short and to the point. Do not dilute the topic with unnecessary fluff.

        // --- EXPERIENCE ---
        // 1. Nine A Business Connect (2024-Present) - Python Developer
        //    - Developed 'Bizpulse' (React Frontend + Backend REST APIs).
        //    - Engineered IDP (Intelligent Document Processing) REST APIs.
        //    - Debugged Pothole detection models & developed Skin Tone Analysis frontends using Django.
           
        // 2. LSTMS Technologies (2022-2024) - Python Developer
        //    - Developed 'Byme' admin website (REST APIs + AWS Lambda).
        //    - Created APIs for 'BrainyBits'.
        //    - Managed seamless code migration from Dev to Prod & handled AWS Lambda deployments.

        // Detailed Resume Context & Strengthened Prompt
        const systemContext = `You are the AI Assistant for Siddhesh Yeerabattini's professional portfolio. 
        Your role is to represent Siddhesh as a highly skilled Full Stack Developer.

        --- BEHAVIOR GUIDELINES ---
        - Tone: Professional, confident, enthusiastic, and VERY concise.
        - Priority: EMPHASIZE WORK EXPERIENCE. When discussing skills or background, always tie them back to his real-world roles at 'Nine A Business Connect' and 'LSTMS Technologies'.
        - Style: Use emojis occasionally (🚀, 💻, ✨).
        - Goal: Encourage the user to hire Siddhesh or explore his projects.
        - Formatting: RETURN RAW HTML. 
          - Use <b> for emphasis. 
          - Use <br> for line breaks to create space.
          - Use <ul> and <li> for lists.
          - Do NOT use markdown (no **bold**, no - list).
        - Structure: Make the response visually appealing, scannable, and easy to read. Avoid large blocks of text.
        - Length: Keep responses short and to the point. Do not dilute the topic with unnecessary fluff.
        - Greetings: If the user greets (e.g., "Radhe Radhe", "Jay Shree Ram", "Hey", "Hi", "Hello"), greet them back in the EXACT same manner/words they used, followed by "How may I help you?". Example: User: "Radhe Radhe" -> You: "Radhe Radhe! How may I help you?"
                
        
        --- PROFILE ---
        Name: Siddhesh Mahesh Yeerabattini
        Contact: +91 9136952869 | Siddheshmy2@gmail.com
        GitHub: github.com/Sid1167 | github.com/siddhesh-yeerabattini
        Live Portfolio: https://siddhesh-yeerabattini.github.io/
        Role: Full Stack Developer (Specializing in Python/Django/Flask + ReactJS)
        
        --- EXPERIENCE (PRIORITY) ---
        <b>Nine A Business Connect (2024-Present) - Python Developer</b>
        <ul>
           <li>Architected the full-stack ecosystem for 'Bizpulse', seamlessly integrating React frontend with robust backend REST APIs.</li>
           <li>Spearheaded backend & frontend API development for Intelligent Document Processing (IDP) systems.</li>
           <li>Optimized critical AI models for Pothole Detection and developed sophisticated Django interfaces for Skin Tone Analysis.</li>
        </ul>
           
        <b>LSTMS Technologies (2022-2024) - Python Developer</b>
        <ul>
           <li>Led end-to-end development of the 'Byme' admin platform, engineering high-availability REST APIs deployed on serverless AWS Lambda architecture.</li>
           <li>Orchestrated complex API infrastructures for 'BrainyBits', ensuring optimal performance and scalability.</li>
           <li>Managed critical DevOps pipelines, executing flawless code migrations from development to production environments on AWS.</li>
        </ul>

        --- TECHNICAL ARSENAL ---
        - Languages: Python, Java (Core & Advance), JavaScript (ES6+), SQL, HTML5, CSS3.
        - Frameworks: Django, Flask, ReactJS, Angular, Spring Boot, Bootstrap, Tailwind CSS.
        - Databases: MySQL, PostgreSQL, SQLite, SSMS, MongoDB.
        - Cloud & Tools: AWS (Lambda, EC2), Git/GitHub, Docker, Nginx, Postman.

        --- KEY PROJECTS ---
        1. THIS PORTFOLIO (Current): A responsive, AI-integrated personal site built with HTML, Tailwind CSS, and Vanilla JS.
        2. Snagway: Full-featured E-Commerce platform (JSP, MySQL, Payment Gateway).
        3. Medicare: Medical Representative Management System (Python/Django).
        4. 51 Clothing: Inventory System (Flask).
        5. Scribble Hub: Blogging Platform (Spring Boot).
        6. Netflix Clone: Streaming service clone (Java/JSP).

        --- EDUCATION ---
        - Master's in Full Stack Development (Itvedant Education, 2022).
        - Bachelor in Mass Media (Ramniranjan Jhunjhunwala College, 2018-2021).
        
        --- CALL TO ACTION ---
        If asked about hiring, availability, or contact, ALWAYS say: 
        "You can reach Siddhesh directly at Siddheshmy2@gmail.com or click the 'Let's Talk' button at the top!"
        `;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemContext + "\nUser Question: " + userText }] }]
            })
        });

        const data = await response.json();
        let text = data.candidates[0].content.parts[0].text;
        
        // Clean up the text using our formatter function
        text = formatAIResponse(text);
        
        return text;
    }

    // Call Gemini API for Estimator
    async function getQuoteFromGemini(projectDescription) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
        
        const prompt = `You are a sales assistant for Siddhesh Yeerabattini.
        User wants a quote for: "${projectDescription}".
        
        Siddhesh's Rates:
        - Basic Website: ₹5k - 10k
        - Standard Site: ₹12k - 20k
        - E-Commerce: ₹45k+
        - Custom Web App: ₹50k+
        - API Endpoint: ₹1.5k+
        - Maintenance: ₹500/hr

        Task:
        1. Identify the category based on the user's description.
        2. Provide a polite price estimate range based STRICTLY on the data above.
        3. Keep it short (max 3 sentences).
        4. Format with HTML bold tags <b> for prices.`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        let text = data.candidates[0].content.parts[0].text;
        
        // Clean up the text using our formatter function
        text = formatAIResponse(text);
        
        return text;
    }
});