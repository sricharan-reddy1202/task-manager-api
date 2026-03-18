import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert("User registered successfully");

      navigate("/login"); // ✅ redirect after register

    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container"> {/* ✅ className instead of class */}
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;