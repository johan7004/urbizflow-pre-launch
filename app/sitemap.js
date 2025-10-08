// app/sitemap.js
export default function sitemap() {
    const SITE_URL = "https://urbizflow.com"; // ← change if needed
    const now = new Date();
  
    // List the URLs you want indexed
    return [
      {
        url: `${SITE_URL}/`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/privacy`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.5,
      },
    ];
  }
  