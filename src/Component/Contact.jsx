import React, { useState } from "react";
import "./Contact.css";
import contactImg from "../assets/contact.jpg";

const API_URL = "https://698823cf780e8375a6879f02.mockapi.io/contact";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ⭐ Submit → MockAPI ma Save
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newMessage = {
        ...formData,
        date: new Date().toLocaleString(),
      };

      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      alert(`Thank you, ${formData.name}! Your message has been received.`);

      // Reset Form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❗");
    }
  };

  return (
    <div className="contact-container">
      <br />
      <br />

      <section className="contact-hero">
        <img src={contactImg} alt="Contact Us" className="contact-img" />

        <div className="contact-text">
          <h1>Contact Us</h1>
          <p>
            We would love to hear from you! Whether you have questions about our
            products or want to collaborate, feel free to reach out.
          </p>
        </div>
      </section>

      <section className="contact-form-section">
        <h2>Send Us a Message</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
