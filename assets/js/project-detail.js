// project-detail.js - Project filtering and detail view

class ProjectManager {
    constructor() {
        this.projects = {};
        this.currentLang = 'ko';
        this.currentFilter = 'all';
        this.selectedProject = null;
    }

    async init() {
        await this.loadProjects();
        this.setupEventListeners();
        this.renderFilters();
        this.renderProjectList();
        this.showEmptyState();
    }

    async loadProjects() {
        try {
            const response = await fetch('./assets/js/project-readmes.json');
            if (!response.ok) throw new Error('Failed to load projects');
            this.projects = await response.json();
            console.log('Projects loaded:', Object.keys(this.projects).length);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    setupEventListeners() {
        // Language change listener
        document.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.lang;
            this.renderProjectList();
            if (this.selectedProject) {
                this.showProjectDetail(this.selectedProject);
            }
        });

        // Check initial language
        const activeLangBtn = document.querySelector('.lang-btn.active');
        if (activeLangBtn) {
            this.currentLang = activeLangBtn.textContent.toLowerCase() === 'kor' ? 'ko' : 'en';
        }
    }

    getAvailableYears() {
        const years = new Set();
        Object.values(this.projects).forEach(project => {
            if (project.year) {
                years.add(project.year);
            }
        });
        return Array.from(years).sort((a, b) => b - a); // Descending order
    }

    renderFilters() {
        const filtersContainer = document.getElementById('projectFilters');
        if (!filtersContainer) return;

        const years = this.getAvailableYears();

        let html = `
            <button class="filter-btn active" data-year="all">
                <span data-lang="ko">전체</span>
                <span data-lang="en" style="display: none;">All</span>
            </button>
        `;

        years.forEach(year => {
            html += `<button class="filter-btn" data-year="${year}">${year}</button>`;
        });

        filtersContainer.innerHTML = html;

        // Add click listeners
        filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e.target.closest('.filter-btn'));
            });
        });
    }

    handleFilterClick(btn) {
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update filter
        this.currentFilter = btn.dataset.year;
        this.renderProjectList();
    }

    getFilteredProjects() {
        const projectsList = Object.entries(this.projects).map(([id, data]) => ({
            id,
            year: data.year,
            ko: data.ko,
            en: data.en
        }));

        if (this.currentFilter === 'all') {
            return projectsList.sort((a, b) => (b.year || 0) - (a.year || 0));
        }

        return projectsList
            .filter(p => String(p.year) === String(this.currentFilter))
            .sort((a, b) => (b.year || 0) - (a.year || 0));
    }

    renderProjectList() {
        const listContainer = document.getElementById('projectsList');
        if (!listContainer) return;

        const filteredProjects = this.getFilteredProjects();

        if (filteredProjects.length === 0) {
            listContainer.innerHTML = `
                <div style="text-align: center; color: #9ca3af; padding: 40px 20px;">
                    <span data-lang="ko">프로젝트가 없습니다</span>
                    <span data-lang="en" style="display: none;">No projects found</span>
                </div>
            `;
            return;
        }

        const html = filteredProjects.map(project => {
            const data = project[this.currentLang];
            const techTags = data.tech.split(',').slice(0, 3).map(t => t.trim());

            return `
                <div class="project-card" data-project-id="${project.id}">
                    <div class="project-card-year">${project.year || 'N/A'}</div>
                    <h3 class="project-card-title">${data.title}</h3>
                    <div class="project-card-tech">
                        ${techTags.map(tag => `<span class="project-card-tech-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
        }).join('');

        listContainer.innerHTML = html;

        // Add click listeners
        listContainer.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                this.handleProjectClick(card.dataset.projectId);
            });
        });
    }

    handleProjectClick(projectId) {
        // Update active state
        document.querySelectorAll('.project-card').forEach(c => c.classList.remove('active'));
        const clickedCard = document.querySelector(`[data-project-id="${projectId}"]`);
        if (clickedCard) {
            clickedCard.classList.add('active');
        }

        this.selectedProject = projectId;
        this.showProjectDetail(projectId);
    }

    showProjectDetail(projectId) {
        const project = this.projects[projectId];
        if (!project) return;

        const data = project[this.currentLang];

        // Hide empty state
        const emptyState = document.getElementById('projectDetailEmpty');
        if (emptyState) emptyState.style.display = 'none';

        // Show detail content
        let detailContent = document.getElementById('projectDetailContent');
        if (!detailContent) {
            const detailContainer = document.getElementById('projectDetailContainer');
            detailContent = document.createElement('div');
            detailContent.id = 'projectDetailContent';
            detailContent.className = 'project-detail-content';
            detailContainer.appendChild(detailContent);
        }

        detailContent.style.display = 'block';
        detailContent.className = 'project-detail-content active';

        // Render detail view
        const techTags = data.tech.split(',').map(t => t.trim());

        detailContent.innerHTML = `
            <div class="project-detail-header">
                <div>
                    <h2 class="project-detail-title">${data.title}</h2>
                    <span class="project-detail-year">${project.year || 'N/A'}</span>
                </div>
                <a href="${data.github}" target="_blank" class="project-detail-github">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    GitHub
                </a>
            </div>

            <div class="project-detail-section">
                <h3 class="project-detail-section-title">
                    ${this.currentLang === 'ko' ? '💡 프로젝트 동기' : '💡 Motivation'}
                </h3>
                <div class="project-detail-section-content">
                    ${data.motivation}
                </div>
            </div>

            <div class="project-detail-section">
                <h3 class="project-detail-section-title">
                    ${this.currentLang === 'ko' ? '✨ 주요 기능' : '✨ Key Features'}
                </h3>
                <div class="project-detail-section-content">
                    <ul>
                        ${data.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="project-detail-section">
                <h3 class="project-detail-section-title">
                    ${this.currentLang === 'ko' ? '🛠 기술 스택' : '🛠 Tech Stack'}
                </h3>
                <div class="project-detail-tech-tags">
                    ${techTags.map(tag => `<span class="project-detail-tech-tag">${tag}</span>`).join('')}
                </div>
            </div>

            <div class="project-detail-section">
                <h3 class="project-detail-section-title">
                    ${this.currentLang === 'ko' ? '📊 결과' : '📊 Results'}
                </h3>
                <div class="project-detail-section-content">
                    <ul>
                        ${data.results.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    showEmptyState() {
        const emptyState = document.getElementById('projectDetailEmpty');
        if (emptyState) emptyState.style.display = 'flex';

        const detailContent = document.getElementById('projectDetailContent');
        if (detailContent) detailContent.style.display = 'none';
    }
}

// Initialize on page load
if (typeof window !== 'undefined' && document.querySelector('[data-page-type="portfolio"]')) {
    const projectManager = new ProjectManager();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => projectManager.init());
    } else {
        projectManager.init();
    }
}
