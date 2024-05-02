import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { FaBars, FaX } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const gotoHomePage = () => {
    navigate("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigate("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigate("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigate("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigate("/admin/addnew");
    setShow(!show);
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/admin/logout",
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(false);
        localStorage.removeItem("token")
        navigate("/login");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in sidebar coimpopnent", error);
    }
  };

  return (
    <>
      <nav
        style={isAuthenticated ? { display: "flex" } : { display: "none" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={isAuthenticated ? { display: "flex" } : { display: "none" }}
        onClick={() => setShow(!show)}
      >
        {show ? (
          <FaX className="hamburger" style={{ cursor: "pointer" }} />
        ) : (
          <FaBars className="hamburger" style={{ cursor: "pointer" }} />
        )}
      </div>
    </>
  );
};

export default Sidebar;
