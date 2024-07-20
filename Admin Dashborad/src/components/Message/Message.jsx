import { useEffect, useState } from "react";
import { useHospital } from "../../Context/UserProvider";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Message.css";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useHospital();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "https://mern-hospital-management.onrender.com/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="page messages">
      <h1>Messages</h1>

      <div className="messageBoxContainer">
        {messages && messages.length > 0 ? (
          messages.map((message, i) => {
            return (
              <div className="messageCard" key={i}>
                <p className="name">
                  Name: {message.firstName} {message.lastName}
                </p>
                <p>Email: {message.email}</p>
                <p>Phone: {message.phone}</p>
                <p>Message: {message.message} </p>
                <p></p>
              </div>
            );
          })
        ) : (
          <h2 style={{ color: "red" }}>No message</h2>
        )}
      </div>
    </div>
  );
};

export default Message;
