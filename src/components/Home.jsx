import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./latestJob";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllAdminJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  useGetAllAdminJobs();
  const { user } = useSelector((store) => store.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className="max-w-screen-xl overflow-x-hidden mx-auto">
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
};

export default Home;
