import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../images/hero-img.jpg'; // Import the hero image

export default function Home() {
  return (
    <section className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[80vh]"
        style={{ backgroundImage: `url(${heroImage})` }} // Use the imported image
      >
        <div className=" bg-opacity-50 h-full w-full flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center">Nagpur's First Pearl Farming Enterprise</h1>
          <p className="text-lg md:text-2xl mt-4 text-center">Quality & Purity in Every Pearl</p>
          <div className="mt-6 flex gap-4">
            <Link to="/products" className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition text-sm sm:text-base">
              Explore Our Pearls
            </Link>
            <Link to="/contact" className="bg-transparent border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition text-sm sm:text-base">
              Contact Us for Bulk Orders
            </Link>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Welcome to Aagya's Pearl Export</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At Aagya's Pearl Export, we take pride in being Nagpur's first dedicated pearl farming enterprise. Our journey began with a passion for aquaculture and a vision to produce the finest freshwater pearls through sustainable and ethical farming methods. Each pearl is nurtured with care, ensuring unmatched quality, luster, and authenticity.
        </p>
      </div>
    </section>
  );
}
