// Load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();

        // Update stats
        document.getElementById('totalProjects').textContent = data.metadata.totalProjects;
        document.getElementById('lastUpdated').textContent = formatDate(data.metadata.lastUpdated);

        // Render projects
        renderProjects(data.projects);

        // Setup filters
        setupFilters(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsGrid').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p style="color: var(--text-muted);">Error loading projects. Please make sure projects.json is in the same directory.</p>
            </div>
        `;
    }
}

function renderProjects(projects, filterType = 'all') {
    const grid = document.getElementById('projectsGrid');

    const filteredProjects = filterType === 'all'
        ? projects
        : projects.filter(p => p.type === filterType);

    if (filteredProjects.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p style="color: var(--text-muted);">No projects found for this category.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredProjects.map(project => `
        <div class="project-card" data-type="${project.type}">
            <div class="project-left">
                <div class="project-header">
                    <h2 class="project-title">${project.name}</h2>
                    <span class="project-type">${project.type}</span>
                    ${project.version ? `<span class="version-badge">v${project.version}</span>` : ''}
                </div>

                ${project.tech.length > 0 ? `
                    <div class="tech-stack">
                        <span class="tech-stack-label">Technologies</span>
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                ` : ''}
            </div>

            <div class="project-right">
                <p class="project-description">${project.description}</p>

                ${project.features.length > 0 ? `
                    <div class="features">
                        <h3 class="features-title">Key Features</h3>
                        <ul class="features-list">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                <div class="project-footer">
                    <span class="status-badge ${getStatusClass(project.status)}">
                        ${project.status}
                    </span>
                    ${project.github ? `
                        <a href="${project.github}" target="_blank" class="github-link">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                            View on GitHub
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function setupFilters(projects) {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            const filterType = btn.dataset.filter;
            renderProjects(projects, filterType);
        });
    });
}

function getStatusClass(status) {
    const statusMap = {
        'Active': 'status-active',
        'In Development': 'status-development',
        'Placeholder': 'status-placeholder'
    };
    return statusMap[status] || 'status-placeholder';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', loadProjects);
