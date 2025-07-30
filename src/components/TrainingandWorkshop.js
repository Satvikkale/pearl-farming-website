import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TrainingandWorkshop() {
    const [trainings, setTrainings] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        location: "",
        fee: "",
        description: "",
    });
    const [registrationForm, setRegistrationForm] = useState({
        name: "",
        email: "",
        course: "",
    });
    const [isRegistered, setIsRegistered] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const isAdmin = userData?.userType === "admin";

    const fetchTrainings = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/trainings");
            setTrainings(response.data);
        } catch (error) {
            console.error("Failed to fetch trainings", error);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddTraining = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/add-training", formData); // Ensure this URL matches the backend server
            alert("Training added successfully!");
            setFormData({ title: "", date: "", location: "", fee: "", description: "" });
            fetchTrainings(); // Refresh the training list
        } catch (error) {
            console.error("Failed to add training", error);
            alert("Failed to add training. Please ensure the backend server is running.");
        }
    };

    const handleRegistrationChange = (e) => {
        setRegistrationForm({ ...registrationForm, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/register-course", registrationForm);
            alert("Registration successful! Details have been sent to your email and the admin.");
            setRegistrationForm({ name: "", email: "", course: "" });
            setIsRegistered(true);
        } catch (error) {
            console.error("Failed to register for the course", error);
            alert("Failed to register for the course. Please try again.");
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-20">
            {/* Add Training Form */}
            {isAdmin && <div className="bg-white shadow-md p-6 rounded-xl max-w-xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Add a New Training</h2>
                <form onSubmit={handleAddTraining} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Training Title"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="Date (e.g., June 15, 2025)"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <input
                        type="text"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                        placeholder="Fee (e.g., ₹3,000)"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
                    >
                        Add Training
                    </button>
                </form>
            </div>}

            
            {/* Display Trainings */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                Pearl Farming Training & Workshops
            </h1>
            <div className="space-y-8 mb-20">
                {trainings.map((training) => (
                    <div
                        key={training._id}
                        className="bg-white shadow-md border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
                    >
                        <h2 className="text-2xl font-semibold text-green-700 mb-2">{training.title}</h2>
                        <p className="text-gray-600 mb-1">
                            <strong>Date:</strong> {training.date}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Location:</strong> {training.location}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Fee:</strong> {training.fee}
                        </p>
                        <p className="text-gray-700 mt-2">{training.description}</p>
                    </div>
                ))}
            </div>

            {/* Course Registration Form */}
            <div className="bg-white shadow-md p-6 rounded-xl max-w-xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Register for a Course</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={registrationForm.name}
                        onChange={handleRegistrationChange}
                        placeholder="Your Name"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <input
                        type="email"
                        name="email"
                        value={registrationForm.email}
                        onChange={handleRegistrationChange}
                        placeholder="Your Email"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <select
                        name="course"
                        value={registrationForm.course}
                        onChange={handleRegistrationChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    >
                        <option value="">Select a Course</option>
                        {trainings.map((training) => (
                            <option key={training._id} value={training.title}>
                                {training.title}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
                    >
                        Register
                    </button>
                    {isRegistered && (
                        <p className="text-green-600 mt-2 text-center">
                            Thank you for registering! Check your email for details.
                        </p>
                    )}
                </form>
            </div>

        </section>
    );
}
