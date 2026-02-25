"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  Mic,
  Clock,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Calendar,
  ChevronDown,
  Star,
  Settings,
} from "lucide-react";

/* ───── stars ───── */
function Stars() {
  const [stars] = useState(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#fff",
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  );
}

/* ───── audio wave ───── */
function AudioWave() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, height: 56 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="wave-bar" />
      ))}
    </div>
  );
}

/* ───── scramble headline ───── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let frame = 0;
    const total = 30;
    const interval = setInterval(() => {
      frame++;
      if (frame >= total) {
        setDisplay(text);
        clearInterval(interval);
        return;
      }
      const progress = frame / total;
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i / text.length < progress) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
    }, 40);
    return () => clearInterval(interval);
  }, [text]);
  return <span className={className}>{display}</span>;
}

/* ───── counter ───── */
function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = 16;
          const steps = duration / step;
          const increment = end / steps;
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return (
    <div ref={ref}>
      {prefix}{count.toLocaleString("nl-NL")}{suffix}
    </div>
  );
}

/* ───── nav ───── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(3,8,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,229,179,0.08)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "rgba(0,229,179,0.15)",
            border: "1px solid rgba(0,229,179,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Phone size={16} color="#00e5b3" />
        </div>
        <span style={{ fontWeight: 700, fontSize: 18, color: "#dde8f5", letterSpacing: "-0.02em" }}>
          BelAgent<span style={{ color: "#00e5b3" }}>.nl</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <a href="#features" style={{ color: "rgba(221,232,245,0.7)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#dde8f5")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(221,232,245,0.7)")}>
          Functies
        </a>
        <Link href="/prijzen" style={{ color: "rgba(221,232,245,0.7)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#dde8f5")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(221,232,245,0.7)")}>
          Prijzen
        </Link>
        <a href="#hoe-werkt-het" style={{ color: "rgba(221,232,245,0.7)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#dde8f5")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(221,232,245,0.7)")}>
          Hoe het werkt
        </a>
        <Link
          href="/login"
          style={{
            padding: "9px 22px",
            background: "rgba(0,229,179,0.12)",
            border: "1px solid rgba(0,229,179,0.35)",
            borderRadius: 10,
            color: "#00e5b3",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(0,229,179,0.22)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(0,229,179,0.12)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Gratis starten
        </Link>
      </div>
    </nav>
  );
}

/* ───── main ───── */
export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const features = [
    {
      icon: <Mic size={22} color="#00e5b3" />,
      title: "Praat als een mens",
      desc: "Jouw AI-agent spreekt vloeiend Nederlands — met regionale accenten, pauzes en intonatie. Klanten merken het verschil niet.",
    },
    {
      icon: <Clock size={22} color="#00e5b3" />,
      title: "24/7 bereikbaar",
      desc: "Geen voicemail meer. Elke oproep wordt direct beantwoord — ook 's nachts, in het weekend en op feestdagen.",
    },
    {
      icon: <Calendar size={22} color="#00e5b3" />,
      title: "Afspraken plannen",
      desc: "Synchroniseert met jouw agenda. Plant afspraken, stuurt bevestigingen en belt terug bij no-shows.",
    },
    {
      icon: <Shield size={22} color="#00e5b3" />,
      title: "AVG-compliant",
      desc: "Alle gesprekken worden verwerkt binnen de EU. Volledig GDPR/AVG-compliant met automatische logging.",
    },
    {
      icon: <BarChart3 size={22} color="#00e5b3" />,
      title: "Realtime dashboard",
      desc: "Bekijk alle gesprekken, samenvattingen en leads in jouw dashboard. Nooit meer iets missen.",
    },
    {
      icon: <Settings size={22} color="#00e5b3" />,
      title: "Klaar in 5 minuten",
      desc: "Geen technische kennis nodig. Upload jouw bedrijfsinfo, stel de stem in en je AI-agent is live.",
    },
  ];

  const testimonials = [
    {
      name: "Marco van der Berg",
      role: "Eigenaar, Berg Loodgieters",
      text: "Ik mis nooit meer een spoedreparatie. BelAgent pakt alle oproepen op als ik onder een aanrecht lig.",
      stars: 5,
    },
    {
      name: "Fatima El Khattabi",
      role: "Praktijkmanager, Tand & Meer",
      text: "Onze receptioniste werd ziek. BelAgent nam het over. Nu behandelen we 30% meer patiënten.",
      stars: 5,
    },
    {
      name: "Joost Bruinsma",
      role: "Directeur, Bruinsma Adviesgroep",
      text: "€249 per maand vs €3.500 voor een receptioniste. De keuze is snel gemaakt.",
      stars: 5,
    },
  ];

  const steps = [
    { num: "01", title: "Account aanmaken", desc: "Vul je bedrijfsnaam, KvK en telefoonnummer in. Klaar in 2 minuten." },
    { num: "02", title: "Agent configureren", desc: "Upload je FAQ, openingstijden en agenda-koppeling. De AI leert jouw stijl." },
    { num: "03", title: "Telefoonnummer koppelen", desc: "Stuur je zakelijke nummer door of gebruik ons gratis 085-nummer." },
    { num: "04", title: "Live gaan", desc: "Druk op activeer. Jouw AI-agent is direct beschikbaar voor alle oproepen." },
  ];

  return (
    <div style={{ background: "#030810", minHeight: "100vh", position: "relative" }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "BelAgent.nl",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "249",
              priceCurrency: "EUR",
              priceValidUntil: "2027-01-01",
            },
            description:
              "AI telefoonagent voor Nederlands MKB. 24/7 bereikbaar, perfect Nederlands, AVG-compliant.",
            url: "https://belagent.nl",
            publisher: {
              "@type": "Organization",
              name: "AIOW BV",
              address: { "@type": "PostalAddress", addressCountry: "NL" },
            },
          }),
        }}
      />

      <Stars />
      <Nav />

      {/* ── HERO ── */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY, position: "relative", zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 24px 80px",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Glow arc */}
          <div
            style={{
              position: "absolute",
              bottom: -200,
              left: "50%",
              transform: "translateX(-50%)",
              width: 1000,
              height: 1000,
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(0,229,179,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
              animation: "pulse-glow 4s ease-in-out infinite",
            }}
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              background: "rgba(0,229,179,0.08)",
              border: "1px solid rgba(0,229,179,0.2)",
              borderRadius: 99,
              marginBottom: 32,
              fontSize: 13,
              color: "#00e5b3",
              fontWeight: 500,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e5b3", boxShadow: "0 0 8px #00e5b3" }} className="breathe" />
            Gartner: 1 op 10 gesprekken geautomatiseerd in 2026
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 800,
              color: "#dde8f5",
              marginBottom: 16,
            }}
          >
            <ScrambleText text="Jouw AI-telefoniste" />
            <br />
            <span style={{ color: "#00e5b3" }}>belt 24/7.</span>
            <br />
            <ScrambleText text="Jij geniet." />
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(221,232,245,0.6)",
              maxWidth: 580,
              lineHeight: 1.6,
              marginBottom: 44,
            }}
          >
            BelAgent beantwoordt, plant en doorstuurt al jouw zakelijke oproepen — in perfect
            Nederlands. Geen technische kennis nodig. Klaar in 5 minuten.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
          >
            <Link
              href="/login"
              style={{
                padding: "16px 36px",
                background: "#00e5b3",
                color: "#030810",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 0 40px rgba(0,229,179,0.35)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 0 60px rgba(0,229,179,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(0,229,179,0.35)";
              }}
            >
              Gratis 14 dagen proberen <ArrowRight size={16} />
            </Link>
            <Link
              href="/prijzen"
              style={{
                padding: "16px 36px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 16,
                color: "#dde8f5",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Bekijk prijzen
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: 24, fontSize: 13, color: "rgba(221,232,245,0.4)" }}
          >
            ✓ Geen creditcard nodig · ✓ Opzegbaar per maand · ✓ NL telefoonnummer inbegrepen
          </motion.p>

          {/* Hero phone viz */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
            className="float-anim"
            style={{ marginTop: 72, position: "relative" }}
          >
            <div
              style={{
                width: 320,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,229,179,0.2)",
                borderRadius: 24,
                padding: "28px 28px 24px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 60px rgba(0,229,179,0.08), 0 40px 80px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(0,229,179,0.15)",
                  border: "1px solid rgba(0,229,179,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Phone size={18} color="#00e5b3" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#dde8f5" }}>BelAgent — Bakkerij Jansen</div>
                  <div style={{ fontSize: 11, color: "rgba(221,232,245,0.5)" }}>Gesprek actief · 0:47</div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#00e5b3",
                    boxShadow: "0 0 8px #00e5b3",
                    animation: "breathe 2s ease-in-out infinite",
                  }} />
                </div>
              </div>
              <AudioWave />
              <div style={{
                marginTop: 16,
                padding: "12px 16px",
                background: "rgba(0,229,179,0.06)",
                border: "1px solid rgba(0,229,179,0.1)",
                borderRadius: 12,
                fontSize: 13,
                color: "rgba(221,232,245,0.7)",
                lineHeight: 1.5,
              }}>
                <span style={{ color: "#00e5b3" }}>AI: </span>
                &ldquo;Goedemiddag, Bakkerij Jansen. Ik ben uw digitale assistent. Waarmee kan ik u helpen?&rdquo;
              </div>
              <div style={{
                marginTop: 10,
                padding: "12px 16px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: 12,
                fontSize: 13,
                color: "rgba(221,232,245,0.6)",
                lineHeight: 1.5,
              }}>
                <span style={{ color: "rgba(221,232,245,0.4)" }}>Klant: </span>
                &ldquo;Ik wil graag een taart bestellen voor zaterdag.&rdquo;
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ marginTop: 48 }}
          >
            <a href="#stats" style={{ color: "rgba(221,232,245,0.3)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12 }}>Scroll</span>
              <ChevronDown size={16} />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* ── STATS ── */}
      <section id="stats" style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 2,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {[
              { label: "Gesprekken beantwoord", val: 2840000, suffix: "+" },
              { label: "NL MKB bedrijven", val: 1200, suffix: "+" },
              { label: "Gemiddelde responstijd", val: 2, suffix: "s" },
              { label: "Tevredenheidsscore", val: 97, suffix: "%" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "44px 32px",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(32px, 5vw, 52px)",
                    fontWeight: 900,
                    color: "#00e5b3",
                    letterSpacing: "-0.03em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  <Counter end={s.val} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 14, color: "rgba(221,232,245,0.5)", marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 72 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", background: "rgba(0,229,179,0.08)",
              border: "1px solid rgba(0,229,179,0.15)", borderRadius: 99,
              marginBottom: 20, fontSize: 13, color: "#00e5b3",
            }}>
              <Zap size={12} /> Alles wat je nodig hebt
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900,
              letterSpacing: "-0.03em", color: "#dde8f5", marginBottom: 16,
            }}>
              Meer dan een antwoordservice
            </h2>
            <p style={{ fontSize: 18, color: "rgba(221,232,245,0.55)", maxWidth: 500, margin: "0 auto" }}>
              BelAgent denkt mee, plant afspraken en escaleert naar jou als het echt nodig is.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: "32px 28px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20,
                  cursor: "default",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,229,179,0.2)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 40px rgba(0,229,179,0.06)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "rgba(0,229,179,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20, border: "1px solid rgba(0,229,179,0.15)",
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#dde8f5", marginBottom: 10, letterSpacing: "-0.01em" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 15, color: "rgba(221,232,245,0.55)", lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOE WERKT HET ── */}
      <section id="hoe-werkt-het" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 72 }}
          >
            <h2 style={{
              fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900,
              letterSpacing: "-0.03em", color: "#dde8f5", marginBottom: 16,
            }}>
              Live in 5 minuten
            </h2>
            <p style={{ fontSize: 18, color: "rgba(221,232,245,0.55)", maxWidth: 480, margin: "0 auto" }}>
              Geen technische kennis. Geen IT-afdeling. Gewoon werken.
            </p>
          </motion.div>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute",
              left: 23,
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, rgba(0,229,179,0.5), rgba(0,229,179,0.1))",
            }} />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                style={{ display: "flex", gap: 32, marginBottom: 48, alignItems: "flex-start" }}
              >
                <div style={{
                  width: 48, height: 48, minWidth: 48,
                  borderRadius: "50%",
                  background: "rgba(0,229,179,0.1)",
                  border: "1px solid rgba(0,229,179,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#00e5b3",
                  position: "relative", zIndex: 1,
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#dde8f5", marginBottom: 8, letterSpacing: "-0.01em" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 16, color: "rgba(221,232,245,0.55)", lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textAlign: "center", fontSize: "clamp(24px, 4vw, 42px)",
              fontWeight: 900, letterSpacing: "-0.03em", color: "#dde8f5", marginBottom: 56,
            }}
          >
            NL bedrijven zijn al overgestapt
          </motion.h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: "32px 28px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20,
                }}
              >
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={14} fill="#00e5b3" color="#00e5b3" />
                  ))}
                </div>
                <p style={{ fontSize: 16, color: "rgba(221,232,245,0.75)", lineHeight: 1.6, marginBottom: 24, fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#dde8f5" }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: "rgba(221,232,245,0.4)" }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "100px 24px 120px", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
            padding: "72px 40px",
            background: "rgba(0,229,179,0.04)",
            border: "1px solid rgba(0,229,179,0.15)",
            borderRadius: 32,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, height: 600,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(0,229,179,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <h2 style={{
            fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900,
            letterSpacing: "-0.03em", color: "#dde8f5", marginBottom: 20,
            position: "relative",
          }}>
            Start vandaag nog.
            <br />
            <span style={{ color: "#00e5b3" }}>14 dagen gratis.</span>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(221,232,245,0.55)", marginBottom: 44, position: "relative", lineHeight: 1.6 }}>
            Geen creditcard. Geen technische kennis. Gewoon instellen en live gaan.
          </p>
          <Link
            href="/login"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "18px 44px",
              background: "#00e5b3",
              color: "#030810",
              borderRadius: 14,
              fontWeight: 700,
              fontSize: 17,
              textDecoration: "none",
              boxShadow: "0 0 60px rgba(0,229,179,0.4)",
              transition: "all 0.2s",
              position: "relative",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 0 80px rgba(0,229,179,0.6)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 60px rgba(0,229,179,0.4)";
            }}
          >
            Account aanmaken <ArrowRight size={18} />
          </Link>
          <p style={{ marginTop: 24, fontSize: 13, color: "rgba(221,232,245,0.3)", position: "relative" }}>
            Daarna vanaf €249/maand · Opzegbaar per maand
          </p>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "48px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center", gap: 24,
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#dde8f5", marginBottom: 6 }}>
              BelAgent<span style={{ color: "#00e5b3" }}>.nl</span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(221,232,245,0.35)" }}>
              © 2026 AIOW BV — Hoofddorp, Nederland
            </div>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              ["Functies", "#features"],
              ["Prijzen", "/prijzen"],
              ["Privacy", "/privacy"],
              ["Voorwaarden", "/voorwaarden"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link key={label} href={href}
                style={{ fontSize: 13, color: "rgba(221,232,245,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#dde8f5")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(221,232,245,0.4)")}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
