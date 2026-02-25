"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#030810",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800, height: 800,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,229,179,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 48, justifyContent: "center" }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: "rgba(0,229,179,0.15)",
            border: "1px solid rgba(0,229,179,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Phone size={18} color="#00e5b3" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 20, color: "#dde8f5", letterSpacing: "-0.02em" }}>
            BelAgent<span style={{ color: "#00e5b3" }}>.nl</span>
          </span>
        </Link>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: "48px 40px",
          }}
        >
          {!sent ? (
            <>
              <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 8, color: "#dde8f5" }}>
                Gratis starten
              </h1>
              <p style={{ fontSize: 15, color: "rgba(221,232,245,0.5)", marginBottom: 36, lineHeight: 1.6 }}>
                Voer je e-mailadres in. Geen wachtwoord nodig — we sturen een magische inloglink.
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(221,232,245,0.6)", marginBottom: 8 }}>
                    E-mailadres
                  </label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} color="rgba(221,232,245,0.3)"
                      style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jij@bedrijf.nl"
                      required
                      style={{
                        width: "100%",
                        padding: "14px 16px 14px 44px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                        color: "#dde8f5",
                        fontSize: 15,
                        outline: "none",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(0,229,179,0.4)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: email ? "#00e5b3" : "rgba(0,229,179,0.3)",
                    color: "#030810",
                    border: "none",
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: email ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "all 0.2s",
                    boxShadow: email ? "0 0 40px rgba(0,229,179,0.3)" : "none",
                  }}
                >
                  {loading ? (
                    <div style={{ width: 18, height: 18, border: "2px solid rgba(3,8,16,0.3)", borderTopColor: "#030810", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  ) : (
                    <>Magische link sturen <ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <div style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { icon: <Zap size={14} color="#00e5b3" />, text: "14 dagen gratis — geen creditcard" },
                    { icon: <Shield size={14} color="#00e5b3" />, text: "AVG-compliant — data binnen de EU" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(221,232,245,0.5)" }}>
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center" }}
            >
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "rgba(0,229,179,0.12)",
                border: "1px solid rgba(0,229,179,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
                boxShadow: "0 0 40px rgba(0,229,179,0.2)",
              }}>
                <CheckCircle size={32} color="#00e5b3" />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12, color: "#dde8f5" }}>
                Controleer je inbox
              </h2>
              <p style={{ fontSize: 15, color: "rgba(221,232,245,0.55)", lineHeight: 1.6 }}>
                We hebben een magische inloglink gestuurd naar{" "}
                <span style={{ color: "#00e5b3" }}>{email}</span>.
                <br /><br />
                Klik op de link om direct in te loggen en je AI-agent in te stellen.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                style={{
                  marginTop: 28, background: "none", border: "none",
                  color: "rgba(221,232,245,0.4)", fontSize: 14, cursor: "pointer",
                }}
              >
                Ander e-mailadres gebruiken
              </button>
            </motion.div>
          )}
        </motion.div>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "rgba(221,232,245,0.3)" }}>
          Al een account?{" "}
          <Link href="/dashboard" style={{ color: "rgba(0,229,179,0.7)", textDecoration: "none" }}>
            Direct naar dashboard →
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
