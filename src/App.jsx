import { useState } from "react";
import {
  Home,
  ShoppingCart,
  Users,
  BarChart3,
  Menu,
  Sun,
  Moon,
  User,
  Store,
  Shield,
} from "lucide-react";

export default function NexaCommerce() {
  const [dark, setDark] = useState(true);
  const [role, setRole] = useState(null); // client | seller | admin
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const d = dark;

  const theme = {
    bg: d ? "#0a0e1a" : "#f4f6f9",
    card: d ? "#0d1526" : "#ffffff",
    sidebar: d ? "#060c1a" : "#ffffff",
    nav: d ? "#08111f" : "#ffffff",
    border: d ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    text: d ? "#e8edf5" : "#1f2937",
    textMuted: d ? "#6b7a99" : "#6b7280",
    accent: "#3b82f6",
  };

  /* =========================
     LOGIN SCREEN
  ========================== */
  if (!role) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: theme.bg,
          color: theme.text,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            flex: 1,
            padding: 60,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontSize: 40, marginBottom: 20 }}>
            The Future of <br />
            <span style={{ color: theme.accent }}>
              Intelligent Commerce
            </span>
          </h1>

          <p style={{ color: theme.textMuted, marginBottom: 20 }}>
            AI-powered e-commerce with community-driven insights,
            360° product views and analytics.
          </p>

          <ul style={{ lineHeight: 2 }}>
            <li>✔ AI product recommendations</li>
            <li>✔ Real-time discussions</li>
            <li>✔ 360° immersive viewer</li>
            <li>✔ Advanced seller analytics</li>
          </ul>
        </div>

        {/* RIGHT SIDE LOGIN */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 400,
              padding: 30,
              borderRadius: 16,
              background: theme.card,
              border: `1px solid ${theme.border}`,
            }}
          >
            <h2 style={{ marginBottom: 20 }}>Welcome Back</h2>

            <p style={{ color: theme.textMuted, marginBottom: 20 }}>
              Quick Demo Login
            </p>

            <div style={{ display: "flex", gap: 10 }}>
              <RoleButton
                icon={<User size={18} />}
                label="Client"
                onClick={() => setRole("client")}
                theme={theme}
              />
              <RoleButton
                icon={<Store size={18} />}
                label="Seller"
                onClick={() => setRole("seller")}
                theme={theme}
              />
              <RoleButton
                icon={<Shield size={18} />}
                label="Admin"
                onClick={() => setRole("admin")}
                theme={theme}
              />
            </div>

            <div style={{ marginTop: 20, textAlign: "right" }}>
              <span
                onClick={() => setDark(!dark)}
                style={{ cursor: "pointer" }}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     DASHBOARD SCREEN
  ========================== */

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: collapsed ? 80 : 240,
          background: theme.sidebar,
          borderRight: `1px solid ${theme.border}`,
          padding: 20,
          transition: "0.3s",
        }}
      >
        <h3 style={{ marginBottom: 30 }}>
          {collapsed ? "NC" : "NexaCommerce"}
        </h3>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = page === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                cursor: "pointer",
                marginBottom: 8,
                background: active
                  ? d
                    ? "rgba(59,130,246,0.15)"
                    : "rgba(59,130,246,0.08)"
                  : "transparent",
              }}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </div>
          );
        })}
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* NAVBAR */}
        <div
          style={{
            background: theme.nav,
            padding: "15px 25px",
            borderBottom: `1px solid ${theme.border}`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Menu
            style={{ cursor: "pointer" }}
            onClick={() => setCollapsed(!collapsed)}
          />

          <div style={{ display: "flex", gap: 15 }}>
            <span>{role.toUpperCase()}</span>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => setDark(!dark)}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </span>

            <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => setRole(null)}
            >
              Logout
            </span>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div style={{ padding: 30 }}>
          <h1 style={{ marginBottom: 20 }}>
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </h1>

          <div
            style={{
              background: theme.card,
              padding: 20,
              borderRadius: 12,
              border: `1px solid ${theme.border}`,
            }}
          >
            {page === "dashboard" && (
              <p>Welcome {role} 🚀 This is your dashboard.</p>
            )}

            {page === "orders" && <p>Manage orders here.</p>}
            {page === "customers" && <p>Customer data view.</p>}
            {page === "analytics" && <p>Analytics & charts.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   ROLE BUTTON COMPONENT
========================= */

function RoleButton({ icon, label, onClick, theme }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 10,
        border: `1px solid ${theme.border}`,
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <div>{icon}</div>
      <div style={{ fontSize: 14, marginTop: 5 }}>{label}</div>
    </div>
  );
}