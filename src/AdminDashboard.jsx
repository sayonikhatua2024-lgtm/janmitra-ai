import { generateInsight }
from "./services/governanceInsightAI";
import {
generateSustainabilityInsight
}
from "./services/sustainabilityInsightAI";
import { generateGovernanceAdvice }
from "./services/governanceCopilotAI";
import { generateSentimentAnalysis }
from "./services/sentimentAI";
import { generateBudgetAllocation }
from "./services/budgetAllocationAI";
import { generateFutureRiskPrediction }
from "./services/futureRiskAI";
import { generateMPActionPlan } from "./services/mpActionPlanAI";
import { toast } from "react-toastify";
import ComplaintMap from "./ComplaintMap";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAllComplaints,
  updateComplaintStatus
} from "./services/firestoreService";
import { generateAdminSummary } from "./services/adminSummaryAI";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [healthScore, setHealthScore] = useState({
  overall: 100,
  roads: 100,
  water: 100,
  sanitation: 100,
  status: "Excellent"
});
  const [mpPlan, setMpPlan] = useState("");
  const [futureRisk, setFutureRisk] = useState("");
  const [budgetPlan, setBudgetPlan] = useState("");
const [loadingBudget, setLoadingBudget] = useState(false);
const [sentiment, setSentiment] = useState("");
const [loadingSentiment, setLoadingSentiment] = useState(false);
const [copilotQuery, setCopilotQuery] = useState("");
const [copilotResult, setCopilotResult] = useState("");
const [copilotLoading, setCopilotLoading] = useState(false);
const [disasterAlert, setDisasterAlert] = useState({});
const [socialIndex, setSocialIndex] = useState({});
const [sustainabilityInsight,setSustainabilityInsight] = useState("");

const [governanceInsight,
setGovernanceInsight] = useState("");

const [benchmarkInsight,
setBenchmarkInsight] = useState("");

const [disasterInsight,
setDisasterInsight] = useState("");

const [futureInsight,
setFutureInsight] = useState("");
const [benchmarkData, setBenchmarkData] = useState({});
const [availableBudget, setAvailableBudget] = useState(100);

const [budgetSimulation, setBudgetSimulation] = useState(null);
const [governanceRank, setGovernanceRank] =
  useState({});
const [sustainabilityData, setSustainabilityData] = useState({
  score: 100,
  level: "Excellent",
  carbonImpact: 0
});
  const [sdgData, setSdgData] = useState({
  sdg3: 0,
  sdg6: 0,
  sdg9: 0,
  sdg11: 0
});
const [trendData, setTrendData] = useState({
  roads: 0,
  water: 0,
  garbage: 0,
  topIssue: "None"
});
const [selectedIntervention, setSelectedIntervention] =
  useState("Road Repair");

const [simulationResult, setSimulationResult] =
  useState(null);
  const [parliamentData, setParliamentData] = useState({
  roads: 0,
  water: 0,
  garbage: 0,
  health: 0,
  topDemand: "None"
});
const [futureForecast, setFutureForecast] =
  useState(null);
const [loadingRisk, setLoadingRisk] = useState(false);
const [loadingPlan, setLoadingPlan] = useState(false);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const handleStatusUpdate = async (id, status) => {
  const success = await updateComplaintStatus(id, status);

  if (success) {
    alert(`Complaint marked as ${status}`);

    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id
        ? { ...complaint, status }
        : complaint
    );

    setComplaints(updatedComplaints);
    calculateHealthScore();
  } else {
    alert("Failed to update complaint status");
  }
};

  // Load complaints
  useEffect(() => {
  const loadComplaints = async () => {
    const data = await getAllComplaints();

    console.log("Complaints fetched:", data);

    // Sort newest first
    data.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;

      return (
        b.createdAt.seconds - a.createdAt.seconds
      );
    });

    setComplaints(data);
  };

  loadComplaints();

  // Auto refresh every 5 seconds
  const interval = setInterval(
    loadComplaints,
    5000
  );

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  if (complaints.length === 0) return;

  const criticalComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Critical" ||
      complaint.priority === "CRITICAL"
  );

  if (criticalComplaints.length > 0) {
    toast.error(
      `🚨 ${criticalComplaints.length} Critical Complaint(s) detected!`,
      {
        position: "top-right",
        autoClose: 5000,
      }
    );
  }
}, [complaints]);
useEffect(() => {
  calculateHealthScore();
   calculateSDGImpact();
   calculateTrendAnalysis();
   generateCitizenParliament();
   generateFutureForecast();
   generateDisasterAlert();
   generateSustainabilityIndex();
   generateSocialStabilityIndex();
   generateBenchmarkData();
   generateGovernanceRank();
}, [complaints]);
useEffect(() => {

  if (complaints.length === 0) return;

  loadAIInsights();

}, [complaints]);
  // Statistics
  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const criticalComplaints = complaints.filter(
    (c) =>
      c.priority === "High" ||
      c.priority === "Critical"
  ).length;

  // Hotspots
 const hotspots = useMemo(() => {

  const activeComplaints = complaints.filter(
    c => c.status !== "Resolved"
  );

  const counts = {};

  activeComplaints.forEach((complaint) => {

    const location = complaint.location;

    if (!location) return;

    counts[location] =
      (counts[location] || 0) + 1;
  });

  return Object.entries(counts)
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1]);

}, [complaints]);
  const alerts = hotspots
  .filter(([_, count]) => count >= 3)
  .map(([location, count]) => ({
    location,
    message: `Multiple complaints detected in ${location}. Immediate attention recommended.`,
    count,
  }));
const categoryData = Object.entries(
  complaints.reduce((acc, complaint) => {
    const category = complaint.category || "Others";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

const statusData = Object.entries(
  complaints.reduce((acc, complaint) => {
    const status = complaint.status || "Pending";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

const COLORS = [
  "#00C49F",
  "#FF8042",
  "#0088FE",
  "#FFBB28",
  "#FF4444",
];
const handleGenerateMPPlan = async () => {
  try {
    setLoadingPlan(true);

    const plan = await generateMPActionPlan(
      complaints
    );

    setMpPlan(plan);
  } catch (error) {
    console.log(error);

    setMpPlan(
      "⚠️ Unable to generate MP Action Plan."
    );
  } finally {
    setLoadingPlan(false);
  }
};
const handleGenerateFutureRisk = async () => {
  try {
    setLoadingRisk(true);

    const prediction =
      await generateFutureRiskPrediction(
        complaints
      );

    setFutureRisk(prediction);
  } catch (error) {
    console.log(error);

    setFutureRisk(
      "⚠️ Unable to generate future risk prediction."
    );
  } finally {
    setLoadingRisk(false);
  }
};
const handleGenerateBudget = async () => {
  try {
    setLoadingBudget(true);

    const plan =
      await generateBudgetAllocation(
        complaints
      );

    setBudgetPlan(plan);
  } catch (error) {
    console.log(error);

    setBudgetPlan(
      "Unable to generate budget allocation."
    );
  } finally {
    setLoadingBudget(false);
  }
};
const handleGenerateSentiment = async () => {
  try {
    setLoadingSentiment(true);

    const result =
      await generateSentimentAnalysis(
        complaints
      );

    setSentiment(result);
  } catch (error) {
    console.log(error);

    setSentiment(
      "Unable to analyze sentiment."
    );
  } finally {
    setLoadingSentiment(false);
  }
};
// AI Summary
  const handleGenerateSummary = async () => {
    
    try {
      setLoadingSummary(true);

      const report =
        await generateAdminSummary(complaints);

      setSummary(report);
    } catch (error) {
      console.log(error);

      if (error.message?.includes("503")) {
        setSummary(
          "⚠️ AI servers are currently busy. Please try again in a few moments."
        );
      } else {
        setSummary(
          "⚠️ Unable to generate AI report at the moment."
        );
      }
    } finally {
      setLoadingSummary(false);
    }
  };

  const cardStyle = {
    background: "#1a1f38",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
  };
const calculateHealthScore = () => {

  const activeComplaints = complaints.filter(
    c => c.status !== "Resolved"
  );

  const roadComplaints =
    activeComplaints.filter(
      c => c.category === "Roads"
    ).length;

  const waterComplaints =
    activeComplaints.filter(
      c => c.category === "Water"
    ).length;

  const garbageComplaints =
    activeComplaints.filter(
      c => c.category === "Garbage"
    ).length;

  let roads = Math.max(0, 100 - roadComplaints * 10);
  let water = Math.max(0, 100 - waterComplaints * 10);
  let sanitation = Math.max(0, 100 - garbageComplaints * 10);

  const overall =
    Math.round((roads + water + sanitation) / 3);

  let status = "Excellent";

  if (overall < 80) status = "Needs Attention";
  if (overall < 60) status = "Critical";

  setHealthScore({
    overall,
    roads,
    water,
    sanitation,
    status
  });
};
const calculateSDGImpact = () => {

  let sdg3 = 0;
  let sdg6 = 0;
  let sdg9 = 0;
  let sdg11 = 0;

  complaints.forEach((complaint) => {

    if (complaint.status === "Resolved")
      return;

    switch (complaint.category) {

      case "Health":
        sdg3++;
        break;

      case "Water":
        sdg6++;
        break;

      case "Roads":
        sdg9++;
        break;

      case "Garbage":
      case "Others":
        sdg11++;
        break;

      default:
        break;
    }
  });

  setSdgData({
    sdg3,
    sdg6,
    sdg9,
    sdg11
  });
};
const calculateTrendAnalysis = () => {

  const activeComplaints = complaints.filter(
    c => c.status !== "Resolved"
  );

  const roads = activeComplaints.filter(
    c => c.category === "Roads"
  ).length;

  const water = activeComplaints.filter(
    c => c.category === "Water"
  ).length;

  const garbage = activeComplaints.filter(
    c => c.category === "Garbage"
  ).length;

  let topIssue = "Roads";
  let max = roads;

  if (water > max) {
    max = water;
    topIssue = "Water";
  }

  if (garbage > max) {
    max = garbage;
    topIssue = "Garbage";
  }

  setTrendData({
    roads,
    water,
    garbage,
    topIssue
  });
};
const simulateIntervention = () => {

  let result = {};

  switch (selectedIntervention) {

    case "Road Repair":
      result = {
        complaints: "-60%",
        health: "+15",
        sentiment: "+20%",
        risk: "-30%",
        outcome:
          "Road complaints are expected to reduce significantly, improving overall citizen satisfaction."
      };
      break;

    case "Water Supply":
      result = {
        complaints: "-50%",
        health: "+12",
        sentiment: "+18%",
        risk: "-40%",
        outcome:
          "Improved water supply can reduce future water crises and improve public health."
      };
      break;

    case "Drainage Upgrade":
      result = {
        complaints: "-45%",
        health: "+10",
        sentiment: "+15%",
        risk: "-50%",
        outcome:
          "Drainage upgrades are predicted to substantially reduce urban flooding risks."
      };
      break;

    case "Waste Management":
      result = {
        complaints: "-35%",
        health: "+8",
        sentiment: "+10%",
        risk: "-20%",
        outcome:
          "Improved waste collection can reduce sanitation complaints and disease risk."
      };
      break;

    default:
      break;
  }

  setSimulationResult(result);
};
const generateCitizenParliament = () => {

  const activeComplaints = complaints.filter(
    c => c.status !== "Resolved"
  );

  const total = activeComplaints.length;

  if (total === 0) return;

  const roads = Math.round(
    (activeComplaints.filter(
      c => c.category === "Roads"
    ).length / total) * 100
  );

  const water = Math.round(
    (activeComplaints.filter(
      c => c.category === "Water"
    ).length / total) * 100
  );

  const garbage = Math.round(
    (activeComplaints.filter(
      c => c.category === "Garbage"
    ).length / total) * 100
  );

  const health = Math.round(
    (activeComplaints.filter(
      c => c.category === "Health"
    ).length / total) * 100
  );

  let topDemand = "Road Infrastructure";
  let max = roads;

  if (water > max) {
    max = water;
    topDemand = "Water Supply";
  }

  if (garbage > max) {
    max = garbage;
    topDemand = "Waste Management";
  }

  if (health > max) {
    max = health;
    topDemand = "Healthcare Services";
  }

  setParliamentData({
    roads,
    water,
    garbage,
    health,
    topDemand
  });
};
const generateFutureForecast = () => {

  const activeComplaints = complaints.filter(
    c => c.status !== "Resolved"
  );

  const roads = activeComplaints.filter(
    c => c.category === "Roads"
  ).length;

  const water = activeComplaints.filter(
    c => c.category === "Water"
  ).length;

  const garbage = activeComplaints.filter(
    c => c.category === "Garbage"
  ).length;

  let forecast = {
    floodRisk: "Low",
    roadRisk: "Low",
    satisfaction: "+10%",
    recommendation:
      "Current infrastructure appears stable."
  };

  if (roads >= 5) {
    forecast.roadRisk = "High";
    forecast.satisfaction = "-15%";
  }

  if (water >= 3) {
    forecast.floodRisk = "Medium";
  }

  if (roads >= 5 && water >= 3) {
    forecast.floodRisk = "High";
    forecast.satisfaction = "-25%";
    forecast.recommendation =
      "Immediate infrastructure intervention required to avoid severe civic disruptions.";
  }

  if (garbage >= 3) {
    forecast.recommendation =
      "Urgent sanitation improvements required to prevent public health issues.";
  }

  setFutureForecast(forecast);
};
const handleGovernanceCopilot = async () => {

  if (!copilotQuery) return;

  setCopilotLoading(true);

  const result = await generateGovernanceAdvice(
    copilotQuery,
    complaints
  );

  setCopilotResult(result);

  setCopilotLoading(false);
};
const startVoiceInput = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = (event) => {
    setCopilotQuery(
      event.results[0][0].transcript
    );
  };

  recognition.onerror = () => {
    alert("Voice input failed. Please try again.");
  };
};
const generateDisasterAlert = () => {

  const activeComplaints = complaints.filter(
    c => c.status !== "Resolved"
  );

  const waterIssues = activeComplaints.filter(
    c => c.category === "Water"
  ).length;

  const roadIssues = activeComplaints.filter(
    c => c.category === "Roads"
  ).length;

  const garbageIssues = activeComplaints.filter(
    c => c.category === "Garbage"
  ).length;

  let alert = {
    level: "LOW",
    message: "No major disaster threat detected.",
    recommendation: "Continue regular monitoring."
  };

  if (waterIssues >= 3) {
    alert = {
      level: "MEDIUM",
      message:
        "Potential urban flooding risk detected due to unresolved water complaints.",
      recommendation:
        "Inspect drainage systems and deploy preventive teams."
    };
  }

  if (roadIssues >= 5) {
    alert = {
      level: "HIGH",
      message:
        "Critical infrastructure vulnerability detected. Road failures may occur.",
      recommendation:
        "Immediate infrastructure repair and emergency preparedness required."
    };
  }

  if (garbageIssues >= 3) {
    alert = {
      level: "MEDIUM",
      message:
        "Public health outbreak risk detected due to waste accumulation.",
      recommendation:
        "Urgent sanitation drive recommended."
    };
  }

  setDisasterAlert(alert);
};
const generateSustainabilityIndex = () => {

  const activeComplaints = complaints.filter(
    c => c.status !== "Resolved"
  );

  const garbage = activeComplaints.filter(
    c => c.category === "Garbage"
  ).length;

  const water = activeComplaints.filter(
    c => c.category === "Water"
  ).length;

  const roads = activeComplaints.filter(
    c => c.category === "Roads"
  ).length;

  let score = 100;

  score -= garbage * 10;
  score -= water * 5;
  score -= roads * 3;

  if (score < 0) score = 0;

  let level = "Excellent";

  if (score < 80) level = "Good";
  if (score < 60) level = "Moderate";
  if (score < 40) level = "Poor";

  const carbonImpact =
    garbage * 8 + roads * 5 + water * 3;

  setSustainabilityData({
    score,
    level,
    carbonImpact
  });
};
const generateSocialStabilityIndex = () => {

  const activeComplaints = complaints.filter(
    c => c.status !== "Resolved"
  );

  const critical = activeComplaints.filter(
    c =>
      c.status === "Critical" ||
      c.priority === "CRITICAL"
  ).length;

  const total = activeComplaints.length;

  let score = 100 - critical * 12;

  if (score < 0) score = 0;

  let mood = "😊 Optimistic";
  let stability = "Stable";

  if (score < 80) {
    mood = "😐 Concerned";
  }

  if (score < 60) {
    mood = "😟 Frustrated";
    stability = "Moderate Risk";
  }

  if (score < 40) {
    mood = "😠 Dissatisfied";
    stability = "High Risk";
  }

  if (score < 20) {
    mood = "🚨 Social Tension Rising";
    stability = "Critical";
  }

  let insight = "";

if (score >= 80) {
  insight =
    "Citizen trust is high and governance performance is stable. Continue proactive governance initiatives.";
}
else if (score >= 60) {
  insight =
    "Moderate public concern detected. Resolving pending grievances can significantly improve citizen confidence.";
}
else if (score >= 40) {
  insight =
    "Citizen dissatisfaction is increasing. Immediate intervention on critical complaints is strongly recommended.";
}
else {
  insight =
    "Social stability is at risk. Urgent governance action is required to restore public trust.";
}

setSocialIndex({
  score,
  mood,
  stability,
  activeCitizens: total,
  insight
});
};
const generateBenchmarkData = () => {

  const citizenScore = socialIndex.score || 0;
  const sustainabilityScore =
    sustainabilityData.score || 0;

  const roadScore =
    Math.max(100 - (
      complaints.filter(
        c =>
          c.category === "Roads" &&
          c.status !== "Resolved"
      ).length * 10
    ), 0);

  const waterScore =
    Math.max(100 - (
      complaints.filter(
        c =>
          c.category === "Water" &&
          c.status !== "Resolved"
      ).length * 10
    ), 0);

  let insight = "";

if (waterScore < 60) {
  insight =
    "Water infrastructure is performing below the national average. Prioritizing water-related grievances can significantly improve constituency rankings.";
}
else if (roadScore < 60) {
  insight =
    "Road infrastructure performance is below the national benchmark. Accelerated road maintenance is recommended.";
}
else if (citizenScore >= 85) {
  insight =
    "Citizen satisfaction is exceptionally high. The constituency is performing among the top governance quartiles nationally.";
}
else {
  insight =
    "Overall governance performance is strong. Resolving high-priority complaints can further improve national standing.";
}

setBenchmarkData({
  citizenScore,
  roadScore,
  waterScore,
  sustainabilityScore,
  insight
});
};
const loadSustainabilityInsight =
async () => {

  const insight =
    await generateSustainabilityInsight(
      complaints,
      sustainabilityData.score,
      sustainabilityData.carbonImpact
    );

  setSustainabilityInsight(insight);
};
const loadAIInsights = async () => {

  if (complaints.length === 0) return;

  const sustainability =
    await generateInsight(
      "Sustainability",
      complaints,
      sustainabilityData
    );

  const governance =
    await generateInsight(
      "Citizen Governance",
      complaints,
      socialIndex
    );

  const benchmark =
    await generateInsight(
      "National Benchmark",
      complaints,
      benchmarkData
    );

  const disaster =
    await generateInsight(
      "Disaster Prediction",
      complaints,
      disasterAlert
    );

  const future =
    await generateInsight(
      "Future Forecast",
      complaints,
      futureForecast
    );

  setSustainabilityInsight(
    sustainability
  );

  setGovernanceInsight(
    governance
  );

  setBenchmarkInsight(
    benchmark
  );

  setDisasterInsight(
    disaster
  );

  setFutureInsight(
    future
  );
};
const simulateBudgetAllocation = () => {

  const unresolvedComplaints = complaints.filter(
    c => c.status !== "Resolved"
  );

  const roadsCount = unresolvedComplaints.filter(
    c => c.category === "Roads"
  ).length;

  const waterCount = unresolvedComplaints.filter(
    c => c.category === "Water"
  ).length;

  const healthCount = unresolvedComplaints.filter(
    c => c.category === "Health"
  ).length;

  const garbageCount = unresolvedComplaints.filter(
    c => c.category === "Garbage"
  ).length;

  const totalIssues =
    roadsCount +
    waterCount +
    healthCount +
    garbageCount;

  if (totalIssues === 0) {

    setBudgetSimulation({
      roads: 0,
      water: 0,
      health: 0,
      garbage: 0,
      satisfaction: socialIndex.score || 80,
      reduction: 0
    });

    return;
  }

  const roadsBudget = Math.round(
    (roadsCount / totalIssues) * availableBudget
  );

  const waterBudget = Math.round(
    (waterCount / totalIssues) * availableBudget
  );

  const healthBudget = Math.round(
    (healthCount / totalIssues) * availableBudget
  );

  const garbageBudget =
    availableBudget -
    roadsBudget -
    waterBudget -
    healthBudget;

  setBudgetSimulation({

    roads: roadsBudget,

    water: waterBudget,

    health: healthBudget,

    garbage: garbageBudget,

    satisfaction: Math.min(
      (socialIndex.score || 70) + 20,
      100
    ),

    reduction: Math.min(
      unresolvedComplaints.length * 3,
      40
    )
  });
};
const generateGovernanceRank = () => {

  const score = healthScore.overall || 0;

  let nationalRank = "Needs Improvement";
  let category = "Emerging";
  let trust = "Low";

  if (score >= 90) {
    nationalRank = "Top 10%";
    category = "Excellent";
    trust = "Very High";
  }
  else if (score >= 75) {
    nationalRank = "Top 25%";
    category = "High Performer";
    trust = "High";
  }
  else if (score >= 60) {
    nationalRank = "Top 50%";
    category = "Average";
    trust = "Moderate";
  }

  setGovernanceRank({
    nationalRank,
    category,
    trust
  });
};
return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#0b1020",
        color: "white",
      }}
    >
      {/* Title */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "50px",
        }}
      >
        📊 Admin Dashboard
      </h1>

      {/* Hotspots */}
      {hotspots.length > 0 && (
        <div
          style={{
            background: "#1a1f38",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "30px",
            border: "1px solid red",
          }}
        >
          <h2
            style={{
              color: "#ff4d4d",
              marginBottom: "15px",
            }}
          >
            🔥 Civic Hotspots
          </h2>

          {hotspots.map(([location, count]) => (
            <p key={location} style={{ fontSize: "18px" }}>
              📍 {location} — {count} complaints
            </p>
          ))}
        </div>
      )}
      {alerts.length > 0 && (
  <div
    style={{
      background: "#3b0000",
      border: "2px solid #ff4444",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
    }}
  >
    <h2
      style={{
        color: "#ff4d4d",
        marginBottom: "15px",
      }}
    >
      
          
            🚨 Civic Alerts
          </h2>

          {alerts.map((alert, index) => (
            <div key={index}>
              <p style={{ fontSize: "20px" }}>
                <strong>{alert.location}</strong>
              </p>

              <p style={{ fontSize: "18px" }}>
                {alert.message}
              </p>

              <hr style={{ marginTop: "10px" }} />
            </div>
          ))}
        </div>
      )}
      {/* Constituency Health Score */}
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    textAlign: "center",
    border: "2px solid #22c55e",
  }}
>
  <h2
    style={{
      color: "#22c55e",
      marginBottom: "15px",
    }}
  >
    🏥 AI Constituency Health Score
  </h2>

  <h1
    style={{
      fontSize: "55px",
      color: "#38bdf8",
      marginBottom: "10px",
    }}
  >
    {healthScore.overall}/100
  </h1>

  <h3
    style={{
      color:
        healthScore.status === "Critical"
          ? "#ef4444"
          : healthScore.status === "Needs Attention"
          ? "#f59e0b"
          : "#10b981",
    }}
  >
    {healthScore.status}
  </h3>

  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      marginTop: "20px",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <div>
      <h4>🛣 Roads</h4>
      <p>{healthScore.roads}/100</p>
    </div>

    <div>
      <h4>💧 Water</h4>
      <p>{healthScore.water}/100</p>
    </div>

    <div>
      <h4>🗑 Sanitation</h4>
      <p>{healthScore.sanitation}/100</p>
    </div>
  </div>
</div>
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "30px"
  }}
>

  <h2
    style={{
      color: "#10b981",
      textAlign: "center"
    }}
  >
    🌍 JanMitra SDG Impact
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(250px,1fr))",
      gap: "20px",
      marginTop: "20px"
    }}
  >

    <div>
      <h3>SDG 3 🏥</h3>
      <p>Good Health</p>
      <h2>{sdgData.sdg3}</h2>
    </div>

    <div>
      <h3>SDG 6 💧</h3>
      <p>Clean Water</p>
      <h2>{sdgData.sdg6}</h2>
    </div>

    <div>
      <h3>SDG 9 🛣</h3>
      <p>Infrastructure</p>
      <h2>{sdgData.sdg9}</h2>
    </div>

    <div>
      <h3>SDG 11 🏙</h3>
      <p>Sustainable Cities</p>
      <h2>{sdgData.sdg11}</h2>
    </div>

  </div>

</div>
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #7c3aed",
  }}
>
  <h2
    style={{
      color: "#a855f7",
      textAlign: "center",
      marginBottom: "20px",
    }}
  >
    🏛 Digital Constituency Twin
  </h2>
<h3
  style={{
    color: "#22c55e",
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  🟢 HIGH POSITIVE IMPACT
</h3>
  <p
    style={{
      textAlign: "center",
      color: "#cbd5e1",
      marginBottom: "20px",
    }}
  >
    Simulate governance interventions before implementation.
  </p>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      flexWrap: "wrap",
    }}
  >
    <select
      value={selectedIntervention}
      onChange={(e) =>
        setSelectedIntervention(e.target.value)
      }
     style={{
  padding: "10px",
  borderRadius: "10px",
  fontSize: "16px",
  background: "#1e293b",
  color: "white",
  border: "1px solid #7c3aed",
}}
    >
      <option>Road Repair</option>
      <option>Water Supply</option>
      <option>Drainage Upgrade</option>
      <option>Waste Management</option>
    </select>

    <button
      onClick={simulateIntervention}
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: "10px",
        background: "#7c3aed",
        color: "white",
        cursor: "pointer",
      }}
    >
      Simulate Impact
    </button>
  </div>

  {simulationResult && (
    <div
      style={{
        marginTop: "25px",
        lineHeight: "2",
      }}
    >
      <h3>
        📉 Complaint Reduction:
        {simulationResult.complaints}
      </h3>

      <h3>
        🏥 Health Score Change:
        {simulationResult.health}
      </h3>

      <h3>
        😊 Citizen Sentiment Change:
        {simulationResult.sentiment}
      </h3>

      <h3>
        ⚠ Future Risk Reduction:
        {simulationResult.risk}
      </h3>

      <div
  style={{
    marginTop: "20px",
    background: "#0f172a",
    padding: "15px",
    borderRadius: "10px",
  }}
>
  <h3 style={{ color: "#22c55e" }}>
    📊 Expected Governance Outcome
  </h3>

  <p>
    ✔ Complaint Reduction:
    {simulationResult.complaints}
  </p>

  <p>
    ✔ Citizen Satisfaction Expected to Increase by
    {" "}
    {simulationResult.sentiment}
  </p>

  <p>
    ✔ Estimated Health Score Improvement:
    {" "}
    {simulationResult.health}
  </p>

  <p>
    ✔ Future Risk Reduction:
    {" "}
    {simulationResult.risk}
  </p>
</div>
    </div>
  )}
</div>
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #f59e0b"
  }}
>

  <h2
    style={{
      color: "#f59e0b",
      textAlign: "center"
    }}
  >
    🏛 Citizen Voice Parliament
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#cbd5e1"
    }}
  >
    Every complaint acts as a democratic vote.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(200px,1fr))",
      gap: "20px",
      marginTop: "25px"
    }}
  >

    <div>
      <h3>🛣 Road Repair</h3>
      <h1
  style={{
    color: "#38bdf8",
    fontSize: "2rem",
    marginTop: "10px"
  }}
>
  {parliamentData.roads}%
</h1>
    </div>

    <div>
      <h3>💧 Water Supply</h3>
      <h1
  style={{
    color: "#38bdf8",
    fontSize: "2rem",
    marginTop: "10px"
  }}
>
  {parliamentData.water}%
</h1>
    </div>

    <div>
      <h3>🗑 Waste Management</h3>
     <h1
  style={{
    color: "#38bdf8",
    fontSize: "2rem",
    marginTop: "10px"
  }}
>
  {parliamentData.garbage}%
</h1>
    </div>

    <div>
      <h3>🏥 Health Services</h3>
      <h1
  style={{
    color: "#38bdf8",
    fontSize: "2rem",
    marginTop: "10px"
  }}
>
  {parliamentData.health}%
</h1>
    </div>

  </div>

  <div
  style={{
    marginTop: "25px",
    background: "#0f172a",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center"
  }}
>
  <h3 style={{ color: "#22c55e" }}>
    🏛 People's Mandate
  </h3>

  <h1 style={{ color: "#f59e0b" }}>
    {parliamentData.topDemand}
  </h1>

  <p
    style={{
      color: "#cbd5e1",
      marginTop: "10px"
    }}
  >
    Based on collective citizen grievances,
    this is the highest priority area requiring
    immediate government intervention.
  </p>
</div>
</div>

{/* JanMitra Time Machine */}
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #06b6d4"
  }}
>
  <h2
    style={{
      color: "#06b6d4",
      textAlign: "center"
    }}
  >
    ⏳ JanMitra Time Machine
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#cbd5e1"
    }}
  >
    Predicting constituency conditions 6 months ahead.
  </p>

  {futureForecast && (
    <div
      style={{
        marginTop: "25px",
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px"
      }}
    >
      <div>
        <h3>🌊 Flood Risk</h3>
        <h1>{futureForecast.floodRisk}</h1>
      </div>

      <div>
        <h3>🛣 Road Failure Risk</h3>
        <h1>{futureForecast.roadRisk}</h1>
      </div>

      <div>
        <h3>😊 Citizen Satisfaction Forecast</h3>
        <h1>{futureForecast.satisfaction}</h1>
      </div>

      <div
        style={{
          gridColumn: "1/-1",
          background: "#0f172a",
          padding: "20px",
          borderRadius: "10px"
        }}
      >
        <h3 style={{ color: "#f59e0b" }}>
          🚨 AI Recommendation
        </h3>

        <p style={{ color: "#cbd5e1" }}>
          {futureInsight || futureForecast.recommendation}
        </p>
      </div>
    </div>
  )}
</div>
  <div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
  }}
>
  <div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #3b82f6",
  }}
>
  <h2
    style={{
      textAlign: "center",
      color: "#3b82f6",
    }}
  >
    🤖 AI Governance Copilot
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#cbd5e1",
    }}
  >
    Ask JanMitra how governance decisions may affect the constituency.
  </p>
<div
  style={{
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "20px",
    marginBottom: "20px"
  }}
>

  <button
    onClick={() =>
      setCopilotQuery(
        "What if ₹100 crore is invested in roads in Bhubaneswar?"
      )
    }
  >
    🛣 Roads Investment
  </button>

  <button
    onClick={() =>
      setCopilotQuery(
        "What happens if all water complaints are resolved?"
      )
    }
  >
    💧 Water Resolution
  </button>

  <button
    onClick={() =>
      setCopilotQuery(
        "What if smart waste management is implemented?"
      )
    }
  >
    🗑 Smart Waste
  </button>

</div>
  <input
    type="text"
    placeholder="Example: What if ₹50 Crore is invested in roads?"
    value={copilotQuery}
    onChange={(e) =>
      setCopilotQuery(e.target.value)
    }
    style={{
      width: "100%",
      padding: "12px",
      marginTop: "20px",
      borderRadius: "10px",
      border: "none",
      fontSize: "16px",
    }}
  />
<button
  onClick={startVoiceInput}
  style={{
    marginTop: "10px",
    marginLeft: "10px",
    padding: "10px 20px",
    background: "#ec4899",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }}
>
  🎤 Speak Question
</button>
  <button
    onClick={handleGovernanceCopilot}
    style={{
      marginTop: "20px",
      padding: "12px 25px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
    }}
  >
    {copilotLoading
  ? "🤖 JanMitra is Thinking..."
  : "🚀 Ask AI Copilot"}
  </button>

  {copilotResult && (
    <div
      style={{
  marginTop: "20px",
  background: "#0f172a",
  padding: "25px",
  borderRadius: "12px",
  whiteSpace: "pre-wrap",
  lineHeight: "2",
  color: "#e2e8f0"
}}
    >
      {copilotResult}
      <hr style={{ margin: "20px 0" }} />

<h3 style={{ color: "#22c55e" }}>
  🎯 Governance Impact Score
</h3>

<h1 style={{ color: "#38bdf8" }}>
  {healthScore.overall + 5}/100
</h1>

<p style={{ color: "#cbd5e1" }}>
  JanMitra predicts significant governance improvement if this recommendation is implemented.
</p>
    </div>
  )}
</div>
<button
  onClick={() => navigator.clipboard.writeText(copilotResult)}
  style={{
    marginTop: "15px",
    padding: "10px 20px",
    background: "#22c55e",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer"
  }}
>
  📋 Copy Recommendation
</button>
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #ef4444"
  }}
>
  <h2
    style={{
      textAlign: "center",
      color: "#ef4444"
    }}
  >
    🚨 Dynamic Disaster Early Warning
  </h2>

  <h1
    style={{
      textAlign: "center",
      color:
        disasterAlert.level === "HIGH"
          ? "#ef4444"
          : disasterAlert.level === "MEDIUM"
          ? "#f59e0b"
          : "#22c55e"
    }}
  >
    {disasterAlert.level} RISK
  </h1>

  <p
    style={{
      textAlign: "center",
      color: "#cbd5e1",
      fontSize: "18px"
    }}
  >
    {disasterAlert.message}
  </p>

  <div
    style={{
      marginTop: "20px",
      background: "#0f172a",
      padding: "20px",
      borderRadius: "10px"
    }}
  >
    <h3 style={{ color: "#38bdf8" }}>
      Recommended Action
    </h3>

    <p style={{ color: "#cbd5e1" }}>
      {disasterInsight || disasterAlert.recommendation}
    </p>
  </div>
</div>
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #22c55e"
  }}
>
  <h2
    style={{
      textAlign: "center",
      color: "#22c55e"
    }}
  >
    🌍 Constituency Sustainability Index
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
      marginTop: "25px"
    }}
  >

    <div>
      <h3>🌱 Sustainability Score</h3>
      <h1>{sustainabilityData.score}/100</h1>
    </div>

    <div>
      <h3>🏆 Sustainability Level</h3>
      <h1>{sustainabilityData.level}</h1>
    </div>

    <div>
      <h3>☁ Estimated Carbon Impact</h3>
      <h1>
  {sustainabilityData.carbonImpact} tCO₂
</h1>
    </div>

  </div>

  <div
    style={{
      marginTop: "20px",
      background: "#0f172a",
      padding: "20px",
      borderRadius: "10px"
    }}
  >
    <h3 style={{ color: "#38bdf8" }}>
      🌿 Sustainability Recommendation
    </h3>

    <p style={{ color: "#cbd5e1" }}>
  {sustainabilityInsight}
</p>
  </div>
</div>
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #ec4899"
  }}
>
  <h2
    style={{
      textAlign: "center",
      color: "#ec4899"
    }}
  >
    🧠 Citizen Mood & Social Stability Index
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
      marginTop: "25px"
    }}
  >
    <div>
  <h3>😊 Citizen Mood</h3>

  <h1
    style={{
      color:
        socialIndex.score >= 80
          ? "#22c55e"
          : socialIndex.score >= 50
          ? "#f59e0b"
          : "#ef4444"
    }}
  >
    {socialIndex.mood}
  </h1>
</div>

    <div>
  <h3>⚖ Social Stability</h3>

  <h1
    style={{
      color:
        socialIndex.stability === "Stable"
          ? "#22c55e"
          : socialIndex.stability === "Moderate Risk"
          ? "#f59e0b"
          : "#ef4444"
    }}
  >
    {socialIndex.stability}
  </h1>
</div>

    <div>
  <h3>📊 Stability Score</h3>

  <h1>{socialIndex.score}/100</h1>

  <p
    style={{
      color:
        socialIndex.score >= 80
          ? "#22c55e"
          : "#ef4444"
    }}
  >
    {socialIndex.score >= 80
      ? "📈 Citizen confidence increasing"
      : "📉 Citizen confidence declining"}
  </p>
</div>

    <div>
      <h3>👥 Active Citizens</h3>
      <h1>{socialIndex.activeCitizens}</h1>
    </div>
  </div>

  <div
    style={{
      marginTop: "20px",
      background: "#0f172a",
      padding: "20px",
      borderRadius: "10px"
    }}
  >
    <h3 style={{ color: "#38bdf8" }}>
      🏛 Governance Insight
    </h3>

    <p style={{ color: "#cbd5e1" }}>
  {governanceInsight || socialIndex.insight}
</p>
    <div
  style={{
    marginTop: "20px",
    background: "#111827",
    padding: "20px",
    borderRadius: "10px"
  }}
>
  <h3 style={{ color: "#f59e0b" }}>
    🗳 Electoral Sentiment Forecast
  </h3>

  <p style={{ color: "#cbd5e1" }}>
    {socialIndex.score >= 80
      ? "High public satisfaction detected. Positive electoral sentiment expected."
      : socialIndex.score >= 50
      ? "Mixed citizen sentiment detected across the constituency."
      : "Negative citizen sentiment detected. Immediate governance intervention recommended."}
  </p>
</div>
  </div>
</div>
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #3b82f6"
  }}
>
  <h2
    style={{
      textAlign: "center",
      color: "#3b82f6"
    }}
  >
    🏆 National Governance Benchmarking
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#cbd5e1"
    }}
  >
    Compare constituency performance against
    AI-generated national governance benchmarks.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
      marginTop: "25px"
    }}
  >

    <div>
      <h3>😊 Citizen Satisfaction</h3>

      <h1 style={{ color: "#22c55e" }}>
        {benchmarkData.citizenScore}/100
      </h1>

      <p>National Average: 72/100</p>
    </div>

    <div>
      <h3>🛣 Road Infrastructure</h3>

      <h1 style={{ color: "#f59e0b" }}>
        {benchmarkData.roadScore}/100
      </h1>

      <p>National Average: 70/100</p>
    </div>

    <div>
      <h3>💧 Water Services</h3>

      <h1 style={{ color: "#38bdf8" }}>
        {benchmarkData.waterScore}/100
      </h1>

      <p>National Average: 68/100</p>
    </div>

    <div>
      <h3>🌍 Sustainability</h3>

      <h1 style={{ color: "#22c55e" }}>
        {benchmarkData.sustainabilityScore}/100
      </h1>

      <p>National Average: 60/100</p>
    </div>

  </div>

  <div
    style={{
      marginTop: "25px",
      background: "#0f172a",
      padding: "20px",
      borderRadius: "10px"
    }}
  >
    <h3 style={{ color: "#f59e0b" }}>
      🤖 AI Benchmark Insight
    </h3>

    <p style={{ color: "#cbd5e1" }}>
  {benchmarkInsight || benchmarkData.insight}
</p>
  </div>
</div>
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #10b981"
  }}
>
  <h2
    style={{
      textAlign: "center",
      color: "#10b981"
    }}
  >
    💰 Interactive AI Budget Optimizer
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#cbd5e1",
      marginBottom: "20px"
    }}
  >
    Simulate optimal constituency budget allocation for maximum citizen impact.
  </p>

  <div
    style={{
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <input
      type="number"
      value={availableBudget}
      onChange={(e) =>
        setAvailableBudget(Number(e.target.value))
      }
      placeholder="Enter Budget (₹ Crores)"
      style={{
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #334155",
        minWidth: "250px",
        background: "#0f172a",
        color: "white"
      }}
    />

    <button
      onClick={simulateBudgetAllocation}
      style={{
        background: "#10b981",
        color: "white",
        border: "none",
        padding: "12px 25px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      🚀 Optimize Budget
    </button>
  </div>

  {budgetSimulation && (
    <div
      style={{
        marginTop: "30px",
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px"
      }}
    >
      <div>
        <h3>🛣 Roads</h3>
        <h2>₹{budgetSimulation.roads} Cr</h2>
      </div>

      <div>
        <h3>💧 Water</h3>
        <h2>₹{budgetSimulation.water} Cr</h2>
      </div>

      <div>
        <h3>🏥 Health</h3>
        <h2>₹{budgetSimulation.health} Cr</h2>
      </div>

      <div>
        <h3>🗑 Sanitation</h3>
        <h2>₹{budgetSimulation.garbage} Cr</h2>
      </div>

      <div>
        <h3>😊 Expected Citizen Satisfaction</h3>
        <h2>{budgetSimulation.satisfaction}%</h2>
      </div>

      <div>
        <h3>📉 Expected Complaint Reduction</h3>
        <h2>{budgetSimulation.reduction}%</h2>
      </div>
    </div>
  )}
</div>
<div
  style={{
    background: "#1a1f38",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #8b5cf6"
  }}
>
  <h2
    style={{
      textAlign: "center",
      color: "#8b5cf6"
    }}
  >
    🏅 Governance Ranking Engine
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
      marginTop: "25px"
    }}
  >
    <div>
      <h3>🏆 National Rank</h3>
      <h1>{governanceRank.nationalRank}</h1>
    </div>

    <div>
      <h3>📊 Category</h3>
      <h1>{governanceRank.category}</h1>
    </div>

    <div>
      <h3>😊 Citizen Trust</h3>
      <h1>{governanceRank.trust}</h1>
    </div>
  </div>

  <div
    style={{
      marginTop: "20px",
      background: "#0f172a",
      padding: "20px",
      borderRadius: "10px"
    }}
  >
    <h3 style={{ color: "#38bdf8" }}>
      🤖 AI Ranking Insight
    </h3>

    <p style={{ color: "#cbd5e1" }}>
      JanMitra continuously benchmarks governance performance and predicts constituency standing relative to national governance standards.
    </p>
  </div>
</div>
  <h2
    style={{
      color: "#38bdf8",
      textAlign: "center",
    }}
  >
    📈 Civic Trend Analysis
  </h2>
<h3 style={{ color: "#10b981" }}>
  ⚡ Constituency Focus Area:
  {trendData.topIssue} infrastructure requires immediate intervention.
</h3>
  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      marginTop: "20px",
      gap: "20px",
    }}
  >
    <div>
      <h3>🛣 Roads</h3>
      <h2>{trendData.roads}</h2>
    </div>

    <div>
      <h3>💧 Water</h3>
      <h2>{trendData.water}</h2>
    </div>

    <div>
      <h3>🗑 Garbage</h3>
      <h2>{trendData.garbage}</h2>
    </div>
  </div>

  <hr style={{ margin: "20px 0" }} />

  <h3 style={{ color: "#f59e0b" }}>
    🔥 Most Reported Issue:
    {" "}{trendData.topIssue}
  </h3>

  <h3 style={{ color: "#10b981" }}>
    ⚡ Constituency Focus Area:
    {trendData.topIssue} infrastructure requires immediate intervention.
  </h3>
</div>
      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Complaints</h3>
          <h1>{totalComplaints}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Pending</h3>
          <h1>{pendingComplaints}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Critical</h3>
          <h1>{criticalComplaints}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Resolved</h3>
          <h1>{resolvedComplaints}</h1>
        </div>
      </div>
{/* Charts */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    marginBottom: "40px",
  }}
>
  {/* Category Chart */}
  <div
    style={{
      background: "#1a1f38",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      Complaints by Category
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={categoryData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#38bdf8" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Status Chart */}
  <div
    style={{
      background: "#1a1f38",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      Complaint Status Distribution
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={statusData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {statusData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
     {/* Complaint Map */}
<div
  style={{
    background: "#1a1f38",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "40px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "20px",
      color: "white",
    }}
  >
    🗺️ Civic Complaint Map
  </h2>

 <ComplaintMap
  complaints={
    complaints.filter(
      c => c.status !== "Resolved"
    )
  }
/>
</div>
      {/* AI Summary */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >

        <button
          onClick={handleGenerateSummary}
          style={{
            padding: "12px 25px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loadingSummary
            ? "Generating Report..."
            : "🤖 Generate Daily Civic Report"}
        </button>
        <button
  onClick={handleGenerateMPPlan}
  style={{
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "#7c3aed",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "15px",
  }}
>
  {loadingPlan
    ? "Generating MP Plan..."
    : "🏛 Generate Constituency Development Plan"}
</button>
<button
  onClick={handleGenerateFutureRisk}
  style={{
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "#f59e0b",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "15px",
  }}
>
  {loadingRisk
    ? "Predicting Risks..."
    : "🔮 Predict Future Risks"}
</button>
<button
  onClick={handleGenerateBudget}
  style={{
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "#10b981",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "15px",
  }}
>
  {loadingBudget
    ? "Generating Budget..."
    : "💰 Generate Budget Allocation"}
</button>
<button
  onClick={handleGenerateSentiment}
  style={{
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "#facc15",
    color: "black",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "15px",
  }}
>
  {loadingSentiment
    ? "Analyzing..."
    : "😊 Analyze Citizen Sentiment"}
</button>
      </div>

      {summary && (
  <div
    style={{
      background: "#1a1f38",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
      whiteSpace: "pre-wrap",
    }}
  >
    <h2 style={{ color: "#38bdf8" }}>
      AI Civic Report
    </h2>

    <p>{summary}</p>
  </div>
)}

{mpPlan && (
  <div
    style={{
      background: "#1a1f38",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
      whiteSpace: "pre-wrap",
    }}
  >
    <h2 style={{ color: "#a855f7" }}>
      🏛 AI-Powered Constituency Development Plan
    </h2>

    <p>{mpPlan}</p>
  </div>
)}
{futureRisk && (
  <div
    style={{
      background: "#1a1f38",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
      whiteSpace: "pre-wrap",
    }}
  >
    <h2 style={{ color: "#f59e0b" }}>
      🔮 Future Risk Prediction
    </h2>

    <p>{futureRisk}</p>
  </div>
)}
{budgetPlan && (
  <div
    style={{
      background: "#1a1f38",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
      whiteSpace: "pre-wrap",
      border: "2px solid #10b981",
    }}
  >
    <h2 style={{ color: "#10b981" }}>
      💰 AI Budget Allocation Simulator
    </h2>

    <p>{budgetPlan}</p>
  </div>
)}
{sentiment && (
  <div
    style={{
      background: "#1a1f38",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
      whiteSpace: "pre-wrap",
      border: "2px solid #facc15",
    }}
  >
    <h2 style={{ color: "#facc15" }}>
      😊 AI Citizen Sentiment Index
    </h2>

    <p>{sentiment}</p>
  </div>
)}
      {/* Complaint List */}
      {complaints.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          No complaints found
        </h2>
      ) : (
        complaints.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid gray",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#1a1f38",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                marginBottom: "15px",
                color: "#38bdf8",
              }}
            >
              {item.title}
            </h2>

            <p>
              <b>Category:</b> {item.category}
            </p>

            <p>
              <b>Description:</b> {item.description}
            </p>

            <p>
              <b>Location:</b> {item.location}
            </p>

            <p>
              <b>Status:</b> {item.status}
            </p>

            <p>
              <b>Name:</b> {item.name}
            </p>

            <p>
  <b>Priority:</b>{" "}
  {item.priority ||
    item.aiAnalysis?.match(/Priority:\s*(HIGH|MEDIUM|LOW|CRITICAL)/i)?.[1] ||
    "MEDIUM"}
</p>
{item.imageName && item.imageName !== "" && (
  <p>
    <b>Evidence File:</b> 📷 {item.imageName}
  </p>
)}
            <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap",
  }}
>
  <button
    onClick={() =>
      handleStatusUpdate(item.id, "In Progress")
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      background: "#f59e0b",
      color: "white",
      cursor: "pointer",
    }}
  >
    🟡 In Progress
  </button>

  <button
    onClick={() =>
      handleStatusUpdate(item.id, "Resolved")
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      background: "#10b981",
      color: "white",
      cursor: "pointer",
    }}
  >
    ✅ Resolve
  </button>

  <button
    onClick={() =>
      handleStatusUpdate(item.id, "Critical")
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      background: "#ef4444",
      color: "white",
      cursor: "pointer",
    }}
  >
    🔴 Critical
  </button>
</div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
