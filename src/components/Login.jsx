import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/loginUser", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          role: "Admin",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token)
        toast.success(data.message);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        setIsAuthenticated(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in log in page: ", error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component">
      <img src="/logo.png" alt="logo" className="logo" width={400} />
        <h1 className="form-title" style={{textAlign: "center"}}>Satabdisundar's MED+</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
