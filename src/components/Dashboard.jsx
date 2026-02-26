import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="welcome-card">
        <h2>Welcome back 👋</h2>
        <h1>Hello, Alice!</h1>
        <p>
          Explore new arrivals, check your orders, and connect with the
          community.
        </p>
        <div className="buttons">
          <button className="primary">Shop Now</button>
          <button className="secondary">Community</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h4>Total Orders</h4>
          <p>3</p>
        </div>

        <div className="stat-card">
          <h4>Wishlist Items</h4>
          <p>8</p>
        </div>

        <div className="stat-card">
          <h4>Reviews Written</h4>
          <p>12</p>
        </div>

        <div className="stat-card">
          <h4>Points Earned</h4>
          <p>2,840</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;