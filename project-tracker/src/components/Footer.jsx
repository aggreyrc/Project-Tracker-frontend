import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'; // Importing icons for social media links
import { Link } from 'react-router-dom'; // Importing Link for internal navigation

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    // Footer container with background color, text color, and shadow
    <footer className="bg-indigo-600 text-white shadow-lg">
      {/* Main content container with responsive layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        
        {/* About Section */}
        <p className="text-sm text-gray-400 mb-4 md:mb-0">
          {/* Displaying dynamic year and a tagline */}
          © {currentYear} Moringa School. Empowering future tech leaders.
        </p>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {/* Link to the Projects page */}
          <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white">
            Projects
          </Link>
          {/* Link to the Join Us page */}
          <Link to="/register" className="text-sm text-gray-400 hover:text-white">
            Join Us
          </Link>
          {/* Link to the Contact page */}
          <a href="/contact" className="text-sm text-gray-400 hover:text-white">
            Contact
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* GitHub Icon with a link to the GitHub page */}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Github className="h-5 w-5" />
          </a>
          {/* Twitter Icon with a link to the Twitter page */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Twitter className="h-5 w-5" />
          </a>
          {/* LinkedIn Icon with a link to the LinkedIn page */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Linkedin className="h-5 w-5" />
          </a>
          {/* Mail Icon with a link to send an email */}
          <a href="mailto:info@moringaschool.com" className="hover:text-white">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}