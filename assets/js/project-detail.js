// project-detail.js - Project filtering and detail view

class ProjectManager {
    constructor() {
        this.projects = null; // Will use global projectReadmes from readme-modal.js
        this.currentLang = 'ko';
        this.currentFilter = 'all';
        this.selectedProject = null;
    }

    init() {
        // Wait for projectReadmes to be loaded
        this.waitForProjectReadmes();
    }

    waitForProjectReadmes() {
        let attempts = 0;
        const checkInterval = setInterval(() => {
            attempts++;
            console.log(`project-detail.js: Checking for projectReadmes (attempt ${attempts})`, {
                exists: !!window.projectReadmes,
                keys: window.projectReadmes ? Object.keys(window.projectReadmes).length : 0
            });

            if (window.projectReadmes && Object.keys(window.projectReadmes).length > 0) {
                clearInterval(checkInterval);
                this.projects = window.projectReadmes;
                this.setupEventListeners();
                this.renderFilters();
                this.renderProjectList();
                this.showEmptyState();
                console.log('Project Manager initialized with', Object.keys(this.projects).length, 'projects');
            }
        }, 100);

        // Timeout after 5 seconds
        setTimeout(() => {
            clearInterval(checkInterval);
            if (!this.projects) {
                console.error('Failed to load projectReadmes after 5 seconds');
                console.error('window.projectReadmes:', window.projectReadmes);
            }
        }, 5000);
    }

    setupEventListeners() {
        // Language change listener
        document.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.lang;
            this.renderProjectList();
            // Re-render the detail panel if a project is selected
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

        // Use the global showProjectInPanel function from readme-modal.js
        if (typeof window.showProjectInPanel === 'function') {
            window.showProjectInPanel(projectId, project.year, project.company);
        } else {
            console.error('showProjectInPanel function not available');
        }
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
