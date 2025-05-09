
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-docfinder-blue mr-2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span className="font-bold text-xl text-docfinder-blue">DocFinder</span>
            </a>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for doctors, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 w-full"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <a href="#" className="hidden md:block text-gray-600 hover:text-docfinder-blue">
              Find Doctors
            </a>
            <a href="#" className="hidden md:block text-gray-600 hover:text-docfinder-blue">
              Video Consult
            </a>
            <a href="#" className="hidden md:block text-gray-600 hover:text-docfinder-blue">
              Medicines
            </a>
            <a href="#" className="hidden md:block text-gray-600 hover:text-docfinder-blue">
              Lab Tests
            </a>
            <Button variant="outline" className="flex items-center">
              <User className="h-4 w-4 mr-2" /> Login
            </Button>
          </nav>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for doctors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
