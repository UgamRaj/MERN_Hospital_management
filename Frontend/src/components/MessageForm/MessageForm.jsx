import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import "./MessageForm.css";

const MessageForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // You can handle form submission here
    // console.log(formData);
    try {
      const res = await axios.post(
        "https://mern-hospital-management.onrender.com/api/v1/message/send",
        { ...formData },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("🚀 ~ handleSubmit ~ res:", res);
      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      // console.log("🚀 ~ handleSubmit ~ error:", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      <div className="messageFormContainer">
        <form className="messageForm" onSubmit={handleSubmit}>
          <div className="descr">Contact us</div>
          <div className="messageInputContainer">
            <div className="input">
              <input
                required
                autoComplete="off"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input">
              <input
                required
                autoComplete="off"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>

          <div className="messageInputContainer">
            <div className="input">
              <input
                required
                autoComplete="off"
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="input">
              <input
                required
                autoComplete="off"
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
          </div>

          <div className="input">
            <textarea
              required
              cols="30"
              rows="5"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <label className="message" htmlFor="message">
              Message....
            </label>
          </div>
          <button type="submit">Send message →</button>
        </form>
      </div>
    </>
  );
};

export default MessageForm;
