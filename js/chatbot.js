/* ============================================================
   InnerNest - Support Assistant (client‑side logic)
   ============================================================ */

/* ========== Global Variables ==========
   All runtime state that is shared across the app            */
let messages = [];                 // chat history
let sessionStartTime = Date.now(); // timer reference
let currentMood = null;            // user&apos;s last selected mood
let isTyping = false;              // assistant typing indicator
let conversationContext = [];       // array of {role, content}

/* ========== Helpers (timers, UI utilities) ==========
   These are used by multiple functions below.            */
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true
  });
}

function setCurrentDate() {
  const journalDate = document.getElementById('journalDate');
  if (journalDate) {
    journalDate.textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}

/* ========== Page Lifecycle ==========
   Wire up event listeners & initialise chat UI.           */
document.addEventListener('DOMContentLoaded', () => {
  initializeChat();   // show welcome bot message
  startSessionTimer(); // update session duration every second
  setupEventListeners();
  setCurrentDate();
});

/* ========== Chat Initialization ==========
   On load show a random greeting from the bot.            */
function initializeChat() {
  const welcomeMessages = [
    "Hello! I'm here to listen and support you. How are you feeling today?",
    "Welcome to InnerNest. This is a safe space where you can express yourself freely. What's on your mind?",
    "Hi there! I'm your support assistant. Whether you need someone to talk to or just want to vent, I'm here for you."
  ];
  setTimeout(() => {
    const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    addMessage('assistant', welcomeMessage);
  }, 1000);
}

/* ========== Session Timer ==========
   Updates the clock in the sidebar every second.          */
function startSessionTimer() {
  setInterval(() => {
    const elapsed = Date.now() - sessionStartTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    document.getElementById('sessionTimer').textContent =
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

/* ========== DOM Event Wiring ==========
   Handles message input & sending logic.                   */
function setupEventListeners() {
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');

  // Submit on <Enter> (unless Shift+Enter is used for newline)
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto‑resize textarea
  messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
  });
}

/* ========== Messaging Logic ========== */

/**
 * Send a user typed message
 */
function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();

  if (!message) return; // ignore empty lines

  addMessage('user', message);
  input.value = '';
  input.style.height = 'auto';

  // Hide prompts after first message
  const prompts = document.getElementById('suggestedPrompts');
  if (prompts) prompts.style.display = 'none';

  // Let the assistant "think"
  showTypingIndicator();
  setTimeout(() => {
    const response = generateResponse(message);
    hideTypingIndicator();
    addMessage('assistant', response);
  }, 1500 + Math.random() * 1500);
}

/**
 * Pre‑fill the input with a quick prompt
 */
function sendPrompt(prompt) {
  const input = document.getElementById('messageInput');
  input.value = prompt;
  sendMessage();
}

/**
 * Append a message to the conversation display
 */
function addMessage(sender, content) {
  const container = document.getElementById('messagesContainer');

  // Remove the initial welcome message once user sends a message
  const welcomeMsg = container.querySelector('.welcome-message');
  if (welcomeMsg) welcomeMsg.remove();

  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = `
    <div class="message-avatar">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </div>
    <div class="message-content">
      ${content}
      <div class="message-time">${getCurrentTime()}</div>
    </div>
  `;

  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;

  // Store in history for future context
  messages.push({ sender, content, timestamp: Date.now() });
  conversationContext.push({ role: sender === 'user' ? 'user' : 'assistant', content });
}

/* ========== Response Generator ==========
   Returns a supportive message based on user text.         */
function generateResponse(userMessage) {
  const lower = userMessage.toLowerCase();

  // Crisis detection
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'harm myself', 'self-harm'
  ];
  if (crisisKeywords.some(k => lower.includes(k))) {
    return generateCrisisResponse();
  }

  // Topic‑specific replies
  if (lower.includes('anxious') || lower.includes('anxiety')) return generateAnxietyResponse();
  if (lower.includes('sad') || lower.includes('depressed')) return generateDepressionResponse();
  if (lower.includes('sleep') || lower.includes('insomnia')) return generateSleepResponse();
  if (lower.includes('overwhelmed') || lower.includes('stress')) return generateStressResponse();
  if (lower.includes('lonely') || lower.includes('alone')) return generateLonelinessResponse();

  // Default empathetic response
  const defaults = [
    "Thank you for sharing that. It sounds challenging. Tell me more about how it affects you.",
    "I hear you. It’s normal to feel that way. What has been on your mind lately?",
    "You’re not alone in this. Let’s unpack it together. What’s the most pressing thing for you right now?"
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

/* ========== Specialized Response Handlers ========== */
function generateCrisisResponse() {
  return `
    I’m really concerned about what you’ve shared. Your feelings matter, and you deserve help.
    
    <strong>Immediate options:</strong><br>
    • Call <strong>988</strong> (Suicide & Crisis Lifeline) – available 24/7<br>
    • Text "HELLO" to <strong>741741</strong> (Crisis Text Line)<br>
    • If you’re in danger, call <strong>911</strong> or go to the nearest emergency department.
    
    You don’t have to face this alone. Would you like to talk more about what’s driving these thoughts?
  `;
}

function generateAnxietyResponse() {
  const replies = [
    "Anxiety can feel overwhelming, but it’s temporary. Let’s try a quick 4-7-8 breathing exercise. Would you like to do it together, or would you prefer to talk about it?",
    "Feeling anxious can be tough. Can we explore what’s triggering that? Identifying the sources can reduce the intensity.",
    "I understand anxiety can be intrusive. Notice your breathing and give each breath a calm rhythm. What’s on your mind right now?"
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

function generateDepressionResponse() {
  const replies = [
    "I’m sorry you’re feeling this way. Depression can make everything feel heavy, but it’s not permanent. What simple pleasure could you re‑introduce today?",
    "Thank you for sharing. Depression often feels like a thick fog. Let’s carve out tiny daily achievements to lift it, even a short walk or a favorite song.",
    "Your experience is valid. Depression isn’t a sign of weakness. How can we support your emotional needs right now?"
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

function generateSleepResponse() {
  const replies = [
    "Sleep problems can be exhausting. What routine do you usually follow? Small changes—like a consistent bedtime or dimming lights—can improve quality.",
    "I get how tired it feels to be awake at odd hours. Have you noticed any patterns? Writing a quick sleep diary might reveal triggers.",
    "Good sleep is essential. Would you like a guided relaxation, or tips on sleep hygiene?"
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

function generateStressResponse() {
  const replies = [
    "Feeling overwhelmed is perfectly natural when you have a lot on your plate. What’s the top priority right now?",
    "Stress can feel like a relentless weight. What can you delegate or postpone? You’re allowed to take a breather.",
    "Let’s break this down. Which tasks feel urgent, and which can wait? The control you hold matters."
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

function generateLonelinessResponse() {
  const replies = [
    "Loneliness can be hard, but reaching out shows strength. What kind of connection do you crave right now—talk, activity, or support?",
    "Feeling alone is common. Does a hobby or group activity help you feel connected in the past?",
    "I’m here to listen. How might you start building small, meaningful contacts?"
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

/* ========== Typing Indicator ========== */
function showTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  indicator.classList.add('active');
  isTyping = true;
}

function hideTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  indicator.classList.remove('active');
  isTyping = false;
}

/* ========== Mood Tracking ========== */
function setMood(mood) {
  currentMood = mood;

  // UI toggle
  document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
  const active = document.querySelector(`.mood-btn[data-mood="${mood}"]`);
  if (active) active.classList.add('active');

  // Cue assistant
  const moodResponses = {
    happy: "I’m glad you’re feeling positive today! What’s making you smile?",
    calm: "It’s lovely to hear you’re calm. What helped you get to that place?",
    anxious: "I hear you’re feeling anxious. Would you like to talk about it or try a calming exercise?",
    sad: "I’m sorry you’re feeling down. What’s weighing on your heart?",
    angry: "I can sense that anger. Would you like to share what’s frustrating you?"
  };

  const txt = moodResponses[mood];
  if (txt) {
    setTimeout(() => addMessage('assistant', txt), 500);
  }
}

/* ========== Quick Tools ========== */

/* Breathing Exercise */
function startBreathingExercise() {
  const modal = document.getElementById('breathingModal');
  modal.classList.add('active');
}

function closeBreathingExercise() {
  const modal = document.getElementById('breathingModal');
  modal.classList.remove('active');
  const circle = document.getElementById('breathingCircle');
  circle.className = 'breathing-circle';
  document.getElementById('breathingText').textContent = 'Ready';
}

function startBreathingAnimation() {
  const circle = document.getElementById('breathingCircle');
  const text = document.getElementById('breathingText');
  const instructions = document.getElementById('breathingInstructions');

  const cycle = [
    { phase: 'inhale', duration: 4000, text: 'Inhale', instruction: 'Breathe in slowly through your nose' },
    { phase: 'hold', duration: 7000, text: 'Hold', instruction: 'Hold your breath gently' },
    { phase: 'exhale', duration: 8000, text: 'Exhale', instruction: 'Breathe out slowly through your mouth' }
  ];

  let phaseIdx = 0;

  function advance() {
    if (!document.getElementById('breathingModal').classList.contains('active')) return;

    const p = cycle[phaseIdx];
    circle.className = `breathing-circle ${p.phase}`;
    text.textContent = p.text;
    instructions.textContent = p.instruction;
    phaseIdx = (phaseIdx + 1) % cycle.length;

    setTimeout(advance, p.duration);
  }

  advance();
}

/* Guided Meditation */
function startMeditation() {
  addMessage('assistant', "Let’s do a quick meditation. Sit comfortably, close your eyes if you wish. Take a deep breath in…and out. Focus on your breath. When your mind wanders, gently bring it back. I’ll check in soon. How are you feeling?");
}

/* Journal */
function showJournal() {
  const modal = document.getElementById('journalModal');
  modal.classList.add('active');
  setCurrentDate();
}

function closeJournal() {
  const modal = document.getElementById('journalModal');
  modal.classList.remove('active');
}

function saveJournalEntry() {
  const text = document.getElementById('journalText').value;
  if (!text.trim()) {
    alert('Your journal entry is empty.');
    return;
  }

  // Dummy persistence – in a real app you would call your backend here
  const entry = {
    date: new Date().toISOString(),
    content: text,
    mood: currentMood
  };
  console.log('Journal entry saved:', entry);

  addMessage('assistant', "Your journal entry has been saved. It’s powerful to express feelings in words. How do you feel after writing that?");
  closeJournal();
  document.getElementById('journalText').value = '';
}

/* Coping Strategies */
function showCopingStrategies() {
  const strategies = `
    <strong>🫁 Deep Breathing:</strong> 4‑7‑8 breathing (inhale 4s, hold 7s, exhale 8s).<br>
    <strong>🚶 Physical Activity:</strong> A short walk or stretches can reset mood.<br>
    <strong>🎵 Music:</strong> Calming or uplifting songs that resonate with you.<br>
    <strong>📝 Journaling:</strong> Write freely without judgment.<br>
    <strong>🧊 Cold Water:</strong> Splash cool water or hold an ice pack to anchor yourself.<br>
    <strong>5‑4‑3‑2‑1 Grounding:</strong> Identify 5 visible, 4 tactile, 3 audible, 2 scents, 1 taste items around you.<br>
    <strong>📞 Social Connection:</strong> Call a trusted friend or family member. They can help shift perspective.<br>
  `;
  addMessage('assistant', strategies);
}

/* ========== Attach File (Placeholder) ========== */
function attachFile() {
  // Create a hidden file input; works in most browsers
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.style.display = 'none';
  input.addEventListener('change', () => {
    const files = Array.from(input.files);
    if (files.length) {
      files.forEach(f => {
        addMessage('assistant', `<em>Attachment received: ${f.name}</em>`);
      });
    }
  });
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
}

/* ========== Voice Input (Very Basic / Placeholder) ========== */
function toggleVoiceInput() {
  // Basic demo: use web speech API if available
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert('Speech recognition is not supported in this browser.');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SpeechRecognition();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  rec.start();
  rec.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    document.getElementById('messageInput').value = transcript;
  };
  rec.onerror = () => alert('Voice recognition error. Try again.');
}

/* ========== Navigation Stubs (Replace with real content if available) ========== */
function showResources()     { alert('Resources page – to be added.'); }
function showAbout()        { alert('About page – to be added.'); }
function showEmergencyContacts() { alert('Emergency contacts page – to be added.'); }

/* ========== Crisis Banner Close ========== */
function closeCrisisBanner() {
  const banner = document.getElementById('crisisBanner');
  if (banner) banner.style.display = 'none';
}

/* ========== Clear Chat ==========
   Resets the conversation and UI.                      */
function clearChat() {
  if (!confirm('Are you sure you want to clear the chat history? This cannot be undone.')) return;

  // Reset state variables
  messages = [];
  conversationContext = [];
  currentMood = null;
  sessionStartTime = Date.now();

  // Clear UI
  const container = document.getElementById('messagesContainer');
  container.innerHTML = ''; // we'll add the welcome message next
  initializeChat();         // re‑insert initial welcome

  // Hide any modals or tips
  document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));

  // Reset prompts
  const prompts = document.getElementById('suggestedPrompts');
  if (prompts) prompts.style.display = '';
}
