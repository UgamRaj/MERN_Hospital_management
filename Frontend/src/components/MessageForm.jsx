import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
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
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>Send Us A Message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <textarea
          type="text"
          rows="7"
          name="message"
          placeholder="Type Your Message here ..."
          value={formData.message}
          onChange={handleChange}
        />
        <div
          className="submitBtnContainer"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <button className="SubmitBtn" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
