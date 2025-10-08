"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Script from "next/script";
import Image from "next/image";

// --- Firebase (client) ---
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

const nf = new Intl.NumberFormat();

export default function Home() {
  const [name, setName] = useState("");
  const [work, setWork] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");

  // render-safe defaults (no randomness on SSR)
  const [total, setTotal] = useState(0);
  const [feed, setFeed] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Seeds (static)
  const seeds = useMemo(
    () => ({
      first: [
        "Aisha",
        "Ben",
        "Carlos",
        "Diana",
        "Ethan",
        "Fatima",
        "Grace",
        "Harish",
        "Inaya",
        "Jack",
        "Karthik",
        "Lena",
        "Maya",
        "Noah",
        "Olivia",
        "Priya",
        "Qasim",
        "Riya",
        "Sam",
        "Tara",
        "Uma",
        "Vik",
        "Will",
        "Xin",
        "Yara",
        "Zoe",
      ],
      roles: [
        "Freelancer",
        "Agency Owner",
        "Consultant",
        "Startup Founder",
        "Designer",
        "Marketer",
        "Developer",
        "Accountant",
      ],
      places: [
        "London, UK",
        "Manchester, UK",
        "Birmingham, UK",
        "Leeds, UK",
        "Glasgow, UK",
        "Dublin, IE",
        "Berlin, DE",
        "Paris, FR",
        "NY, USA",
        "Toronto, CA",
        "Dubai, AE",
        "Mumbai, IN",
      ],
    }),
    []
  );

  const recentNames = useRef(new Set());
  const timerRef = useRef(null);

  // Hydration-safe init (client only)
  useEffect(() => {
    // TOTAL
    const saved = localStorage.getItem("uf_total");
    let base = saved
      ? parseInt(saved, 10)
      : 1200 + Math.floor(Math.random() * 1800);
    if (!saved) localStorage.setItem("uf_total", String(base));
    setTotal(base);

    // FEED (initial 8)
    const initial = Array.from({ length: 8 }).map(() =>
      makeEntry(seeds, recentNames, false)
    );
    setFeed(initial);

    // start randomised schedule (2s–10s)
    const scheduleNext = () => {
      const nextDelay = 2000 + Math.floor(Math.random() * 8000);
      timerRef.current = setTimeout(() => {
        setFeed((prev) =>
          [makeEntry(seeds, recentNames, true), ...prev].slice(0, 24)
        );
        const bump =
          Math.random() < 0.2 ? 1 + Math.floor(Math.random() * 3) : 1;
        setTotal((t) => {
          const n = t + bump;
          localStorage.setItem("uf_total", String(n));
          return n;
        });
        scheduleNext();
      }, nextDelay);
    };
    scheduleNext();

    setHydrated(true);
    return () => clearTimeout(timerRef.current);
  }, [seeds]);

  function makeEntry(seeds, recentRef, fresh) {
    let candidate = "";
    let guard = 0;
    while (guard < 20) {
      const n = seeds.first[Math.floor(Math.random() * seeds.first.length)];
      if (!recentRef.current.has(n)) {
        candidate = n;
        break;
      }
      guard++;
    }
    if (!candidate)
      candidate = seeds.first[Math.floor(Math.random() * seeds.first.length)];
    recentRef.current.add(candidate);
    if (recentRef.current.size > 10) {
      const [firstEl] = recentRef.current;
      recentRef.current.delete(firstEl);
    }
    const role = seeds.roles[Math.floor(Math.random() * seeds.roles.length)];
    const place = seeds.places[Math.floor(Math.random() * seeds.places.length)];
    const ago = fresh
      ? "just now"
      : `${1 + Math.floor(Math.random() * 9)} min ago`;
    return { id: cryptoRandomId(), name: candidate, role, place, ago };
  }
  function cryptoRandomId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID)
      return crypto.randomUUID();
    return Math.random().toString(36).slice(2);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!name.trim() || !email.trim()) {
      setErr("Please enter your name and email.");
      return;
    }
    try {
      setStatus("loading");
      await addDoc(collection(db, "interests", "waitlist", "usersInfo"), {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        work: work.trim(),
        createdAt: serverTimestamp(),
        source: "prelaunch-app-router",
      });
      setStatus("done");
      setFeed((prev) =>
        [
          {
            id: cryptoRandomId(),
            name: name.trim(),
            role: work.trim() || "Joined",
            place: "—",
            ago: "just now",
          },
          ...prev,
        ].slice(0, 24)
      );
      setTotal((t) => {
        const n = t + 1;
        localStorage.setItem("uf_total", String(n));
        return n;
      });
      setName("");
      setEmail("");
      setWork("");
    } catch {
      setStatus("idle");
      setErr("Could not save your interest. Please retry.");
    }
  }

  // SEO structured data
  const url = "https://urbizflow.com"; // ← replace
  const description =
    "All-in-one toolkit for freelancers & startups: free invoice generator, proposal maker, and business solutions. Join the pre-launch waitlist.";
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UrbizFlow",
    url,
    logo: "/logo.png",
    sameAs: ["https://www.instagram.com/yourbrand"],
    potentialAction: { "@type": "SubscribeAction", target: `${url}#waitlist` },
  };
  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UrbizFlow",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description,
    url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      description: "Pre-launch waitlist — early access & founder pricing.",
    },
  };

  // Parallax
  const { scrollYProgress } = useScroll();
  const yTopBlob = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yBottomBlob = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <>
      {/* Structured data for SEO */}
      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <Script
        id="ld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />

      {/* Parallax background blobs */}
      <motion.div
        style={{ y: yTopBlob }}
        className="pointer-events-none fixed -top-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-blue-500/20 blur-3xl"
      />
      <motion.div
        style={{ y: yBottomBlob }}
        className="pointer-events-none fixed -bottom-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-white/10 blur-3xl"
      />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative size-9 rounded-xl overflow-hidden bg-white">
              <Image
                src="/logo.png"
                alt="UrbizFlow logo"
                fill
                sizes="36px"
                className="object-contain p-1"
                priority
              />
            </div>
            <span className="font-semibold tracking-tight">UrbizFlow</span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#why" className="hover:text-white">
              Why Us
            </a>
            <a
              href="#waitlist"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15"
            >
              Register Interest
            </a>
          </nav>
        </div>
      </header>

      {/* Hero + CTA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16">
        <motion.div
          style={{ y: yHero }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-10 md:p-14 relative overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs mb-4">
              <span className="inline-block size-1.5 rounded-full bg-emerald-400" />
              Pre-launch • Be first to know
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              Free Invoice Generator +{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
                Business Solutions
              </span>{" "}
              for Freelancers & Startups
            </h1>

            <p className="mt-5 text-white/70 max-w-xl">
              Create invoices, proposals, and social content in minutes. Built
              for freelancers, agencies, and startup teams. Join the waitlist
              for early access & founder pricing.
            </p>
          </motion.div>

          {/* CTA Form */}
          <motion.form
            id="waitlist"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="grid grid-cols-1 gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl"
            aria-label="Register Interest form"
          >
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-400"
              placeholder="Your name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
            <label className="sr-only" htmlFor="work">
              Work
            </label>
            <input
              id="work"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-400"
              placeholder="Your role / company (optional)"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              autoComplete="organization-title"
            />
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-400"
              placeholder="Email address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl px-6 py-3 font-semibold bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-95 active:opacity-90 disabled:opacity-60"
              aria-busy={status === "loading"}
            >
              {status === "loading" ? "Registering…" : "Register Interest"}
            </button>

            {err && <p className="md:col-span-4 text-sm text-red-300">{err}</p>}
            {status === "done" && (
              <p className="md:col-span-4 text-sm text-emerald-300">
                Thanks! You’re on the list.
              </p>
            )}
          </motion.form>

          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        </motion.div>

        {/* Live Interest Feed + total */}
        <section className="py-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Live: people Showing interests now
              </h2>
              <div className="text-xs text-white/60">
                <span
                  className="font-semibold text-white"
                  suppressHydrationWarning
                >
                  {hydrated ? nf.format(total) : "—"}
                </span>{" "}
                total interests
              </div>
            </div>
            <ul
              className="space-y-2 max-h-56 overflow-hidden"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {(hydrated ? feed.slice(0, 10) : []).map((f) => (
                  <motion.li
                    key={f.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
                        {f.name[0]}
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{f.name}</span> joined
                          the interests shown
                        </p>
                        <p className="text-xs text-white/60">
                          {f.role} • {f.place}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-white/60">{f.ago}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </section>

        {/* Sections */}
        <section id="features" className="py-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-10">
            Everything freelancers & startups need
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              [
                "Free Invoice Generator",
                "Create branded invoices with tax, discount, and totals—export to PDF in clicks.",
              ],
              [
                "AI Proposal Maker",
                "Turn ideas into client-ready proposals fast—win more gigs with less effort.",
              ],
              [
                "Startup Business Solutions",
                "From onboarding to billing, streamline your client workflow end-to-end.",
              ],
              [
                "AI Social Content Builder",
                "Trendy templates that boost reach across Instagram, LinkedIn, and X.",
              ],
              [
                "Privacy-first & Reliable",
                "Optimised for reliability, privacy, and performance across devices.",
              ],
              [
                "Founder Perks",
                "Join pre-launch for early access, Digital Collectibles, and roadmap influence.",
              ],
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-white/70">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="why" className="pb-20">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-2">
                Built for real work
              </h3>
              <p className="text-white/70">
                We’re shipping the essentials freelancers actually use:
                invoices, proposals, and social content. No fluff. Just clean
                design and speed.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-2">
                Grow with confidence
              </h3>
              <p className="text-white/70">
                Early users get priority support and help shape the roadmap.
                Your feedback = our features.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-white/60 text-sm">
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <p>© {new Date().getFullYear()} UrbizFlow. All rights reserved.</p>
          <nav className="flex sm:justify-end gap-6">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#waitlist" className="hover:text-white">
              Waitlist
            </a>
            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
