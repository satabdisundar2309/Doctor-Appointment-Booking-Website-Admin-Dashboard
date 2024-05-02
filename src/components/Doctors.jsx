import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/doctors", {
          method: "GET",
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setDoctors(data.doctors);
        } else {
          setDoctors([]);
          toast.error(data.message);
        }
      } catch (error) {
        console.log("Error in doctors page", error);
      }
    };
    fetchDoctors();
  }, []);
  return (
    <section className="page doctors">
      <h1 style={{ paddingTop: "2.5rem" }}>Doctors</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="card" key={element._id}>
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstname} ${element.lastname}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Age: <span>{element.age}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    Adhaar: <span>{element.adhaar}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
