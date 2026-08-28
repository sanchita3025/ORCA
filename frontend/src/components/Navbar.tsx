function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="orca-logo">🐋</div>

        <div>
          <h2>ORCA</h2>
          <span>Marine Ecosystem Intelligence</span>
        </div>
      </div>

      <div className="navbar-status">
        <span className="status-dot"></span>
        System Online
      </div>
    </nav>
  );
}

export default Navbar;