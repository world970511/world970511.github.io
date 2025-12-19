// readme-modal.js - README 상세보기 모달

// 프로젝트별 README 데이터
const projectReadmes = {
    project1: {
        ko: {
            title: 'AI 웹소설 추천 시스템',
            motivation: '기존 키워드 기반 검색의 한계를 극복하고, 사용자가 자연어로 원하는 스토리를 설명하면 그에 맞는 웹소설을 추천받을 수 있는 시스템을 만들고 싶었습니다.',
            features: [
                'RAG (Retrieval-Augmented Generation) 기반 추천',
                'PGVector를 활용한 벡터 유사도 검색',
                'FastAPI 백엔드 + Streamlit 프론트엔드',
                'PostgreSQL 데이터베이스 연동'
            ],
            tech: 'FastAPI, Python, Streamlit, PostgreSQL, PGVector, RAG',
            results: [
                '단순 키워드 매칭 대비 추천 정확도 향상',
                'End-to-End 파이프라인 구현',
                '실시간 자연어 쿼리 처리'
            ],
            github: 'https://github.com/world970511/korea_webnovel_recommender'
        },
        en: {
            title: 'AI Web Novel Recommendation System',
            motivation: 'Wanted to overcome limitations of keyword-based search and create a system where users can describe desired stories in natural language.',
            features: [
                'RAG-based recommendation',
                'Vector similarity search using PGVector',
                'FastAPI backend + Streamlit frontend',
                'PostgreSQL database integration'
            ],
            tech: 'FastAPI, Python, Streamlit, PostgreSQL, PGVector, RAG',
            results: [
                'Improved recommendation accuracy vs keyword matching',
                'Implemented End-to-End pipeline',
                'Real-time natural language query processing'
            ],
            github: 'https://github.com/world970511/korea_webnovel_recommender'
        }
    },
    project2: {
        ko: {
            title: '카카오 웹툰 추천 서비스',
            motivation: '추천 시스템 알고리즘을 실제 서비스에 적용해보고 싶어서 시작했습니다. 행렬 분해(Matrix Factorization) 기법을 통해 희소한 사용자-작품 행렬 문제를 해결하고자 했습니다.',
            features: [
                'Matrix Factorization 기반 개인화 추천',
                'React 무한 스크롤 구현',
                'WordCloud2.js 키워드 시각화',
                'Django 백엔드 최적화'
            ],
            tech: 'Django, React, Python, Matrix Factorization, Heroku',
            results: [
                '희소 행렬 문제 해결',
                'Heroku 배포 및 실제 서비스 운영',
                '사용자 선호도 기반 추천 정확도 향상'
            ],
            github: 'https://github.com/world970511/kakao_webtoon_reco'
        },
        en: {
            title: 'Kakao Webtoon Recommendation Service',
            motivation: 'Started to apply recommendation algorithms in real service. Aimed to solve sparse user-item matrix problem using Matrix Factorization.',
            features: [
                'Personalized recommendation using Matrix Factorization',
                'Infinite scroll with React',
                'Keyword visualization with WordCloud2.js',
                'Optimized Django backend'
            ],
            tech: 'Django, React, Python, Matrix Factorization, Heroku',
            results: [
                'Solved sparse matrix problem',
                'Deployed on Heroku for production',
                'Improved recommendation accuracy based on user preferences'
            ],
            github: 'https://github.com/world970511/kakao_webtoon_reco'
        }
    },
    project3: {
        ko: {
            title: '리디북스 로맨스 리뷰 감성분석',
            motivation: '대규모 텍스트 데이터 수집부터 딥러닝 모델 학습까지 전체 머신러닝 파이프라인을 경험해보고 싶어서 시작했습니다.',
            features: [
                '579,867건 리뷰 데이터 크롤링',
                'Selenium을 활용한 자동화 수집',
                'TensorFlow/Keras 기반 딥러닝 모델',
                '텍스트 전처리 및 정제'
            ],
            tech: 'TensorFlow, Keras, Selenium, BeautifulSoup, NLP',
            results: [
                '긍부정 분류 정확도 90% 달성',
                '대규모 데이터 처리 경험',
                '전체 ML 파이프라인 구축 경험'
            ],
            github: 'https://github.com/world970511/RIDIBOOKS_romance_webnovel_review_Sentiment_Analysis'
        },
        en: {
            title: 'Ridibooks Romance Review Sentiment Analysis',
            motivation: 'Started to experience entire ML pipeline from large-scale text data collection to deep learning model training.',
            features: [
                'Crawled 579,867 review data',
                'Automated collection using Selenium',
                'Deep learning model with TensorFlow/Keras',
                'Text preprocessing and cleaning'
            ],
            tech: 'TensorFlow, Keras, Selenium, BeautifulSoup, NLP',
            results: [
                'Achieved 90% accuracy in sentiment classification',
                'Large-scale data processing experience',
                'Built complete ML pipeline'
            ],
            github: 'https://github.com/world970511/RIDIBOOKS_romance_webnovel_review_Sentiment_Analysis'
        }
    }
};

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