import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewDoctor = () => {
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
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  // I read it from google
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("adhaar", adhaar);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("docAvatar", docAvatar);

      const response = await fetch(
        "https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/registerDoctor",
        {
          method: "POST",
          body: formData,
          headers: {
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
      console.log("Error in doctor reg. page: ", error);
    }
  };

  return (
    <>
      <section className="page">
        <section className="container add-doctor-form">
          <img src="/logo.png" alt="logo" className="logo" width={400} />
          <h2 style={{ textAlign: "center" }}>Add new Doctor</h2>
          <form onSubmit={handleRegistration}>
            <div className="first-wrapper">
              <div>
                <img
                  src={
                    docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"
                  }
                  alt="Doctor Avatar"
                />
                <input type="file" onChange={handleAvatar} />
              </div>
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
                <select
                  value={doctorDepartment}
                  onChange={(e) => {
                    setDoctorDepartment(e.target.value);
                  }}
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((depart, index) => {
                    return (
                      <option value={depart} key={index}>
                        {depart}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Add New Doctor</button>
              </div>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default AddNewDoctor;
