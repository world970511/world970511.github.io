// ===================================
// Tab Navigation
// ===================================
function showTab(tabName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(tabName + '-section').classList.add('active');
    
    // Add active class to clicked tab if it's blog
    if (tabName === 'blog' && event.target.classList.contains('nav-tab')) {
        event.target.classList.add('active');
    }
    
    // Show/hide download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (tabName === 'resume') {
        downloadBtn.style.display = 'block';
    } else {
        downloadBtn.style.display = 'none';
    }
}

// ===================================
// Toggle Project Details
// ===================================
function toggleProjectDetails(button) {
    const projectSection = button.closest('.project-section');
    const details = projectSection.querySelector('.project-details');
    const isCollapsed = details.classList.contains('collapsed');
    
    if (isCollapsed) {
        details.classList.remove('collapsed');
        button.classList.add('expanded');
        // 다국어 지원
        if (window.multilingual && window.multilingual.getCurrentLang() === 'en') {
            button.textContent = 'Hide Details ◀';
        } else {
            button.textContent = '상세 내용 숨기기 ◀';
        }
    } else {
        details.classList.add('collapsed');
        button.classList.remove('expanded');
        // 다국어 지원
        if (window.multilingual && window.multilingual.getCurrentLang() === 'en') {
            button.textContent = 'Show Details ▶';
        } else {
            button.textContent = '상세 내용 보기 ▶';
        }
    }
}

// ===================================
// PDF Generation (Browser Print)
// ===================================
const PAGE_TYPE = document.body.dataset.pageType || 'resume';
function downloadPDF() {
    // 커리어 페이지에서는 상세 내용 전부 펼치기
    let allDetails = [];
    let allButtons = [];

    if (PAGE_TYPE === 'career') {
        allDetails = document.querySelectorAll('.project-details');
        allButtons = document.querySelectorAll('.toggle-details-inline');

        // 상세 내용 모두 표시
        allDetails.forEach(detail => {
            detail.classList.remove('collapsed');
        });

        // 토글 버튼 숨기기
        allButtons.forEach(btn => {
            btn.style.visibility = 'hidden';
        });
    }

    // 인쇄 전 클래스 추가 (스타일 최적화용)
    document.body.classList.add('printing');

    // 약간의 지연 후 인쇄 (렌더링 완료 대기)
    setTimeout(() => {
        window.print();

        // 인쇄 다이얼로그가 닫힌 후 원래 상태로 복구
        setTimeout(() => {
            if (PAGE_TYPE === 'career') {
                allDetails.forEach(detail => {
                    detail.classList.add('collapsed');
                });
                
                allButtons.forEach(btn => {
                    btn.style.visibility = 'visible';
                });
            }

            document.body.classList.remove('printing');
        }, 100);
    }, 100);
}

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
// Initialize on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active state
    const resumeSection = document.getElementById('resume-section');
    if (resumeSection) {
        resumeSection.classList.add('active');
    }
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press 'R' to go to Resume
        if (e.key === 'r' || e.key === 'R') {
            showTab('resume');
        }
        // Press 'B' to go to Blog
        if (e.key === 'b' || e.key === 'B') {
            showTab('blog');
        }
        // Press 'D' to download PDF
        if (e.key === 'd' || e.key === 'D') {
            if (document.getElementById('resume-section').classList.contains('active')) {
                downloadPDF();
            }
        }
    });
});

// ===================================
// Utility Functions
// ===================================
// Dark mode toggle (for future implementation)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Initialize dark mode from localStorage
function initDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Blog post view counter (for future implementation)
function incrementViewCount(postId) {
    const viewCount = localStorage.getItem(`post_${postId}_views`) || 0;
    localStorage.setItem(`post_${postId}_views`, parseInt(viewCount) + 1);
}

// Export functions for use in other scripts
window.portfolioUtils = {
    showTab,
    downloadPDF,
    filterPosts,
    toggleDarkMode,
    incrementViewCount
};