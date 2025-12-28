import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase.js";
import { useNavigate } from "react-router-dom";
export default function GoogleLogin() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google user:", user);
      const token = await user.getIdToken();
      const Result = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      console.log("Result :",Result);

      if (Result.ok) {
        // const Gmail = await fetch("http://localhost:3000/api/gmail", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     gmail: user.email,
        //     username: user.name,
        //   }),
        // });

        // const response = await Gmail.json(); // if your API returns JSON
        // console.log(response);
        
        localStorage.setItem("email", user.email);
        localStorage.setItem("token", user.getIdToken);
        localStorage.setItem("user", user.displayName);
        navigate("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#fff",
        color: "#555",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)")
      }
      onMouseLeave={(e) =>
        (e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)")
      }
    >
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google Logo"
        style={{ width: "20px", height: "20px" }}
      />
      Sign in with Google
    </button>
  );
}
