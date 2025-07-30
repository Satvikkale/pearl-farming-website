import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Initialize based on token
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token')); // Update login state on token change
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event("storage")); // Trigger storage event to update App and Navbar
    setIsLoggedIn(false); // Update the state to reflect the logout
    navigate('/login'); // Navigate to the login page immediately
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Aagya's Pearls
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {isLoggedIn ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-gray-900 transition">
                  Home
                </Link>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 transition">
                  About
                </Link>
                <Link to="/products" className="text-gray-600 hover:text-gray-900 transition">
                  Products
                </Link>
                <Link to="/process" className="text-gray-600 hover:text-gray-900 transition">
                  Process
                </Link>
                <Link to="/gallery" className="text-gray-600 hover:text-gray-900 transition">
                  Gallery
                </Link>
                <Link to="/testimonials" className="text-gray-600 hover:text-gray-900 transition">
                  Testimonials
                </Link>
                <Link to="/training" className="text-gray-600 hover:text-gray-900 transition">
                  Training
                </Link>
                <Link to="/blog" className="text-gray-600 hover:text-gray-900 transition">
                  Blog
                </Link>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition">
                  Contact
                </Link>
                <Link to="/faqs" className="text-gray-600 hover:text-gray-900 transition">
                  FAQs
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-black hover:text-gray-900 transition cursor-pointer bg-red-500 px-4 p-1 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                
                <Link to="/login" className="text-gray-600 hover:text-gray-900 transition">
                  Login
                </Link>

                <Link to="/signup" className="text-gray-600 hover:text-gray-900 transition">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <span className="text-2xl">&times;</span>
              ) : (
                <span className="text-2xl">&#9776;</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-2 pt-2 pb-3 space-y-1">
          {isLoggedIn ? (
            <>
              <Link to="/" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                Home
              </Link>
              <Link to="/about" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                About
              </Link>
              <Link to="/products" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                Products
              </Link>
              <Link to="/process" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                Process
              </Link>
              <Link to="/gallery" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                Gallery
              </Link>
              <Link to="/testimonials" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                Testimonials
              </Link>
              <Link to="/training" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                Training
              </Link>
              <Link to="/blog" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                Blog
              </Link>
              <Link to="/contact" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                Contact
              </Link>
              <Link to="/faqs" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                FAQs
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer bg-red-500 px-4 py rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                Login
              </Link>
              <Link to="/signup" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
