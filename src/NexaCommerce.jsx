import { useState, useEffect, useRef } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────
const USER = { name: "Alice Johnson", email: "client@demo.com", avatar: "A", points: 2840 };

const PRODUCTS = [
  { id: 1, name: "NexaBook Pro 16 Ultra", category: "Laptops", store: "TechVault Store", price: 2499, original: 2999, discount: 17, rating: 3.5, reviews: 342, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", badge: "360°" },
  { id: 2, name: "Quantum X Wireless ANC Headphones", category: "Audio", store: "TechVault Store", price: 349, original: 449, discount: 22, rating: 4, reviews: 891, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", badge: "360°" },
  { id: 3, name: "PixelCam Z9 Mirrorless", category: "Cameras", store: "LensWorld Pro", price: 3899, original: 4299, discount: 9, rating: 3.5, reviews: 214, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80" },
  { id: 4, name: 'UltraView 4K Monitor 32"', category: "Monitors", store: "TechVault Store", price: 899, original: 1099, discount: 18, rating: 4, reviews: 567, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
  { id: 5, name: "ErgoChair Pro Max", category: "Furniture", store: "ComfortZone", price: 699, original: 899, discount: 22, rating: 3.5, reviews: 423, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80", badge: "360°" },
  { id: 6, name: "SmartWatch Apex 2", category: "Wearables", store: "WearTech Hub", price: 449, original: 549, discount: 18, rating: 3.5, reviews: 1204, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
];

const CATEGORIES = ["All", "Laptops", "Audio", "Cameras", "Monitors", "Wearables", "Furniture", "Phones", "Gaming"];

const ORDERS = [
  { id: "ORD-2024-001", items: 1, total: "$2,499", status: "DELIVERED", date: "2024-11-15", color: "#22c55e" },
  { id: "ORD-2024-002", items: 2, total: "$1,248", status: "SHIPPED", date: "2024-12-01", color: "#3b82f6" },
  { id: "ORD-2024-003", items: 1, total: "$449", status: "PROCESSING", date: "2024-12-10", color: "#f59e0b" },
];

const STATS = [
  { label: "TOTAL ORDERS", value: "3", change: "+15.2%", up: true },
  { label: "WISHLIST ITEMS", value: "8", change: "+5%", up: true },
  { label: "REVIEWS WRITTEN", value: "12", change: "+3%", up: true },
  { label: "POINTS EARNED", value: "2,840", change: "+22.1%", up: true },
];

const NAV_ITEMS = [
  { icon: "🏠", label: "Home", id: "home" },
  { icon: "📦", label: "Products", id: "products" },
  { icon: "🛍️", label: "My Orders", id: "orders" },
  { icon: "❤️", label: "Wishlist", id: "wishlist" },
  { icon: "💬", label: "Community", id: "community", badge: "New" },
  { icon: "⚖️", label: "Compare", id: "compare" },
  { icon: "🛡️", label: "Warranty", id: "warranty" },
  { icon: "💬", label: "Live Chat", id: "livechat" },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span style={{ color: "#f59e0b", fontSize: 13 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i}>{i <= Math.floor(rating) ? "★" : i - 0.5 === rating ? "⭐" : "☆"}</span>
      ))}
    </span>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function NexaCommerce() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const d = dark;

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (product) => {
    setCart(c => {
      const ex = c.find(i => i.id === product.id);
      if (ex) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const toggleWishlist = (product) => {
    setWishlist(w => {
      const has = w.find(i => i.id === product.id);
      if (has) { showToast("Removed from wishlist", "info"); return w.filter(i => i.id !== product.id); }
      showToast("Added to wishlist ❤️");
      return [...w, product];
    });
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Theme tokens
  const t = {
    bg: d ? "#0a0e1a" : "#f0f4f8",
    card: d ? "#0d1526" : "#ffffff",
    sidebar: d ? "#060c1a" : "#1a2236",
    nav: d ? "#08111f" : "#0f1d35",
    border: d ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)",
    text: d ? "#e8edf5" : "#1a2236",
    textMuted: d ? "#6b7a99" : "#4a5568",
    accent: "#3b82f6",
    accentGlow: d ? "0 0 20px rgba(59,130,246,0.3)" : "none",
    input: d ? "#111827" : "#f9fafb",
    inputBorder: d ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)",
  };

  const styles = {
    root: { display: "flex", flexDirection: "column", height: "100vh", background: t.bg, color: t.text, fontFamily: "'Syne', 'DM Sans', sans-serif", transition: "background 0.3s, color 0.3s", overflow: "hidden" },
    topBar: { background: t.nav, borderBottom: `1px solid ${t.border}`, padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, fontSize: 12, color: t.textMuted },
    navbar: { background: t.card, borderBottom: `1px solid ${t.border}`, padding: "0 24px", height: 64, display: "flex", alignItems: "center", gap: 16, flexShrink: 0 },
    body: { display: "flex", flex: 1, overflow: "hidden" },
    sidebar: { width: sidebarOpen ? 240 : 0, background: t.sidebar, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s", overflow: "hidden", flexShrink: 0 },
    main: { flex: 1, overflowY: "auto", padding: 24 },
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <div style={styles.root}>
        {/* TOP BAR */}
        <div style={styles.topBar}>
          <span>⚡ NexaCommerce Enterprise Platform v2.0</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "API Docs", "Support"].map(l => (
              <span key={l} style={{ cursor: "pointer", color: t.textMuted, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = t.accent}
                onMouseLeave={e => e.target.style.color = t.textMuted}>{l}</span>
            ))}
            <span>© 2025 NexaCommerce. All rights reserved.</span>
          </div>
        </div>

        {/* NAVBAR */}
        <div style={styles.navbar}>
          <button onClick={() => setSidebarOpen(s => !s)} style={{ background: "none", border: "none", color: t.textMuted, fontSize: 20, cursor: "pointer", padding: "4px 8px" }}>☰</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 16 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#3b82f6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
            <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18 }}>
              <span style={{ color: t.accent }}>Nexa</span><span style={{ color: t.text }}>Commerce</span>
            </span>
          </div>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 560, position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: t.textMuted }}>🔍</span>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); if (e.target.value) { setPage("products"); setProductSearch(e.target.value); } else setProductSearch(""); }}
              placeholder="Search products, brands, categories..."
              style={{ width: "100%", background: t.input, border: `1px solid ${t.inputBorder}`, borderRadius: 12, padding: "10px 16px 10px 40px", color: t.text, fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
            {/* Theme toggle */}
            <button onClick={() => setDark(d => !d)} title="Toggle theme"
              style={{ background: d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", border: "none", borderRadius: 10, width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
              {d ? "☀️" : "🌙"}
            </button>

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button onClick={() => { setNotifOpen(n => !n); setProfileOpen(false); setCartOpen(false); }}
                style={{ background: d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", border: "none", borderRadius: 10, width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                🔔
                <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: "#ef4444", borderRadius: "50%", border: `2px solid ${t.card}` }} />
              </button>
              {notifOpen && (
                <div style={{ position: "absolute", right: 0, top: 50, width: 300, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 16, boxShadow: "0 20px 40px rgba(0,0,0,0.3)", zIndex: 999 }}>
                  <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Notifications</div>
                  {["Your order ORD-2024-003 is processing", "New product in Wishlist went on sale", "Your review got 12 helpful votes"].map((n, i) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${t.border}`, fontSize: 13, color: t.textMuted }}>{n}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <div style={{ position: "relative" }}>
              <button onClick={() => { setCartOpen(c => !c); setNotifOpen(false); setProfileOpen(false); }}
                style={{ background: d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", border: "none", borderRadius: 10, width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                🛒
                {cart.length > 0 && <span style={{ position: "absolute", top: 4, right: 4, background: "#ef4444", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cart.reduce((s, i) => s + i.qty, 0)}</span>}
              </button>
              {cartOpen && (
                <div style={{ position: "absolute", right: 0, top: 50, width: 340, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 16, boxShadow: "0 20px 40px rgba(0,0,0,0.3)", zIndex: 999 }}>
                  <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>Cart ({cart.reduce((s, i) => s + i.qty, 0)})</div>
                  {cart.length === 0 ? <div style={{ color: t.textMuted, fontSize: 13 }}>Your cart is empty</div> : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${t.border}`, alignItems: "center" }}>
                          <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                            <div style={{ fontSize: 12, color: t.textMuted }}>Qty: {item.qty} × ${item.price.toLocaleString()}</div>
                          </div>
                          <button onClick={() => setCart(c => c.filter(i => i.id !== item.id))} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>✕</button>
                        </div>
                      ))}
                      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700 }}>Total: ${cartTotal.toLocaleString()}</span>
                        <button onClick={() => { setCart([]); showToast("Order placed! 🎉"); setCartOpen(false); }}
                          style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Checkout</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Profile */}
            <div style={{ position: "relative" }}>
              <button onClick={() => { setProfileOpen(p => !p); setNotifOpen(false); setCartOpen(false); }}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 15 }}>{USER.avatar}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{USER.name}</div>
                  <div style={{ fontSize: 10, color: t.accent, fontWeight: 700 }}>CLIENT</div>
                </div>
                <span style={{ color: t.textMuted, fontSize: 12 }}>▼</span>
              </button>
              {profileOpen && (
                <div style={{ position: "absolute", right: 0, top: 54, width: 220, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 16, boxShadow: "0 20px 40px rgba(0,0,0,0.3)", zIndex: 999 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{USER.name}</div>
                  <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 12 }}>{USER.email}</div>
                  {["My Profile", "Account Settings", "Billing", "Help Center"].map(item => (
                    <div key={item} onClick={() => { showToast(`${item} coming soon`); setProfileOpen(false); }}
                      style={{ padding: "8px 0", borderBottom: `1px solid ${t.border}`, fontSize: 13, cursor: "pointer", color: t.textMuted, transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = t.accent}
                      onMouseLeave={e => e.target.style.color = t.textMuted}>{item}</div>
                  ))}
                  <div style={{ padding: "8px 0 0", fontSize: 13, cursor: "pointer", color: "#ef4444" }} onClick={() => showToast("Signed out!")}>Sign Out</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div style={styles.body} onClick={() => { setNotifOpen(false); setCartOpen(false); setProfileOpen(false); }}>
          {/* SIDEBAR */}
          <div style={styles.sidebar}>
            <div style={{ padding: "20px 16px 8px", fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: "0.1em" }}>MY ACCOUNT</div>
            {NAV_ITEMS.map(item => (
              <div key={item.id} onClick={() => setPage(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", margin: "1px 8px", borderRadius: 10, cursor: "pointer", background: page === item.id ? "rgba(59,130,246,0.15)" : "transparent", borderLeft: page === item.id ? `3px solid ${t.accent}` : "3px solid transparent", transition: "background 0.2s" }}
                onMouseEnter={e => { if (page !== item.id) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { if (page !== item.id) e.currentTarget.style.background = "transparent"; }}>
                <span style={{ fontSize: 16, width: 20 }}>{item.icon}</span>
                <span style={{ fontSize: 14, fontWeight: page === item.id ? 600 : 400, color: page === item.id ? "#e8edf5" : t.textMuted, whiteSpace: "nowrap" }}>{item.label}</span>
                {item.badge && <span style={{ background: t.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, marginLeft: "auto" }}>{item.badge}</span>}
              </div>
            ))}
            {/* User card */}
            <div style={{ marginTop: "auto", padding: 16, borderTop: `1px solid ${t.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, background: d ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.06)", borderRadius: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>{USER.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: d ? "#e8edf5" : "#1a2236" }}>{USER.name}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{USER.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div style={styles.main}>
            {page === "home" && <HomePage t={t} d={d} onNavigate={setPage} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} filteredProducts={filteredProducts} category={category} setCategory={setCategory} productSearch={productSearch} setProductSearch={setProductSearch} />}
            {page === "products" && <ProductsPage t={t} d={d} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} filteredProducts={filteredProducts} category={category} setCategory={setCategory} productSearch={productSearch} setProductSearch={setProductSearch} />}
            {page === "orders" && <OrdersPage t={t} d={d} />}
            {page === "wishlist" && <WishlistPage t={t} d={d} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />}
            {!["home", "products", "orders", "wishlist"].includes(page) && <PlaceholderPage t={t} d={d} page={page} />}
          </div>
        </div>

        {/* TOAST */}
        {toast && (
          <div style={{ position: "fixed", bottom: 24, right: 24, background: toast.type === "info" ? "#374151" : "#22c55e", color: "#fff", padding: "12px 20px", borderRadius: 12, fontWeight: 600, fontSize: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", zIndex: 9999, animation: "fadeIn 0.3s ease" }}>
            {toast.msg}
          </div>
        )}
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } * { scrollbar-width: thin; scrollbar-color: rgba(59,130,246,0.3) transparent; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 4px; }`}</style>
      </div>
    </>
  );
}

// ── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ t, d, onNavigate, onAddToCart, onToggleWishlist, wishlist, filteredProducts, category, setCategory, productSearch, setProductSearch }) {
  return (
    <div>
      {/* Hero Banner */}
      <div style={{ background: d ? "linear-gradient(135deg,#0d1f3c,#0a1628)" : "linear-gradient(135deg,#1e3a5f,#2d5986)", borderRadius: 20, padding: "40px 48px", marginBottom: 28, position: "relative", overflow: "hidden", border: `1px solid ${t.border}` }}>
        <div style={{ position: "absolute", right: 60, top: "50%", transform: "translateY(-50%)", width: 200, height: 200, background: "radial-gradient(circle,rgba(59,130,246,0.15),transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", right: 0, bottom: 0, opacity: 0.05, fontSize: 180, userSelect: "none" }}>⚡</div>
        <div style={{ fontSize: 13, color: "#60a5fa", fontWeight: 600, marginBottom: 8 }}>Welcome back 👋</div>
        <div style={{ fontSize: 40, fontFamily: "Syne", fontWeight: 800, color: "#fff", marginBottom: 10 }}>Hello, Alice!</div>
        <div style={{ color: "rgba(255,255,255,0.65)", marginBottom: 28, fontSize: 15 }}>Explore new arrivals, check your orders, and connect with the community.</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => onNavigate("products")} style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>Shop Now →</button>
          <button onClick={() => onNavigate("community")} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "12px 24px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>💬 Community</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "TOTAL ORDERS", value: "3", change: "+15.2%" },
          { label: "WISHLIST ITEMS", value: String(wishlist.length || 8), change: "+5%" },
          { label: "REVIEWS WRITTEN", value: "12", change: "+3%" },
          { label: "POINTS EARNED", value: "2,840", change: "+22.1%" },
        ].map(s => (
          <div key={s.label} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: "20px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: "0.08em", marginBottom: 8 }}>{s.label}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 32, fontFamily: "Syne", fontWeight: 800, color: t.text }}>{s.value}</div>
              <span style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", fontSize: 11, fontWeight: 700, padding: "4px 8px", borderRadius: 20 }}>↑ {s.change}</span>
            </div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4 }}>vs. last month</div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { icon: "🛍️", label: "My Orders", id: "orders", color: "#3b82f6" },
          { icon: "❤️", label: "Wishlist", id: "wishlist", color: "#ef4444" },
          { icon: "💬", label: "Community", id: "community", color: "#22c55e" },
          { icon: "🛡️", label: "Warranty", id: "warranty", color: "#f59e0b" },
        ].map(q => (
          <div key={q.id} onClick={() => onNavigate(q.id)}
            style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: "24px 16px", textAlign: "center", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.2)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `${q.color}20`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{q.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 14, color: t.text }}>{q.label}</div>
          </div>
        ))}
      </div>

      {/* Products section (same as Products page) */}
      <ProductsPage t={t} d={d} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlist={wishlist} filteredProducts={filteredProducts} category={category} setCategory={setCategory} productSearch={productSearch} setProductSearch={setProductSearch} compact />

      {/* Recent Orders */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20 }}>Recent Orders</div>
          <span onClick={() => onNavigate("orders")} style={{ color: "#3b82f6", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>View all →</span>
        </div>
        <OrdersPage t={t} d={d} />
      </div>
    </div>
  );
}

// ── PRODUCTS PAGE ────────────────────────────────────────────────────────────
function ProductsPage({ t, d, onAddToCart, onToggleWishlist, wishlist, filteredProducts, category, setCategory, productSearch, setProductSearch, compact }) {
  return (
    <div>
      {!compact && <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 26, marginBottom: 20 }}>Products</div>}

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: compact ? 14 : 16, fontWeight: 700, marginBottom: 10, color: t.textMuted }}>Browse by Category</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{ background: category === cat ? "#3b82f6" : t.card, color: category === cat ? "#fff" : t.textMuted, border: `1px solid ${category === cat ? "#3b82f6" : t.border}`, borderRadius: 20, padding: "6px 16px", cursor: "pointer", fontSize: 13, fontWeight: category === cat ? 700 : 400, transition: "all 0.2s" }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: compact ? 18 : 22, marginBottom: 6 }}>Featured Products</div>
      <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 14 }}>{filteredProducts.length} products found</div>

      <input value={productSearch} onChange={e => setProductSearch(e.target.value)} placeholder="Search products..."
        style={{ background: t.input, border: `1px solid ${t.inputBorder}`, borderRadius: 12, padding: "10px 16px", color: t.text, fontSize: 14, outline: "none", width: 260, marginBottom: 18, display: "block" }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 18 }}>
        {filteredProducts.map(p => (
          <ProductCard key={p.id} p={p} t={t} d={d} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} inWishlist={wishlist.some(w => w.id === p.id)} />
        ))}
        {filteredProducts.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 60, color: t.textMuted }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>No products found</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ p, t, d, onAddToCart, onToggleWishlist, inWishlist }) {
  return (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <div style={{ position: "relative" }}>
        <img src={p.image} alt={p.name} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
        <span style={{ position: "absolute", top: 10, left: 10, background: "#ef4444", color: "#fff", fontSize: 11, fontWeight: 800, padding: "3px 8px", borderRadius: 8 }}>-{p.discount}%</span>
        {p.badge && <span style={{ position: "absolute", top: 34, left: 10, background: "#06b6d4", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>{p.badge}</span>}
        <button onClick={() => onToggleWishlist(p)} style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.5)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {inWishlist ? "❤️" : "🤍"}
        </button>
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 4 }}>{p.category} · {p.store}</div>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: t.text }}>{p.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Stars rating={p.rating} />
          <span style={{ fontSize: 12, color: t.textMuted }}>({p.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 20, fontFamily: "Syne", fontWeight: 800, color: t.text }}>${p.price.toLocaleString()}</span>
            <span style={{ fontSize: 13, color: t.textMuted, textDecoration: "line-through", marginLeft: 8 }}>${p.original.toLocaleString()}</span>
          </div>
          <button onClick={() => onAddToCart(p)} style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>🛒 Add</button>
        </div>
      </div>
    </div>
  );
}

// ── ORDERS PAGE ──────────────────────────────────────────────────────────────
function OrdersPage({ t, d }) {
  return (
    <div>
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}` }}>
              {["ORDER ID", "ITEMS", "TOTAL", "STATUS", "DATE"].map(h => (
                <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: "0.08em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o, i) => (
              <tr key={o.id} style={{ borderBottom: i < ORDERS.length - 1 ? `1px solid ${t.border}` : "none", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = d ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"}
                onMouseLeave={e => e.currentTarget.style.background = ""}>
                <td style={{ padding: "16px 20px", fontSize: 13, color: "#3b82f6", fontWeight: 600, cursor: "pointer" }}>{o.id}</td>
                <td style={{ padding: "16px 20px", fontSize: 13, color: t.textMuted }}>{o.items} item(s)</td>
                <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: t.text }}>{o.total}</td>
                <td style={{ padding: "16px 20px" }}>
                  <span style={{ background: `${o.color}20`, color: o.color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, letterSpacing: "0.05em" }}>{o.status}</span>
                </td>
                <td style={{ padding: "16px 20px", fontSize: 13, color: t.textMuted }}>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── WISHLIST PAGE ────────────────────────────────────────────────────────────
function WishlistPage({ t, d, wishlist, onAddToCart, onToggleWishlist }) {
  return (
    <div>
      <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 26, marginBottom: 20 }}>My Wishlist</div>
      {wishlist.length === 0 ? (
        <div style={{ textAlign: "center", padding: 80, color: t.textMuted }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>❤️</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Your wishlist is empty</div>
          <div style={{ fontSize: 14 }}>Save products you love to buy later</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 18 }}>
          {wishlist.map(p => (
            <ProductCard key={p.id} p={p} t={t} d={d} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} inWishlist={true} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── PLACEHOLDER PAGE ─────────────────────────────────────────────────────────
function PlaceholderPage({ t, page }) {
  const icons = { community: "💬", compare: "⚖️", warranty: "🛡️", livechat: "🗨️" };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, color: t.textMuted }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>{icons[page] || "🚧"}</div>
      <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: t.text, marginBottom: 8, textTransform: "capitalize" }}>{page}</div>
      <div style={{ fontSize: 15 }}>This section is coming soon!</div>
    </div>
  );
}
