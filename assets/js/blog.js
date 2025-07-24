// assets/js/blog.js
// 블로그 프론트엔드 기능 (브라우저에서 실행)

// ===================================
// Blog Post Filtering
// ===================================
function filterPosts(category) {
    event.preventDefault();
    const posts = document.querySelectorAll('.blog-post');
    
    posts.forEach(post => {
        if (category === 'all' || post.dataset.category === category) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
    
    // Update active category style
    document.querySelectorAll('.blog-categories a').forEach(link => {
        link.style.background = '';
        link.style.color = '';
    });
    
    if (event.target.tagName === 'A') {
        event.target.style.background = '#f8f9fa';
        event.target.style.color = '#3498db';
    }
}

// ===================================
// Load Blog Posts from JSON (optional)
// ===================================
async function loadBlogPosts() {
    try {
        const response = await fetch('/assets/js/blog-posts.json');
        const data = await response.json();
        
        // Update post count if needed
        updatePostCounts(data.posts);
        
    } catch (error) {
        console.error('Failed to load blog posts:', error);
    }
}

// ===================================
// Update Post Counts
// ===================================
function updatePostCounts(posts) {
    const counts = {
        all: posts.length,
        tech: 0,        
        life: 0,        
        project: 0      
    };
    
    posts.forEach(post => {
        if (counts[post.category] !== undefined) {
            counts[post.category]++;
        }
    });
    
    // Update DOM
    Object.keys(counts).forEach(category => {
        const countElement = document.querySelector(`[onclick*="filterPosts('${category}')"] .post-count`);
        if (countElement) {
            countElement.textContent = counts[category];
        }
    });
}

// ===================================
// Initialize on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active category
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        filterPosts(category);
    }
    
    // Load blog posts data if available
    if (typeof loadBlogPosts === 'function') {
        loadBlogPosts();
    }
});

// ===================================
// Search Functionality (optional)
// ===================================
function searchPosts(query) {
    const posts = document.querySelectorAll('.blog-post');
    const searchTerm = query.toLowerCase();
    
    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        const tags = Array.from(post.querySelectorAll('.post-tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');
        
        const content = `${title} ${excerpt} ${tags}`;
        
        if (content.includes(searchTerm)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// ===================================
// Export functions for global use
// ===================================
window.blogFunctions = {
    filterPosts,
    searchPosts,
    loadBlogPosts,
    updatePostCounts
};