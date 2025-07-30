import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      alert("Thank you for contacting us! Your message has been sent.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send your message. Please try again later.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">

      {/* Contact Form */}
      <div className="bg-white shadow-md p-6 rounded-xl max-w-xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Address & Google Map */}
      <div className="grid gap-8 md:grid-cols-2 items-center mb-12 bg-gray-200 shadow-md p-6 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Address</h2>
          <p className="text-gray-600 mb-2 font-bold">Aagya's Pearl Export</p>
          <p className="text-gray-600 mb-2 font-bold">123 Pearl Street</p>
          <p className="text-gray-600 mb-2 font-bold">Nagpur, Maharashtra, India</p>
          <p className="text-gray-600 mb-2 font-bold">Pin Code: 440001</p>
        </div>
        <div>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.346123456789!2d79.082123456789!3d21.145123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c123456789!2sNagpur%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Phone & Email */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Details</h2>
        <p className="text-gray-600 mb-2">
          <strong>Phone:</strong> +91 98765 43210
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong> contact@aagyaspearlexport.com
        </p>
      </div>
    </section>
  );
}
