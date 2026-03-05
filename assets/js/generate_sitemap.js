const fs = require('fs');
const path = require('path');

const SITEMAP_PATH = path.join(__dirname, '../../sitemap.xml');
const POSTS_DIR = path.join(__dirname, '../../blog/posts');
const BASE_URL = 'https://world970511.github.io';

// ── 정적 페이지 목록 (필요시 여기에 추가) ──
const STATIC_PAGES = [
  { loc: '/',                         changefreq: 'weekly',  priority: '1.0' },
  { loc: '/blog/blog-index.html',     changefreq: 'weekly',  priority: '0.8' },
  { loc: '/resume/res-index.html',    changefreq: 'monthly', priority: '0.7' },
  { loc: '/cv/cv-index.html',         changefreq: 'monthly', priority: '0.7' },
];

function getDateFromFilename(filename) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : new Date().toISOString().split('T')[0];
}

function generateSitemap() {
  console.log('Generating sitemap...');

  const today = new Date().toISOString().split('T')[0];

  // ── 1. XML 헤더 ──
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // ── 2. 정적 페이지 ──
  STATIC_PAGES.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${page.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // ── 3. 블로그 포스트 (HTML 파일 스캔) ──
  if (fs.existsSync(POSTS_DIR)) {
    const htmlFiles = fs.readdirSync(POSTS_DIR)
      .filter(file => file.endsWith('.html'))
      .sort()
      .reverse();

    console.log(`Found ${htmlFiles.length} blog post(s).`);

    htmlFiles.forEach(file => {
      const lastmod = getDateFromFilename(file);
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}/blog/posts/${file}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += '  </url>\n';
    });
  } else {
    console.warn(`Posts directory not found: ${POSTS_DIR} — skipping blog posts.`);
  }

  // ── 4. 닫기 및 저장 ──
  xml += '</urlset>\n';

  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
  console.log(`Sitemap generated: ${SITEMAP_PATH} (${STATIC_PAGES.length} static + blog posts)`);
}

generateSitemap();
