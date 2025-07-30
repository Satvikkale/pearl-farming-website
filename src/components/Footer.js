import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Aagya's Pearl Export</h3>
          <p className="text-sm">
            Nagpur's first pearl farming enterprise dedicated to sustainability and quality.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/training" className="hover:underline">Training</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>📍 Nagpur, Maharashtra</li>
            <li>📞 +91 98765 43210</li>
            <li>📧 contact@aagyaspearls.com</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="/" className="hover:text-gray-400">Facebook</a>
            <a href="/" className="hover:text-gray-400">Instagram</a>
            <a href="/" className="hover:text-gray-400">YouTube</a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Aagya's Pearl Export. All rights reserved.
      </div>
    </footer>
  );
}
