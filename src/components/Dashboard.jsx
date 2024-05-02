import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated, admin } = useContext(AppContext);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/getAppointments",
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setAppointments(data.appointments);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.log("Error in fetch appointments page", error);
      }
    };
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
        }
      } catch (error) {
        console.log("Error in fetch appointments page", error);
      }
    };
    fetchDoctors();
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const response = await fetch(
        `https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/updateStatus/${appointmentId}`,
        {
          method: "PUT",
          body: JSON.stringify({ status: status }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAppointments((prevAppointments) => {
          return prevAppointments.map((appointment) => {
            return appointment._id === appointmentId
              ? { ...appointment, status }
              : appointment;
          });
        });
        toast.success(data.message);
      } else {
        setAppointments([]);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in status updation function in dashboard ", error);
    }
  };

  return (
    <section className="dashboard page">
      <div className="banner" style={{ paddingTop: "2.5rem" }}>
        <div className="firstBox">
          <div className="content">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>Welcome</p>
              <h5>{admin && `${admin.firstname}`}</h5>
            </div>
            <p>
              Since you are an admin of this dashboard, now you have all the
              authority to access and modify the appointments.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>{doctors.length}</h3>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstname} ${appointment.lastname}`}</td>
                      <td>{appointment.appointmentDate}</td>
                      <td>{`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          value={appointment.status}
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>
                        {appointment.hasVisited === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No Appointments Found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
