const fs = require('fs');
const path = require('path');

// Adjusted paths for assets/js/ directory
const SITEMAP_PATH = path.join(__dirname, '../../sitemap.xml');
const POSTS_DIR = path.join(__dirname, '../../blog/posts');
const BASE_URL = 'https://world970511.github.io';

function getDateFromFilename(filename) {
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : new Date().toISOString().split('T')[0];
}

function generateSitemap() {
    console.log('Generating sitemap...');

    // Check if paths exist
    if (!fs.existsSync(SITEMAP_PATH)) {
        console.error(`Sitemap file not found at: ${SITEMAP_PATH}`);
        return;
    }
    if (!fs.existsSync(POSTS_DIR)) {
        console.error(`Posts directory not found at: ${POSTS_DIR}`);
        return;
    }

    // 1. Read existing sitemap
    let sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');

    // 2. Find the marker to start dynamic insertion
    // Note: Ensure this marker exists in your sitemap.xml
    const marker = '<!-- 5. 블로그 포스트 상세 페이지 -->';
    const markerIndex = sitemapContent.indexOf(marker);

    if (markerIndex === -1) {
        console.error(`Marker "${marker}" not found in sitemap.xml. Please add it manually to sitemap.xml first.`);
        return;
    }

    // Keep the static part (header + static pages)
    const staticPart = sitemapContent.substring(0, markerIndex + marker.length);

    // 3. Scan for HTML posts
    const files = fs.readdirSync(POSTS_DIR);
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    // Sort files by date descending
    htmlFiles.sort().reverse();

    let dynamicContent = '\n';

    htmlFiles.forEach(file => {
        const lastmod = getDateFromFilename(file);
        const url = `${BASE_URL}/blog/posts/${file}`;

        dynamicContent += `   <url>
      <loc>${url}</loc>
      <lastmod>${lastmod}</lastmod>
      <priority>0.6</priority>
   </url>\n`;
    });

    dynamicContent += '\n</urlset>';

    // 4. Combine and Write
    const newSitemap = staticPart + dynamicContent;
    fs.writeFileSync(SITEMAP_PATH, newSitemap, 'utf8');

    console.log(`Successfully updated sitemap.xml with ${htmlFiles.length} posts.`);
}

generateSitemap();
