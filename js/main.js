
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



