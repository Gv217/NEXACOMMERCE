import { useState } from "react";

export default function Login({ onSelectRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      
      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="brand">⚡ NexaCommerce</div>

        <h1>
          The Future of <span>Intelligent Commerce</span>
        </h1>

        <p>
          AI-powered e-commerce with community-driven insights,
          360° product views, and real-time analytics.
        </p>

        <ul>
          <li>✔ AI-powered product recommendations</li>
          <li>✔ Real-time discussions</li>
          <li>✔ 360° immersive product viewer</li>
          <li>✔ Advanced seller analytics</li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <h2>Welcome back</h2>
        <p>Sign in to your account to continue</p>

        <div className="role-buttons">
          <button onClick={() => onSelectRole("client")}>
            👤 Client
          </button>
          <button onClick={() => onSelectRole("seller")}>
            🏪 Seller
          </button>
          <button onClick={() => onSelectRole("admin")}>
            🛡 Admin
          </button>
        </div>

        <div className="divider">or sign in with email</div>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="signin-btn"
          onClick={() => onSelectRole("client")}
        >
          Sign In →
        </button>
      </div>
    </div>
  );
}