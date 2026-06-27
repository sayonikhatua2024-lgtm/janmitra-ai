import React from "react";

function EmergencyHelp() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <h1>🚨 Emergency Help</h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <h3>Important Numbers</h3>

        <p>🚑 Ambulance: 108</p>
        <p>👮 Police: 100</p>
        <p>🔥 Fire Brigade: 101</p>
        <p>👩 Women Helpline: 1091</p>
        <p>👶 Child Helpline: 1098</p>
      </div>
    </div>
  );
}

export default EmergencyHelp;