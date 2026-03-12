"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Compass,
  Cpu,
  Handshake,
  Lightbulb,
  Mic,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Fade-in hook: elements animate in when they enter the viewport    */
/* ------------------------------------------------------------------ */
function useFadeIn<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          io.unobserve(el);
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

function FadeIn({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`fade-target ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const startupStack = [
  "Acquired and Founders Podcast",
  "Y Combinator YouTube",
  "Paul Graham essays",
  "Pitch decks and investment memos",
  "Journal Club style research to startup thinking",
  "Founder stories and postmortems",
  "Market maps and startup teardowns",
  "Mentoring startups and workshops about startups and venture capital",
];

const whyMe = [
  {
    title: "Founder proximity",
    text: "I have lived closer to startup reality than most traditional candidates. That gave me a better feel for what is real, what is noise, and what founders actually face while building.",
    icon: Rocket,
  },
  {
    title: "Technical builder across AI, hardware, and software",
    text: "I use AI actively and I have built across both hardware and software. With FUTECH, I worked on launching a hardware product. With PBS, I worked on an AI product. That combination helps me understand technical depth, product tradeoffs, and what it takes to turn ideas into something real.",
    icon: Cpu,
  },
  {
    title: "Saudi and China startup ecosystem exposure",
    text: "My path has been shaped inside the Saudi startup ecosystem while also being incubated in Shenzhen, China. That gave me exposure to ambitious builders, fast execution, and a broader view of how startups move when they are close to manufacturing, technology, and real market pressure.",
    icon: Compass,
  },
];

const community = [
  {
    title: "VC workshop speaker in Jeddah",
    text: "I spoke about startup funding and venture capital and translated the topic into practical guidance for aspiring founders and students.",
    icon: Mic,
  },
  {
    title: "KGSP Convocation in Washington, DC",
    text: "As a KGSP Alumni Ambassador, I hosted sessions around careers in startups and shared my journey with students and faculty.",
    icon: Handshake,
  },
  {
    title: "Workshops and founder support",
    text: "I have led sessions around startups, market research, and innovation, which sharpened both my communication and my ability to assess ideas quickly.",
    icon: Lightbulb,
  },
];

const sourcingLens = [
  "A painful problem that is frequent and expensive",
  "A founder with insight that is hard to fake",
  "A wedge that can expand into something larger",
  "Timing supported by real market momentum",
];

const first90 = [
  "Build a clean sourcing rhythm across founder and ecosystem networks",
  "Map a few sectors deeply and form clear views on where conviction should go",
  "Support screening and memos with structured and thoughtful analysis",
  "Build strong founder relationships and follow through with care",
];

const credibilityLogos = [
  { src: "/images/kaust_logo-removebg-preview.png", alt: "KAUST" },
  { src: "/images/uw_madison_logo-removebg-preview.png", alt: "UW-Madison" },
  { src: "/images/kgsp.png", alt: "KGSP" },
  { src: "/images/uw.png", alt: "UW" },
  { src: "/images/mbsc.png", alt: "MBSC" },
  { src: "/images/pbs.png", alt: "PBS" },
  { src: "/images/innox.png", alt: "Innox" },
];

const directAnswers = [
  {
    title: "Current role and company",
    body: "I am currently pursuing my MSc in Technology, Innovation and Entrepreneurship at KAUST while building FUTECH and staying deeply involved in startup and innovation work.",
  },
  {
    title: "Experience in VC, startups, or investment related roles",
    body: "My experience is more startup and venture building oriented than traditional VC or banking, but that has given me real founder proximity, sharper market curiosity, and a strong instinct for how to assess early stage opportunities. I also bring hands on experience in launching a hardware product with FUTECH and building an AI product with PBS.",
  },
  {
    title: "Expected monthly salary",
    body: "My expected monthly salary is in the range of 18,000 to 25,000 SAR depending on the scope of the role and fit.",
  },
  {
    title: "Notice period and availability",
    body: "My availability is flexible, with a preference to start in April.",
  },
  {
    title: "If I had $1M to invest today",
    body: "I would focus on vertical AI and workflow software in sectors where the Gulf has urgency, budget, and strong market momentum, especially industrial operations, logistics, fintech infrastructure, and enterprise software. I like markets where adoption is driven by real pain rather than novelty.",
  },
];

const experiencePhotos = [
  { src: "/images/exp-6.JPG", caption: "" },
  { src: "/images/exp-7.JPG", caption: "" },
  { src: "/images/exp-2.JPG", caption: "" },
  { src: "/images/exp-3.JPG", caption: "" },
  { src: "/images/exp-4.JPG", caption: "" },
  { src: "/images/exp-5.JPG", caption: "" },
];

const miniMemoQuestions = [
  "How repeatable the deployment model is as they scale",
  "Whether implementation cycles can stay efficient as projects grow",
  "How much of the solution becomes sticky inside industrial workflows",
  "What the long term margin profile looks like across deployment and maintenance",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function VentureAssociateApplicationSite() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  /* Carousel state */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideCount = experiencePhotos.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, slideCount]);

  return (
    <>
      {/* ---------- Global styles & fonts ---------- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap');

        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-body { font-family: 'DM Sans', system-ui, sans-serif; }

        /* Fade-in animation system */
        .fade-target {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fade-target.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero entrance */
        .hero-enter {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-enter.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Subtle noise overlay */
        .noise-overlay::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px;
        }

        /* Smooth scroll */
        html { scroll-behavior: smooth; }

        /* Logo hover lift */
        .logo-card {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.35s ease;
        }
        .logo-card:hover {
          transform: translateY(-3px);
          background-color: rgba(255,255,255,0.08);
        }

        /* Card hover */
        .card-lift {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s ease,
                      background-color 0.35s ease;
        }
        .card-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px -15px rgba(0,0,0,0.5);
        }

        /* Accent line animation */
        .accent-line {
          width: 0;
          transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .in-view .accent-line {
          width: 3.5rem;
        }

        /* Profile image subtle zoom on hover */
        .profile-img {
          transition: transform 6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .profile-card:hover .profile-img {
          transform: scale(1.04);
        }

        /* Carousel crossfade */
        .carousel-slide {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        .carousel-slide.active {
          opacity: 1;
        }
      `}</style>

      <div className="noise-overlay font-body min-h-screen bg-[#0a0a0b] text-[#e8e4df] antialiased">
        {/* Background atmosphere */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,rgba(45,212,191,0.08),transparent),radial-gradient(ellipse_60%_50%_at_90%_100%,rgba(251,191,36,0.04),transparent)]" />
        </div>

        {/* ========== TOP BAR ========== */}
        <div className="border-b border-white/[0.06] px-6 py-5 md:px-10">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <img
              src="/images/100vc.png"
              alt="100VC"
              className="h-12 w-auto object-contain mix-blend-screen"
            />
            <span className="font-display text-xl text-white/80">100VC</span>
          </div>
        </div>

        {/* ========== HERO ========== */}
        <section className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
            {/* Left column */}
            <div
              className={`hero-enter ${loaded ? "visible" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                <span className="text-xs tracking-[0.2em] text-white/60 uppercase">
                  Venture Associate Application
                </span>
              </div>

              <h1 className="font-display mt-8 text-[2.75rem] leading-[1.1] font-normal tracking-tight md:text-[3.75rem] lg:text-[4.25rem]">
                Grounded, curious, analytical,{" "}
                <br className="hidden md:block" />
                and deeply drawn{" "}
                <em className="text-teal-300/90">to startups.</em>
              </h1>

              <p className="mt-7 max-w-xl text-[1.05rem] leading-[1.85] text-white/55">
                This is my way of showing how I think and why I believe I would
                be a strong fit for the Venture Associate role at 100 Ventures.
                My background sits at the intersection of technology, venture
                building, research, and product execution. With a strong
                academic foundation in innovation and venture building, along
                with hands on experience founding and working with startups, I
                have built the instincts and perspective that make this work
                deeply meaningful to me.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  { label: "Based in Jeddah", accent: true },
                  { label: "18,000 to 25,000 SAR" },
                  { label: "Available in April" },
                  { label: "KGSP Scholar" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded-full px-4 py-2 text-[0.8rem] tracking-wide ${
                      tag.accent
                        ? "border border-teal-400/20 bg-teal-400/[0.07] text-teal-200/90"
                        : "border border-white/[0.08] bg-white/[0.03] text-white/50"
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#answers"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0a0a0b] transition-all hover:bg-teal-50 hover:shadow-lg hover:shadow-teal-400/10"
                >
                  See my answers
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#memo"
                  className="inline-flex items-center rounded-full border border-white/[0.12] px-6 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.04] hover:text-white/90"
                >
                  Startup memo
                </a>
              </div>
            </div>

            {/* Right column: profile card */}
            <div
              className={`profile-card hero-enter ${loaded ? "visible" : ""}`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/profile.jpg"
                    alt="Abdullah Aldossary"
                    className="profile-img h-full w-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/20 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6">
                    <p className="font-display text-2xl text-white/95">
                      Abdullah Aldossary
                    </p>
                    <p className="mt-1.5 max-w-xs text-[0.82rem] leading-relaxed text-white/50">
                      MSc in Technology, Innovation and Entrepreneurship at
                      KAUST. Co-founder of FUTECH. Builder, founder, and
                      deeply embedded in the Saudi and China startup ecosystems.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                  <div className="bg-[#0a0a0b] p-5">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/35">
                      Now
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                      KAUST TIE MSc &amp; building FUTECH
                    </p>
                  </div>
                  <div className="bg-[#0a0a0b] p-5">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/35">
                      Focus
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                      Startups, venture, AI, hardware, ecosystems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== EXPERIENCE CAROUSEL ========== */}
        <FadeIn>
          <section className="mx-auto max-w-7xl px-6 pt-12 md:px-10 md:pt-16">
            <div
              className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="relative aspect-[21/9] w-full">
                {experiencePhotos.map((photo, i) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    alt={photo.caption || `Experience ${i + 1}`}
                    className={`carousel-slide absolute inset-0 h-full w-full object-cover ${
                      i === currentSlide ? "active" : ""
                    }`}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/60 via-transparent to-transparent" />
              </div>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {experiencePhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide
                        ? "w-6 bg-teal-400/70"
                        : "w-2 bg-white/25 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ========== CREDIBILITY LOGOS ========== */}
        <FadeIn>
          <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
            <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-4">
              {credibilityLogos.map((item) => (
                <div
                  key={item.alt}
                  className="logo-card flex h-24 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:h-28"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-h-full max-w-full object-contain opacity-75 mix-blend-screen"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ========== WHY ME ========== */}
        <section
          id="why-me"
          className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20"
        >
          <FadeIn>
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <div className="accent-line h-px bg-teal-400/50" />
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-teal-300/60">
                  Why me
                </p>
              </div>
              <h2 className="font-display mt-5 text-[2rem] leading-tight md:text-[2.75rem]">
                Why I believe I could be a strong fit for this role
              </h2>
              <p className="mt-5 max-w-2xl text-[0.95rem] leading-[1.9] text-white/45">
                I love venture because it is challenging and because it is not
                an easy path. It sits in the middle of uncertainty, people,
                judgment, markets, and conviction. That is exactly the kind of
                environment where I see myself thriving. What attracts me most
                is not just evaluating companies on paper. It is understanding
                why certain founders, timing, and ideas deserve belief while
                others do not.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {whyMe.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 120}>
                  <div className="card-lift group h-full rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 hover:bg-white/[0.04]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/[0.08] text-teal-300/70 transition-colors group-hover:bg-teal-400/[0.12] group-hover:text-teal-300/90">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display mt-6 text-[1.35rem] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[0.85rem] leading-[1.85] text-white/40">
                      {item.text}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* ========== STARTUP STACK ========== */}
        <section className="border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <FadeIn>
                <div>
                  <div className="flex items-center gap-4">
                    <div className="accent-line h-px bg-teal-400/50" />
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-teal-300/60">
                      Startup stack
                    </p>
                  </div>
                  <h2 className="font-display mt-5 text-[2rem] leading-tight md:text-[2.5rem]">
                    How I stay close to startup and venture thinking
                  </h2>
                  <p className="mt-5 max-w-md text-[0.9rem] leading-[1.85] text-white/40">
                    These are the things I naturally spend time with because I
                    genuinely enjoy this world. It is not performative interest.
                    It is where my curiosity goes on its own.
                  </p>
                </div>
              </FadeIn>

              <div className="grid gap-3 sm:grid-cols-2">
                {startupStack.map((item, i) => (
                  <FadeIn key={item} delay={i * 60}>
                    <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0b]/60 px-5 py-4 text-[0.85rem] leading-relaxed text-white/55 transition-colors hover:border-white/[0.1] hover:text-white/70">
                      {item}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== SOURCING LENS ========== */}
        <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <FadeIn>
              <div>
                <div className="flex items-center gap-4">
                  <div className="accent-line h-px bg-teal-400/50" />
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-teal-300/60">
                    My lens
                  </p>
                </div>
                <h2 className="font-display mt-5 text-[2rem] leading-tight md:text-[2.5rem]">
                  What I tend to look for in startups
                </h2>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {sourcingLens.map((item, i) => (
                    <FadeIn key={item} delay={i * 80}>
                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-[0.9rem] leading-relaxed text-white/55">
                        {item}
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="rounded-3xl border border-teal-400/[0.1] bg-gradient-to-br from-teal-400/[0.04] to-transparent p-8 md:p-9">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-teal-300/50">
                  A signal I care about
                </p>
                <h3 className="font-display mt-4 text-[1.5rem] leading-snug">
                  Technical founder with strong people and ecosystem skills
                </h3>
                <p className="mt-4 text-[0.85rem] leading-[1.85] text-white/40">
                  I care a lot about being both technical and outward facing. I
                  have a strong technical background, experience building
                  hardware and AI products, and I also enjoy speaking with
                  founders, hosting sessions, mentoring, and staying close to
                  the ecosystem. Being part of KGSP also reflects a high
                  standard and a strong talent network that shaped me early.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "AI and hardware builder",
                    "Founder facing",
                    "KGSP talent network",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[0.78rem] text-white/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ========== COMMUNITY ========== */}
        <section className="border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
            <FadeIn>
              <div className="max-w-3xl">
                <div className="flex items-center gap-4">
                  <div className="accent-line h-px bg-teal-400/50" />
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-teal-300/60">
                    Community
                  </p>
                </div>
                <h2 className="font-display mt-5 text-[2rem] leading-tight md:text-[2.5rem]">
                  I do not only study startups. I also try to contribute to the
                  ecosystem around them.
                </h2>
              </div>
            </FadeIn>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {community.map((item, i) => {
                const Icon = item.icon;
                return (
                  <FadeIn key={item.title} delay={i * 120}>
                    <div className="card-lift group h-full rounded-3xl border border-white/[0.06] bg-[#0a0a0b]/60 p-8 hover:bg-[#0a0a0b]/80">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-white/50 transition-colors group-hover:text-white/70">
                        <Icon className="h-[1.1rem] w-[1.1rem]" />
                      </div>
                      <h3 className="font-display mt-5 text-[1.25rem] leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[0.85rem] leading-[1.85] text-white/40">
                        {item.text}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========== STARTUP MEMO ========== */}
        <section
          id="memo"
          className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-3xl border border-white/[0.06] bg-white/[0.02]">
                <div className="p-8 md:p-10">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-400/[0.08] text-teal-300/70">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/35">
                        Startup that caught my attention
                      </p>
                      <h2 className="font-display mt-1 text-[1.75rem]">
                        Swarm Robotics
                      </h2>
                    </div>
                  </div>

                  <div className="mt-7 rounded-2xl border border-white/[0.06] bg-[#0a0a0b]/60 p-4">
                    <p className="text-[0.88rem] leading-relaxed text-white/50">
                      One startup I recently found interesting is Swarm
                      Robotics. They are building automation and intralogistics
                      solutions for industrial and logistics operations in Saudi
                      Arabia.
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        icon: Search,
                        label: "Why it stands out to me",
                        text: "They are solving a real and expensive operational problem in a market with strong momentum from logistics automation, robotics, and AI.",
                      },
                      {
                        icon: Sparkles,
                        label: "Founder signal",
                        text: "Having met them, I found the founders knowledgeable, relentless, and deeply committed. That matters a lot at this stage.",
                      },
                      {
                        icon: Briefcase,
                        label: "Strategic edge",
                        text: "Their ecosystem and partnership links to Shenzhen and the China robotics ecosystem could become a real early advantage. It can help them move faster, access better technology, and build stronger relationships.",
                      },
                    ].map((card) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={card.label}
                          className="rounded-2xl border border-white/[0.06] bg-[#0a0a0b]/60 p-5"
                        >
                          <div className="flex items-center gap-2.5 text-white/65">
                            <Icon className="h-4 w-4" />
                            <p className="text-[0.82rem] font-medium">
                              {card.label}
                            </p>
                          </div>
                          <p className="mt-2.5 text-[0.83rem] leading-[1.8] text-white/40">
                            {card.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="h-full rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent">
                <div className="p-8 md:p-10">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/35">
                    Mini memo
                  </p>
                  <h3 className="font-display mt-3 text-[1.5rem] leading-snug">
                    What I would want to understand better
                  </h3>

                  <div className="mt-7 space-y-3">
                    {miniMemoQuestions.map((item, i) => (
                      <div
                        key={item}
                        className="flex gap-4 rounded-2xl border border-white/[0.06] bg-[#0a0a0b]/60 p-4"
                      >
                        <span className="mt-0.5 text-[0.75rem] font-medium text-teal-400/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[0.85rem] leading-relaxed text-white/50">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://swarmrobotics.io/about"
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0a0a0b] transition-all hover:bg-teal-50 hover:shadow-lg hover:shadow-teal-400/10"
                  >
                    View Swarm Robotics
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ========== DIRECT ANSWERS ========== */}
        <section
          id="answers"
          className="border-y border-white/[0.06] bg-white/[0.015]"
        >
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
            <FadeIn>
              <div className="max-w-3xl">
                <div className="flex items-center gap-4">
                  <div className="accent-line h-px bg-teal-400/50" />
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-teal-300/60">
                    Direct responses
                  </p>
                </div>
                <h2 className="font-display mt-5 text-[2rem] leading-tight md:text-[2.5rem]">
                  The practical answers you asked for
                </h2>
              </div>
            </FadeIn>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {directAnswers.map((item, i) => (
                <FadeIn
                  key={item.title}
                  delay={i * 80}
                  className={
                    i === directAnswers.length - 1 ? "md:col-span-2" : ""
                  }
                >
                  <div className="card-lift h-full rounded-3xl border border-white/[0.06] bg-[#0a0a0b]/60 p-7 hover:bg-[#0a0a0b]/80 md:p-8">
                    <h3 className="font-display text-[1.15rem] text-white/80">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.85rem] leading-[1.85] text-white/40">
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FIRST 90 DAYS + CLOSING ========== */}
        <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-3xl border border-white/[0.06] bg-white/[0.02]">
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-4">
                    <div className="accent-line h-px bg-teal-400/50" />
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-teal-300/60">
                      First 90 days
                    </p>
                  </div>
                  <h2 className="font-display mt-5 text-[1.75rem] leading-tight md:text-[2rem]">
                    How I would try to add value early
                  </h2>

                  <div className="mt-7 space-y-3">
                    {first90.map((item, i) => (
                      <div
                        key={item}
                        className="flex gap-4 rounded-2xl border border-white/[0.06] bg-[#0a0a0b]/60 p-4"
                      >
                        <span className="mt-0.5 text-[0.75rem] font-medium text-teal-400/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[0.85rem] leading-relaxed text-white/50">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="h-full rounded-3xl border border-teal-400/[0.08] bg-gradient-to-b from-teal-400/[0.03] to-transparent">
                <div className="flex h-full flex-col p-8 md:p-10">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-teal-300/50">
                    Closing note
                  </p>
                  <h2 className="font-display mt-5 text-[1.75rem] leading-snug md:text-[2.15rem]">
                    I am not trying to look like the standard candidate.
                  </h2>
                  <p className="font-display mt-2 text-[1.35rem] leading-snug text-white/40 md:text-[1.5rem]">
                    I am trying to show how I think, what I care about, and how
                    I would show up.
                  </p>

                  <p className="mt-6 text-[0.9rem] leading-[1.85] text-white/40">
                    If this role is about curiosity, discipline, founder
                    empathy, thoughtful evaluation, and being at the center of a
                    real startup ecosystem, I would genuinely love the chance to
                    continue the conversation.
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Warm and human",
                        "Founder minded",
                        "Curious about emerging markets",
                        "Serious about venture",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-[0.78rem] text-white/35"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer className="border-t border-white/[0.06] px-6 py-14 md:px-10">
          <div className="mx-auto max-w-7xl text-center">
            <p className="font-display text-2xl text-white/40">
              Abdullah Aldossary
            </p>
            <p className="mt-2 text-[0.8rem] tracking-wide text-white/25">
              Jeddah, Saudi Arabia
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[0.82rem]">
              <a
                href="mailto:abdullahbandar@yahoo.com"
                className="text-white/35 transition-colors hover:text-teal-300/70"
              >
                abdullahbandar@yahoo.com
              </a>
              <span className="hidden text-white/15 sm:inline">|</span>
              <a
                href="tel:+966569385055"
                className="text-white/35 transition-colors hover:text-teal-300/70"
              >
                +966 56 938 5055
              </a>
              <span className="hidden text-white/15 sm:inline">|</span>
              <a
                href="https://linkedin.com/in/abdullah44aldossary"
                target="_blank"
                rel="noreferrer"
                className="text-white/35 transition-colors hover:text-teal-300/70"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
