// assets/js/build-projects.js
const fs = require('fs').promises;
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');
const glob = require('glob').sync;

class ProjectBuilder {
    constructor() {
        this.projectsDir = './projects';
        this.outputFile = './assets/js/project-readmes.json';
    }

    async build() {
        console.log('🚀 Starting project build...');

        // 1. Find all markdown files
        const mdFiles = glob(`${this.projectsDir}/*.md`);
        console.log(`Found ${mdFiles.length} project markdown files`);

        const projects = {};

        // 2. Process each markdown file
        for (const mdFile of mdFiles) {
            const project = await this.processMarkdown(mdFile);
            if (project) {
                projects[project.id] = project.data;
            }
        }

        // 3. Save project data JSON
        await this.saveProjectData(projects);

        console.log('✅ Project build completed!');
    }

    async processMarkdown(filePath) {
        try {
            console.log(`📝 Processing: ${path.basename(filePath)}`);

            // Read markdown file
            const content = await fs.readFile(filePath, 'utf8');

            // Parse frontmatter and content
            const { data: frontmatter, content: markdown } = matter(content);

            // Validate required fields
            if (!frontmatter.id || !frontmatter.title) {
                console.warn(`⚠️  Skipping ${filePath}: Missing id or title`);
                return null;
            }

            // Parse sections for both languages
            const sections = this.parseSections(markdown);

            // Create project object
            const project = {
                id: frontmatter.id,
                data: {
                    ko: {
                        title: frontmatter.title.ko,
                        motivation: sections.ko.motivation || '',
                        features: sections.ko.features || [],
                        tech: frontmatter.tech.ko || '',
                        results: sections.ko.results || [],
                        github: frontmatter.github || ''
                    },
                    en: {
                        title: frontmatter.title.en,
                        motivation: sections.en.motivation || '',
                        features: sections.en.features || [],
                        tech: frontmatter.tech.en || '',
                        results: sections.en.results || [],
                        github: frontmatter.github || ''
                    }
                }
            };

            return project;

        } catch (error) {
            console.error(`❌ Error processing ${filePath}:`, error);
            return null;
        }
    }

    parseSections(markdown) {
        const sections = {
            ko: { motivation: '', features: [], results: [] },
            en: { motivation: '', features: [], results: [] }
        };

        // Split by ## headers
        const headerRegex = /^## (.+)$/gm;
        const parts = markdown.split(headerRegex);

        for (let i = 1; i < parts.length; i += 2) {
            const header = parts[i].trim();
            const content = parts[i + 1].trim();

            if (header.includes('Motivation')) {
                const { ko, en } = this.extractBilingualText(content);
                sections.ko.motivation = ko;
                sections.en.motivation = en;
            } else if (header.includes('Features')) {
                const { ko, en } = this.extractBilingualList(content);
                sections.ko.features = ko;
                sections.en.features = en;
            } else if (header.includes('Results')) {
                const { ko, en } = this.extractBilingualList(content);
                sections.ko.results = ko;
                sections.en.results = en;
            }
        }

        return sections;
    }

    extractBilingualText(content) {
        const koMatch = content.match(/\*\*\[ko\]\*\*\s*\n([\s\S]*?)(?=\*\*\[en\]\*\*|$)/);
        const enMatch = content.match(/\*\*\[en\]\*\*\s*\n([\s\S]*?)$/);

        return {
            ko: koMatch ? this.markdownToHtml(koMatch[1].trim()) : '',
            en: enMatch ? this.markdownToHtml(enMatch[1].trim()) : ''
        };
    }

    extractBilingualList(content) {
        const koMatch = content.match(/\*\*\[ko\]\*\*\s*\n([\s\S]*?)(?=\*\*\[en\]\*\*|$)/);
        const enMatch = content.match(/\*\*\[en\]\*\*\s*\n([\s\S]*?)$/);

        const parseList = (text) => {
            if (!text) return [];
            return text
                .split('\n')
                .filter(line => line.trim().startsWith('-'))
                .map(line => {
                    const content = line.replace(/^-\s*/, '').trim();
                    return this.markdownToHtml(content);
                })
                .filter(line => line.length > 0);
        };

        return {
            ko: parseList(koMatch ? koMatch[1] : ''),
            en: parseList(enMatch ? enMatch[1] : '')
        };
    }

    markdownToHtml(text) {
        // Remove wrapping <p> tags for inline content
        const html = marked(text);
        return html.replace(/^<p>|<\/p>\n?$/g, '').trim();
    }

    async saveProjectData(projects) {
        await fs.mkdir(path.dirname(this.outputFile), { recursive: true });
        await fs.writeFile(this.outputFile, JSON.stringify(projects, null, 2));
        console.log(`✓ Saved ${this.outputFile}`);
        console.log(`✓ Generated ${Object.keys(projects).length} projects`);
    }
}

// Run the builder
if (require.main === module) {
    const builder = new ProjectBuilder();
    builder.build().catch(console.error);
}
