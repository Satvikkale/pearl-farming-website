import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    image: "", // Store Base64 string
    description: "",
    price: "",
  });

  // Check if the user is an admin
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData?.userType === "admin";

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file.size > 1 * 1024 * 1024) {
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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add-product", formData);
      alert("Product added successfully!");
      setFormData({ category: "", image: "", description: "", price: "" });
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Failed to add product", error);
      alert("Failed to add product");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {isAdmin && (
        <>
          <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Add Product</h1>

          {/* Product Add Form */}
          <form onSubmit={handleAddProduct} className="mb-12 grid gap-4 grid-cols-1">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
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
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="col-span-full md:col-span-2 lg:col-span-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Add Product
            </button>
          </form>
        </>
      )}

      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center mt-10 ">Our Products</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-sm overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer"
          >
            <img  
              src={product.image} // Use Base64 image
              alt={product.category}
              className="h-48 w-full object-cover"
            />
            <div className="p-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {product.category}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-gray-900 font-bold">{product.price}rs</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
