document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const successDiv = document.getElementById("success");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // prevents actual form submission for demo
        successDiv.style.display = "flex"; // show success message
    });
});
(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top shadow-sm').css('top', '0px');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow-sm').css('top', '-100px');
        }
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 500,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });



    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-arrow-right"></i>',
            '<i class="fa fa-arrow-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);
// Blog Comments JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Sample comments data - in a real application, this would come from a database
    const commentsData = {
        1: [
            {
                id: 1,
                author: "Dr. Sarah Johnson",
                date: "2026-01-13",
                text: "Thank you for sharing this, Rajan. Your journey resonates with so many people dealing with anxiety. The grounding techniques you mentioned are evidence-based and really effective."
            },
            {
                id: 2,
                author: "Maya Sharma",
                date: "2026-01-14",
                text: "I've been struggling with panic attacks too. Could you share more about the specific grounding exercises that helped you the most?"
            },
            {
                id: 3,
                author: "James Wilson",
                date: "2026-01-15",
                text: "This gives me hope. I'm just starting my journey with anxiety management. Thank you for being so open about your experience."
            },
            {
                id: 4,
                author: "Priya Patel",
                date: "2026-01-16",
                text: "Five years is a long journey, but you made it through! Your story is inspiring and shows that recovery is possible."
            }
        ],
        2: [
            {
                id: 1,
                author: "Michael Chen",
                date: "2026-01-24",
                text: "Mara, your perspective on therapy being a lifeline rather than luxury is so important. Mental health should be prioritized just like physical health."
            },
            {
                id: 2,
                author: "Dr. Lisa Rodriguez",
                date: "2026-01-25",
                text: "As a therapist, I appreciate you sharing this. The therapeutic relationship truly is transformative when there's consistency and trust."
            },
            {
                id: 3,
                author: "Alex Thompson",
                date: "2026-01-26",
                text: "Thank you for destigmatizing therapy. Your words might encourage someone who's hesitating to take that first step."
            }
        ],
        3: [
            {
                id: 1,
                author: "Carlos Mendez",
                date: "2026-02-18",
                text: "Peer support groups have been game-changers for me too, Emily. There's something powerful about shared experiences and mutual understanding."
            },
            {
                id: 2,
                author: "Rachel Kim",
                date: "2026-02-19",
                text: "I've been thinking about joining a support group but feel nervous. Your experience gives me courage to try it out."
            }
        ],
        4: [
            {
                id: 1,
                author: "Jennifer Walsh",
                date: "2026-03-03",
                text: "Arun, I love how you've integrated mindfulness into your workday. Ten minutes can make such a huge difference. I'm going to try this approach!"
            }
        ],
        5: [
            {
                id: 1,
                author: "Dr. Amanda Foster",
                date: "2026-03-09",
                text: "Sofia, your resilience is remarkable. Art therapy and guided imagery are wonderful tools for trauma recovery. Thank you for sharing your healing journey."
            },
            {
                id: 2,
                author: "Marcus Johnson",
                date: "2026-03-10",
                text: "Your words about healing being a journey, not a destination, really hit home. Thank you for the reminder to be patient with ourselves."
            },
            {
                id: 3,
                author: "Isabella Garcia",
                date: "2026-03-11",
                text: "Community art projects sound amazing! I'm inspired to look for creative healing opportunities in my area."
            },
            {
                id: 4,
                author: "David Park",
                date: "2026-03-12",
                text: "Thank you for showing that joy can be reclaimed even after trauma. Your story gives hope to others on similar journeys."
            },
            {
                id: 5,
                author: "Nina Patel",
                date: "2026-03-13",
                text: "The small moments of joy you mention are so precious. Sometimes we overlook them, but they're often where healing begins."
            }
        ],
        6: [
            {
                id: 1,
                author: "Sarah Mitchell",
                date: "2026-03-16",
                text: "Liam, your digital detox journey is so relevant in today's world. I've noticed my anxiety levels decrease when I limit my screen time too."
            },
            {
                id: 2,
                author: "Tom Bradley",
                date: "2026-03-17",
                text: "30 minutes a day seems challenging but doable. Did you gradually reduce your screen time or go cold turkey?"
            },
            {
                id: 3,
                author: "Emma Wilson",
                date: "2026-03-18",
                text: "Journaling and deep breathing are such underrated practices. Thanks for the reminder to get back to these basics!"
            }
        ]
    };

    let currentBlogId = null;

    // Add click event listeners to comment links
    document.querySelectorAll('.comment-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogId = this.getAttribute('data-blog-id');
            currentBlogId = blogId;
            showComments(blogId);
        });
    });

    // Function to show comments in modal
    function showComments(blogId) {
        const modal = new bootstrap.Modal(document.getElementById('commentsModal'));
        const commentsContainer = document.getElementById('commentsContainer');
        const blogTitles = {
            1: "Finding Calm When My Heart Won't Slow Down",
            2: "Why Therapy Is My Lifeline, Not a Luxury", 
            3: "Together We Thrive: Peer Support in Recovery",
            4: "Mindfulness at Work: A Daily Reset",
            5: "Building Resilience After Trauma",
            6: "Digital Detox & Mental Clarity"
        };
        
        // Update modal title
        document.getElementById('commentsModalLabel').textContent = `Comments - ${blogTitles[blogId]}`;
        
        // Clear previous comments
        commentsContainer.innerHTML = '';
        
        // Get comments for this blog
        const comments = commentsData[blogId] || [];
        
        if (comments.length === 0) {
            commentsContainer.innerHTML = `
                <div class="no-comments">
                    <i class="fas fa-comments"></i>
                    <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
            `;
        } else {
            comments.forEach(comment => {
                const commentHtml = createCommentHtml(comment);
                commentsContainer.appendChild(commentHtml);
            });
        }
        
        modal.show();
    }

    // Function to create comment HTML element
    function createCommentHtml(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        commentDiv.innerHTML = `
            <div class="comment-author">${comment.author}</div>
            <div class="comment-date">${formatDate(comment.date)}</div>
            <p class="comment-text">${comment.text}</p>
        `;
        return commentDiv;
    }

    // Function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Handle new comment submission
    document.getElementById('submitComment').addEventListener('click', function() {
        const nameInput = document.getElementById('commentName');
        const textInput = document.getElementById('commentText');
        
        const name = nameInput.value.trim();
        const text = textInput.value.trim();
        
        if (!name || !text) {
            alert('Please fill in both your name and comment.');
            return;
        }
        
        // Create new comment object
        const newComment = {
            id: Date.now(), // Simple ID generation
            author: name,
            date: new Date().toISOString().split('T')[0], // Today's date
            text: text
        };
        
        // Add comment to data structure
        if (!commentsData[currentBlogId]) {
            commentsData[currentBlogId] = [];
        }
        commentsData[currentBlogId].push(newComment);
        
        // Create and add comment to DOM
        const commentElement = createCommentHtml(newComment);
        commentElement.classList.add('new-comment');
        
        const commentsContainer = document.getElementById('commentsContainer');
        
        // Remove "no comments" message if it exists
        const noCommentsDiv = commentsContainer.querySelector('.no-comments');
        if (noCommentsDiv) {
            noCommentsDiv.remove();
        }
        
        // Add new comment to the end
        commentsContainer.appendChild(commentElement);
        
        // Update comment count in blog card
        const commentLink = document.querySelector(`[data-blog-id="${currentBlogId}"]`);
        if (commentLink) {
            const currentCount = commentsData[currentBlogId].length;
            commentLink.innerHTML = `<span class="fa fa-comment-alt text-primary"></span> ${currentCount} Comment${currentCount !== 1 ? 's' : ''}`;
        }
        
        // Clear form
        nameInput.value = '';
        textInput.value = '';
        
        // Scroll to new comment
        commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Show success message
        showSuccessMessage();
    });

    // Function to show success message
    function showSuccessMessage() {
        // Create and show a temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
        successDiv.innerHTML = `
            <strong>Thank you!</strong> Your comment has been added successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.appendChild(successDiv);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    }

    // Clear form when modal is hidden
    document.getElementById('commentsModal').addEventListener('hidden.bs.modal', function() {
        document.getElementById('commentName').value = '';
        document.getElementById('commentText').value = '';
        
        // Remove any success messages
        const successAlerts = this.querySelectorAll('.alert-success');
        successAlerts.forEach(alert => alert.remove());
    });

    // Add enter key support for comment submission
    document.getElementById('commentText').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            document.getElementById('submitComment').click();
        }
    });

    // Add character counter for comment text
    const commentTextArea = document.getElementById('commentText');
    const maxLength = 500;
    
    // Create character counter element
    const charCounter = document.createElement('small');
    charCounter.className = 'text-muted';
    charCounter.textContent = `0/${maxLength} characters`;
    commentTextArea.parentNode.appendChild(charCounter);
    
    commentTextArea.addEventListener('input', function() {
        const length = this.value.length;
        charCounter.textContent = `${length}/${maxLength} characters`;
        
        if (length > maxLength) {
            charCounter.classList.remove('text-muted');
            charCounter.classList.add('text-danger');
            this.style.borderColor = '#dc3545';
        } else {
            charCounter.classList.remove('text-danger');
            charCounter.classList.add('text-muted');
            this.style.borderColor = '';
        }
    });
    
    // Set maxlength attribute
    commentTextArea.setAttribute('maxlength', maxLength);
});
document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let query = document.getElementById("searchInput").value.toLowerCase();
    let resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    if (query.trim() === "") {
        resultsContainer.innerHTML = "<li>No search term entered.</li>";
        return;
    }

    // Grab all sections with IDs
    let sections = document.querySelectorAll("[id]");
    let found = false;

    sections.forEach(section => {
        let id = section.id;
        let text = section.textContent.toLowerCase();

        if (id.includes(query) || text.includes(query)) {
            let li = document.createElement("li");
            li.innerHTML = `<a href="#${id}">${id}</a>`;
            resultsContainer.appendChild(li);
            found = true;
        }
    });

    if (!found) {
        resultsContainer.innerHTML = "<li>No results found.</li>";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const successDiv = document.getElementById("success");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // prevents actual form submission for demo
        successDiv.style.display = "flex"; // show success message
    });
});
let rooms = {};
let currentRoom = null;

// Mental health support responses database
const responses = {
  greetings: [
    "Hello! I'm here to provide a safe space for you to share your thoughts and feelings. How are you doing today?",
    "Hi there! Thank you for reaching out. I'm here to listen and support you. What's on your mind?",
    "Welcome! I'm glad you're here. This is a judgment-free space where you can express yourself freely. How can I help you today?"
  ],
  
  anxiety: [
    "I understand you're feeling anxious. Anxiety can be overwhelming, but you're not alone. Try taking slow, deep breaths - in for 4 counts, hold for 4, out for 4. Can you tell me more about what's making you feel this way?",
    "Anxiety is really challenging to deal with. One technique that often helps is grounding - try naming 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. What triggered these feelings?",
    "Thank you for sharing that you're feeling anxious. Your feelings are completely valid. Sometimes it helps to remind ourselves that feelings are temporary - they come and go like waves. Would you like to talk about what's contributing to your anxiety?"
  ],
  
  sadness: [
    "I hear that you're going through a difficult time. Sadness is a natural human emotion, and it's okay to feel this way. You don't have to face this alone. What's been weighing on your heart?",
    "It takes courage to acknowledge when we're struggling with sadness. Your feelings matter, and so do you. Sometimes talking about what's bothering us can help lighten the emotional load. What's been on your mind?",
    "Sadness can feel heavy and all-consuming. Please know that it's okay to not be okay sometimes. You're taking a positive step by reaching out. Would you like to share what's been making you feel sad?"
  ],
  
  stress: [
    "Stress can really take a toll on both our mental and physical well-being. You're doing the right thing by recognizing it and seeking support. What are the main sources of stress in your life right now?",
    "I understand you're feeling stressed. When we're overwhelmed, it can help to break things down into smaller, manageable pieces. What's the biggest stressor you're facing right now?",
    "Stress is your body's way of responding to demands, and it sounds like you're dealing with quite a bit. Remember, you don't have to handle everything at once. What's been causing you the most stress lately?"
  ],
  
  loneliness: [
    "Feeling lonely can be really painful, but please remember that reaching out here shows incredible strength. You're not as alone as you might feel. What's been making you feel isolated?",
    "Loneliness is one of the most difficult emotions to experience. Thank you for trusting me with these feelings. Even though I'm not physically present, I want you to know that you're heard and valued. What's contributing to these feelings of loneliness?",
    "I'm sorry you're feeling lonely. It's important to remember that loneliness is about the quality of connections, not just the quantity. You matter, and your feelings are valid. What would help you feel more connected right now?"
  ],
  
  overwhelmed: [
    "Feeling overwhelmed is exhausting, and I can understand how that might feel paralyzing. You're not alone in this. Sometimes it helps to focus on just the next small step rather than the whole mountain. What's making you feel most overwhelmed right now?",
    "When everything feels like too much, it's completely normal to feel overwhelmed. You're showing strength by reaching out for support. Let's try to break down what you're dealing with - what feels like the most pressing concern?",
    "Being overwhelmed can make everything seem impossible to manage. Take a deep breath with me. You don't have to solve everything today. What's one thing that's been weighing heavily on you?"
  ],
  
  sleep: [
    "Sleep troubles can really impact our mental health and daily functioning. You're not alone in struggling with this. What's been keeping you awake - racing thoughts, physical discomfort, or something else?",
    "Difficulty sleeping can be both a symptom and a cause of stress and anxiety. It's a common struggle. Have you tried any relaxation techniques before bed, or is something specific keeping your mind active at night?",
    "Sleep issues can make everything else feel harder to handle. Your concern about this is completely valid. What does your bedtime routine look like, and what thoughts typically go through your mind when you're trying to fall asleep?"
  ],
  
  crisis: [
    "I'm really concerned about what you're sharing. If you're having thoughts of hurting yourself or others, please reach out to professionals immediately: Call 988 for the Suicide & Crisis Lifeline, or 911 for immediate emergency help. You don't have to go through this alone, and there are people who want to help you.",
    "What you're describing sounds very serious, and I want to make sure you get proper support. Please contact emergency services (911) or the crisis lifeline (988) right away. Your life has value, and there are trained professionals who can help you through this difficult time.",
    "I'm worried about your safety based on what you've shared. This is more than I can help with, but trained crisis counselors can. Please call 988 (Suicide & Crisis Lifeline) or 911 immediately. You deserve support and care."
  ],
  
  general_support: [
    "Thank you for sharing that with me. Your feelings are completely valid, and it takes courage to open up. What feels most important for you to talk about right now?",
    "I hear you, and I want you to know that your experiences matter. You're not alone in whatever you're going through. How has this been affecting your daily life?",
    "It sounds like you're dealing with something challenging. I'm here to listen without judgment. What would be most helpful for you in this conversation?",
    "I appreciate you trusting me with your thoughts and feelings. You've taken a brave step by reaching out. What kind of support would feel most helpful to you right now?"
  ],
  
  resources: [
    "Here are some resources that might help: 988 Suicide & Crisis Lifeline (call or text 988), Crisis Text Line (text HOME to 741741), NAMI Helpline (1-800-950-6264). Would you like me to help you think through next steps?",
    "Remember, professional help is available when you need it. Some options include: your doctor, a licensed therapist, employee assistance programs through work, or community mental health centers. What feels like the most comfortable first step for you?",
    "If you'd like to explore professional support, consider: Psychology Today's therapist directory, your insurance provider's mental health network, university counseling centers if you're a student, or telehealth platforms. What barriers, if any, do you face in seeking professional help?"
  ]
};

// Keywords to response mapping
const keywordMap = {
  'anxiety': 'anxiety',
  'anxious': 'anxiety',
  'worried': 'anxiety', 
  'panic': 'anxiety',
  'nervous': 'anxiety',
  
  'sad': 'sadness',
  'depressed': 'sadness',
  'down': 'sadness',
  'upset': 'sadness',
  'crying': 'sadness',
  
  'stress': 'stress',
  'stressed': 'stress',
  'pressure': 'stress',
  'overwhelm': 'overwhelmed',
  'overwhelmed': 'overwhelmed',
  'too much': 'overwhelmed',
  
  'lonely': 'loneliness',
  'alone': 'loneliness',
  'isolated': 'loneliness',
  'disconnected': 'loneliness',
  
  'sleep': 'sleep',
  'insomnia': 'sleep',
  'tired': 'sleep',
  'exhausted': 'sleep',
  'can\'t sleep': 'sleep',
  
  'kill': 'crisis',
  'suicide': 'crisis',
  'hurt myself': 'crisis',
  'end it': 'crisis',
  'die': 'crisis',
  'harm': 'crisis',
  
  'hello': 'greetings',
  'hi': 'greetings',
  'hey': 'greetings',
  'help': 'general_support'
};

function analyzeMessage(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check for crisis keywords first
  for (let keyword of ['kill', 'suicide', 'hurt myself', 'end it', 'die', 'harm']) {
    if (lowerMessage.includes(keyword)) {
      return 'crisis';
    }
  }
  
  // Check other keywords
  for (let [keyword, category] of Object.entries(keywordMap)) {
    if (lowerMessage.includes(keyword)) {
      return category;
    }
  }
  
  return 'general_support';
}

function getResponse(category) {
  const categoryResponses = responses[category] || responses['general_support'];
  const randomIndex = Math.floor(Math.random() * categoryResponses.length);
  return categoryResponses[randomIndex];
}

function joinRoom() {
  const roomInput = document.getElementById("roomNameInput");
  const roomName = roomInput.value.trim();
  if (!roomName) return;

  currentRoom = roomName;
  if (!rooms[currentRoom]) {
    rooms[currentRoom] = [];
    // Add welcome message for new rooms
    const welcomeMessage = {
      sender: "assistant",
      text: "Welcome to your private support space. I'm here to listen and provide a safe environment for you to share your thoughts and feelings. Everything we discuss is confidential. How are you feeling today?",
      time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    };
    rooms[currentRoom].push(welcomeMessage);
  }

  document.getElementById("currentRoom").innerText = "Room: " + currentRoom;
  document.getElementById("mainContainer").style.display = "flex";
  document.getElementById("quickResponses").style.display = "flex";

  renderMessages();
}

function renderMessages() {
  const messagesArea = document.getElementById("messagesArea");
  messagesArea.innerHTML = "";

  if (!currentRoom) return;
  const messages = rooms[currentRoom];

  messages.forEach(msg => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${msg.sender}`;
    
    const avatarSvg = msg.sender === 'user' ? 
      '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>' :
      '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/></svg>';
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatarSvg}</div>
      <div class="message-content">
        <div class="message-bubble">${msg.text}</div>
        <div class="message-time">${msg.time}</div>
      </div>
    `;
    messagesArea.appendChild(messageDiv);
  });

  messagesArea.scrollTop = messagesArea.scrollHeight;
}

function showTyping() {
  document.getElementById("typingIndicator").style.display = "flex";
}

function hideTyping() {
  document.getElementById("typingIndicator").style.display = "none";
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text || !currentRoom) return;

  const message = {
    sender: "user",
    text,
    time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
  };

  rooms[currentRoom].push(message);
  input.value = "";
  document.getElementById("sendButton").disabled = true;
  renderMessages();

  // Show typing indicator
  showTyping();

  // Generate contextual response
  setTimeout(() => {
    const category = analyzeMessage(text);
    const responseText = getResponse(category);
    
    const reply = {
      sender: "assistant",
      text: responseText,
      time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    };
    
    rooms[currentRoom].push(reply);
    hideTyping();
    renderMessages();
    
    // Add follow-up resources if crisis detected
    if (category === 'crisis') {
      setTimeout(() => {
        const resourceReply = {
          sender: "assistant",
          text: getResponse('resources'),
          time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
        };
        rooms[currentRoom].push(resourceReply);
        renderMessages();
      }, 2000);
    }
  }, 1500 + Math.random() * 1000); // Variable delay for more natural feel
}

function sendQuickResponse(text) {
  document.getElementById("messageInput").value = text;
  sendMessage();
}

// Handle Enter key in textarea
document.addEventListener('DOMContentLoaded', function() {
  const messageInput = document.getElementById('messageInput');
  
  messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // Auto-resize textarea
  messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });
  
  // Room name input Enter key
  document.getElementById('roomNameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      joinRoom();
    }
  });
});