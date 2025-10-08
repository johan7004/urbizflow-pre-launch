import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://urbizflow.com"), // <-- your live domain
  title: "UrbizFlow — Free Invoice Generator & Startup Tools",
  description:
    "All-in-one toolkit for freelancers & startups: free invoice generator, AI proposal maker, and business solutions. Join the pre-launch waitlist.",
  keywords:
    "freelance tools, free invoice generator, startup help, business solutions, proposal maker, social media templates, small business software, freelancer invoicing, invoice pdf",
  openGraph: {
    title: "UrbizFlow — Free Invoice Generator & Startup Tools",
    description:
      "All-in-one toolkit for freelancers & startups: free invoice generator, AI proposal maker, and business solutions. Join the pre-launch waitlist.",
    url: "https://urbizflow.com",
    siteName: "UrbizFlow",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UrbizFlow — Free Invoice Generator & Startup Tools",
    description:
      "All-in-one toolkit for freelancers & startups. Join the pre-launch waitlist.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    maxSnippet: -1,
    maxImagePreview: "large",
    maxVideoPreview: -1,
  },
  alternates: { canonical: "https://urbizflow.com" },

  // ---------- Favicons & PWA ----------
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  themeColor: "#0b0d13",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* app/icon.png is auto-served by Next.js, no extra tag needed */}
      <body className="min-h-screen scroll-smooth bg-[#0b0d13] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
