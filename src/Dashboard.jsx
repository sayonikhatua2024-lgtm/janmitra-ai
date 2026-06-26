import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);

      alert("Logged out successfully");

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        color: "white",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Welcome to JanMitra AI 🚀</h1>

      <p>User Logged In Successfully</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;