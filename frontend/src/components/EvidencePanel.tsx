function EvidencePanel() {
  const evidence = [
    {
      icon: "🌦️",
      name: "Weather",
      status: "Available",
      source: "Weather data service",
      time: "Recent",
    },
    {
      icon: "🌊",
      name: "Ocean",
      status: "Available",
      source: "Marine data service",
      time: "Recent",
    },
    {
      icon: "🛰️",
      name: "Satellite / PFZ",
      status: "Available",
      source: "INCOIS / Satellite data",
      time: "Recent",
    },
    {
      icon: "🗺️",
      name: "GIS",
      status: "Available",
      source: "Geospatial data",
      time: "Recent",
    },
  ];

  return (
    <div className="evidence-grid">
      {evidence.map((item) => (
        <div className="evidence-card" key={item.name}>
          <div className="evidence-icon">{item.icon}</div>

          <div className="evidence-info">
            <h3>{item.name}</h3>

            <div className="evidence-status">
              <span>✓</span> {item.status}
            </div>

            <p>{item.source}</p>

            <small>Updated: {item.time}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EvidencePanel;