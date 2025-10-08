import "./globals.css";

export const metadata = {
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen scroll-smooth bg-[#0b0d13] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
