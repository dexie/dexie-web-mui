export function GET(): Response {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Block development and test files
Disallow: /_next/
Disallow: /api/
Disallow: /.well-known/
Disallow: /test/
Disallow: /dev/

# Allow important content
Allow: /docs/*
Allow: /cloud/*
Allow: /product
Allow: /pricing
Allow: /contact

# Sitemap location
Sitemap: https://dexie.org/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
