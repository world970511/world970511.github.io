// assets/js/build-blog.js
const fs = require('fs').promises;
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');
const glob = require('glob').sync;

class BlogBuilder {
    constructor() {
        this.postsDir = './blog/posts';
        this.outputDir = './blog/posts';
        this.blogDataFile = './assets/js/blog-posts.json';
        this.blogListFile = './blog/blog-index.html';
    }

    async build() {
        console.log('🚀 Starting blog build...');

        // 1. Find all markdown files
        const mdFiles = glob(`${this.postsDir}/*.md`);
        console.log(`Found ${mdFiles.length} markdown files`);

        const posts = [];

        // 2. Process each markdown file
        for (const mdFile of mdFiles) {
            const post = await this.processMarkdown(mdFile);
            if (post) {
                posts.push(post);
            }
        }

        // 3. Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 4. Generate blog list HTML
        await this.updateBlogList(posts);

        // 5. Save blog data JSON
        await this.saveBlogData(posts);

        console.log('✅ Blog build completed!');
    }

    async processMarkdown(filePath) {
        try {
            console.log(`📝 Processing: ${path.basename(filePath)}`);

            // Read markdown file
            const content = await fs.readFile(filePath, 'utf8');

            // Parse frontmatter and content
            const { data: frontmatter, content: markdown } = matter(content);

            // Validate required fields
            if (!frontmatter.title) {
                console.warn(`⚠️  Skipping ${filePath}: Missing title`);
                return null;
            }

            // Generate slug from filename
            const filename = path.basename(filePath, '.md');
            const slug = filename.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            // 날짜 처리: frontmatter에 날짜가 없으면 파일명 또는 현재 날짜 사용
            let postDate = frontmatter.date;

            if (!postDate) {
                // 파일명에서 날짜 추출 시도 (예: 2024-07-25-post-title.md)
                const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
                if (dateMatch) {
                    postDate = dateMatch[1];
                } else {
                    // 파일의 수정 시간 사용
                    const stats = await fs.stat(filePath);
                    postDate = stats.mtime.toISOString().split('T')[0];
                }
            }

            // Convert markdown to HTML
            const htmlContent = marked(markdown);

            // Create post object
            const post = {
                slug,
                title: frontmatter.title,
                date: postDate,
                category: frontmatter.category || 'general',
                tags: frontmatter.tags || [],
                excerpt: frontmatter.excerpt || this.extractExcerpt(markdown),
                readTime: frontmatter.readTime || this.calculateReadTime(markdown),
                lastModified: new Date().toISOString()
            };

            // Generate HTML file
            await this.generateHTMLFile(post, htmlContent);

            return post;

        } catch (error) {
            console.error(`❌ Error processing ${filePath}:`, error);
            return null;
        }
    }

    async generateHTMLFile(post, content) {
        const html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} - 박나은</title>
    <meta name="description" content="${post.excerpt}">
    <meta name="google-site-verification" content="lb30pDDWow-sRJaP0kOtYGGmFU5NTD9i_hNGZIeWHlM" />
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt}">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../../images/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="../../images/favicon/favicon.svg" />
    <link rel="shortcut icon" href="../../images/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="../../images/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="../../images/favicon/site.webmanifest" />
    
    <link rel="stylesheet" href="../../assets/css/styles.css">
    <link rel="stylesheet" href="../../assets/css/blog-post.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
</head>
<body>
    <nav class="nav-container">
        <div class="nav-content">
            <a class="nav-brand" href="../../index.html">박나은</a>
            <div class="nav-tabs">
                <a class="nav-tab" href="../blog-index.html">Blog</a>
            </div>
        </div>
    </nav>
    
    <div class="main-container">
        <article class="blog-post-full">
            <header class="post-header">
                <h1 class="post-title">${post.title}</h1>
                <div class="post-meta">
                    <span>📅 ${this.formatDate(post.date)}</span>
                    <span>⏱️ ${post.readTime}분 읽기</span>
                    <span>📁 ${this.getCategoryName(post.category)}</span>
                </div>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
                </div>
            </header>
            <div class="post-content">
                ${content}
            </div>
            <footer class="post-footer">
                <div class="post-navigation">
                    <a href="../blog-index.html" class="back-to-blog">← 블로그로 돌아가기</a>
                </div>
            </footer>
        </article>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
    <!-- Mermaid 라이브러리 추가 -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <script>
        // Mermaid 초기화 및 렌더링
        mermaid.initialize({ 
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose'
        });
        
        // 페이지 로드 후 실행
        window.addEventListener('DOMContentLoaded', function() {
            // language-mermaid 클래스를 가진 코드 블록 찾기
            document.querySelectorAll('pre code.language-mermaid').forEach(function(codeElement) {
                const pre = codeElement.parentElement;
                const mermaidCode = codeElement.textContent;
                
                // 새로운 mermaid div 생성
                const mermaidDiv = document.createElement('div');
                mermaidDiv.className = 'mermaid';
                mermaidDiv.textContent = mermaidCode;
                
                // pre 태그를 mermaid div로 교체
                pre.parentNode.replaceChild(mermaidDiv, pre);
            });
            
            // Mermaid 렌더링
            mermaid.init(undefined, document.querySelectorAll('.mermaid'));
        });
    </script>
</body>
</html>`;

        const outputPath = path.join(this.outputDir, `${post.slug}.html`);
        await fs.writeFile(outputPath, html);
        console.log(`   ✓ Generated: ${post.slug}.html`);
    }

    async updateBlogList(posts) {
        const blogListHTML = await fs.readFile(this.blogListFile, 'utf8');

        // Generate posts HTML
        const postsHTML = posts.map(post => `
                <article class="blog-post" data-category="${post.category}">
                    <h2 class="post-title">${post.title}</h2>
                    <div class="post-meta">
                        <span>📅 ${this.formatDate(post.date)}</span>
                        <span>⏱️ ${post.readTime}분 읽기</span>
                    </div>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="posts/${post.slug}.html" class="read-more">자세히 보기 →</a>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
                    </div>
                </article>`).join('\n');

        // Update category counts
        const categoryCounts = this.getCategoryCounts(posts);
        let updatedHTML = blogListHTML;

        // Replace blog posts section
        updatedHTML = updatedHTML.replace(
            /<main class="blog-posts">[\s\S]*?<\/main>/,
            `<main class="blog-posts">${postsHTML}\n            </main>`
        );

        // Update category counts
        for (const [category, count] of Object.entries(categoryCounts)) {
            const regex = new RegExp(
                `(filterPosts\\('${category}'\\)[^<]*<span class="post-count">)\\d+(</span>)`,
                'g'
            );
            updatedHTML = updatedHTML.replace(regex, `$1${count}$2`);
        }

        await fs.writeFile(this.blogListFile, updatedHTML);
        console.log('✓ Updated blog-index.html');
    }

    async saveBlogData(posts) {
        const blogData = {
            posts,
            lastUpdated: new Date().toISOString(),
            totalPosts: posts.length
        };

        await fs.mkdir(path.dirname(this.blogDataFile), { recursive: true });
        await fs.writeFile(this.blogDataFile, JSON.stringify(blogData, null, 2));
        console.log('✓ Saved blog-posts.json');
    }

    extractExcerpt(markdown) {
        // Remove markdown syntax and get first 150 characters
        const text = markdown
            .replace(/#{1,6}\s/g, '')
            .replace(/\*\*(.+?)\*\*/g, '$1')
            .replace(/\*(.+?)\*/g, '$1')
            .replace(/\[(.+?)\]\(.+?\)/g, '$1')
            .replace(/```[\s\S]*?```/g, '')
            .replace(/`(.+?)`/g, '$1')
            .trim();

        return text.substring(0, 150) + (text.length > 150 ? '...' : '');
    }

    calculateReadTime(markdown) {
        const words = markdown.trim().split(/\s+/).length;
        const wordsPerMinute = 200; // Average reading speed
        return Math.max(1, Math.ceil(words / wordsPerMinute));
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // 카테고리명 추가
    getCategoryName(category) {
        const categoryNames = {
            backend: 'Backend',
            data: 'Data Engineering',
            project: 'Project',
            frontend: 'Frontend',
            devops: 'DevOps',
            tech: 'Tech',
            life: 'Life'
        };
        return categoryNames[category] || category;
    }

    getCategoryCounts(posts) {
        const counts = {
            all: posts.length,
            backend: 0,
            data: 0,
            project: 0,
            frontend: 0,
            devops: 0
        };

        posts.forEach(post => {
            // 모든 카테고리를 동적으로 카운트
            if (counts[post.category] !== undefined) {
                counts[post.category]++;
            } else {
                // 새로운 카테고리가 있으면 추가
                counts[post.category] = 1;
            }
        });

        return counts;
    }
}
// Run the builder
if (require.main === module) {
    const builder = new BlogBuilder();
    builder.build().catch(console.error);
}