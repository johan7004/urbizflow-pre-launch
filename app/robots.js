// app/robots.js
const SITE_URL = "https://urbizflow.com"; // ← change if needed
const PREVIEW_BLOCK = false;              // set true on previews if you want noindex

export default function robots() {
  if (PREVIEW_BLOCK) {
    return {
      rules: [
        { userAgent: "*", disallow: "/" },
      ],
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // optional disallows you don't use
        disallow: ["/api", "/_next", "/static", "/private"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
