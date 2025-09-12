// app/sitemap.xml/route.js
import pool from "@/lib/db";

export async function GET() {
  const baseUrl = "https://bitlinks.in";

  try {
    // Fetch all news from PostgreSQL
    const result = await pool.query("SELECT slug, created_at FROM news");

    const urls = result.rows
      .map((row) => {
        const slug = row.slug;

        let lastmodDate = new Date(); // fallback
        if (row.created_at) {
          const parsed = new Date(row.created_at);
          if (!isNaN(parsed.getTime())) {
            lastmodDate = parsed;
          }
        }

        return `
          <url>
            <loc>${baseUrl}/${slug}</loc>
            <lastmod>${lastmodDate.toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>`;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${urls}
    </urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
