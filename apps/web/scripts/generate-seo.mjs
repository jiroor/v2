const fs = require('fs')

const baseUrl = 'https://rakit.app'
const tools = [
  '/text/base64',
  '/text/url',
  '/text/json',
  '/text/hash',
  '/text/unix',
  '/text/regex',
  '/text/uuid',
  '/text/lorem',
  '/text/case',
  '/text/number',
  '/text/dedupe',
  '/text/sort',
  '/text/statistics',
  '/text/image-base64',
  '/text/markdown',
  '/text/whitespace',
  '/text/join',
  '/text/split',
  '/text/word-count',
  '/text/diff',
  '/text/json-to-csv',
  '/text/html-to-markdown',
  '/text/acronym',
  '/other/cron',
  '/other/unit',
  '/other/percentage',
  '/other/timezone',
  '/other/random-num',
  '/other/age',
  '/other/tax',
  '/other/calculator',
  '/other/progress',
  '/other/bmi',
  '/other/calorie',
  '/other/discount',
  '/other/date-calc',
  '/other/ip-address',
  '/other/image-compress',
  '/other/image-resize',
  '/other/meta-tag',
  '/other/card-check',
  '/other/currency',
  '/other/color-palette',
  '/other/compound-interest',
  '/other/mortgage',
  '/other/image-convert',
  '/other/robots-txt',
  '/other/gpa',
  '/other/password-check',
  '/other/salary',
  '/other/image-crop',
  '/other/goal-tracker',
  '/other/habit-tracker',
  '/timer/digital',
  '/timer/stopwatch-tool',
  '/timer/pomodoro',
  '/contact',
  '/privacy',
  '/terms',
]

const today = new Date().toISOString().split('T')[0]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${tools.map(tool => `  <url>
    <loc>${baseUrl}${tool}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`

fs.writeFileSync('dist/sitemap.xml', sitemap)
console.log('✓ sitemap.xml generated with', tools.length + 1, 'URLs')

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`

fs.writeFileSync('dist/robots.txt', robotsTxt)
console.log('✓ robots.txt generated')
