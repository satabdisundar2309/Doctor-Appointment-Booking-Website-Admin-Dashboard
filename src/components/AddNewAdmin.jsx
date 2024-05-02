import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewAdmin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/registerAdmin",
        {
          method: "POST",
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            phone,
            adhaar,
            age,
            gender,
            password,
            confirmPassword,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in admin registration page: ", error);
    }
  };
  return (
    <>
      <section className="page">
        <div className="container form-component">
          <img src="/logo.png" alt="logo" className="logo" width={400} />
          <h2 style={{ textAlign: "center" }}>Add new Admin</h2>
          <form onSubmit={handleRegistration}>
            <div>
              <input
                type="text"
                placeholder="First name"
                value={firstname}
                name="firstname"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastname}
                name="lastname"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone number"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Adhaar Number"
                value={adhaar}
                name="adhaar"
                onChange={(e) => setAdhaar(e.target.value)}
              />
              <input
                type="text"
                placeholder="Age"
                value={age}
                name="age"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <select
                value={gender}
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button type="submit">Add New Admin</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddNewAdmin;
