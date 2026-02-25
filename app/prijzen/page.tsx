"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Check, ArrowRight, Zap, Star, ChevronDown, ChevronUp } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 249,
    description: "Voor freelancers en kleine bedrijven",
    minutes: 50,
    highlight: false,
    features: [
      "50 bel-minuten per maand",
      "1 AI-agent configuratie",
      "NL telefoonnummer (085-)",
      "Gespreksamenvattingen",
      "E-mail notificaties",
      "AVG-compliant opslag",
      "Basis dashboard",
      "E-mail support",
    ],
    cta: "14 dagen gratis proberen",
    note: "Daarna €249/maand, opzegbaar",
  },
  {
    name: "Pro",
    price: 499,
    description: "Voor groeiende MKB bedrijven",
    minutes: 200,
    highlight: true,
    features: [
      "200 bel-minuten per maand",
      "3 AI-agent configuraties",
      "NL telefoonnummer (085-)",
      "Agenda-integratie (Calendly, Google)",
      "CRM-koppeling (HubSpot, Pipedrive)",
      "WhatsApp follow-up automatisch",
      "Realtime transcriptie",
      "Prioriteit support",
      "API-toegang",
    ],
    cta: "14 dagen gratis proberen",
    note: "Meest gekozen door NL MKB",
  },
  {
    name: "Enterprise",
    price: 999,
    description: "Voor organisaties met hoog belvolume",
    minutes: 1000,
    highlight: false,
    features: [
      "1.000 bel-minuten per maand",
      "Onbeperkte agent-configuraties",
      "Eigen telefoonnummer inporteren",
      "Multi-locatie support",
      "SSO / SAML authenticatie",
      "Dedicated account manager",
      "SLA 99.9% uptime",
      "Custom integraties",
      "Uitgebreide rapportage",
      "Telefoon + Teams support",
    ],
    cta: "Neem contact op",
    note: "Op maat, extra minuten: €0.18/min",
  },
];

const faqs = [
  {
    q: "Is mijn belverkeer GDPR/AVG-compliant?",
    a: "Ja. Alle gesprekken worden opgeslagen op servers binnen de EU (Nederland/Duitsland). Wij hanteren een verwerkersovereenkomst conform de AVG. Gesprekken worden automatisch geanonimiseerd na 90 dagen, tenzij je anders instelt.",
  },
  {
    q: "Welke talen spreekt BelAgent?",
    a: "BelAgent is geoptimaliseerd voor Nederlands — inclusief regionale accenten en dialect. Naast Nederlands ondersteunt de Pro en Enterprise versie ook Engels, Frans en Duits als fallback.",
  },
  {
    q: "Wat als ik mijn bundel overschrijd?",
    a: "Bij overschrijding wordt er automatisch bijgeteld à €0.22/minuut (Starter), €0.18/minuut (Pro) of €0.14/minuut (Enterprise). Je krijgt een waarschuwing bij 80% gebruik.",
  },
  {
    q: "Kan ik mijn eigen telefoonnummer gebruiken?",
    a: "Bij Pro en Enterprise kun je jouw bestaande zakelijke nummer doorsturen naar BelAgent. Enterprise klanten kunnen hun nummer volledig inporteren (number porting).",
  },
  {
    q: "Hoe lang duurt de setup?",
    a: "De meeste klanten zijn binnen 5 minuten live. Je vult je bedrijfsgegevens in, uploadt een korte FAQ en de AI-agent is direct beschikbaar.",
  },
  {
    q: "Is er een contract of minimale looptijd?",
    a: "Nee. Alle plannen zijn maandelijks opzegbaar. Geen opzegtermijn, geen verborgen kosten.",
  },
];

export default function Prijzen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#030810", minHeight: "100vh", color: "#dde8f5" }}>
      {/* Nav */}
      <nav style={{
        padding: "20px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(0,229,179,0.15)",
            border: "1px solid rgba(0,229,179,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Phone size={16} color="#00e5b3" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#dde8f5", letterSpacing: "-0.02em" }}>
            BelAgent<span style={{ color: "#00e5b3" }}>.nl</span>
          </span>
        </Link>
        <Link href="/login" style={{
          padding: "9px 22px",
          background: "rgba(0,229,179,0.12)",
          border: "1px solid rgba(0,229,179,0.35)",
          borderRadius: 10, color: "#00e5b3",
          fontSize: 14, fontWeight: 600, textDecoration: "none",
        }}>
          Gratis starten
        </Link>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", padding: "80px 24px 64px" }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", background: "rgba(0,229,179,0.08)",
          border: "1px solid rgba(0,229,179,0.15)", borderRadius: 99,
          marginBottom: 24, fontSize: 13, color: "#00e5b3",
        }}>
          <Zap size={12} /> Transparante prijzen — geen verrassingen
        </div>
        <h1 style={{
          fontSize: "clamp(32px, 6vw, 60px)", fontWeight: 900,
          letterSpacing: "-0.03em", marginBottom: 20,
        }}>
          Kies jouw plan
        </h1>
        <p style={{ fontSize: 18, color: "rgba(221,232,245,0.55)", maxWidth: 520, margin: "0 auto" }}>
          Alle plannen inclusief 14 dagen gratis proefperiode.
          Geen creditcard nodig. Maandelijks opzegbaar.
        </p>
      </motion.div>

      {/* Plans */}
      <div style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: "40px 32px",
                background: plan.highlight ? "rgba(0,229,179,0.06)" : "rgba(255,255,255,0.025)",
                border: plan.highlight ? "1px solid rgba(0,229,179,0.35)" : "1px solid rgba(255,255,255,0.06)",
                borderRadius: 24,
                position: "relative",
                boxShadow: plan.highlight ? "0 0 60px rgba(0,229,179,0.08)" : "none",
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  padding: "4px 18px",
                  background: "#00e5b3", color: "#030810",
                  borderRadius: 99, fontSize: 12, fontWeight: 700,
                  display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
                }}>
                  <Star size={11} fill="#030810" /> Meest populair
                </div>
              )}
              <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 600, color: "#00e5b3", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {plan.name}
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.04em", color: "#dde8f5" }}>
                  €{plan.price}
                </span>
                <span style={{ fontSize: 15, color: "rgba(221,232,245,0.45)" }}>/maand</span>
              </div>
              <div style={{ fontSize: 14, color: "rgba(221,232,245,0.5)", marginBottom: 32 }}>
                {plan.description}
              </div>
              <div style={{
                padding: "12px 16px",
                background: "rgba(0,229,179,0.06)",
                border: "1px solid rgba(0,229,179,0.1)",
                borderRadius: 10,
                fontSize: 14, color: "#00e5b3", fontWeight: 600, marginBottom: 32,
                textAlign: "center",
              }}>
                📞 {plan.minutes.toLocaleString("nl-NL")} minuten per maand
              </div>
              <Link
                href="/login"
                style={{
                  display: "block", width: "100%",
                  padding: "14px",
                  background: plan.highlight ? "#00e5b3" : "rgba(255,255,255,0.04)",
                  border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, textAlign: "center",
                  color: plan.highlight ? "#030810" : "#dde8f5",
                  fontWeight: 700, fontSize: 15, textDecoration: "none",
                  marginBottom: 24, transition: "all 0.2s",
                  boxShadow: plan.highlight ? "0 0 40px rgba(0,229,179,0.3)" : "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}
              >
                {plan.cta} <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", marginLeft: 4 }} />
              </Link>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
                {plan.features.map((f, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <Check size={15} color="#00e5b3" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "rgba(221,232,245,0.7)", lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, fontSize: 12, color: "rgba(221,232,245,0.3)", textAlign: "center" }}>
                {plan.note}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 48, padding: "32px 40px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 20, textAlign: "center",
          }}
        >
          <p style={{ fontSize: 15, color: "rgba(221,232,245,0.55)" }}>
            Zorginstelling, gemeente of corporatie? Vraag onze{" "}
            <a href="mailto:hallo@belagent.nl" style={{ color: "#00e5b3", textDecoration: "none" }}>
              sectorspecifieke offerte
            </a>{" "}
            aan — incl. AVG-verwerkersovereenkomst en DPIA.
          </p>
        </motion.div>
      </div>

      {/* FAQ */}
      <section style={{ padding: "40px 24px 100px", maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 40, textAlign: "center" }}>
          Veelgestelde vragen
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", padding: "22px 24px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "left", gap: 16,
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 600, color: "#dde8f5", lineHeight: 1.4 }}>{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp size={18} color="rgba(221,232,245,0.4)" style={{ flexShrink: 0 }} />
                  : <ChevronDown size={18} color="rgba(221,232,245,0.4)" style={{ flexShrink: 0 }} />
                }
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "0 24px 22px", fontSize: 15, color: "rgba(221,232,245,0.55)", lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "32px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 13, color: "rgba(221,232,245,0.3)" }}>
          © 2026 AIOW BV · Hoofddorp, Nederland ·{" "}
          <a href="mailto:hallo@belagent.nl" style={{ color: "rgba(221,232,245,0.4)", textDecoration: "none" }}>
            hallo@belagent.nl
          </a>
        </p>
      </footer>
    </div>
  );
}
