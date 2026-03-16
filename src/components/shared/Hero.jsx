import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { DollarSign, Heart, Plane } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen relative overflow-hidden flexCenter py-22 bg-cover bg-center"
      style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=3840&q=80')"
}}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Decorative Blobs (kept but softer) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay blur-3xl opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-overlay blur-3xl opacity-20" />
      <div className="absolute -bottom-32 left-30 w-96 h-96 bg-pink-400 rounded-full mix-blend-overlay blur-3xl opacity-30" />

      {/* Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        
        {/* AI Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20 shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-90" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
          </span>
          <span className="text-sm font-medium">
            AI-Powered Travel Agent
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-lg">
          Design Your Dream Trip <br /> in Seconds
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Tell us where you want to go, and let our AI generate the perfect
          itinerary with hotels, activities, and routes tailored to your
          budget.
        </p>

        {/* Button */}
        <Button
          onClick={() => navigate("/create-trip")}
          className="group relative inline-flex items-center justify-center px-8 py-6 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full focus:outline-none hover:scale-105 shadow-2xl"
        >
          Start Planning
          <FaArrowRightLong className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Features */}
        <div className="mt-14 grid grid-cols-3 gap-6 text-gray-200 text-sm">
          
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg mb-3">
              <Plane size={24} className="text-indigo-300" />
            </div>
            <span>Smart Routes</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg mb-3">
              <DollarSign size={24} className="text-indigo-300" />
            </div>
            <span>Budget Control</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg mb-3">
              <Heart size={24} className="text-indigo-300" />
            </div>
            <span>Personalized Trips</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;