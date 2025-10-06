// pages/api/sitemap.ts
import { NextApiRequest, NextApiResponse } from 'next';

const YOUR_DOMAIN = 'https://yourdomain.com'; // Your actual domain

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Define your static pages
    const staticPages = [
        '/',
        '/about',
        '/contact',
        '/services',
        '/lab',
        '/products',
        // Add all your product and lab pages here
        '/products/people-counting-system',
        '/products/smart-vtol-drone',
        '/products/road-traffic-counter',
        '/products/industrial-dataloggers',


        // ...
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages.map(page => `
        <url>
          <loc>${`${YOUR_DOMAIN}${page}`}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>
  `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
}