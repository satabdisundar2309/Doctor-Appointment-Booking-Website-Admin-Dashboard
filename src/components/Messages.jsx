import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(AppContext);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/getMessages",
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.log("Error in message components", error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <section className="page messages">
      <h1 style={{ marginTop: "2.5rem", textAlign: "center" }}>
        User Messages
      </h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstname}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastname}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
