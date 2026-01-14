document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURATION LOADING ---
    let GEMINI_API_KEY = ""; // Default/fallback API Key (empty for security)

    // async function loadConfig() {
    //     // List of paths to try to find config.ini
    //     const possiblePaths = [
    //         '../../../config.ini',
    //         '../../config.ini',
    //         '../config.ini',
    //         './config.ini'
    //     ];

    //     for (const path of possiblePaths) {
    //         try {
    //             // We use method: 'HEAD' first to check existence without generating 404 console errors if possible, 
    //             // but standard fetch is simpler. We will just accept the console noise for now or suppress warnings.
    //             const response = await fetch(path);
    //             if (response.ok) {
    //                 const text = await response.text();
    //                 const lines = text.split('\n');
    //                 for (const line of lines) {
    //                     const match = line.match(/^\s*GEMINI_API_KEY\s*=\s*(.*)$/);
    //                     if (match) {
    //                         const loadedKey = match[1].trim().replace(/^["']|["']$/g, "");
    //                         if (loadedKey) {
    //                             GEMINI_API_KEY = loadedKey;
    //                             console.log(`✅ AI Config Loaded from ${path}`);
    //                             return;
    //                         }
    //                     }
    //                 }
    //             }
    //         } catch (error) {
    //             // Continue to next path silently
    //         }
    //     }
    //     console.log("ℹ️ No config.ini found. Using default/fallback API Key.");
    // }

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
            chatWindow.classList.remove('hidden');
            void chatWindow.offsetWidth; 
            chatWindow.classList.remove('closed');
            chatWindow.classList.add('open');
            if(notification) notification.classList.add('hidden');
            setTimeout(() => chatInput.focus(), 300);
        } else {
            chatWindow.classList.remove('open');
            chatWindow.classList.add('closed');
            setTimeout(() => chatWindow.classList.add('hidden'), 400);
        }
    }

    if(chatbotToggle) {
        chatbotToggle.addEventListener('click', toggleChat);
        closeChat.addEventListener('click', toggleChat);

        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (!message) return;

            addMessage('user', message);
            chatInput.value = '';
            
            const typingId = addTypingIndicator();

            try {
                if (!GEMINI_API_KEY) throw new Error("API Key missing");
                const response = await fetchGeminiResponse(message);
                removeMessage(typingId);
                addMessage('bot', response);
            } catch (error) {
                removeMessage(typingId);
                console.error("Chatbot Error:", error);
                const errorMsg = !GEMINI_API_KEY 
                    ? "I'm offline. Please check your API key." 
                    : `Connection Error: ${error.message}`;
                addMessage('bot', errorMsg);
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
        estimatorBtn.addEventListener('click', () => {
            estimatorModal.classList.remove('hidden');
            setTimeout(() => {
                estimatorModal.classList.remove('opacity-0');
                estimatorModal.querySelector('div').classList.remove('scale-95');
                estimatorModal.querySelector('div').classList.add('scale-100');
            }, 10);
        });

        const closeModal = () => {
            estimatorModal.classList.add('opacity-0');
            estimatorModal.querySelector('div').classList.remove('scale-100');
            estimatorModal.querySelector('div').classList.add('scale-95');
            setTimeout(() => estimatorModal.classList.add('hidden'), 300);
        };

        if(closeEstimator) closeEstimator.addEventListener('click', closeModal);
        if(estimatorModal) estimatorModal.addEventListener('click', (e) => {
            if(e.target === estimatorModal) closeModal();
        });

        if(analyzeBtn) {
            analyzeBtn.addEventListener('click', async () => {
                const desc = projectDesc.value.trim();
                if(!desc) return;

                analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
                
                try {
                    if (!GEMINI_API_KEY) throw new Error("API Key missing");
                    const result = await getQuoteFromGemini(desc);
                    estimateResult.innerHTML = result;
                    estimateResult.classList.remove('hidden');
                    analyzeBtn.innerHTML = '<span>Analyze Estimate</span><i class="fas fa-calculator"></i>';
                } catch(e) {
                    console.error("Estimator Error:", e);
                    // Show the ACTUAL error message to the user
                    estimateResult.innerHTML = `Error: ${e.message || "Could not connect to AI"}`;
                    estimateResult.classList.remove('hidden');
                    analyzeBtn.innerHTML = '<span>Analyze Estimate</span><i class="fas fa-calculator"></i>';
                }
            });
        }
    }

    // --- 4. HELPER FUNCTIONS ---
    function addMessage(role, text) {
        if (!chatMessages) return;
        const div = document.createElement('div');
        div.className = `flex gap-3 items-end message-enter ${role === 'user' ? 'justify-end' : 'justify-start'}`;
        
        let avatarHTML = '';
        if (role === 'bot') {
            avatarHTML = `
                <div class="w-8 h-8 rounded-full bg-grayBlue flex-shrink-0 flex items-center justify-center text-white text-xs border border-gray-200 shadow-sm overflow-hidden">
                     <div class="robot-container" style="transform: scale(0.5); animation: none;">
                        <div class="robot-antenna"></div>
                        <div class="robot-head">
                            <div class="robot-eyes"><div class="robot-eye"></div><div class="robot-eye"></div></div>
                        </div>
                    </div>
                </div>`;
        }
        const bubbleBase = "p-4 rounded-2xl text-sm shadow-sm max-w-[85%] leading-relaxed";
        const userStyle = "bg-brandOrange text-white rounded-br-none";
        const botStyle = "bg-white border border-gray-100 text-gray-600 rounded-bl-none";

        div.innerHTML = `${role === 'bot' ? avatarHTML : ''}<div class="${bubbleBase} ${role === 'user' ? userStyle : botStyle}">${text}</div>`;
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
                    <div class="robot-head"><div class="robot-eyes"><div class="robot-eye"></div><div class="robot-eye"></div></div></div>
                </div>
            </div>
            <div class="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none text-gray-500 shadow-sm flex gap-1 items-center h-12">
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return id;
    }

    function removeMessage(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function formatAIResponse(text) {
        if (!text) return "";
        text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        text = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
        text = text.replace(/\n\s*[-*]\s+/g, '<br>• ');
        text = text.replace(/\n/g, '<br>');
        return text;
    }

    // --- GEMINI API CALLS (UPDATED MODEL) ---
    async function fetchGeminiResponse(userText) {
        // UPDATED MODEL to standard flash
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
        
        const systemContext = `You are the AI Assistant for Siddhesh Yeerabattini's professional portfolio. 
        Your role is to represent Siddhesh as a highly skilled Full Stack Developer.
        
        --- BEHAVIOR GUIDELINES ---
        - Tone: Professional, confident, enthusiastic, and VERY concise.
        - Priority: EMPHASIZE WORK EXPERIENCE.
        - Formatting: RETURN RAW HTML (<b>, <br>, <ul>).
        - Length: Keep responses short and to the point.
        - Greetings: Mirror user greetings exactly (e.g., "Radhe Radhe" -> "Radhe Radhe! How may I help you?").

        --- PROFILE ---
        Name: Siddhesh Mahesh Yeerabattini
        Contact: +91 9136952869 | Siddheshmy2@gmail.com
        Role: Full Stack Developer (Python/Django/React/AWS)
        
        --- EXPERIENCE ---
        <b>Nine A Business Connect (2024-Present) - Python Developer</b>
        <ul>
           <li>Architected the full-stack ecosystem for 'Bizpulse'.</li>
           <li>Spearheaded backend & frontend API development for IDP systems.</li>
           <li>Optimized AI models for Pothole Detection.</li>
        </ul>
        <b>LSTMS Technologies (2022-2024) - Python Developer</b>
        <ul>
           <li>Led end-to-end development of the 'Byme' admin platform on AWS Lambda.</li>
           <li>Orchestrated complex API infrastructures for 'BrainyBits'.</li>
        </ul>

        --- SKILLS ---
        Python, Java, JavaScript, Django, Flask, ReactJS, AWS (Lambda), Docker.

        --- CALL TO ACTION ---
        If asked about hiring, say: "You can reach Siddhesh directly at Siddheshmy2@gmail.com!"
        `;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemContext + "\nUser Question: " + userText }] }]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(`Gemini API Error: ${errData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        let text = data.candidates[0].content.parts[0].text;
        return formatAIResponse(text);
    }

    async function getQuoteFromGemini(projectDescription) {
        // UPDATED MODEL to standard flash
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
        
        const prompt = `You are a sales assistant for Siddhesh Yeerabattini.
        User wants a quote for: "${projectDescription}".
        
        Siddhesh's Rates:
        - Basic Website (Static): ₹12k - 18k
        - Standard Website (Django): ₹25k - 40k
        - E-Commerce Website: ₹45k+
        - Custom Web Application: ₹60k+
        - API Development: ₹2k+ per endpoint
        - Maintenance & Support: ₹1,000/hr

        Task:
        1. Identify the category based on the user's description.
        2. Provide a polite price estimate range based STRICTLY on the data above.
        3. Keep it short (max 3 sentences).
        4. Format with HTML bold tags <b> for prices.
        5. Use <br> for readability.`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
             const errData = await response.json();
             throw new Error(`Gemini API Error: ${errData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        let text = data.candidates[0].content.parts[0].text;
        return formatAIResponse(text);
    }
});