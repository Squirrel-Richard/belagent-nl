"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  BarChart3,
  Clock,
  Users,
  Settings,
  LogOut,
  PhoneCall,
  Calendar,
  TrendingUp,
  Mic,
  Bell,
  Play,
  Download,
} from "lucide-react";

const calls = [
  { time: "11:42", duration: "2:34", caller: "+31 6 12 345 678", summary: "Afspraak gepland voor vrijdag 14:00", type: "afspraak", status: "afgehandeld" },
  { time: "11:17", duration: "1:12", caller: "+31 20 456 789 0", summary: "Vraag over openingstijden — doorgestuurd per SMS", type: "info", status: "afgehandeld" },
  { time: "10:55", duration: "3:48", caller: "+31 85 001 0042", summary: "Klacht ingediend — escalatie naar eigenaar", type: "escalatie", status: "actie vereist" },
  { time: "10:30", duration: "0:45", caller: "+31 6 98 765 432", summary: "Bevestiging afgesproken afspraak dinsdag", type: "info", status: "afgehandeld" },
  { time: "09:58", duration: "4:22", caller: "+31 70 555 0088", summary: "Nieuwe klant — interesse in diensten, terugbelafspraak gepland", type: "lead", status: "afgehandeld" },
  { time: "09:14", duration: "1:09", caller: "+31 6 22 334 455", summary: "Adreswijziging doorgegeven — CRM bijgewerkt", type: "info", status: "afgehandeld" },
];

const typeColors: Record<string, string> = {
  afspraak: "#00e5b3",
  info: "#4db8ff",
  escalatie: "#ff6b6b",
  lead: "#f0a500",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("gesprekken");

  const stats = [
    { label: "Gesprekken vandaag", value: "23", icon: <PhoneCall size={18} color="#00e5b3" />, change: "+4 vs gisteren" },
    { label: "Gemiddelde duur", value: "2:18", icon: <Clock size={18} color="#4db8ff" />, change: "-0:12 vs gisteren" },
    { label: "Leads gegenereerd", value: "5", icon: <TrendingUp size={18} color="#f0a500" />, change: "+2 vs gisteren" },
    { label: "Afspraken gepland", value: "8", icon: <Calendar size={18} color="#a78bfa" />, change: "+3 vs gisteren" },
  ];

  return (
    <div style={{ background: "#030810", minHeight: "100vh", color: "#dde8f5", display: "flex" }}>
      {/* Sidebar */}
      <div style={{
        width: 240, minHeight: "100vh",
        background: "rgba(255,255,255,0.02)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        padding: "24px 16px",
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "0 8px 32px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "rgba(0,229,179,0.15)",
            border: "1px solid rgba(0,229,179,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Phone size={15} color="#00e5b3" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>
            BelAgent<span style={{ color: "#00e5b3" }}>.nl</span>
          </span>
        </div>

        {/* Agent status */}
        <div style={{
          padding: "12px 16px",
          background: "rgba(0,229,179,0.06)",
          border: "1px solid rgba(0,229,179,0.15)",
          borderRadius: 14, marginBottom: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00e5b3", boxShadow: "0 0 6px #00e5b3", animation: "breathe 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#00e5b3" }}>AI-Agent ACTIEF</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(221,232,245,0.4)" }}>Bakkerij Demo B.V. · 085-123 4567</div>
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {[
            { id: "gesprekken", label: "Gesprekken", icon: <PhoneCall size={16} /> },
            { id: "analytics", label: "Analytics", icon: <BarChart3 size={16} /> },
            { id: "agenda", label: "Agenda", icon: <Calendar size={16} /> },
            { id: "team", label: "Team", icon: <Users size={16} /> },
            { id: "instellingen", label: "Instellingen", icon: <Settings size={16} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 16px", borderRadius: 12,
                background: activeTab === item.id ? "rgba(0,229,179,0.1)" : "transparent",
                border: activeTab === item.id ? "1px solid rgba(0,229,179,0.2)" : "1px solid transparent",
                color: activeTab === item.id ? "#00e5b3" : "rgba(221,232,245,0.5)",
                fontSize: 14, fontWeight: activeTab === item.id ? 600 : 400,
                cursor: "pointer", textAlign: "left", width: "100%",
                transition: "all 0.2s",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "11px 16px", borderRadius: 12,
          background: "transparent", border: "none",
          color: "rgba(221,232,245,0.3)", fontSize: 14, cursor: "pointer",
        }}>
          <LogOut size={16} /> Uitloggen
        </button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "32px 40px", overflow: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 4 }}>
              Goedemorgen, Marco 👋
            </h1>
            <p style={{ fontSize: 14, color: "rgba(221,232,245,0.45)" }}>
              Woensdag 25 februari 2026 · Je agent heeft vandaag 23 gesprekken afgehandeld.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{
              padding: "10px 18px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, color: "rgba(221,232,245,0.6)",
              fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
            }}>
              <Bell size={15} /> Meldingen
            </button>
            <button style={{
              padding: "10px 20px",
              background: "#00e5b3", color: "#030810",
              border: "none", borderRadius: 10,
              fontWeight: 700, fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Mic size={15} /> Agent configureren
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                padding: "24px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 18,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{ fontSize: 13, color: "rgba(221,232,245,0.45)" }}>{s.label}</span>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: "rgba(255,255,255,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {s.icon}
                </div>
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(221,232,245,0.3)" }}>{s.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Calls */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20, overflow: "hidden",
        }}>
          <div style={{
            padding: "20px 28px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recente gesprekken</h2>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none",
              color: "rgba(221,232,245,0.4)", fontSize: 13, cursor: "pointer",
            }}>
              <Download size={13} /> Exporteren
            </button>
          </div>
          {calls.map((call, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                padding: "16px 28px",
                borderBottom: i < calls.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                display: "flex", alignItems: "center", gap: 20,
                cursor: "pointer", transition: "background 0.15s",
              }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              <div style={{ width: 44, textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#dde8f5" }}>{call.time}</div>
                <div style={{ fontSize: 11, color: "rgba(221,232,245,0.35)" }}>{call.duration}</div>
              </div>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: typeColors[call.type] || "#dde8f5",
                boxShadow: `0 0 6px ${typeColors[call.type]}`,
                flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "rgba(221,232,245,0.55)", marginBottom: 4 }}>{call.caller}</div>
                <div style={{ fontSize: 14, color: "#dde8f5" }}>{call.summary}</div>
              </div>
              <div style={{
                padding: "4px 12px", borderRadius: 99,
                background: call.status === "actie vereist" ? "rgba(255,107,107,0.12)" : "rgba(0,229,179,0.08)",
                border: `1px solid ${call.status === "actie vereist" ? "rgba(255,107,107,0.25)" : "rgba(0,229,179,0.15)"}`,
                fontSize: 11, fontWeight: 600,
                color: call.status === "actie vereist" ? "#ff6b6b" : "#00e5b3",
                whiteSpace: "nowrap",
              }}>
                {call.status}
              </div>
              <button style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(255,255,255,0.04)", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}>
                <Play size={12} color="rgba(221,232,245,0.4)" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
