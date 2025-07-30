import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add-blog", formData);
      alert("Blog added successfully!");
      setFormData({ title: "", content: "" });
      fetchBlogs(); // Refresh the blog list
    } catch (error) {
      console.error("Failed to add blog", error);
      alert("Failed to add blog");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Blog & Knowledge Hub</h1>

      {/* Display Blogs */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-2">{blog.title}</h2>
            <p className="text-sm text-gray-500 mb-1">{new Date(blog.date).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-3">{blog.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      {/* Add Blog Form */}
      <div className="bg-white shadow-md p-6 rounded-xl max-w-xl mx-auto mb-12 mt-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Add a New Blog</h2>
        <form onSubmit={handleAddBlog} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Blog Title"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Blog Content"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
          >
            Add Blog
          </button>
        </form>
      </div>    
    </section>
  );
}