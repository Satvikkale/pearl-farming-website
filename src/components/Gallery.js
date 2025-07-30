import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // State for selected image


    const userData = JSON.parse(localStorage.getItem("userData"));
    const isAdmin = userData?.userType === "admin";

    const fetchImages = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/gallery");
            setImages(response.data);
        } catch (error) {
            console.error("Failed to fetch images", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 1 * 1024 * 1024) { // Check if file size exceeds 1MB
            alert("Image size exceeds 1MB limit");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageFile(reader.result); // Convert image to Base64
        };
        reader.readAsDataURL(file);
    };

    const handleAddImage = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/add-image", { image: imageFile });
            alert("Image added successfully!");
            setImageFile(null);
            fetchImages(); // Refresh the gallery
        } catch (error) {
            console.error("Failed to add image", error);
            alert("Failed to add image");
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image); // Set the clicked image as the selected image
    };

    const closeImageModal = () => {
        setSelectedImage(null); // Close the modal by clearing the selected image
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-20">
            {isAdmin &&
                <><h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Upload Images</h1>

                    {/* Image Upload Form */}
                    <form onSubmit={handleAddImage} className="mb-12 grid gap-4 grid-cols-1">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            required
                            className="border p-2 rounded"
                        />
                        <button
                            type="submit"
                            className="col-span-full md:col-span-2 lg:col-span-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                        >
                            Add Image
                        </button>
                    </form>
                </>}

            {/* Display Gallery Images */}
            <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Gallery</h1>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8">
                {images.map((image) => (
                    <div
                        key={image._id}
                        className="border rounded-sm overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer"
                        onClick={() => handleImageClick(image.image)} // Handle image click
                    >
                        <img
                            src={image.image} // Use Base64 image
                            alt="Gallery"
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    onClick={closeImageModal} // Close modal on background click
                >
                    <div className="relative">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="max-w-full max-h-screen object-contain"
                        />
                        <button
                            onClick={closeImageModal}
                            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full px-3 py-1"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
