import fs from 'fs'

const baseUrl = 'https://rakit.app'

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`

fs.writeFileSync('dist/robots.txt', robotsTxt)
console.log('✓ robots.txt generated')
