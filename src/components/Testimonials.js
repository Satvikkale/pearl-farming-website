import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        feedback: "",
        image: "",
    });

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/testimonials");
            setTestimonials(response.data);
        } catch (error) {
            console.error("Failed to fetch testimonials", error);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0];
            if (file.size > 1 * 1024 * 1024) { // Check if file size exceeds 1MB
                alert("Image size exceeds 1MB limit");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result }); // Convert image to Base64
            };
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddTestimonial = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/add-testimonial", formData);
            alert("Testimonial added successfully!");
            setFormData({ name: "", role: "", feedback: "", image: "" });
            fetchTestimonials(); // Refresh the testimonials list
        } catch (error) {
            console.error("Failed to add testimonial", error);
            alert("Failed to add testimonial");
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-20">

            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                What Our Customers Say
            </h1>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t) => (
                    <div
                        key={t._id}
                        className="max-w-sm border border-gray-300 rounded-lg shadow-lg bg-white p-4 space-y-2 overflow-hidden"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-14 h-14 rounded-full object-cover mr-4"
                            />
                            <div>
                                <div className="text-gray-900 font-medium">{t.name}</div>
                                <div className="text-gray-600 text-sm">{t.role}</div>
                            </div>
                        </div>

                        <p className="text-gray-700 break-words">
                            “{t.feedback}”
                        </p>

                        <div className="text-red-500 font-medium cursor-pointer hover:underline">
                            Read more
                        </div>
                    </div>
                ))}
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-800 mb-5 mt-12">
                Add Testimonial
            </h1>

            {/* Testimonial Add Form */}
            <div className="bg-white shadow-md p-6 rounded-xl max-w-xl mx-auto mb-12">
                <form onSubmit={handleAddTestimonial} className="mb-12 grid gap-4 grid-cols-1">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Role"
                        required
                        className="border p-2 rounded"
                    />
                    <textarea
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        placeholder="Feedback"
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                        Add Testimonial
                    </button>
                </form>
            </div>
        </section>
    );
}
