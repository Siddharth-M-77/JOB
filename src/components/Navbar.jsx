import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { LuLogOut } from "react-icons/lu";
import { ImProfile } from "react-icons/im";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  // console.log(user.fullName)
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      // Send a request to your backend's logout endpoint
      const response = await axios.get(
        "https://job-portal-backend-af56.onrender.com/api/v1/user/logout",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Send cookies
        }
      );
      if (response.data.success) {
        toast.success("Logged out successfully!");
        dispatch(setUser(null));
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed!");
    }
  };
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center jusc-
          ">
            <h1 className="text-3xl font-extrabold flex">
              Job <span className="text-rose-700">HUB</span>
            </h1>
          </div>

          {/* Menu for larger screens */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-gray-800 hover:text-rose-700 font-medium"
            >
              Home
            </Link>
            <Link
              to="/job"
              className="text-gray-800 hover:text-rose-700 font-medium"
            >
              Job
            </Link>
            <Link
              to="/browse"
              className="text-gray-800 hover:text-rose-700 font-medium"
            >
              Browse
            </Link>

            {/* Conditional Rendering based on user state */}
            {!user ? (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex items-center">
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="USER"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex gap-8 cursor-pointer items-center">
                      <Avatar>
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="User Avatar"
                        />
                      </Avatar>
                      <div>
                        <h4>{user?.fullName}</h4>
                        <p className="text-sm opacity-60">{user?.bio}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                      <div className="flex items-center">
                        <ImProfile />
                        <Button variant="link" className="text-xl">
                          View Profile
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <LuLogOut />
                        <Button
                          variant="link"
                          className="text-xl"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-700"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block text-gray-800 hover:text-rose-700 font-medium py-2"
          >
            Home
          </Link>
          <Link
            to="/job"
            className="block text-gray-800 hover:text-rose-700 font-medium py-2"
          >
            Job
          </Link>
          <Link
            to="/browse"
            className="block text-gray-800 hover:text-rose-700 font-medium py-2"
          >
            Browse
          </Link>
          {!user ? (
            <>
              <Link
                to="/login"
                className="block text-gray-800 hover:bg-gray-100 py-2 border border-gray-300 rounded-md text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block text-white bg-black py-2 rounded-md text-center hover:bg-gray-800"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="block text-center py-2">
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="User Avatar"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-4">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="User "
                      />
                    </Avatar>
                    <div className="flex items-center">
                      <Button variant="link" className="text-xl">
                        View Profile
                      </Button>
                    </div>
                    <Button
                      variant="link"
                      className="text-xl"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
