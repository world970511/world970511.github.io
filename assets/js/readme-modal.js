// readme-modal.js - README 상세보기 모달

// 프로젝트별 README 데이터 (JSON에서 로드)
let projectReadmes = {};

// 모달 열기
function openReadme(projectId) {
    const lang = document.querySelector('.lang-btn.active').textContent.toLowerCase() === 'kor' ? 'ko' : 'en';
    const readme = projectReadmes[projectId][lang];
    
    if (!readme) return;
    
    // 모달 HTML 생성
    const modalHTML = `
        <div class="readme-modal" id="readmeModal" onclick="closeReadmeOnBackdrop(event)">
            <div class="readme-modal-content">
                <button class="readme-close" onclick="closeReadme()">×</button>
                
                <h2 class="readme-title">${readme.title}</h2>
                
                <div class="readme-section">
                    <h3>${lang === 'ko' ? '💡 프로젝트 동기' : '💡 Motivation'}</h3>
                    <p>${readme.motivation}</p>
                </div>
                
                <div class="readme-section">
                    <h3>${lang === 'ko' ? '✨ 주요 기능' : '✨ Key Features'}</h3>
                    <ul>
                        ${readme.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="readme-section">
                    <h3>${lang === 'ko' ? '🛠 기술 스택' : '🛠 Tech Stack'}</h3>
                    <p>${readme.tech}</p>
                </div>
                
                <div class="readme-section">
                    <h3>${lang === 'ko' ? '📊 결과' : '📊 Results'}</h3>
                    <ul>
                        ${readme.results.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="readme-actions">
                    <a href="${readme.github}" target="_blank" class="readme-github-btn">
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        ${lang === 'ko' ? 'GitHub에서 보기' : 'View on GitHub'}
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // 모달 추가
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// 모달 닫기
function closeReadme() {
    const modal = document.getElementById('readmeModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// 배경 클릭 시 닫기
function closeReadmeOnBackdrop(event) {
    if (event.target.classList.contains('readme-modal')) {
        closeReadme();
    }
}

// ESC 키로 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeReadme();
    }
});

// JSON 데이터 로드
async function loadProjectReadmes() {
    try {
        const response = await fetch('./assets/js/project-readmes.json');
        if (!response.ok) {
            console.warn('Failed to load project-readmes.json, using fallback data');
            return;
        }
        projectReadmes = await response.json();
        console.log('Project readmes loaded successfully');
    } catch (error) {
        console.error('Error loading project readmes:', error);
    }
}

// 페이지 로드 시 데이터 로드
if (typeof window !== 'undefined') {
    loadProjectReadmes();
}