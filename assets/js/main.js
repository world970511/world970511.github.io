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
function downloadPDF() {
    // 모든 프로젝트 상세 내용 펼치기
    const allDetails = document.querySelectorAll('.project-details');
    const allButtons = document.querySelectorAll('.toggle-details-inline');
    
    // 상세 내용 모두 표시
    allDetails.forEach(detail => {
        detail.classList.remove('collapsed');
    });
    
    // 토글 버튼 숨기기
    allButtons.forEach(btn => {
        btn.style.visibility = 'hidden';
    });
    
    // 인쇄 전 클래스 추가 (스타일 최적화)
    document.body.classList.add('printing');
    
    // 약간의 지연 후 인쇄 (렌더링 완료 대기)
    setTimeout(() => {
        window.print();
        
        // 인쇄 다이얼로그가 닫힌 후 원래 상태로 복구
        setTimeout(() => {
            // 원래 상태로 복구
            allDetails.forEach(detail => {
                detail.classList.add('collapsed');
            });
            
            allButtons.forEach(btn => {
                btn.style.visibility = 'visible';
            });
            
            document.body.classList.remove('printing');
        }, 100);
    }, 100);
}

// 대안: 기존 html2pdf 방식도 유지하고 싶다면
function downloadPDFClassic() {
    // 기존 html2pdf 코드...
    const element = document.getElementById('resume-content');
    const opt = {
        margin: [5, 5, 5, 5],
        filename: '박나은_이력서.pdf',
        image: { 
            type: 'jpeg', 
            quality: 0.98 
        },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollY: -window.scrollY,
            windowHeight: element.offsetHeight
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { 
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.page-break',
            avoid: ['tr', '.avoid-break']
        }
    };
    
    const btn = document.querySelector('.download-btn');
    const originalText = btn.textContent;
    btn.textContent = '⏳ PDF 생성 중...';
    btn.disabled = true;
    
    html2pdf().set(opt).from(element).save().then(() => {
        btn.textContent = originalText;
        btn.disabled = false;
    }).catch(err => {
        console.error('PDF 생성 오류:', err);
        btn.textContent = originalText;
        btn.disabled = false;
        alert('PDF 생성 중 오류가 발생했습니다.');
    });
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