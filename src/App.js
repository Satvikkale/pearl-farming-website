import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Products from './components/Products';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import TrainingandWorkshop from './components/TrainingandWorkshop';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import FAQs from './components/FAQs';

import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token')); // Update login state on token change
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/about"
            element={isLoggedIn ? <About /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={isLoggedIn ? <Products /> : <Navigate to="/login" />}
            />
          <Route
            path="/process"
            element={isLoggedIn ? <Process /> : <Navigate to="/login" />}
          />
          <Route
            path="/gallery"
            element={isLoggedIn ? <Gallery /> : <Navigate to="/login" />}
          />
          <Route
            path="/testimonials"
            element={isLoggedIn ? <Testimonials /> : <Navigate to="/login" />}
          />
          <Route
            path="/training"
            element={isLoggedIn ? <TrainingandWorkshop /> : <Navigate to="/login" />}
          />
          <Route
            path="/blog"
            element={isLoggedIn ? <Blogs /> : <Navigate to="/login" />}
          
          />
          <Route
            path="/contact"
            element={isLoggedIn ? <Contact /> : <Navigate to="/login" />}
          />
          <Route
            path="/faqs"
            element={isLoggedIn ? <FAQs /> : <Navigate to="/login" />}
          />
        
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
