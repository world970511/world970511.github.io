// assets/js/multilingual.js

// 현재 언어 설정
let currentLang = 'ko';

// 언어 변경 함수
function changeLanguage(lang) {
    currentLang = lang;

    // 언어 버튼 활성화 상태 업데이트
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (lang === 'ko' && btn.textContent.trim() === 'KOR') {
            btn.classList.add('active');
        } else if (lang === 'en' && btn.textContent.trim() === 'EN') {
            btn.classList.add('active');
        }
    });

    // 언어별 요소 표시/숨김
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === lang) {
            element.style.display = '';
            element.classList.add('active-lang');
        } else {
            element.style.display = 'none';
            element.classList.remove('active-lang');
        }
    });

    // 토글 버튼 텍스트 업데이트
    updateToggleButtons();

    // HTML lang 속성 변경
    document.documentElement.lang = lang;

    // localStorage에 언어 설정 저장
    localStorage.setItem('preferredLanguage', lang);

    // 커스텀 이벤트 발생 (다른 모듈에서 언어 변경 감지)
    const event = new CustomEvent('languageChanged', { detail: { lang } });
    document.dispatchEvent(event);
}

// 토글 버튼 텍스트 업데이트
function updateToggleButtons() {
    document.querySelectorAll('.toggle-details-inline').forEach(button => {
        const isExpanded = button.classList.contains('expanded');
        const koText = button.querySelector('.toggle-text-ko');
        const enText = button.querySelector('.toggle-text-en');

        if (currentLang === 'ko') {
            if (koText) koText.style.display = '';
            if (enText) enText.style.display = 'none';
        } else {
            if (koText) koText.style.display = 'none';
            if (enText) enText.style.display = '';
        }
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function () {
    // localStorage에서 저장된 언어 설정 불러오기
    const savedLang = localStorage.getItem('preferredLanguage') || 'ko';

    // 언어 버튼 초기화
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(savedLang === 'ko' ? 'kor' : 'en')) {
            btn.classList.add('active');
        }
    });

    // 초기 언어 설정
    currentLang = savedLang;
    document.documentElement.lang = savedLang;

    // 언어별 요소 초기 설정
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === savedLang) {
            element.style.display = '';
            element.classList.add('active-lang');
        } else {
            element.style.display = 'none';
            element.classList.remove('active-lang');
        }
    });

    // 토글 버튼 초기화
    updateToggleButtons();
});

// Export for use in other scripts
window.multilingual = {
    changeLanguage,
    getCurrentLang: () => currentLang
};