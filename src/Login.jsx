import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // REGISTER FUNCTION
  const register = async () => {
    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      // Save user in Firestore
      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          email: email,
          createdAt: new Date().toString(),
        }
      );

      alert("Registration Successful 🚀");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // LOGIN FUNCTION
  const navigate = useNavigate();
  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful 🎉");
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {

      alert(error.message);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>JanMitra AI</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={register}>
        Register
      </button>

      <button
        onClick={login}
        style={{ marginLeft: "10px" }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;