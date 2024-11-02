import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { setLoading, setUser } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (data) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true, // Include credentials (like cookies)
        }
      );

      if (response.data.success) {
        console.log(response.data.user);
        const user = response.data.user;
        // Save user data in Redux store
        dispatch(setUser(user));

        // Role-based redirection
        if (user.role === "recruiter") {
          navigate("/admin/companies"); // Recruiter page
        } else if (user.role === "student") {
          navigate("/"); // Normal user page
        }

        toast.success(response.data.message || "Login successful!");
        reset(); // Reset form after successful login
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white shadow-lg p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl flex items-center justify-center font-bold text-center text-gray-800 mb-6">
          Log <span className="text-orange-600">In</span>
        </h1>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-purple-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm">
              Don't have an account?{" "}
              <span className="text-blue-600 hover:cursor-pointer">
                <Link to="/signup">Signup</Link>
              </span>
            </p>
            <Link
              to="/forget-password"
              className="text-sm font-bold text-red-600 capitalize font-serif"
            >
              Forgot your Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
