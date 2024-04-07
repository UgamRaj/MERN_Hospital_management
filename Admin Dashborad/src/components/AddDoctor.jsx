import { Navigate, useNavigate } from "react-router-dom";
import { useHospital } from "../Context/UserProvider";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useHospital();
  const [docPreview, setDocPreview] = useState("");
  const [docAvator, setDocAvator] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    age: "",
    // aadhar: "",
    doctorAvator: "",
    doctorDepartment: "",
  });

  const departments = [
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

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //! Handling files of images
  const avtarFilehandler = (e) => {
    const file = e.target.files[0];
    // const res = URL.createObjectURL(file);
    // console.log("🚀 ~ avtarFilehandler ~ res:", res);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocPreview(reader.result);
      // setDocPreview(res);
      setDocAvator(file);
      // console.log("🚀 ~ avtarFilehandler ~ file:", reader.result);
    };
  };

  const doctorHandler = async () => {
    formData.doctorAvator = docAvator;
    console.log("Doctor", formData);

    try {
      const response = await axios.post(
        "http://localhost:10000/api/v1/user/doctor/addnew",
        { ...formData },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const responseData = response.data;
      if (responseData.success) {
        toast.success(responseData.message);
        // setIsAuthenticated(true);
        navigate("/doctors");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.error("Error:", error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="loginSignup adminPage">
      <div className="loginSignupContainer">
        <h1>Add New Doctor</h1>
        <div className="docPreview">
          <img
            src={docPreview ? `${docPreview}` : "/docHolder.jpg"}
            alt="Doctor Avtor"
          />
        </div>
        <div className="loginSignupFields">
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload Image
          </label>
          <input id="file-upload" type="file" onChange={avtarFilehandler} />

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            onChange={changehandler}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            onChange={changehandler}
          />
          <select
            name="doctorDepartment"
            value={formData.doctorDepartment}
            onChange={changehandler}
          >
            <option value="">Select Department</option>
            {departments.map((department, i) => {
              return (
                <option key={i} value={department}>
                  {department}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            onChange={changehandler}
          />

          <input
            type="number"
            name="age"
            value={formData.age}
            placeholder="Age"
            onChange={changehandler}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={changehandler}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            onChange={changehandler}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={changehandler}
          />
        </div>
        <button onClick={doctorHandler}>Continue</button>
      </div>
    </div>
  );
};

export default AddDoctor;
