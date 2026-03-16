import { Plane, Plus, User } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import LoginDialog from "./LoginDialog";
import { googleLogout } from "@react-oauth/google";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Detect current route
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header
      className={`${
        isHomePage
          ? "absolute backdrop-blur-md bg-white/10 border-white/20 text-white"
          : "relative bg-white border-gray-200 text-gray-900 shadow-sm"
      } top-0 left-0 right-0 w-full z-50 px-6 py-4 flexBetween border-b`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-x-3 cursor-pointer">
        <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg">
          <Plane className="w-6 h-6 text-white" />
        </div>

        <span
          className={`hidden sm:flex font-extrabold text-xl ${
            isHomePage
              ? "bg-linear-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent"
              : "text-gray-900"
          }`}
        >
          TripGenie AI
        </span>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-x-4 sm:gap-x-6">
        {/* Create Trip Button */}
        <Button
          onClick={() => navigate("create-trip")}
          className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <Plus size={18} />
          Create Trip
        </Button>

        {/* Profile / Login */}
        <div className="flex items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src={user?.picture}
                  referrerPolicy="no-referrer"
                  alt="userProfile"
                  height={38}
                  width={38}
                  className="rounded-full border-2 border-white shadow-md hover:scale-105 transition"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/my-trips")}>
                  My Trips
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => setOpenDialog(true)}
              className={`flex items-center gap-2 ${
                isHomePage
                  ? "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30"
                  : "bg-gray-900 text-white hover:bg-black"
              } transition`}
            >
              <User size={18} />
              Login
            </Button>
          )}

          <LoginDialog open={openDialog} onClose={() => setOpenDialog(false)} />
        </div>
      </div>
    </header>
  );
};

export default Header;